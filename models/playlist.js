class Playlist {
    constructor(id, name, genresToInclude, maxDuration) {
        this.id = id
        this.name = name
        this.genresToInclude = genresToInclude
        this.maxDuration = maxDuration
        this.tracks = []
    }

    duration() {
    // * un metodo duration() que retorne la duración de la playlist.
        // return this.tracks.reduce((accumulator, current) => {
        //     return accumulator + current.duration
        // }, 0)
        return this.maxDuration;
    }

    hasTrack(aTrack) {
    // * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
        let findTrack = this.tracks.find(track => (track.id === aTrack.id) && (track.name === aTrack.name))
        return findTrack !== undefined;
    }

    removeTrack(aTrack) {
        this.tracks = this.tracks.filter(track => (track.name !== aTrack.name) && (track.id !== aTrack.id));
        return this.tracks;
    }
}

module.exports = Playlist