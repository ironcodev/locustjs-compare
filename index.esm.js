import {
  isArray,
  isPrimitive,
  isNullOrEmpty,
  isIterable,
  isString,
  isObject,
  isBool,
  isFunction,
} from "@locustjs/base";
import {
  throwIfInstantiateAbstract,
  throwNotImplementedException,
} from "@locustjs/exception";
import Enum from "@locustjs/enum";

const ScalerEqualityComparerType = Enum.define(
  {
    loose: 0,
    tight: 1,
  },
  "ScalerEqualityComparerType"
);

const ComplexEqualityComparerType = Enum.define(
  {
    shape: 0,
    ref: 1,
  },
  "ComplexEqualityComparerType"
);

const FunctionEqualityComparerType = Enum.define(
  {
    ref: 0,
    source: 1,
    ignore: 2,
  },
  "FunctionEqualityComparerType"
);

const EqualityComparerType = Enum.define(
  {
    looseShape: 0,
    looseRef: 1,
    tightShape: 2,
    tightRef: 3,
  },
  "EqualityComparerType"
);

const StringEqualityComparerType = Enum.define(
  {
    ordinal: 0,
    ignoreCase: 1,
  },
  "StringEqualityComparerType"
);

const EqualityComparerSymbol = Symbol();

const EqualityComparerOptions = {
  LooseShape: Object.freeze({
    [EqualityComparerSymbol]: true,
    null: "loose",
    primitive: "loose",
    string: "ordinal",
    array: "shape",
    iterable: "shape",
    object: "shape",
    function: "ref",
  }),
  TightShape: Object.freeze({
    [EqualityComparerSymbol]: true,
    null: "tight",
    primitive: "tight",
    string: "ordinal",
    array: "shape",
    iterable: "shape",
    object: "shape",
    function: "ref",
  }),
  LooseRef: Object.freeze({
    [EqualityComparerSymbol]: true,
    null: "loose",
    primitive: "loose",
    string: "ordinal",
    array: "ref",
    iterable: "ref",
    object: "ref",
    function: "ref",
  }),
  TightRef: Object.freeze({
    [EqualityComparerSymbol]: true,
    null: "tight",
    primitive: "tight",
    string: "ordinal",
    array: "ref",
    iterable: "ref",
    object: "ref",
    function: "ref",
  }),
};

class EqualityComparer {
  constructor(options) {
    throwIfInstantiateAbstract(EqualityComparer, this);

    this.options = EqualityComparer.getOptions(options);
  }
  equals(x, y) {
    throwNotImplementedException(`${this.constructor.name}.equals(x, y)`);
  }
  static getOptions(options) {
    if (options && options[EqualityComparerSymbol]) {
      return options;
    }
    // default is loose-shape
    let result = EqualityComparerOptions.LooseShape;

    if (isPrimitive(options)) {
      if (isBool(options)) {
        if (options) {
          // tight-shape
          result = EqualityComparerOptions.TightShape;
        } else {
          // default (loose-shape)
        }
      } else {
        if (isString(options)) {
          if (options == "looseshape" || options == "loose-shape") {
            options = "looseShape";
          } else if (options == "looseref" || options == "loose-ref") {
            options = "looseRef";
          } else if (options == "tightshape" || options == "tight-shape") {
            options = "tightShape";
          } else if (options == "tightref" || options == "tight-ref") {
            options = "tightShape";
          } else if (options == "loose") {
            options = "looseShape";
          } else if (options == "tight") {
            options = "tightRef";
          } else if (options == "ref") {
            options = "looseRef";
          } else if (options == "shape") {
            options = "looseShape";
          }
        }

        const type = EqualityComparerType.getNumber(
          options,
          EqualityComparerType.looseShape
        );

        switch (type) {
          case EqualityComparerType.looseShape:
            // default
            break;
          case EqualityComparerType.looseRef:
            result = EqualityComparerOptions.LooseRef;
            break;
          case EqualityComparerType.tightShape:
            result = EqualityComparerOptions.TightShape;
            break;
          case EqualityComparerType.tightRef:
            result = EqualityComparerOptions.TightRef;
            break;
        }
      }
    } else if (!isNullOrEmpty(options)) {
      result = {
        null: isFunction(options.null)
          ? options.null
          : ScalerEqualityComparerType.getString(options.null || "loose"),
        primitive: isFunction(options.primitive)
          ? options.primitive
          : ScalerEqualityComparerType.getString(options.primitive || "loose"),
        string: isFunction(options.string)
          ? options.string
          : StringEqualityComparerType.getString(options.string || "ordinal"),
        array: isFunction(options.array)
          ? options.array
          : ComplexEqualityComparerType.getString(options.array || "shape"),
        iterable: isFunction(options.iterable)
          ? options.iterable
          : ComplexEqualityComparerType.getString(options.iterable || "shape"),
        object: isFunction(options.object)
          ? options.object
          : ComplexEqualityComparerType.getString(options.object || "shape"),
        function: isFunction(options["function"])
          ? options["function"]
          : FunctionEqualityComparerType.getString(
              options["function"] || "ref"
            ),
      };
    } else {
      // default (loose-shape)
    }

    return result;
  }
}

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
        if (this.options.object == 'ref') {
          if (a !== b) {
            break;
          }
        }
        if (!this._objectEqualityComparer.equals(a, b)) {
          break;
        }
      } else if (isArray(a) || isArray(b)) {
        if (this.options.array == 'ref') {
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

      if (isNullOrEmpty(strA) || isNullOrEmpty(strB)) {
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
        return false;
      }
    }
  }
}

