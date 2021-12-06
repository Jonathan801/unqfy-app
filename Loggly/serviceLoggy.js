const express = require('express');
const errorsAPI = require("../exceptions/apiExeptions");
const loggly = require("./LogglyController");
const errorHandler = require("../controller/errorHandler");
const app = express();
const api = express.Router();

const PORT = process.env.PORT || 5002;


api.post('/api/loggly/event',loggly.addEvent);
api.post('/api/loggly/activate',loggly.activateLoggy);
api.post('/api/loggly/desactivate',loggly.desactivateLoggy);
api.get('/api/loggly/state',loggly.stateLoggly);

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