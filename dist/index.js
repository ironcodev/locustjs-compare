'use strict';

var _enum = require('@locustjs/enum');
var base = require('@locustjs/base');
var exception = require('@locustjs/exception');

var ScalerEqualityComparerType = _enum.Enum.define({
  loose: 0,
  tight: 1
}, "ScalerEqualityComparerType");
var ComplexEqualityComparerType = _enum.Enum.define({
  shape: 0,
  ref: 1
}, "ComplexEqualityComparerType");
var FunctionEqualityComparerType = _enum.Enum.define({
  ref: 0,
  source: 1,
  ignore: 2
}, "FunctionEqualityComparerType");
var EqualityComparerType = _enum.Enum.define({
  looseShape: 0,
  looseRef: 1,
  tightShape: 2,
  tightRef: 3
}, "EqualityComparerType");
var StringEqualityComparerType = _enum.Enum.define({
  ordinal: 0,
  ignoreCase: 1
}, "StringEqualityComparerType");
var EqualityComparerSymbol = Symbol();

function _assertThisInitialized(e) {
  if (undefined === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: true,
      configurable: true
    }
  }), Object.defineProperty(t, "prototype", {
    writable: false
  }), e && _setPrototypeOf(t, e);
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (undefined !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (undefined !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

var EqualityComparerOptions = {
  LooseShape: Object.freeze(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, EqualityComparerSymbol, true), "null", "loose"), "primitive", "loose"), "string", "ordinal"), "array", "shape"), "iterable", "shape"), "object", "shape"), "function", "ref")),
  TightShape: Object.freeze(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, EqualityComparerSymbol, true), "null", "tight"), "primitive", "tight"), "string", "ordinal"), "array", "shape"), "iterable", "shape"), "object", "shape"), "function", "ref")),
  LooseRef: Object.freeze(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, EqualityComparerSymbol, true), "null", "loose"), "primitive", "loose"), "string", "ordinal"), "array", "ref"), "iterable", "ref"), "object", "ref"), "function", "ref")),
  TightRef: Object.freeze(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, EqualityComparerSymbol, true), "null", "tight"), "primitive", "tight"), "string", "ordinal"), "array", "ref"), "iterable", "ref"), "object", "ref"), "function", "ref"))
};

var EqualityComparer = /*#__PURE__*/function () {
  function EqualityComparer(options) {
    _classCallCheck(this, EqualityComparer);
    exception.throwIfInstantiateAbstract(EqualityComparer, this);
    this.options = EqualityComparer.getOptions(options);
  }
  return _createClass(EqualityComparer, [{
    key: "equals",
    value: function equals(x, y) {
      exception.throwNotImplementedException("".concat(this.constructor.name, ".equals(x, y)"));
    }
  }], [{
    key: "getOptions",
    value: function getOptions(options) {
      if (options && options[EqualityComparerSymbol]) {
        return options;
      }
      // default is loose-shape
      var result = EqualityComparerOptions.LooseShape;
      if (base.isPrimitive(options)) {
        if (base.isBool(options)) {
          if (options) {
            // tight-shape
            result = EqualityComparerOptions.TightShape;
          }
        } else {
          if (base.isString(options)) {
            options = options.toLowerCase();
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
          var type = EqualityComparerType.getNumber(options, EqualityComparerType.looseShape);
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
      } else if (!base.isNullOrEmpty(options)) {
        result = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, EqualityComparerSymbol, true), "null", base.isFunction(options["null"]) ? options["null"] : ScalerEqualityComparerType.getString(options["null"] || "loose")), "primitive", base.isFunction(options.primitive) ? options.primitive : ScalerEqualityComparerType.getString(options.primitive || "loose")), "string", base.isFunction(options.string) ? options.string : StringEqualityComparerType.getString(options.string || "ordinal")), "array", base.isFunction(options.array) ? options.array : ComplexEqualityComparerType.getString(options.array || "shape")), "iterable", base.isFunction(options.iterable) ? options.iterable : ComplexEqualityComparerType.getString(options.iterable || "shape")), "object", base.isFunction(options.object) ? options.object : ComplexEqualityComparerType.getString(options.object || "shape")), "function", base.isFunction(options["function"]) ? options["function"] : FunctionEqualityComparerType.getString(options["function"] || "ref"));
      } else ;
      return result;
    }
  }]);
}();

