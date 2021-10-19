const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy
const express = require('express');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const PORT = process.env.PORT || 5000;

function getUNQfy(filename = 'data.json') {
    let unqfy = new unqmod.UNQfy();
    if (fs.existsSync(filename)) {
      unqfy = unqmod.UNQfy.load(filename);
    }
    return unqfy;
}
  
function saveUNQfy(unqfy, filename = 'data.json') {
    unqfy.save(filename);
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get("/api/artists/:id/",(req, res) => {
    const idArtist = Number(req.params.id);
    const unqfy = getUNQfy();
    try{
        res.status(200).json(unqfy.getArtistById(idArtist));    
    }catch(error){
        throw new Error("Not Found");
    }
});

app.get("/api/artists/",(req, res) => {
    const name = req.query.name;
    const unqfy = getUNQfy();
    if(name){
        res.status(200).json(unqfy.matchingPartialByArtist(name));    
    }else{
        res.status(200).json(unqfy.getArtists());
    }
});

app.patch("/api/artists/:id",(req, res) => {
    const idArtist = Number(req.params.id);
    const unqfy = getUNQfy();
    try{
        const artist =unqfy.getArtistById(idArtist);
        artist.update(req.body);
        saveUNQfy(unqfy);
        res.status(200).json(artist);    
    }catch(error){
        throw new Error("Not Found");
    }
});


app.post("/api/artists",(req, res) => {
    const unqfy = getUNQfy();
    try{
        const name = req.body.name;
        const country = req.body.country;
        if((name && country)){
            const artist = unqfy.addArtist({name:name,country:country});
            saveUNQfy(unqfy);
            res.status(201).json(artist);
        }else{
            throw new Error("Not Found");
        }
    }catch(error){
        res.status(400).json(error);
    }
});

app.delete("/api/artists/:id",(req,res) =>{
    const idArtist = Number(req.params.id);
    const unqfy = getUNQfy();
    try{
        unqfy.removeArtist(idArtist);
        saveUNQfy(unqfy);
        res.status(204);
    }catch(error){
        throw new Error("Not Found");
    }
});

app.listen(PORT,()=>{
    console.log('Server on port ', PORT);
});