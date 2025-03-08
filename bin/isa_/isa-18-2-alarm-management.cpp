// SPDX-FileCopyrightText: 2023 OUTLAW-DMA, LLC
// SPDX-License-Identifier: MIT

/**
 * ISA-18.2 Simulation - Management of Alarm Systems
 * This program simulates an alarm management system following ISA-18.2 principles
 */

#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <chrono>
#include <iomanip>
#include <algorithm>

// Get current timestamp as string
std::string getCurrentTimestamp() {
    auto now = std::chrono::system_clock::now();
    auto now_time = std::chrono::system_clock::to_time_t(now);
    std::stringstream ss;
    ss << std::put_time(std::localtime(&now_time), "%Y-%m-%d %H:%M:%S");
    return ss.str();
}

// ISA-18.2 defined alarm priorities
enum class AlarmPriority {
    LOW,
    MEDIUM,
    HIGH,
    CRITICAL
};

// ISA-18.2 alarm states
enum class AlarmState {
    NORMAL,
    UNACKNOWLEDGED,
    ACKNOWLEDGED,
    RETURNED_UNACKNOWLEDGED,
    SHELVED,
    SUPPRESSED,
    OUT_OF_SERVICE
};

// Convert alarm priority to string
std::string priorityToString(AlarmPriority priority) {
    switch (priority) {
        case AlarmPriority::LOW: return "LOW";
        case AlarmPriority::MEDIUM: return "MEDIUM";
        case AlarmPriority::HIGH: return "HIGH";
        case AlarmPriority::CRITICAL: return "CRITICAL";
        default: return "UNKNOWN";
    }
}

// Convert alarm state to string
std::string stateToString(AlarmState state) {
    switch (state) {
        case AlarmState::NORMAL: return "NORMAL";
        case AlarmState::UNACKNOWLEDGED: return "UNACKNOWLEDGED";
        case AlarmState::ACKNOWLEDGED: return "ACKNOWLEDGED";
        case AlarmState::RETURNED_UNACKNOWLEDGED: return "RETURNED_UNACKNOWLEDGED";
        case AlarmState::SHELVED: return "SHELVED";
        case AlarmState::SUPPRESSED: return "SUPPRESSED";
        case AlarmState::OUT_OF_SERVICE: return "OUT_OF_SERVICE";
        default: return "UNKNOWN";
    }
}

// Alarm class following ISA-18.2 recommendations
class Alarm {
private:
    std::string tagName;
    std::string description;
    AlarmPriority priority;
    AlarmState state;
    double setpoint;
    double deadband;
    std::string timestamp;
    std::string lastAckTimestamp;
    int occurrenceCount;
    bool isEnabled;
    bool isSuppressed;
    bool isShelved;

public:
    Alarm(const std::string& tag, const std::string& desc, 
          AlarmPriority prio, double sp, double db)
        : tagName(tag), description(desc), priority(prio), 
          setpoint(sp), deadband(db), occurrenceCount(0),
          isEnabled(true), isSuppressed(false), isShelved(false),
          state(AlarmState::NORMAL) {}

    // Trigger an alarm condition
    void trigger(double currentValue) {
        if (!isEnabled || isSuppressed || isShelved) {
            return;
        }

        if (currentValue >= setpoint && state == AlarmState::NORMAL) {
            state = AlarmState::UNACKNOWLEDGED;
            timestamp = getCurrentTimestamp();
            occurrenceCount++;
        } else if (currentValue < (setpoint - deadband) && 
                  (state == AlarmState::ACKNOWLEDGED || state == AlarmState::UNACKNOWLEDGED)) {
            state = AlarmState::RETURNED_UNACKNOWLEDGED;
        }
    }

    // Acknowledge an alarm
    void acknowledge() {
        if (state == AlarmState::UNACKNOWLEDGED) {
            state = AlarmState::ACKNOWLEDGED;
            lastAckTimestamp = getCurrentTimestamp();
        } else if (state == AlarmState::RETURNED_UNACKNOWLEDGED) {
            state = AlarmState::NORMAL;
            lastAckTimestamp = getCurrentTimestamp();
        }
    }

    // Shelve an alarm (temporary suppression)
    void shelve() {
        if (state != AlarmState::OUT_OF_SERVICE) {
            isShelved = true;
            state = AlarmState::SHELVED;
        }
    }

