class IdGenerator{
    constructor(){
        this.id = 1;
    }

    getNextId(){
        this.id++;
        return this.id-1;
    }
}

module.exports = IdGenerator;