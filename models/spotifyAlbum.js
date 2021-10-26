let accessToken = require("../spotifyCreds");
let token = accessToken.access_token;
let rp = require('request-promise');

function getIdArtistSpotifyByName(name){
    rp.get({
        url: 'https://api.spotify.com/v1/search?q=' + name + '&type=artist',
        headers: { Authorization: 'Bearer ' + token },
        json: true
    })
    .then(result => {
        return result.artists.items[0].id;
    })
    .then(id =>{
        albumsArtistSpotify(id);
    });
}

function albumsArtistSpotify(idArtist){
    rp.get({
        url: 'https://api.spotify.com/v1/artists/' + idArtist + '/albums',
        headers: { Authorization: 'Bearer ' + token },
        json: true
    })
    .then(data => {
        console.log(data.items);
        return data.items;
    });
}
 
exports.albumByName = getIdArtistSpotifyByName;