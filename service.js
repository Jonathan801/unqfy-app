const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy
const express = require('express');

const artist = require("./controller/artistController");
const errorHandler = require("./controller/errorHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/api/artists",artist);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log('Server on port ', PORT);
});