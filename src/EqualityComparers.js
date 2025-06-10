import {
  isArray,
  isIterable,
  isPrimitive,
  isNullOrEmpty,
  isObject,
  isString,
  isFunction,
  isBool,
} from "@locustjs/base";
import EqualityComparer from "./EqualityComparer";
import {
  ScalerEqualityComparerType,
  FunctionEqualityComparerType,
} from "./enums";
import EqualityComparerOptions from "./EqualityComparerOptions";

class BaseEqualityComparer extends EqualityComparer {
  constructor(options, prop) {
    if (isFunction(options)) {
      super({ [prop]: options });
    } else {
      super(options);
    }
  }
  _init(arr, itr, obj) {
    if (!this._initialized) {
      this._arrayEqualityComparer =
        arr || new ArrayEqualityComparer(this.options);
      this._iterableEqualityComparer =
        itr || new IterableEqualityComparer(this.options);
      this._objectEqualityComparer =
        obj || new ObjectEqualityComparer(this.options);

      this._initialized = true;
    }
  }
  _equals(a, b) {
    let result = false;

    do {
      if (isObject(a) || isObject(b)) {
        if (this.options.object == "ref") {
          if (a !== b) {
            break;
          }
        }
        if (!this._objectEqualityComparer.equals(a, b)) {
          break;
        }
      } else if (isArray(a) || isArray(b)) {
        if (this.options.array == "ref") {
          if (a !== b) {
            break;
          }
        }
        if (!this._arrayEqualityComparer.equals(a, b)) {
          break;
        }
      } else if (isPrimitive(a) || isPrimitive(b)) {
        if (this.options.primitive == "loose") {
          if (!EqualityComparer.Primitive.Loose.equals(a, b)) {
            break;
          }
        } else {
          if (!EqualityComparer.Primitive.Tight.equals(a, b)) {
            break;
          }
        }
      } else if (isNullOrEmpty(a) || isNullOrEmpty(b)) {
        if (this.options.null == "loose") {
          if (!EqualityComparer.Null.Loose.equals(a, b)) {
            break;
          }
        } else {
          if (!EqualityComparer.Null.Tight.equals(a, b)) {
            break;
          }
        }
      } else if (isIterable(a) || isIterable(b)) {
        if (!this._iterableEqualityComparer.equals(a, b)) {
          break;
        }
      } else if (isFunction(a) || isFunction(b)) {
        if (!this._functionEqualityComparer.equals(a, b)) {
          break;
        }
      }

      result = true;
    } while (false);

    return result;
  }
}

class NullOrEmptyEqualityComparer extends EqualityComparer {
  constructor(options) {
    if (isFunction(options)) {
      super({ null: options });
    } else {
      if (isString(options)) {
        super({ null: ScalerEqualityComparerType.getString(options) });
      }

      super(options);
    }
  }
  equals(x, y) {
    if (isFunction(this.options.null)) {
      return this.options.null(x, y);
    }

    if (this.options.null == "loose") {
      return isNullOrEmpty(x) && isNullOrEmpty(y);
    }

    return x === y && isNullOrEmpty(x) && isNullOrEmpty(y);
  }
}

class ArrayEqualityComparer extends BaseEqualityComparer {
  constructor(options) {
    super(options, "array");
  }
  equals(arrA, arrB) {
    let result = false;

    this._init(this, null, null);

    if (isFunction(this.options.array)) {
      return this.options.array(arrA, arrB);
    }

    if (isArray(arrA) && isArray(arrB) && arrA.length === arrB.length) {
      let i = 0;

      for (let index = 0; index < arrA.length; index++) {
        const a = arrA[index];
        const b = arrB[index];

        if (!this._equals(a, b)) {
          break;
        }

        i++;
      }

      result = i == arrA.length;
    }

    return result;
  }
}

