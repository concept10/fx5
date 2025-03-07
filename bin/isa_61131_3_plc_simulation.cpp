/**
 * ISA-61131-3 Simulation - PLC Programming Languages
 * This program simulates a basic PLC execution environment supporting 
 * Structured Text (ST) language as defined in ISA-61131-3
 */

#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <functional>
#include <regex>

// Simulated PLC memory and I/O
class PLCMemory {
private:
    std::map<std::string, bool> digitalInputs;
    std::map<std::string, bool> digitalOutputs;
    std::map<std::string, int> integers;
    std::map<std::string, float> reals;
    std::map<std::string, bool> booleans;

public:
    PLCMemory() {
        // Initialize default I/O
        digitalInputs["I0.0"] = false;
        digitalInputs["I0.1"] = false;
        digitalInputs["I0.2"] = false;
        
        digitalOutputs["Q0.0"] = false;
        digitalOutputs["Q0.1"] = false;
        
        // Initialize variables
        integers["Counter"] = 0;
        reals["Temperature"] = 25.0f;
        booleans["MotorRunning"] = false;
    }
    
    void setDigitalInput(const std::string& name, bool value) {
        digitalInputs[name] = value;
    }
    
    bool getDigitalInput(const std::string& name) const {
        auto it = digitalInputs.find(name);
        return (it != digitalInputs.end()) ? it->second : false;
    }
    
    void setDigitalOutput(const std::string& name, bool value) {
        digitalOutputs[name] = value;
    }
    
    bool getDigitalOutput(const std::string& name) const {
        auto it = digitalOutputs.find(name);
        return (it != digitalOutputs.end()) ? it->second : false;
    }
    
    void setInteger(const std::string& name, int value) {
        integers[name] = value;
    }
    
    int getInteger(const std::string& name) const {
        auto it = integers.find(name);
        return (it != integers.end()) ? it->second : 0;
    }
    
    void setReal(const std::string& name, float value) {
        reals[name] = value;
    }
    
    float getReal(const std::string& name) const {
        auto it = reals.find(name);
        return (it != reals.end()) ? it->second : 0.0f;
    }
    
    void setBoolean(const std::string& name, bool value) {
        booleans[name] = value;
    }
    
    bool getBoolean(const std::string& name) const {
        auto it = booleans.find(name);
        return (it != booleans.end()) ? it->second : false;
    }
    
    void displayState() const {
        std::cout << "PLC State:\n";
        std::cout << "Digital Inputs:\n";
        for (const auto& input : digitalInputs) {
            std::cout << "  " << input.first << ": " << (input.second ? "ON" : "OFF") << "\n";
        }
        
        std::cout << "Digital Outputs:\n";
        for (const auto& output : digitalOutputs) {
            std::cout << "  " << output.first << ": " << (output.second ? "ON" : "OFF") << "\n";
        }
        
        std::cout << "Variables:\n";
        for (const auto& var : integers) {
            std::cout << "  INT " << var.first << ": " << var.second << "\n";
        }
        for (const auto& var : reals) {
            std::cout << "  REAL " << var.first << ": " << var.second << "\n";
        }
        for (const auto& var : booleans) {
            std::cout << "  BOOL " << var.first << ": " << (var.second ? "TRUE" : "FALSE") << "\n";
        }
    }
};

// Simplified ST interpreter for ISA-61131-3
class STInterpreter {
private:
    PLCMemory& memory;

public:
    STInterpreter(PLCMemory& mem) : memory(mem) {}
    
    // Execute a Structured Text program (simplified interpretation)
    void executeSTProgram(const std::vector<std::string>& program) {
        std::cout << "Executing Structured Text Program:\n";
        
        for (const auto& line : program) {
            std::cout << "  " << line << "\n";
            
            // Very simplified interpreter - just handle basic assignment and IF statements
            if (line.find("IF") != std::string::npos) {
                handleIfStatement(line);
            }
            else if (line.find(":=") != std::string::npos) {
                handleAssignment(line);
            }
        }
        
        std::cout << "Program execution completed\n\n";
    }
    
private:
    void handleAssignment(const std::string& line) {
        size_t assignPos = line.find(":=");
        if (assignPos != std::string::npos) {
            std::string varName = line.substr(0, assignPos);
            std::string valueStr = line.substr(assignPos + 2);
            
            // Remove spaces, semicolons
            varName.erase(std::remove_if(varName.begin(), varName.end(), 
                           [](unsigned char c) { return std::isspace(c); }), varName.end());
            valueStr.erase(std::remove_if(valueStr.begin(), valueStr.end(), 
                           [](unsigned char c) { return std::isspace(c) || c == ';'; }), valueStr.end());
            
            // Check if it's a digital output
            if (varName.substr(0, 1) == "Q") {
                memory.setDigitalOutput(varName, valueStr == "TRUE" || valueStr == "1");
            }
            // Otherwise treat as variable
            else if (valueStr == "TRUE" || valueStr == "FALSE") {
                memory.setBoolean(varName, valueStr == "TRUE");
            }
            else if (valueStr.find('.') != std::string::npos) {
                memory.setReal(varName, std::stof(valueStr));
            }
            else {
                try {
                    memory.setInteger(varName, std::stoi(valueStr));
                } catch (...) {
                    // Handle variable references or expressions (simplified)
                    if (valueStr.substr(0, 1) == "I") {
                        memory.setBoolean(varName, memory.getDigitalInput(valueStr));
                    }
                }
            }
        }
    }
    
    void handleIfStatement(const std::string& line) {
        // This is a very simplified interpretation - just for demonstration
        if (line.find("I0.0") != std::string::npos && memory.getDigitalInput("I0.0")) {
            // Execute the "then" part - here we just set Q0.0 to match I0.0
            memory.setDigitalOutput("Q0.0", true);
        }
        else if (line.find("I0.1") != std::string::npos && memory.getDigitalInput("I0.1")) {
            // Another condition - set Q0.1 to match I0.1
            memory.setDigitalOutput("Q0.1", true);
        }
    }
};

// Main PLC simulation program
int main() {
    std::cout << "ISA-61131-3 PLC Programming Languages Simulation\n";
    std::cout << "================================================\n\n";
    
    // Create PLC memory
    PLCMemory plcMemory;
    
    // Set some digital inputs
    plcMemory.setDigitalInput("I0.0", true);   // Input 0.0 is ON
    plcMemory.setDigitalInput("I0.1", false);  // Input 0.1 is OFF
    
    // Display initial state
    std::cout << "Initial State:\n";
    plcMemory.displayState();
    std::cout << "\n";
    
    // Create a Structured Text interpreter
    STInterpreter stInterpreter(plcMemory);
    
    // Create a simple Structured Text program
    std::vector<std::string> stProgram = {
        "// Motor control program in Structured Text",
        "MotorRunning := FALSE;",
        "IF I0.0 THEN",
        "    Q0.0 := TRUE;    // Start motor if input I0.0 is active",
        "    MotorRunning := TRUE;",
        "ELSE",
        "    Q0.0 := FALSE;   // Stop motor",
        "    MotorRunning := FALSE;",
        "END_IF;",
        "",
        "Counter := Counter + 1;  // Increment cycle counter",
        "Temperature := 25.5;     // Set temperature reference"
    };
    
    // Execute the ST program
    stInterpreter.executeSTProgram(stProgram);
    
    // Display final state
    std::cout << "Final State:\n";
    plcMemory.displayState();
    
    return 0;
}