var BaseEqualityComparer = /*#__PURE__*/function (_EqualityComparer) {
  function BaseEqualityComparer(options, prop) {
    var _this;
    _classCallCheck(this, BaseEqualityComparer);
    if (base.isFunction(options)) {
      _this = _callSuper(this, BaseEqualityComparer, [_defineProperty({}, prop, options)]);
    } else {
      _this = _callSuper(this, BaseEqualityComparer, [options]);
    }
    return _assertThisInitialized(_this);
  }
  _inherits(BaseEqualityComparer, _EqualityComparer);
  return _createClass(BaseEqualityComparer, [{
    key: "_init",
    value: function _init(arr, itr, obj) {
      if (!this._initialized) {
        this._arrayEqualityComparer = arr || new ArrayEqualityComparer(this.options);
        this._iterableEqualityComparer = itr || new IterableEqualityComparer(this.options);
        this._objectEqualityComparer = obj || new ObjectEqualityComparer(this.options);
        this._initialized = true;
      }
    }
  }, {
    key: "_equals",
    value: function _equals(a, b) {
      var result = false;
      do {
        if (base.isObject(a) || base.isObject(b)) {
          if (this.options.object == "ref") {
            if (a !== b) {
              break;
            }
          }
          if (!this._objectEqualityComparer.equals(a, b)) {
            break;
          }
        } else if (base.isArray(a) || base.isArray(b)) {
          if (this.options.array == "ref") {
            if (a !== b) {
              break;
            }
          }
          if (!this._arrayEqualityComparer.equals(a, b)) {
            break;
          }
        } else if (base.isPrimitive(a) || base.isPrimitive(b)) {
          if (this.options.primitive == "loose") {
            if (!EqualityComparer.Primitive.Loose.equals(a, b)) {
              break;
            }
          } else {
            if (!EqualityComparer.Primitive.Tight.equals(a, b)) {
              break;
            }
          }
        } else if (base.isNullOrEmpty(a) || base.isNullOrEmpty(b)) {
          if (this.options["null"] == "loose") {
            if (!EqualityComparer.Null.Loose.equals(a, b)) {
              break;
            }
          } else {
            if (!EqualityComparer.Null.Tight.equals(a, b)) {
              break;
            }
          }
        } else if (base.isIterable(a) || base.isIterable(b)) {
          if (!this._iterableEqualityComparer.equals(a, b)) {
            break;
          }
        } else if (base.isFunction(a) || base.isFunction(b)) {
          if (!this._functionEqualityComparer.equals(a, b)) {
            break;
          }
        }
        result = true;
      } while (false);
      return result;
    }
  }]);
}(EqualityComparer);
var NullOrEmptyEqualityComparer = /*#__PURE__*/function (_EqualityComparer2) {
  function NullOrEmptyEqualityComparer(options) {
    var _this2;
    _classCallCheck(this, NullOrEmptyEqualityComparer);
    if (base.isFunction(options)) {
      _this2 = _callSuper(this, NullOrEmptyEqualityComparer, [{
        "null": options
      }]);
    } else {
      if (base.isString(options)) {
        _this2 = _callSuper(this, NullOrEmptyEqualityComparer, [{
          "null": ScalerEqualityComparerType.getString(options)
        }]);
      }
      _this2 = _callSuper(this, NullOrEmptyEqualityComparer, [options]);
    }
    return _assertThisInitialized(_this2);
  }
  _inherits(NullOrEmptyEqualityComparer, _EqualityComparer2);
  return _createClass(NullOrEmptyEqualityComparer, [{
    key: "equals",
    value: function equals(x, y) {
      if (base.isFunction(this.options["null"])) {
        return this.options["null"](x, y);
      }
      if (this.options["null"] == "loose") {
        return base.isNullOrEmpty(x) && base.isNullOrEmpty(y);
      }
      return x === y && base.isNullOrEmpty(x) && base.isNullOrEmpty(y);
    }
  }]);
}(EqualityComparer);
var ArrayEqualityComparer = /*#__PURE__*/function (_BaseEqualityComparer) {
  function ArrayEqualityComparer(options) {
    _classCallCheck(this, ArrayEqualityComparer);
    return _callSuper(this, ArrayEqualityComparer, [options, "array"]);
  }
  _inherits(ArrayEqualityComparer, _BaseEqualityComparer);
  return _createClass(ArrayEqualityComparer, [{
    key: "equals",
    value: function equals(arrA, arrB) {
      var result = false;
      this._init(this, null, null);
      if (base.isFunction(this.options.array)) {
        return this.options.array(arrA, arrB);
      }
      if (base.isArray(arrA) && base.isArray(arrB) && arrA.length === arrB.length) {
        var i = 0;
        for (var index = 0; index < arrA.length; index++) {
          var a = arrA[index];
          var b = arrB[index];
          if (!this._equals(a, b)) {
            break;
          }
          i++;
        }
        result = i == arrA.length;
      }
      return result;
    }
  }]);
}(BaseEqualityComparer);
var PrimitiveEqualityComparer = /*#__PURE__*/function (_BaseEqualityComparer2) {
  function PrimitiveEqualityComparer(options) {
    _classCallCheck(this, PrimitiveEqualityComparer);
    return _callSuper(this, PrimitiveEqualityComparer, [options, "primitive"]);
  }
  _inherits(PrimitiveEqualityComparer, _BaseEqualityComparer2);
  return _createClass(PrimitiveEqualityComparer, [{
    key: "equals",
    value: function equals(x, y) {
      if (base.isFunction(this.options.primitive)) {
        return this.options.primitive(x, y);
      }

      // string is an exception among primitive types
      if (base.isString(x) && base.isString(y)) {
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
      if (base.isBool(x) || base.isBool(y)) {
        return this.options.primitive == "tight" ? x == y : x.toString() == y.toString();
      }
      if (base.isPrimitive(x) && base.isPrimitive(y)) {
        return this.options.primitive == "tight" ? x === y : x == y;
      } else if (base.isNullOrEmpty(x) || base.isNullOrEmpty(y)) {
        if (base.isFunction(this.options["null"])) {
          return this.options["null"](x, y);
        }
        return this.options["null"] == "tight" ? x === y : base.isNullOrEmpty(x) == base.isNullOrEmpty(y);
      } else {
        return false;
      }
    }
  }]);
}(BaseEqualityComparer);
var StringEqualityComparer = /*#__PURE__*/function (_BaseEqualityComparer3) {
  function StringEqualityComparer(options) {
    _classCallCheck(this, StringEqualityComparer);
    return _callSuper(this, StringEqualityComparer, [options, "string"]);
  }
  _inherits(StringEqualityComparer, _BaseEqualityComparer3);
  return _createClass(StringEqualityComparer, [{
    key: "equals",
    value: function equals(strA, strB) {
      if (base.isFunction(this.options.string)) {
        return this.options.string(strA, strB);
      }
      var isStrA = base.isString(strA);
      var isStrB = base.isString(strB);
      if (this.options.primitive == "loose") {
        // contract: we assume '' and null or '' and undefined are equal
        if (base.isNullOrEmpty(strA) && base.isNullOrEmpty(strB)) {
          return true;
        }
        if (base.isNullOrEmpty(strA)) {
          return base.isNullOrEmpty(strB);
        } else if (base.isNullOrEmpty(strB)) {
          return false;
        }
        return this.options.string == "ordinal" ? strA.toString() == strB.toString() : strA.toString().toLowerCase() === strB.toString().toLowerCase();
      } else {
        if (isStrA && isStrB) {
          return this.options.string == "ordinal" ? strA == strB : strA.toLowerCase() == strB.toLowerCase();
        } else {
          if (base.isNullOrEmpty(strA)) {
            return base.isNullOrEmpty(strB) && strA === strB;
          } else if (base.isNullOrEmpty(strB)) {
            return false;
          }
        }
      }
    }
  }]);
}(BaseEqualityComparer);
var ObjectEqualityComparer = /*#__PURE__*/function (_BaseEqualityComparer4) {
  function ObjectEqualityComparer(options) {
    _classCallCheck(this, ObjectEqualityComparer);
    return _callSuper(this, ObjectEqualityComparer, [options, "object"]);
  }
  _inherits(ObjectEqualityComparer, _BaseEqualityComparer4);
  return _createClass(ObjectEqualityComparer, [{
    key: "equals",
    value: function equals(objA, objB) {
      var result = false;
      this._init(null, null, this);
      if (base.isFunction(this.options.object)) {
        return this.options.object(objA, objB);
      }
      do {
        if (!base.isObject(objA) || !base.isObject(objB)) {
          break;
        }
        var keysA = Object.keys(objA);
        var keysB = Object.keys(objB);
        if (keysA.length != keysB.length) {
          break;
        }
        var i = 0;
        for (var _i = 0, _keysA = keysA; _i < _keysA.length; _i++) {
          var key = _keysA[_i];
          if (keysB.indexOf(key) < 0) {
            break;
          }
          var a = objA[key];
          var b = objB[key];
          if (!this._equals(a, b)) {
            break;
          }
          i++;
        }
        result = i == keysA.length;
      } while (false);
      return result;
    }
  }]);
}(BaseEqualityComparer);
var IterableEqualityComparer = /*#__PURE__*/function (_BaseEqualityComparer5) {
  function IterableEqualityComparer(options) {
    _classCallCheck(this, IterableEqualityComparer);
    return _callSuper(this, IterableEqualityComparer, [options, "iterable"]);
  }
  _inherits(IterableEqualityComparer, _BaseEqualityComparer5);
  return _createClass(IterableEqualityComparer, [{
    key: "equals",
    value: function equals(itA, itB) {
      if (base.isFunction(this.options.iterable)) {
        return this.options.iterable(arrA, arrB);
      }
      if (base.isIterable(itA) && base.isIterable(itB)) {
        this._init(null, this, null);
        if (base.isArray(itA) && base.isArray(itB)) {
          return this._arrayEqualityComparer.equals(itA, itB);
        }
        while (true) {
          var currentA = itA.next();
          var currentB = itB.next();
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
              var a = currentA.value;
              var b = currentB.value;
              if (!this._equals(a, b)) {
                break;
              }
            }
          }
        }
      }
      return false;
    }
  }]);
}(BaseEqualityComparer);
var FunctionEqualityComparer = /*#__PURE__*/function (_BaseEqualityComparer6) {
  function FunctionEqualityComparer(options) {
    _classCallCheck(this, FunctionEqualityComparer);
    return _callSuper(this, FunctionEqualityComparer, [options, "function"]);
  }
  _inherits(FunctionEqualityComparer, _BaseEqualityComparer6);
  return _createClass(FunctionEqualityComparer, [{
    key: "equals",
    value: function equals(x, y) {
      if (base.isFunction(this.options["function"])) {
        return this.options["function"](x, y);
      }
      if (this.options["function"] == "ignore") {
        return true;
      }
      if (base.isFunction(x) && base.isFunction(y)) {
        if (this.options["function"] == "source") {
          return x.toString() == y.toString();
        }
        return x == y;
      }
      return false;
    }
  }]);
}(BaseEqualityComparer);