class PrimitiveEqualityComparer extends BaseEqualityComparer {
  constructor(options) {
    super(options, "primitive");
  }
  equals(x, y) {
    if (isFunction(this.options.primitive)) {
      return this.options.primitive(x, y);
    }

    // string is an exception among primitive types
    if (isString(x) && isString(y)) {
      if (this.options.string == "ordinal") {
        if (this.options.primitive == "loose") {
          return EqualityComparer.String.LooseOrdinal.equals(x, y);
        } else {
          return EqualityComparer.String.TightOrdinal.equals(x, y);
        }
      } else {
        if (this.options.primitive == "loose") {
          return EqualityComparer.String.LooseIgnoreCase.equals(x, y);
        } else {
          return EqualityComparer.String.TightIgnoreCase.equals(x, y);
        }
      }
    }

    if (isBool(x) || isBool(y)) {
      return this.options.primitive == "tight"
        ? x == y
        : x.toString() == y.toString();
    }

    if (isPrimitive(x) && isPrimitive(y)) {
      return this.options.primitive == "tight" ? x === y : x == y;
    } else if (isNullOrEmpty(x) || isNullOrEmpty(y)) {
      if (isFunction(this.options.null)) {
        return this.options.null(x, y);
      }

      return this.options.null == "tight"
        ? x === y
        : isNullOrEmpty(x) == isNullOrEmpty(y);
    } else {
      return false;
    }
  }
}

class StringEqualityComparer extends BaseEqualityComparer {
  constructor(options) {
    super(options, "string");
  }
  equals(strA, strB) {
    if (isFunction(this.options.string)) {
      return this.options.string(strA, strB);
    }

    const isStrA = isString(strA);
    const isStrB = isString(strB);

    if (this.options.primitive == "loose") {
      // contract: we assume '' and null or '' and undefined are equal
      if (isNullOrEmpty(strA) && isNullOrEmpty(strB)) {
        return true;
      }

      if (isNullOrEmpty(strA)) {
        return isNullOrEmpty(strB);
      } else if (isNullOrEmpty(strB)) {
        return false;
      }

      return this.options.string == "ordinal"
        ? strA.toString() == strB.toString()
        : strA.toString().toLowerCase() === strB.toString().toLowerCase();
    } else {
      if (isStrA && isStrB) {
        return this.options.string == "ordinal"
          ? strA == strB
          : strA.toLowerCase() == strB.toLowerCase();
      } else {
        if (isNullOrEmpty(strA)) {
          return isNullOrEmpty(strB) && strA === strB;
        } else if (isNullOrEmpty(strB)) {
          return false;
        }
      }
    }
  }
}

class ObjectEqualityComparer extends BaseEqualityComparer {
  constructor(options) {
    super(options, "object");
  }
  equals(objA, objB) {
    let result = false;

    this._init(null, null, this);

    if (isFunction(this.options.object)) {
      return this.options.object(objA, objB);
    }

    do {
      if (!isObject(objA) || !isObject(objB)) {
        break;
      }

      const keysA = Object.keys(objA);
      const keysB = Object.keys(objB);

      if (keysA.length != keysB.length) {
        break;
      }

      let i = 0;

      for (let key of keysA) {
        if (keysB.indexOf(key) < 0) {
          break;
        }

        const a = objA[key];
        const b = objB[key];

        if (!this._equals(a, b)) {
          break;
        }

        i++;
      }

      result = i == keysA.length;
    } while (false);

    return result;
  }
}

class IterableEqualityComparer extends BaseEqualityComparer {
  constructor(options) {
    super(options, "iterable");
  }
  equals(itA, itB) {
    if (isFunction(this.options.iterable)) {
      return this.options.iterable(arrA, arrB);
    }

    if (isIterable(itA) && isIterable(itB)) {
      this._init(null, this, null);

      if (isArray(itA) && isArray(itB)) {
        return this._arrayEqualityComparer.equals(itA, itB);
      }

      while (true) {
        const currentA = itA.next();
        const currentB = itB.next();

        if (currentA.done) {
          if (currentB.done) {
            return true;
          } else {
            return false;
          }
        } else {
          if (currentB.done) {
            return false;
          } else {
            const a = currentA.value;
            const b = currentB.value;

            if (!this._equals(a, b)) {
              break;
            }
          }
        }
      }
    }

    return false;
  }
}

