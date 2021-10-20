const express = require('express');
const artist = require("./controller/artistController");
const album = require("./controller/albumController");
const errorHandler = require("./controller/errorHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/api/artists",artist);
app.use("/api/albums",album);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log('Server on port ', PORT);
});