const idGenerator = require("./idGenerator");
const getIdTrack = require("./musixmatch");


class Track{
    constructor(name, albumId, duration,genres = []){
        this.name = name;
        this.albumId = albumId;
        this.duration = duration;
        this.idTrack = idGenerator.getNextIdTrack();
        this.genres = genres;
        this.lyrics ;
    }

    getTrackById(id) {
        return this.id === id;
    }

    matchingByName(scrappyWord) {
        const reg = new RegExp(scrappyWord, 'gi');
        
        const match =  reg.exec(this.name);
        return match !== null;
    }

    matchingBy(name, durationLT, durationGT) {
        const reg = new RegExp(name, 'gi');
        
        let match =  reg.exec(this.name);

        return (match !== null) && (this.duration <= durationLT) && (this.duration >= durationGT);
    }

    anyGenre(genres){
        return genres.some(genre => this.genres.includes(genre));   
    }

    isMaxDuration(maxDuration) {
        return this.duration <= maxDuration;
    }

    async getLyrics(){ 
        try{
            if(!this.lyrics){
                console.log("No tenia la letra")
                let lytrack = await getIdTrack(this.name);
                this.lyrics = lytrack
                return this.lyrics;
            }else{
                console.log("Si las tenia");
                return this.lyrics;
            }
        }catch(error){
            console.log(error);
        }

    }

    toJSON(){
        return {
            name:this.name,
            duration:this.duration,
            album : this.albumId,
            genres:this.genres
        };
    }
}

module.exports = Track;