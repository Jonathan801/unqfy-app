const idGenerator = require("./idGenerator");
//let idGen = new idGenerator();


class User{
    constructor(name){
        this.name = name;
        this.tracksListened = [];
        this.id = idGenerator.getNextIdUser();
    }

    listenTrack(track){
        this.tracksListened.push(track);
    }

    differentsTracksListened(){ // differentsTracksListened()
        return [...new Set(this.tracksListened)];
    }

    amountTrackListened(track){
        return this.tracksListened.reduce((acumulattor,elem) => acumulattor + (elem === track ? 1 : 0),0);
    }
}

module.exports = User;