import { isArray, isPrimitive, isEmpty, isNullOrEmpty, isFunction, isIterable, isString, isNull, isObject } from '@locustjs/base';

class EqualityComparer {
  constructor() {
    if (this.constructor === EqualityComparer) {
      throw `Cannot instantiate from abstract class EqualityComparer`
    }
  }
  equals(x, y) {
    throw `${this.constructor.name}.equals() is not implemented`
  }
}

class NullOrEmptyEqualityComparer extends EqualityComparer {
  equals(x, y) {
    if (isNullOrEmpty(x)) {
      if (isNullOrEmpty(y)) {
        return true;
      } else {
        return false;
      }
    } else {
      if (isNullOrEmpty(y)) {
        return false;
      } else {
        return true;
      }
    }
  }
}

class NullOrUndefinedEqualityComparer extends EqualityComparer {
  equals(x, y) {
    if (isNull(x)) {
      if (isNull(y)) {
        return true;
      } else {
        return false;
      }
    } else {
      if (isNull(y)) {
        return false;
      } else {
        return true;
      }
    }
  }
}

class BaseEqualityComparer extends EqualityComparer {
  constructor(compareOptions) {
    super();

    if (this.constructor === BaseEqualityComparer) {
      throw `Cannot instantiate from abstract class BaseEqualityComparer`
    }

    this.options = Object.assign({
      primitives: 'strict',
      arrays: 'by-shape',
      iterators: 'by-shape',
      objects: 'by-shape',
      undefinedAsNull: true
    }, compareOptions);
  }
  _equals(x, y) {
    throw `${this.constructor.name}._equals() is not implemented`
  }
  equals(x, y) {
    if (EqualityComparer.Null.equals(x, y)) {
      return true;
    } else {
      return this._equals(x, y);
    }
  }
}

class DefaultEqualityComparer extends EqualityComparer {
  equals(x, y) {
    return this.strict ? x === y : x == y;
  }
}

class PrimitiveEqualityComparer extends BaseEqualityComparer {
  _equals(x, y) {
    // string is an exception among primitive types
    if (isString(x) || isString(y)) {
      if (StringComparer.getEqualityComparer(this.strict).equals(x, y)) {
        return true;
      }
    }

    if (isPrimitive(x) && isPrimitive(y)) {
      return this.strict ? x === y : x == y;
    } else {
      return false;
    }
  }
}

class StringEqualityComparer extends BaseEqualityComparer {
  _equals(strA, strB) {
    const isStrA = isString(strA);
    const isStrB = isString(strB);

    // contract: we presume '' and null or '' and undefined are equal

    if (isStrA && strA.length === 0 && isNull(strB)) {
      return true;
    }
    if (isStrB && strB.length === 0 && isNull(strA)) {
      return true;
    }

    if (isStrA && isStrB) {
      return this.strict ? strA === strB : strA.toLowerCase() === strB.toLowerCase();
    } else {
      return false;
    }
  }
}

class ArrayEqualityComparer extends BaseEqualityComparer {
  _equals(arrA, arrB) {
    if (isArray(arrA) && isArray(arrB) && arrA.length === arrB.length) {
      const comparer = AnyEqualityComparer.getEqualityComparer(this.strict);

      for (let index = 0; index < arrA.length; index++) {
        if (!comparer.equals(arrA[index], arrB[index])) {
          return false;
        }
      }

      return true;
    }

    return false;
  }
}

class IterableEqualityComparer extends BaseEqualityComparer {
  _equals(itA, itB) {
    if (isIterable(itA) && isIterable(itB)) {
      if (isArray(itA) && isArray(itB)) {
        const comparer = ArrayEqualityComparer.getEqualityComparer(this.strict);

        return comparer.equals(itA, itB);
      }

      let currentA, currentB;
      const comparer = AnyEqualityComparer.getEqualityComparer(this.strict);

      while (true) {
        currentA = itA.next();
        currentB = itB.next();

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
            if (!comparer.equals(currentA.value, currentB.value)) {
              return false;
            }
          }
        }
      }
    }

    return false;
  }
}

class ObjectEqualityComparer extends BaseEqualityComparer {
  constructor(strict) {
    super(strict);

    if (this.constructor === ObjectEqualityComparer) {
      throw `Cannot instantiate from abstract class ObjectEqualityComparer`
    }
  }
  __equals(objA, objB) {
    throw `${this.constructor.name}.__equals() is not implemented`
  }
  _equals(objA, objB) {
    if (isObject(objA) && isObject(objB)) {
      return this.__equals(objA, objB);
    } else {
      return false;
    }
  }
}

class ObjectReferenceEqualityComparer extends ObjectEqualityComparer {
  __equals(objA, objB) {
    return objA == objB;
  }
}

class ObjectShapeEqualityComparer extends ObjectEqualityComparer {
  __equals(objA, objB) {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length != keysB.length) {
      return false;
    }

