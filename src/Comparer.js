import {
  throwIfInstantiateAbstract,
  throwNotImplementedException,
} from "@locustjs/exception";

class Comparer {
  constructor() {
    throwIfInstantiateAbstract(Comparer, this);
  }
  compare(x, y) {
    throwNotImplementedException(`${this.constructor.name}.compare(x, y)`);
  }
}

export default Comparer;