var Comparer = /*#__PURE__*/function () {
  function Comparer() {
    _classCallCheck(this, Comparer);
    exception.throwIfInstantiateAbstract(Comparer, this);
  }
  return _createClass(Comparer, [{
    key: "compare",
    value: function compare(x, y) {
      exception.throwNotImplementedException("".concat(this.constructor.name, ".compare(x, y)"));
    }
  }]);
}();

var StringOrdinalComparer = /*#__PURE__*/function (_Comparer) {
  function StringOrdinalComparer() {
    _classCallCheck(this, StringOrdinalComparer);
    return _callSuper(this, StringOrdinalComparer, arguments);
  }
  _inherits(StringOrdinalComparer, _Comparer);
  return _createClass(StringOrdinalComparer, [{
    key: "compare",
    value: function compare(a, b) {
      var strA = isNullOrEmpty(a) ? "" : a.toString();
      var strB = isNullOrEmpty(b) ? "" : b.toString();
      if (strA == strB) {
        return 0;
      }
      if (strA < strB) {
        return -1;
      }
      return 1;
    }
  }]);
}(Comparer);
var StringOrdinalIgnoreCaseComparer = /*#__PURE__*/function (_Comparer2) {
  function StringOrdinalIgnoreCaseComparer() {
    _classCallCheck(this, StringOrdinalIgnoreCaseComparer);
    return _callSuper(this, StringOrdinalIgnoreCaseComparer, arguments);
  }
  _inherits(StringOrdinalIgnoreCaseComparer, _Comparer2);
  return _createClass(StringOrdinalIgnoreCaseComparer, [{
    key: "compare",
    value: function compare(a, b) {
      var strA = isNullOrEmpty(a) ? "" : a.toString();
      var strB = isNullOrEmpty(b) ? "" : b.toString();
      if (strA.toLowerCase() == strB.toLowerCase()) {
        return 0;
      }
      if (strA < strB) {
        return -1;
      }
      return 1;
    }
  }]);
}(Comparer);
var StringComparer = {
  Ordinal: new StringOrdinalComparer(),
  IgnoreCase: new StringOrdinalIgnoreCaseComparer()
};

