let rp = require('request-promise');

const BASE_URL = 'http://api.musixmatch.com/ws/1.1';

function getIdTrack(namTrack){
    let options = 
    {
        uri: BASE_URL + "/track.search",
        qs: {
        apikey: '9f82919921fd949e955479b02b6c26bc',
        q_track : namTrack,
        s_track_rating : "desc",
        
    },
    json: true, // Automatically parses the JSON string in the response
    };

    return rp.get(options)
    .then((response) =>{
        const header = response.message.header;
        const body = response.message.body;
        if (header.status_code !== 200){
            throw new Error('status code != 200');
        }
        return body.track_list[0].track.track_id;
    })
    .then(id =>{
        return lyricsForTrack(id);
    })
    .catch((error) => {
        console.log('algo salio mal', error);
    });
}

function lyricsForTrack(idTrack){
    let options = 
    {
        uri: BASE_URL + "/track.lyrics.get",
        qs: {
        apikey: '9f82919921fd949e955479b02b6c26bc',
        track_id : idTrack,
    },
    json: true, // Automatically parses the JSON string in the response
    };
    return rp.get(options)
    .then(response => {
        const header = response.message.header;
        const body = response.message.body;
        if (header.status_code !== 200){
            throw new Error('status code != 200');
        }
        return body.lyrics.lyrics_body;
    })
    .catch((error) => {
        console.log('algo salio mal', error);
    });
}

module.exports = getIdTrack;