class FunctionEqualityComparer extends BaseEqualityComparer {
  constructor(options) {
    super(options, "function");
  }
  equals(x, y) {
    if (isFunction(this.options["function"])) {
      return this.options["function"](x, y);
    }

    if (this.options["function"] == "ignore") {
      return true;
    }

    if (isFunction(x) && isFunction(y)) {
      if (this.options["function"] == "source") {
        return x.toString() == y.toString();
      }

      return x == y;
    }

    return false;
  }
}

NullOrEmptyEqualityComparer.Loose = new NullOrEmptyEqualityComparer(false);
NullOrEmptyEqualityComparer.Tight = new NullOrEmptyEqualityComparer(true);

PrimitiveEqualityComparer.Loose = new PrimitiveEqualityComparer(false);
PrimitiveEqualityComparer.Tight = new PrimitiveEqualityComparer(true);

StringEqualityComparer.LooseOrdinal = new StringEqualityComparer({
  string: "ordinal",
  primitive: "loose",
});
StringEqualityComparer.LooseIgnoreCase = new StringEqualityComparer({
  string: "ignoreCase",
  primitive: "loose",
});
StringEqualityComparer.TightOrdinal = new StringEqualityComparer({
  string: "ordinal",
  primitive: "tight",
});
StringEqualityComparer.TightIgnoreCase = new StringEqualityComparer({
  string: "ignoreCase",
  primitive: "tight",
});

StringEqualityComparer.Ordinal = StringEqualityComparer.LooseOrdinal;
StringEqualityComparer.IgnoreCase = StringEqualityComparer.LooseIgnoreCase;

FunctionEqualityComparer.Ref = new FunctionEqualityComparer(
  FunctionEqualityComparerType.ref
);
FunctionEqualityComparer.Source = new FunctionEqualityComparer(
  FunctionEqualityComparerType.source
);
FunctionEqualityComparer.Ignore = new FunctionEqualityComparer(
  FunctionEqualityComparerType.ignore
);

ArrayEqualityComparer.LooseShape = new ArrayEqualityComparer(
  EqualityComparerOptions.LooseShape
);
ArrayEqualityComparer.TightShape = new ArrayEqualityComparer(
  EqualityComparerOptions.TightShape
);
ArrayEqualityComparer.LooseRef = new ArrayEqualityComparer(
  EqualityComparerOptions.LooseRef
);
ArrayEqualityComparer.TightRef = new ArrayEqualityComparer(
  EqualityComparerOptions.TightRef
);

ObjectEqualityComparer.LooseShape = new ObjectEqualityComparer(
  EqualityComparerOptions.LooseShape
);
ObjectEqualityComparer.TightShape = new ObjectEqualityComparer(
  EqualityComparerOptions.TightShape
);
ObjectEqualityComparer.LooseRef = new ObjectEqualityComparer(
  EqualityComparerOptions.LooseRef
);
ObjectEqualityComparer.TightRef = new ObjectEqualityComparer(
  EqualityComparerOptions.TightRef
);

IterableEqualityComparer.LooseShape = new IterableEqualityComparer(
  EqualityComparerOptions.LooseShape
);
IterableEqualityComparer.TightShape = new IterableEqualityComparer(
  EqualityComparerOptions.TightShape
);
IterableEqualityComparer.LooseRef = new IterableEqualityComparer(
  EqualityComparerOptions.LooseRef
);
IterableEqualityComparer.TightRef = new IterableEqualityComparer(
  EqualityComparerOptions.TightRef
);

export {
  BaseEqualityComparer,
  NullOrEmptyEqualityComparer,
  PrimitiveEqualityComparer,
  StringEqualityComparer,
  ObjectEqualityComparer,
  ArrayEqualityComparer,
  IterableEqualityComparer,
  FunctionEqualityComparer,
};
