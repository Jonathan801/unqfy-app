let accessToken = require("../spotifyCreds.json");
let token = accessToken.access_token;
let rp = require('request-promise');

function getIdArtistSpotifyByName(name){
    const options = {
        url: `https://api.spotify.com/v1/search?q=${name}&type=artist`,
        headers: { Authorization: `Bearer ${token}` },
        json: true
    };

    return rp.get(options).then(result => {
        return result.artists.items[0].id;
    }).then(id => {
        return albumsArtistSpotify(id);
    }).catch(error => console.log(error.message));
}

function albumsArtistSpotify(idArtist){
    const options = {
        url: `https://api.spotify.com/v1/artists/${idArtist}/albums`,
        headers: { Authorization: `Bearer ${token}` },
        json: true
    };

    return rp.get(options).then(data => {
        return data.items;
    })
    .catch(error => console.log(error.message));
}

module.exports = getIdArtistSpotifyByName;