// This file defines the types used in the application, such as interfaces or constants that represent different ISA types.

const ISA_TYPES = {
    INPUT: 'input',
    OUTPUT: 'output',
    PROCESS: 'process',
};

const ISA_TYPE_DESCRIPTIONS = {
    [ISA_TYPES.INPUT]: 'Represents an input type in the ISA.',
    [ISA_TYPES.OUTPUT]: 'Represents an output type in the ISA.',
    [ISA_TYPES.PROCESS]: 'Represents a processing type in the ISA.',
};

export { ISA_TYPES, ISA_TYPE_DESCRIPTIONS };