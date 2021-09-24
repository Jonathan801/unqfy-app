const idGenerator = require("./idGenerator");
let idGen = new idGenerator();


class User{
    constructor(name){
        this.name = name;
        this.tracksListened = [];
        this.id = idGen.getNextId();
    }

    listenTrack(track){
        this.tracksListened.push(track);
    }

    tracksListenedWithoutRepeat(){
        return [...new Set(this.tracksListened)];
    }

    amountTrackListened(track){
        return this.tracksListened.reduce((acumulattor,elem) => acumulattor + (elem === track ? 1 : 0),0);
    }
}

module.exports = User;