    // Unshelve an alarm
    void unshelve() {
        if (state == AlarmState::SHELVED) {
            isShelved = false;
            state = AlarmState::NORMAL;
        }
    }

    // Suppress an alarm
    void suppress() {
        isSuppressed = true;
        if (state != AlarmState::OUT_OF_SERVICE) {
            state = AlarmState::SUPPRESSED;
        }
    }

    // Unsuppress an alarm
    void unsuppress() {
        isSuppressed = false;
        if (state == AlarmState::SUPPRESSED) {
            state = AlarmState::NORMAL;
        }
    }

    // Enable/disable alarm
    void enable(bool enable) {
        isEnabled = enable;
        if (!isEnabled) {
            state = AlarmState::OUT_OF_SERVICE;
        } else if (state == AlarmState::OUT_OF_SERVICE) {
            state = AlarmState::NORMAL;
        }
    }

    // Get alarm information
    AlarmState getState() const { return state; }
    AlarmPriority getPriority() const { return priority; }
    std::string getTagName() const { return tagName; }
    std::string getDescription() const { return description; }
    std::string getTimestamp() const { return timestamp; }
    int getOccurrenceCount() const { return occurrenceCount; }

    // Print alarm details
    void print() const {
        std::cout << "Alarm: " << tagName << " (" << description << ")\n";
        std::cout << "  Priority: " << priorityToString(priority) << "\n";
        std::cout << "  State: " << stateToString(state) << "\n";
        std::cout << "  Setpoint: " << setpoint << " (Deadband: " << deadband << ")\n";
        if (!timestamp.empty()) {
            std::cout << "  Triggered: " << timestamp << "\n";
        }
        if (!lastAckTimestamp.empty()) {
            std::cout << "  Last Acknowledged: " << lastAckTimestamp << "\n";
        }
        std::cout << "  Occurrence Count: " << occurrenceCount << "\n";
        std::cout << "  Enabled: " << (isEnabled ? "Yes" : "No") << "\n";
        std::cout << "  Suppressed: " << (isSuppressed ? "Yes" : "No") << "\n";
        std::cout << "  Shelved: " << (isShelved ? "Yes" : "No") << "\n";
    }
};

// Alarm Management System following ISA-18.2 principles
class AlarmManagementSystem {
private:
    std::vector<Alarm> alarms;
    std::map<AlarmPriority, int> alarmCounts;
    int maxActiveAlarms;
    int currentActiveAlarms;

public:
    AlarmManagementSystem(int maxAlarms = 100) 
        : maxActiveAlarms(maxAlarms), currentActiveAlarms(0) {
        alarmCounts[AlarmPriority::LOW] = 0;
        alarmCounts[AlarmPriority::MEDIUM] = 0;
        alarmCounts[AlarmPriority::HIGH] = 0;
        alarmCounts[AlarmPriority::CRITICAL] = 0;
    }

    // Add a new alarm to the system
    void addAlarm(const Alarm& alarm) {
        alarms.push_back(alarm);
    }

    // Update a process value and check for alarms
    void updateProcessValue(const std::string& tag, double value) {
        for (auto& alarm : alarms) {
            if (alarm.getTagName() == tag) {
                AlarmState oldState = alarm.getState();
                alarm.trigger(value);
                
                // Check if alarm became active
                if (oldState == AlarmState::NORMAL && 
                    alarm.getState() == AlarmState::UNACKNOWLEDGED) {
                    currentActiveAlarms++;
                    alarmCounts[alarm.getPriority()]++;
                    
                    // Log alarm activation
                    std::cout << "[ALARM TRIGGERED] " << alarm.getTagName() 
                              << " - " << alarm.getDescription() 
                              << " - Priority: " << priorityToString(alarm.getPriority())
                              << " - Value: " << value << "\n";
                }
            }
        }
    }

    // Acknowledge an alarm
    void acknowledgeAlarm(const std::string& tag) {
        for (auto& alarm : alarms) {
            if (alarm.getTagName() == tag) {
                AlarmState oldState = alarm.getState();
                alarm.acknowledge();
                
                // Check if alarm became inactive
                if ((oldState == AlarmState::UNACKNOWLEDGED || 
                     oldState == AlarmState::RETURNED_UNACKNOWLEDGED) && 
                    alarm.getState() == AlarmState::NORMAL) {
                    currentActiveAlarms--;
                    alarmCounts[alarm.getPriority()]--;
                }
                
                std::cout << "[ALARM ACKNOWLEDGED] " << alarm.getTagName() << "\n";
                return;
            }
        }
        
        std::cout << "[ERROR] Alarm tag not found: " << tag << "\n";
    }

