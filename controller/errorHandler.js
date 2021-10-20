const apisError = require("../exceptions/apiExeptions");


function errorHandler(err, req, res, next) {
    console.error(err); // imprimimos el error en consola
    // Chequeamos que tipo de error es y actuamos en consecuencia
    if (err instanceof apisError.APIError){
      res.status(err.status);
      res.json({status: err.status, errorCode: err.errorCode});
    } else if (err.type === 'entity.parse.failed'){
      // body-parser error para JSON invalido
      res.status(err.status);
      res.json({status: err.status, errorCode: 'INVALID_JSON'});
    } else {
      res.status(500);
      res.json({status: 500, errorCode: 'INTERNAL_SERVER_ERROR'});  
      next(err);
    }
 }

 module.exports = errorHandler;