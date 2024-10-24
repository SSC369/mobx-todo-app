import { makeAutoObservable } from "mobx";

class Counter {
  count = 0;
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  addCount() {
    console.log(this);
    this.count += 1;
  }
  subCount() {
    this.count -= 1;
  }
  get countValue() {
    return this.count;
  }
}

const counterStore = new Counter();

export default counterStore;
