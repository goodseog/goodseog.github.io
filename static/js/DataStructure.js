export class Queue {
  constructor(maxSize){
    this.maxSize = maxSize || 100;
    this._arr = []
  }

  enqueue(item){
    this._arr.push(item);
  }

  dequeue(){
    return this._arr.shift();
  }

  get(idx){
    return idx === undefined ? this._arr : this._arr[idx];
  }
}