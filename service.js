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

app.patch("/api/artists/:id/",(req, res) => {
    
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

app.listen(PORT,()=>{
    console.log('Server on port ', PORT);
});