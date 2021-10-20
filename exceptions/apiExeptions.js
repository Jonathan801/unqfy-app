class APIError extends Error {
    constructor(name, statusCode, errorCode, message = null) {
      super(message || name);
      this.name = name;
      this.status = statusCode;
      this.errorCode = errorCode;
    }
 }
 
 class InvalidInputError extends APIError {
    constructor() {
      super('InvalidInputError', 400, 'INVALID_INPUT_DATA');
    }  
 }

 class NotFound extends APIError{
  constructor(){
      super('NotFound',404,'RESOURCE_NOT_FOUND');
  }
}

class InvalidURL extends APIError {
  constructor(){
      super('InvalidURL', 404,'RESOURCE_NOT_FOUND' );
  }
}

class JSONException extends APIError {
  constructor() {
      super('JSONException', 400, 'BAD_REQUEST');
  }
}

class AlreadyExists extends APIError{
  constructor(){
      super('AlreadyExists', 409, 'RESOURCE_ALREADY_EXISTS');
  }
}

module.exports = {
   APIError,
   InvalidInputError,
   NotFound,
   InvalidURL,
   JSONException,
   AlreadyExists
}