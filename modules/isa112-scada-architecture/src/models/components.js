class Component {
    constructor(id, type, status) {
        this.id = id;
        this.type = type;
        this.status = status;
    }

    getDetails() {
        return {
            id: this.id,
            type: this.type,
            status: this.status
        };
    }
}

export default Component;