var isComparable = function isComparable(x) {
  return isObject(x) && base.isFunction(x.compareTo);
};

var isEqualityComparer = function isEqualityComparer(x) {
  return isObject(x) && base.isFunction(x.equals);
};

EqualityComparer.Null = {
  Loose: new NullOrEmptyEqualityComparer(false),
  Tight: new NullOrEmptyEqualityComparer(true)
};
EqualityComparer.Function = {
  Ref: new FunctionEqualityComparer(FunctionEqualityComparerType.ref),
  Source: new FunctionEqualityComparer(FunctionEqualityComparerType.source),
  Ignore: new FunctionEqualityComparer(FunctionEqualityComparerType.ignore)
};
EqualityComparer.String = {
  LooseOrdinal: new StringEqualityComparer({
    string: "ordinal",
    primitive: "loose"
  }),
  LooseIgnoreCase: new StringEqualityComparer({
    string: "ignoreCase",
    primitive: "loose"
  }),
  TightOrdinal: new StringEqualityComparer({
    string: "ordinal",
    primitive: "tight"
  }),
  TightIgnoreCase: new StringEqualityComparer({
    string: "ignoreCase",
    primitive: "tight"
  })
};
EqualityComparer.String.Ordinal = EqualityComparer.String.LooseOrdinal;
EqualityComparer.String.IgnoreCase = EqualityComparer.String.LooseIgnoreCase;
EqualityComparer.Primitive = {
  Loose: new PrimitiveEqualityComparer(false),
  Tight: new PrimitiveEqualityComparer(true)
};
EqualityComparer.Array = {
  LooseShape: new ArrayEqualityComparer(EqualityComparerOptions.LooseShape),
  TightShape: new ArrayEqualityComparer(EqualityComparerOptions.TightShape),
  LooseRef: new ArrayEqualityComparer(EqualityComparerOptions.LooseRef),
  TightRef: new ArrayEqualityComparer(EqualityComparerOptions.TightRef)
};
EqualityComparer.Iterable = {
  LooseShape: new IterableEqualityComparer(EqualityComparerOptions.LooseShape),
  TightShape: new IterableEqualityComparer(EqualityComparerOptions.TightShape),
  LooseRef: new IterableEqualityComparer(EqualityComparerOptions.LooseRef),
  TightRef: new IterableEqualityComparer(EqualityComparerOptions.TightRef)
};
EqualityComparer.Object = {
  LooseShape: new ObjectEqualityComparer(EqualityComparerOptions.LooseShape),
  TightShape: new ObjectEqualityComparer(EqualityComparerOptions.TightShape),
  LooseRef: new ObjectEqualityComparer(EqualityComparerOptions.LooseRef),
  TightRef: new ObjectEqualityComparer(EqualityComparerOptions.TightRef)
};

