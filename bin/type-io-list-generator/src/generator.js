function generateIOList(isaTypes) {
    const ioList = [];

    isaTypes.forEach(type => {
        ioList.push({
            type: type,
            inputs: [],
            outputs: []
        });
    });

    return ioList;
}

function addInput(ioList, type, input) {
    const item = ioList.find(item => item.type === type);
    if (item) {
        item.inputs.push(input);
    }
}

function addOutput(ioList, type, output) {
    const item = ioList.find(item => item.type === type);
    if (item) {
        item.outputs.push(output);
    }
}

function removeInput(ioList, type, input) {
    const item = ioList.find(item => item.type === type);
    if (item) {
        item.inputs = item.inputs.filter(i => i !== input);
    }
}

function removeOutput(ioList, type, output) {
    const item = ioList.find(item => item.type === type);
    if (item) {
        item.outputs = item.outputs.filter(o => o !== output);
    }
}

module.exports = {
    generateIOList,
    addInput,
    addOutput,
    removeInput,
    removeOutput
};