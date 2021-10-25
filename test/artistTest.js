const assert = require('chai').assert;
const libunqfy = require('../unqfy');
const idGenerator = require("../models/idGenerator");

function createAndAddArtist(unqfy, artistName, country) {
    let artist;
    try {
       artist = unqfy.addArtist({ name: artistName, country: country });
    } catch (error) {
      console.log('error method runned: ', error.name, error.message);
      console.log(error.stack);
      throw new exceptionsArt.ArtistWithSameName(`The artist ${artistName} already existed.`);
    }
    return artist;
}

function createAndAddAlbum(unqfy, artistId, albumName, albumYear) {
    return unqfy.addAlbum(artistId, { name: albumName, year: albumYear });
}

describe('Add, remove and filter data to ARTIST', () => {
    let unqfy = null;
    let artistTest = null;
  
    beforeEach(() => {
      unqfy = new libunqfy.UNQfy();
      idGenerator.resetIDs();
  
      // It is not added to UNQfy then it has no ID (dict)
      artistTest = { name: 'Guns n\' Roses', country: 'USA' };
    });

    it('should add an ARTIST', () => {
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    
        assert.equal(artist.name, 'Guns n\' Roses');
        assert.equal(artist.country, 'USA');
    
    });

    it('should add an Artist with Album', () => {
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);

        assert.equal(album.name, 'Appetite for Destruction');
        assert.equal(album.year, 1987);
        assert.isNotEmpty(artist.albums, 'otherwise is empty')
    });
});