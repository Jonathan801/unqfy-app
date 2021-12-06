const express = require('express');
const errorsAPI = require("../exceptions/apiExeptions");
const newsletter = require("./newsletterController");
const errorHandler = require("../controller/errorHandler");
const app = express();
const api = express.Router();

const PORT = process.env.PORT || 5001;

api.post("/api/subscribe",newsletter.suscribe);
api.post("/api/unsubscribe",newsletter.unsubscribe);
api.post("/api/notify",newsletter.notify);
api.get( "/api/subscriptions",newsletter.getSubscribersOfArtist);
api.delete('/api/subscription', newsletter.deleteSubscriptions);

api.all('*', (_req, res) => {
    throw new errorsAPI.InvalidURL();
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(api);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log('Server on port ', PORT);
});