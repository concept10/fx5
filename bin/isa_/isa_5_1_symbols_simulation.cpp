/**
 * ISA-5.1 Simulation - Instrumentation Symbols and Identification
 * This program simulates a system that represents and manages process instrumentation symbols
 */

#include <iostream>
#include <string>
#include <map>
#include <vector>

// Define symbol types according to ISA-5.1
enum class MeasurementType {
    FLOW,           // F
    TEMPERATURE,    // T
    PRESSURE,       // P
    LEVEL,          // L
    ANALYSIS        // A
};

enum class DeviceType {
    INDICATOR,      // I
    TRANSMITTER,    // T
    CONTROLLER,     // C
    VALVE,          // V
    SWITCH          // S
};

// Class representing an ISA-5.1 instrument tag
class ISATag {
private:
    std::string loopNumber;
    MeasurementType measurementType;
    DeviceType deviceType;
    bool isFieldMounted;

public:
    ISATag(MeasurementType mt, DeviceType dt, std::string loop, bool fieldMounted = true) 
        : measurementType(mt), deviceType(dt), loopNumber(loop), isFieldMounted(fieldMounted) {}

    // Generate the tag according to ISA-5.1 format
    std::string getTagString() const {
        std::string tag;
        
        // Add measurement type letter
        switch (measurementType) {
            case MeasurementType::FLOW: tag += "F"; break;
            case MeasurementType::TEMPERATURE: tag += "T"; break;
            case MeasurementType::PRESSURE: tag += "P"; break;
            case MeasurementType::LEVEL: tag += "L"; break;
            case MeasurementType::ANALYSIS: tag += "A"; break;
        }
        
        // Add device type letter
        switch (deviceType) {
            case DeviceType::INDICATOR: tag += "I"; break;
            case DeviceType::TRANSMITTER: tag += "T"; break;
            case DeviceType::CONTROLLER: tag += "C"; break;
            case DeviceType::VALVE: tag += "V"; break;
            case DeviceType::SWITCH: tag += "S"; break;
        }
        
        // Add loop number
        tag += loopNumber;
        
        return tag;
    }
    
    void displaySymbol() const {
        std::string tag = getTagString();
        std::cout << "---------------------\n";
        if (isFieldMounted) {
            std::cout << "| " << tag << " |\n";
            std::cout << "---------------------\n";
            std::cout << "| FIELD MOUNTED     |\n";
        } else {
            std::cout << "|     " << tag << "     |\n";
            std::cout << "---------------------\n";
            std::cout << "| PANEL MOUNTED    |\n";
        }
        std::cout << "---------------------\n\n";
    }
};

// Simulate P&ID diagram with instrument tags
class PIDDiagram {
private:
    std::vector<ISATag> instruments;
    std::string diagramName;

public:
    PIDDiagram(const std::string& name) : diagramName(name) {}
    
    void addInstrument(const ISATag& instrument) {
        instruments.push_back(instrument);
    }
    
    void display() const {
        std::cout << "P&ID Diagram: " << diagramName << "\n";
        std::cout << "======================================\n";
        std::cout << "Instruments according to ISA-5.1 standard:\n\n";
        
        for (const auto& instrument : instruments) {
            instrument.displaySymbol();
        }
    }
};

int main() {
    std::cout << "ISA-5.1 Instrumentation Symbols and Identification Simulation\n\n";
    
    // Create a P&ID diagram
    PIDDiagram pid("Boiler Feed Water System");
    
    // Add instruments with ISA-5.1 compliant tags
    pid.addInstrument(ISATag(MeasurementType::FLOW, DeviceType::TRANSMITTER, "101", true));
    pid.addInstrument(ISATag(MeasurementType::TEMPERATURE, DeviceType::CONTROLLER, "201", false));
    pid.addInstrument(ISATag(MeasurementType::PRESSURE, DeviceType::INDICATOR, "301", true));
    pid.addInstrument(ISATag(MeasurementType::LEVEL, DeviceType::SWITCH, "401", true));
    pid.addInstrument(ISATag(MeasurementType::FLOW, DeviceType::VALVE, "101", true));
    
    // Display the P&ID with ISA-5.1 symbols
    pid.display();
    
    return 0;
}
