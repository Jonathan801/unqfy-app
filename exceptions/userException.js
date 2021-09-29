function UserException(user){
    this.message  = "The user ", + user + "already existed";
    this.name = "User Exception";
}

UserException.prototype.toString = function() {
    return `${this.name}: "${this.message}"`;
};

module.exports ={
    UserException
};