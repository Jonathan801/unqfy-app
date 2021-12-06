class Subject{

    constructor(observers = []){
      this.observers = observers; //loggly,newsletter
    }
  
    changed(aspect,data){
      this.observers.forEach(elem => elem.update(aspect,data));
    }
  
    subscribe(observer) {
      this.observers.push(observer);
    } 
  
    unsubscribe(observer) {
      this.observers = this.observers.filter(obs => obs === observer);
    }
}

module.exports = Subject;