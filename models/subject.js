class Subject {

    constructor(observers = []) {
      this.observers = observers;
    }
  
    changed(event, data) {
      this.observers.forEach(elem => elem.update(event, data));
    }
  
    subscribe(observer) {
      this.observers.push(observer);
    } 
  
    unsubscribe(observer) {
      this.observers = this.observers.filter(obs => obs === observer);
    }
}

module.exports = Subject;