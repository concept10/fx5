function validateInput(input) {
    // Check if the input is valid (e.g., not null, not empty)
    if (!input || typeof input !== 'string') {
        throw new Error('Invalid input: Input must be a non-empty string.');
    }
    return true;
}

function formatIOList(ioList) {
    // Format the IO list for display or further processing
    return ioList.map(item => `IO Item: ${item}`).join('\n');
}

function generateUniqueId() {
    // Generate a unique identifier for each IO item
    return `id_${Math.random().toString(36).substr(2, 9)}`;
}

export { validateInput, formatIOList, generateUniqueId };