class PrimitiveEqualityComparer extends BaseEqualityComparer {
  constructor(options) {
    super(options, "primitive");
  }
  equals(x, y) {
    // string is an exception among primitive types

    if (isString(x) || isString(y)) {
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

    if (isPrimitive(x) && isPrimitive(y)) {
      if (isFunction(this.options.primitive)) {
        return this.options.primitive(x, y);
      }

      return this.options.primitive == "tight" ? x === y : x == y;
    } else {
      return false;
    }
  }
}

class ArrayEqualityComparer extends BaseEqualityComparer {
  constructor(options) {
    super(options, "array");
  }
  equals(arrA, arrB) {
    let result = false;

    this._init(this);

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

class IterableEqualityComparer extends BaseEqualityComparer {
  constructor(options) {
    super(options, "iterable");
  }
  equals(itA, itB) {
    if (isIterable(itA) && isIterable(itB)) {
      this._init(null, this);

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

class ObjectEqualityComparer extends BaseEqualityComparer {
  constructor(options) {
    super(options, "object");
  }
  equals(objA, objB) {
    let result = false;

    this._init(null, null, this);

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

EqualityComparer.Null = {
  Loose: new NullOrEmptyEqualityComparer(false),
  Tight: new NullOrEmptyEqualityComparer(true),
};
EqualityComparer.String = {
  LooseOrdinal: new StringEqualityComparer({
    string: "ordinal",
    primitive: "loose",
  }),
  LooseIgnoreCase: new StringEqualityComparer({
    string: "ignoreCase",
    primitive: "loose",
  }),
  TightOrdinal: new StringEqualityComparer({
    string: "ordinal",
    primitive: "tight",
  }),
  TightIgnoreCase: new StringEqualityComparer({
    string: "ignoreCase",
    primitive: "tight",
  }),
};
EqualityComparer.String.Ordinal = EqualityComparer.String.LooseOrdinal;
EqualityComparer.String.IgnoreCase = EqualityComparer.String.LooseIgnoreCase;

EqualityComparer.Primitive = {
  Loose: new PrimitiveEqualityComparer(false),
  Tight: new PrimitiveEqualityComparer(true),
};
EqualityComparer.Array = {
  LooseShape: new ArrayEqualityComparer(EqualityComparerOptions.LooseShape),
  TightShape: new ArrayEqualityComparer(EqualityComparerOptions.TightShape),
  LooseRef: new ArrayEqualityComparer(EqualityComparerOptions.LooseRef),
  TightRef: new ArrayEqualityComparer(EqualityComparerOptions.TightRef),
};
EqualityComparer.Iterable = {
  LooseShape: new IterableEqualityComparer(EqualityComparerOptions.LooseShape),
  TightShape: new IterableEqualityComparer(EqualityComparerOptions.TightShape),
  LooseRef: new IterableEqualityComparer(EqualityComparerOptions.LooseRef),
  TightRef: new IterableEqualityComparer(EqualityComparerOptions.TightRef),
};
EqualityComparer.Object = {
  LooseShape: new ObjectEqualityComparer(EqualityComparerOptions.LooseShape),
  TightShape: new ObjectEqualityComparer(EqualityComparerOptions.TightShape),
  LooseRef: new ObjectEqualityComparer(EqualityComparerOptions.LooseRef),
  TightRef: new ObjectEqualityComparer(EqualityComparerOptions.TightRef),
};

class Comparer {
  constructor() {
    throwIfInstantiateAbstract(Comparer, this);
  }
  compare(x, y) {
    throwNotImplementedException(`${this.constructor.name}.compare(x, y)`);
  }
}

class StringOrdinalComparer extends Comparer {
  compare(a, b) {
    const strA = isNullOrEmpty(a) ? "" : a.toString();
    const strB = isNullOrEmpty(b) ? "" : b.toString();

    if (strA == strB) {
      return 0;
    }
    if (strA < strB) {
      return -1;
    }

    return 1;
  }
}

class StringOrdinalIgnoreCaseComparer extends Comparer {
  compare(a, b) {
    const strA = isNullOrEmpty(a) ? "" : a.toString();
    const strB = isNullOrEmpty(b) ? "" : b.toString();

    if (strA.toLowerCase() == strB.toLowerCase()) {
      return 0;
    }
    if (strA < strB) {
      return -1;
    }

    return 1;
  }
}

const StringComparer = {
  Ordinal: new StringOrdinalComparer(),
  IgnoreCase: new StringOrdinalIgnoreCaseComparer(),
};

const isComparable = (x) => isObject(x) && typeof x.compareTo == "function";

export {
  ScalerEqualityComparerType,
  ComplexEqualityComparerType,
  FunctionEqualityComparerType,
  EqualityComparerType,
  StringEqualityComparerType,
  EqualityComparerOptions,
  EqualityComparer,
  BaseEqualityComparer,
  NullOrEmptyEqualityComparer,
  FunctionEqualityComparer,
  StringEqualityComparer,
  PrimitiveEqualityComparer,
  ArrayEqualityComparer,
  IterableEqualityComparer,
  ObjectEqualityComparer,
  Comparer,
  StringOrdinalComparer,
  StringOrdinalIgnoreCaseComparer,
  StringComparer,
  isComparable,
};
