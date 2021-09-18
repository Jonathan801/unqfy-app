function AlbumException(message){
    this.message  = message;
    this.name = "Album Exception";
}

AlbumException.prototype.toString = function() {
    return `${this.name}: "${this.message}"`;
  }

  module.exports = AlbumException;