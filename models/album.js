class Album {
    constructor(id, artistId, name, year) {
        this.id = id
        this.artist = artistId
        this.name = name
        this.year = year
        this.tracks = []
    }
}

module.exports = Album