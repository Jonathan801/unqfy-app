function TrackException(message){
    this.message  = message;
    this.name = "Track Exception";
}

TrackException.prototype.toString = function() {
    return `${this.name}: "${this.message}"`;
  }

  module.exports = TrackException;