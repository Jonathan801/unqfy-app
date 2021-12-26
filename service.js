const express = require('express');
const artist = require("./controller/artistController");
const album = require("./controller/albumController");
const track = require("./controller/trackController");
const playlists = require("./controller/playlistController.js");
const errorHandler = require("./controller/errorHandler");
const errorsAPI = require("./exceptions/apiExeptions");
const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy
const LogglyApp = require("./Loggly/observerLoggy");
const loggly = new LogglyApp();
const Newsletter = require("./Newsletter/observerNewsletter");
const newsletter = new Newsletter();

const app = express();

function getUNQfy(filename = 'data.json') {
    let unqfy = new unqmod.UNQfy([loggly,newsletter]);
    if (fs.existsSync(filename)) {
      unqfy = unqmod.UNQfy.load(filename);
    }
    return unqfy;
}

// eslint-disable-next-line func-style
const unqfy = function (req, res, next) {
    const unqfy = getUNQfy();
    req.requestUnqfy = unqfy;
    next();
};
  
app.use(unqfy);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use( function (req, res, next) {
    req.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    next()
})
app.use("/api/artists",artist);
app.use("/api/albums",album);
app.use("/api/tracks",track);
app.use("/api/playlists", playlists);
app.all("*",(req,res) =>{
    throw new errorsAPI.InvalidURL();
});
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log('Server on port ', PORT);
});