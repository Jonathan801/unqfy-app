class IdGenerator {
    constructor(){
        this.idArtist = 1;
        this.idAlbum = 1;
        this.idTrack = 1;
        this.idUser = 1;

        if(typeof IdGenerator.instance === "object"){
            return IdGenerator.instance;
        }

        IdGenerator.instance = this;
        return this;
    }

    getNextIdArtist(){
        return this.idArtist++;
    }
    getNextIdAlbum(){
        return this.idAlbum++;
    }
    getNextIdTrack(){
        return this.idTrack++;
    }
    getNextIdUser(){
        return this.idUser++;
    }

    resetIDs(){
        this.idArtist = 1;
        this.idAlbum = 1;
        this.idTrack = 1;
        this.idUser = 1;
    }
}


const idGen1 = new IdGenerator();

module.exports = idGen1;