exports.ArrayEqualityComparer = ArrayEqualityComparer;
exports.BaseEqualityComparer = BaseEqualityComparer;
exports.Comparer = Comparer;
exports.ComplexEqualityComparerType = ComplexEqualityComparerType;
exports.EqualityComparer = EqualityComparer;
exports.EqualityComparerOptions = EqualityComparerOptions;
exports.EqualityComparerType = EqualityComparerType;
exports.FunctionEqualityComparer = FunctionEqualityComparer;
exports.FunctionEqualityComparerType = FunctionEqualityComparerType;
exports.IterableEqualityComparer = IterableEqualityComparer;
exports.NullOrEmptyEqualityComparer = NullOrEmptyEqualityComparer;
exports.ObjectEqualityComparer = ObjectEqualityComparer;
exports.PrimitiveEqualityComparer = PrimitiveEqualityComparer;
exports.ScalerEqualityComparerType = ScalerEqualityComparerType;
exports.StringComparer = StringComparer;
exports.StringEqualityComparer = StringEqualityComparer;
exports.StringEqualityComparerType = StringEqualityComparerType;
exports.StringOrdinalComparer = StringOrdinalComparer;
exports.StringOrdinalIgnoreCaseComparer = StringOrdinalIgnoreCaseComparer;
exports.isComparable = isComparable;
exports.isEqualityComparer = isEqualityComparer;
