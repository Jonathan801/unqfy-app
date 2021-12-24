class APIError extends Error {
    constructor(name, statusCode, errorCode, message = null) {
      super(message || name);
      this.name = name;
      this.status = statusCode;
      this.errorCode = errorCode;
      this.message = message;
    }
 }
 
 class InvalidInputError extends APIError {
    constructor() {
      super('InvalidInputError', 400, 'INVALID_INPUT_DATA');
    }  
 }

 class NotFound extends APIError{
  constructor(message){
      super('NotFound',404,'RESOURCE_NOT_FOUND', message);
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

class RelatedSourceNotFound extends APIError{
  constructor(){
    super('RelatedSourceNotFound', 404, 'RELATED_RESOURCE_NOT_FOUND');
  } 
}

class InternalServerError extends APIError {
  constructor() {
      super('InternalServerError', 500, 'INTERNAL_SERVER_ERROR');
  }
}

module.exports = {
   APIError,
   InvalidInputError,
   NotFound,
   InvalidURL,
   JSONException,
   AlreadyExists,
   RelatedSourceNotFound,
   InternalServerError
};