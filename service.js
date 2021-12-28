const express = require('express');
let bodyParser = require('body-parser');
const artistApp = require("./controller/artistController");
const albumApp = require("./controller/albumController");
const trackApp = require("./controller/trackController");
const playlistsApp = require("./controller/playlistController.js");
const errorHandler = require("./controller/errorHandler");
const errorsAPI = require("./exceptions/apiExeptions");
const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy
const LogglyApp = require("./Loggly/observerLoggy");
const loggly = new LogglyApp();
const Newsletter = require("./Newsletter/observerNewsletter");
const newsletter = new Newsletter();

const rootApp = express();

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
  
rootApp.use(unqfy);
rootApp.use(bodyParser.urlencoded({ extended: true }));
rootApp.use(bodyParser.json());
rootApp.use("/api", artistApp, albumApp, trackApp, playlistsApp);
rootApp.all("*",(req,res) =>{
    throw new errorsAPI.InvalidURL();
});
rootApp.use(errorHandler);

const PORT = process.env.PORT || 5000;

rootApp.listen(PORT,()=>{
    console.log('Server on port ', PORT);
});