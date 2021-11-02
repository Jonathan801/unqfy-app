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

class TrackWithSameName extends Error {
    constructor(message) {
        super(message);
        this.name = 'TrackWithSameName';
    }
}

class TrackIdDoesNotExist extends Error {
    constructor(message) {
        super(message);
        this.name = 'TrackIdDoesNotExist';
    }
}

  module.exports = {
      TrackException,
      ThereIsNoTrack,
      TrackWithSameName,
      TrackIdDoesNotExist
  };