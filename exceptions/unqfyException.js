class ArtistWithAlbumIdNotExist extends Error {
    constructor(message) {
        super(message);
        this.name = 'ArtistWithAlbumIdNotExist';
    }
}

class PlaylistWithAlbumIdNotExist extends Error {
    constructor(message) {
        super(message);
        this.name = 'PlaylistWithAlbumIdNotExist';
    }
}

  module.exports = { 
    ArtistWithAlbumIdNotExist,
    PlaylistWithAlbumIdNotExist
};