let rp = require('request-promise');
const apiKey = require("../musixmatchCreds.json");

const BASE_URL = 'http://api.musixmatch.com/ws/1.1';

function getIdTrack(namTrack){
    let options = {
        uri: `${BASE_URL}/track.search`,
        qs: {
        apikey: apiKey.access_token,
        q_track : namTrack,
        s_track_rating : "desc"
    },
        json: true
    };

    return rp.get(options).then( response => {
        const header = response.message.header;
        const body = response.message.body;
        if (header.status_code !== 200){
            throw new Error('status code != 200');
        }
        return body.track_list[0].track.track_id;
    }).then( id => {
        return lyricsForTrack(id);
    }).catch((error) => { console.log(error) });
}

function lyricsForTrack(idTrack){
    let options = {
        uri: `${BASE_URL}/track.lyrics.get`,
        qs: {
        apikey: apiKey.access_token,
        track_id : idTrack,
    },
        json: true
    };

    return rp.get(options).then(response => {
        const header = response.message.header;
        const body = response.message.body;
        if (header.status_code !== 200){
            throw new Error('status code != 200');
        }
        return body.lyrics.lyrics_body;
    }).catch((error) => { console.log(error) });
}

module.exports = getIdTrack;