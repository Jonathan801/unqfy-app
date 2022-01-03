const express = require('express');
const errorsAPI = require("../exceptions/apiExeptions");
const errorHandler = require("../controller/errorHandler");
let bodyParser = require('body-parser');

const rootApp = express();
const newsletterApp = require("./newsletterController")
const newsmod = require('./observerNewsletter.js')

const PORT = process.env.PORT || 5001;


function getNewsletter() {
    let newsletter = new newsmod.Newsletter();
    return newsletter;
}

// eslint-disable-next-line func-style
const newsletter = function (req, res, next) {
    const newsletter = getNewsletter();
    req.requestNewsletter = newsletter;
    next();
};

rootApp.use(newsletter)
rootApp.use(bodyParser.urlencoded({ extended: true }));
rootApp.use(bodyParser.json());
rootApp.use("/api", newsletterApp);
rootApp.all("*",(req,res) =>{
    throw new errorsAPI.InvalidURL();
});
rootApp.use(errorHandler);

rootApp.listen(PORT,()=>{
    console.log('Server on port ', PORT);
});