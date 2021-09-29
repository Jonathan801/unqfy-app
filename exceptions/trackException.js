function TrackException(message){
    this.message  = message;
    this.name = "Track Exception";
}

function ThereIsNoTrack(message){
    this.message  = message;
    this.name = "ThereIsNoTrack";
}

TrackException.prototype.toString = function() {
    return `${this.name}: "${this.message}"`;
  };

  module.exports = {
      TrackException,
      ThereIsNoTrack
  };