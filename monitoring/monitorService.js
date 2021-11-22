const express = require('express');
const errorHandler = require("../controller/errorHandler");
const errorsAPI = require("../exceptions/apiExeptions");
const monitor = require("./monitorController");
const app = express();
const api = express.Router();

const seconds = 5

api.get("/api/status",monitor.status);
setInterval(() => {
    api.get("/api/is-alive",monitor.isAlive);
}, seconds * 1000)
api.post( "/api/active",monitor.deactive);
api.post('/api/deactive', monitor.active);

api.all('*', (_req, res) => {
    throw new errorsAPI.InvalidURL();
});

const PORT = process.env.PORT || 5007;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(api);
app.use(errorHandler);
app.listen(PORT,()=>{
    console.log('Server on port ', PORT);
});