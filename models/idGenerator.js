class IdGenerator{
    constructor(){
        this.id = 1;
    }

    getNextId(){
        return this.id++;
    }
}

module.exports = IdGenerator;