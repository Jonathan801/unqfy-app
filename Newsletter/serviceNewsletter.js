const express = require('express');
const errorHandler = require("../controller/errorHandler");
const errorsAPI = require("../exceptions/apiExeptions");
const newsletter = require("../controller/newsletterController");
const app = express();
const api = express.Router();


api.post("/api/subscribe",newsletter.suscribe);
api.post("/api/unsubscribe",newsletter.unsubscribe);
api.get( "/api/subscriptions",newsletter.getSubscribersOfArtist);
api.delete('/api/subscription', newsletter.deleteSubscriptions);
api.post("/api/notify",newsletter.notify);

api.all('*', (_req, res) => {
    throw new errorsAPI.InvalidURL();
});

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(api);
app.use(errorHandler);
app.listen(PORT,()=>{
    console.log('Server on port ', PORT);
});