    const comparer = AnyEqualityComparer.getEqualityComparer(this.strict);

    for (let key of keysA) {
      if (!comparer.equals(objA[key], objB[key])) {
        return false;
      }
    }

    return true;
  }
}

class AnyEqualityComparer extends BaseEqualityComparer {
  _equals(x, y) {
    if (isPrimitive(x) || isPrimitive(y)) {
      return PrimitiveEqualityComparer.getEqualityComparer(this.strict).equals(x, y);
    }

    if (isArray(x) || isArray(y)) {
      return ArrayEqualityComparer.getEqualityComparer(this.strict).equals(x, y);
    }

    if (isIterable(x) || isIterable(y)) {
      return IterableEqualityComparer.getEqualityComparer(this.strict).equals(x, y);
    }

    if (isObject(x) || isObject(y)) {
      return ObjectEqualityComparer.getEqualityComparer(this.strict).equals(x, y);
    }

    return DefaultEqualityComparer.getEqualityComparer(this.strict).equals(x, y);
  }
}

EqualityComparer.Empty = new NullOrEmptyEqualityComparer();
EqualityComparer.Null = new NullOrUndefinedEqualityComparer();
EqualityComparer.Default = {
  Loose: new DefaultEqualityComparer(false),
  Tight: new DefaultEqualityComparer(true)
}
EqualityComparer.String = {
  Ordinal: new StringEqualityComparer(true),
  IgnoreCase: new StringEqualityComparer(false)
}
EqualityComparer.Primitive = {
  Loose: new PrimitiveEqualityComparer(false),
  Tight: new PrimitiveEqualityComparer(true)
}
EqualityComparer.Array = {
  Loose: new ArrayEqualityComparer(false),
  Tight: new ArrayEqualityComparer(true)
}
EqualityComparer.Iterable = {
  Loose: new IterableEqualityComparer(false),
  Tight: new IterableEqualityComparer(true)
}
EqualityComparer.Object = {
  Shape: {
    Loose: new ObjectShapeEqualityComparer(false),
    Tight: new ObjectShapeEqualityComparer(true)
  },
  Reference: {
    Loose: new ObjectReferenceEqualityComparer(false),
    Tight: new ObjectReferenceEqualityComparer(true)
  }
}
EqualityComparer.Any = {
  Loose: new AnyEqualityComparer(false),
  Tight: new AnyEqualityComparer(true)
}

DefaultEqualityComparer.getEqualityComparer = function (strict) {
  return strict ? EqualityComparer.Default.Ordinal : EqualityComparer.Default.IgnoreCase;
}
PrimitiveEqualityComparer.getEqualityComparer = function (strict) {
  return strict ? EqualityComparer.Primitive.Ordinal : EqualityComparer.Primitive.IgnoreCase;
}
StringEqualityComparer.getEqualityComparer = function (strict) {
  return strict ? EqualityComparer.String.Ordinal : EqualityComparer.String.IgnoreCase;
}
ArrayEqualityComparer.getEqualityComparer = function (strict) {
  return strict ? EqualityComparer.Array.Tight : EqualityComparer.Array.Loose;
}
IterableEqualityComparer.getEqualityComparer = function (strict) {
  return strict ? EqualityComparer.Iterable.Tight : EqualityComparer.Iterable.Loose;
}
ObjectEqualityComparer.getEqualityComparer = function (reference, strict) {
  return strict ? EqualityComparer.Object.Tight : EqualityComparer.Object.Loose;
}
AnyEqualityComparer.getEqualityComparer = function (strict) {
  return strict ? EqualityComparer.Any.Tight : EqualityComparer.Any.Loose;
}

class Comparer {
  constructor() {
    if (this.constructor === Comparer) {
      throw `Cannot instantiate from abstract class Comparer`
    }
  }
  compare(x, y) {
    throw `${this.constructor.name}.compare() is not implemented`
  }
}

class StringOrdinalComparer extends Comparer {
  compare(x, y) {
    return x == y;
  }
}

class StringOrdinalIgnoreCaseComparer extends Comparer {
  compare(x, y) {
    return x.toLowerCase() == y.toLowerCase();
  }
}

const stringOrdinalComparer = new StringOrdinalComparer();
const stringOrdinalIgnoreCaseComparer = new StringOrdinalIgnoreCaseComparer();

const StringComparer = {
  Ordinal: stringOrdinalComparer,
  IgnoreCase: stringOrdinalIgnoreCaseComparer
}

class Comparable {
  compareTo(x) {

  }
}

const isComparable = x => x && typeof x.compareTo == 'function';

export {
  EqualityComparer,
  DefaultEqualityComparer as TypeEqualityComparer,
  ArrayEqualityComparer,
  IterableEqualityComparer,
  ObjectEqualityComparer,
  Comparer,
  Comparable,
  isComparable,
  StringComparer
}