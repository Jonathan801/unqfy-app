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
        const tracksWithoutRepeat = this.tracksListened.filter( (ele,pos)=> this.tracksListened.indexOf(ele) === pos);
        return tracksWithoutRepeat;
    }

    amountTrackListened(track){
        return this.tracksListened.reduce((acumulattor,elem) => acumulattor + (elem === track ? 1 : 0),0);
    }
}

module.exports = User;