    // Shelve an alarm
    void shelveAlarm(const std::string& tag) {
        for (auto& alarm : alarms) {
            if (alarm.getTagName() == tag) {
                AlarmState oldState = alarm.getState();
                alarm.shelve();
                
                // Check if alarm became inactive due to shelving
                if (oldState != AlarmState::NORMAL && 
                    oldState != AlarmState::SHELVED && 
                    oldState != AlarmState::SUPPRESSED && 
                    oldState != AlarmState::OUT_OF_SERVICE) {
                    currentActiveAlarms--;
                    alarmCounts[alarm.getPriority()]--;
                }
                
                std::cout << "[ALARM SHELVED] " << alarm.getTagName() << "\n";
                return;
            }
        }
        
        std::cout << "[ERROR] Alarm tag not found: " << tag << "\n";
    }

    // Print alarm summary (ISA-18.2 recommended practice)
    void printAlarmSummary() const {
        std::cout << "\n=== ALARM SUMMARY ===\n";
        std::cout << "Total Active Alarms: " << currentActiveAlarms 
                  << " (Max: " << maxActiveAlarms << ")\n";
        std::cout << "By Priority:\n";
        std::cout << "  CRITICAL: " << alarmCounts.at(AlarmPriority::CRITICAL) << "\n";
        std::cout << "  HIGH:     " << alarmCounts.at(AlarmPriority::HIGH) << "\n";
        std::cout << "  MEDIUM:   " << alarmCounts.at(AlarmPriority::MEDIUM) << "\n";
        std::cout << "  LOW:      " << alarmCounts.at(AlarmPriority::LOW) << "\n";
        
        std::cout << "\nActive Alarms:\n";
        for (const auto& alarm : alarms) {
            if (alarm.getState() != AlarmState::NORMAL && 
                alarm.getState() != AlarmState::OUT_OF_SERVICE) {
                std::cout << "  " << alarm.getTagName() 
                          << " (" << priorityToString(alarm.getPriority()) << ") - " 
                          << stateToString(alarm.getState()) << "\n";
            }
        }
        std::cout << "=====================\n\n";
    }

    // Print detailed information for all alarms
    void printAllAlarms() const {
        std::cout << "\n=== ALL CONFIGURED ALARMS ===\n";
        for (const auto& alarm : alarms) {
            alarm.print();
            std::cout << "--------------------------\n";
        }
        std::cout << "============================\n\n";
    }
};

int main() {
    std::cout << "ISA-18.2 Alarm Management System Simulation\n";
    std::cout << "===========================================\n\n";
    
    // Create an alarm management system
    AlarmManagementSystem alarmSystem;
    
    // Configure alarms according to ISA-18.2 principles
    alarmSystem.addAlarm(Alarm("TT101", "Reactor Temperature High", AlarmPriority::HIGH, 150.0, 2.0));
    alarmSystem.addAlarm(Alarm("PT202", "Feed Pressure Low", AlarmPriority::MEDIUM, 50.0, 5.0));
    alarmSystem.addAlarm(Alarm("FT303", "Coolant Flow Low", AlarmPriority::CRITICAL, 20.0, 1.0));
    alarmSystem.addAlarm(Alarm("LT404", "Tank Level High", AlarmPriority::LOW, 80.0, 3.0));
    
    // Print initial configuration
    alarmSystem.printAllAlarms();
    
    // Simulate process values that trigger alarms
    std::cout << "Simulating process values...\n";
    alarmSystem.updateProcessValue("TT101", 155.0); // Triggers high temperature alarm
    alarmSystem.updateProcessValue("FT303", 15.0);  // Triggers critical flow alarm
    
    // Print alarm summary
    alarmSystem.printAlarmSummary();
    
    // Acknowledge an alarm
    alarmSystem.acknowledgeAlarm("TT101");
    
    // Return to normal for acknowledged alarm
    alarmSystem.updateProcessValue("TT101", 145.0);
    
    // Shelve an alarm
    alarmSystem.shelveAlarm("FT303");
    
    // Print final alarm summary
    alarmSystem.printAlarmSummary();
    
    return 0;
}