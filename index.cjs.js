"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isComparable = exports.StringOrdinalIgnoreCaseComparer = exports.StringOrdinalComparer = exports.StringEqualityComparerType = exports.StringEqualityComparer = exports.StringComparer = exports.ScalerEqualityComparerType = exports.PrimitiveEqualityComparer = exports.ObjectEqualityComparer = exports.NullOrEmptyEqualityComparer = exports.IterableEqualityComparer = exports.FunctionEqualityComparerType = exports.FunctionEqualityComparer = exports.EqualityComparerType = exports.EqualityComparerOptions = exports.EqualityComparer = exports.ComplexEqualityComparerType = exports.Comparer = exports.BaseEqualityComparer = exports.ArrayEqualityComparer = void 0;
var _base = require("@locustjs/base");
var _exception = require("@locustjs/exception");
var _enum = _interopRequireDefault(require("@locustjs/enum"));
var _Object$freeze, _Object$freeze2, _Object$freeze3, _Object$freeze4;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ScalerEqualityComparerType = _enum["default"].define({
  loose: 0,
  tight: 1
}, "ScalerEqualityComparerType");
exports.ScalerEqualityComparerType = ScalerEqualityComparerType;
var ComplexEqualityComparerType = _enum["default"].define({
  shape: 0,
  ref: 1
}, "ComplexEqualityComparerType");
exports.ComplexEqualityComparerType = ComplexEqualityComparerType;
var FunctionEqualityComparerType = _enum["default"].define({
  ref: 0,
  source: 1,
  ignore: 2
}, "FunctionEqualityComparerType");
exports.FunctionEqualityComparerType = FunctionEqualityComparerType;
var EqualityComparerType = _enum["default"].define({
  looseShape: 0,
  looseRef: 1,
  tightShape: 2,
  tightRef: 3
}, "EqualityComparerType");
exports.EqualityComparerType = EqualityComparerType;
var StringEqualityComparerType = _enum["default"].define({
  ordinal: 0,
  ignoreCase: 1
}, "StringEqualityComparerType");
exports.StringEqualityComparerType = StringEqualityComparerType;
var EqualityComparerSymbol = Symbol();
var EqualityComparerOptions = {
  LooseShape: Object.freeze((_Object$freeze = {}, _defineProperty(_Object$freeze, EqualityComparerSymbol, true), _defineProperty(_Object$freeze, "null", "loose"), _defineProperty(_Object$freeze, "primitive", "loose"), _defineProperty(_Object$freeze, "string", "ordinal"), _defineProperty(_Object$freeze, "array", "shape"), _defineProperty(_Object$freeze, "iterable", "shape"), _defineProperty(_Object$freeze, "object", "shape"), _defineProperty(_Object$freeze, "function", "ref"), _Object$freeze)),
  TightShape: Object.freeze((_Object$freeze2 = {}, _defineProperty(_Object$freeze2, EqualityComparerSymbol, true), _defineProperty(_Object$freeze2, "null", "tight"), _defineProperty(_Object$freeze2, "primitive", "tight"), _defineProperty(_Object$freeze2, "string", "ordinal"), _defineProperty(_Object$freeze2, "array", "shape"), _defineProperty(_Object$freeze2, "iterable", "shape"), _defineProperty(_Object$freeze2, "object", "shape"), _defineProperty(_Object$freeze2, "function", "ref"), _Object$freeze2)),
  LooseRef: Object.freeze((_Object$freeze3 = {}, _defineProperty(_Object$freeze3, EqualityComparerSymbol, true), _defineProperty(_Object$freeze3, "null", "loose"), _defineProperty(_Object$freeze3, "primitive", "loose"), _defineProperty(_Object$freeze3, "string", "ordinal"), _defineProperty(_Object$freeze3, "array", "ref"), _defineProperty(_Object$freeze3, "iterable", "ref"), _defineProperty(_Object$freeze3, "object", "ref"), _defineProperty(_Object$freeze3, "function", "ref"), _Object$freeze3)),
  TightRef: Object.freeze((_Object$freeze4 = {}, _defineProperty(_Object$freeze4, EqualityComparerSymbol, true), _defineProperty(_Object$freeze4, "null", "tight"), _defineProperty(_Object$freeze4, "primitive", "tight"), _defineProperty(_Object$freeze4, "string", "ordinal"), _defineProperty(_Object$freeze4, "array", "ref"), _defineProperty(_Object$freeze4, "iterable", "ref"), _defineProperty(_Object$freeze4, "object", "ref"), _defineProperty(_Object$freeze4, "function", "ref"), _Object$freeze4))
};
exports.EqualityComparerOptions = EqualityComparerOptions;
var EqualityComparer = /*#__PURE__*/function () {
  function EqualityComparer(options) {
    _classCallCheck(this, EqualityComparer);
    (0, _exception.throwIfInstantiateAbstract)(EqualityComparer, this);
    this.options = EqualityComparer.getOptions(options);
  }
  _createClass(EqualityComparer, [{
    key: "equals",
    value: function equals(x, y) {
      (0, _exception.throwNotImplementedException)("".concat(this.constructor.name, ".equals(x, y)"));
    }
  }], [{
    key: "getOptions",
    value: function getOptions(options) {
      if (options && options[EqualityComparerSymbol]) {
        return options;
      }
      // default is loose-shape
      var result = EqualityComparerOptions.LooseShape;
      if ((0, _base.isPrimitive)(options)) {
        if ((0, _base.isBool)(options)) {
          if (options) {
            // tight-shape
            result = EqualityComparerOptions.TightShape;
          } else {
            // default (loose-shape)
          }
        } else {
          if ((0, _base.isString)(options)) {
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
      } else if (!(0, _base.isNullOrEmpty)(options)) {
        result = {
          "null": (0, _base.isFunction)(options["null"]) ? options["null"] : ScalerEqualityComparerType.getString(options["null"] || "loose"),
          primitive: (0, _base.isFunction)(options.primitive) ? options.primitive : ScalerEqualityComparerType.getString(options.primitive || "loose"),
          string: (0, _base.isFunction)(options.string) ? options.string : StringEqualityComparerType.getString(options.string || "ordinal"),
          array: (0, _base.isFunction)(options.array) ? options.array : ComplexEqualityComparerType.getString(options.array || "shape"),
          iterable: (0, _base.isFunction)(options.iterable) ? options.iterable : ComplexEqualityComparerType.getString(options.iterable || "shape"),
          object: (0, _base.isFunction)(options.object) ? options.object : ComplexEqualityComparerType.getString(options.object || "shape"),
          "function": (0, _base.isFunction)(options["function"]) ? options["function"] : FunctionEqualityComparerType.getString(options["function"] || "ref")
        };
      } else {
        // default (loose-shape)
      }
      return result;
    }
  }]);
  return EqualityComparer;
}();
exports.EqualityComparer = EqualityComparer;
var BaseEqualityComparer = /*#__PURE__*/function (_EqualityComparer) {
  _inherits(BaseEqualityComparer, _EqualityComparer);
  var _super = _createSuper(BaseEqualityComparer);
  function BaseEqualityComparer(options, prop) {
    var _this;
    _classCallCheck(this, BaseEqualityComparer);
    if ((0, _base.isFunction)(options)) {
      _this = _super.call(this, _defineProperty({}, prop, options));
    } else {
      _this = _super.call(this, options);
    }
    return _possibleConstructorReturn(_this);
  }
  _createClass(BaseEqualityComparer, [{
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
        if ((0, _base.isObject)(a) || (0, _base.isObject)(b)) {
          if (this.options.object == 'ref') {
            if (a !== b) {
              break;
            }
          }
          if (!this._objectEqualityComparer.equals(a, b)) {
            break;
          }
        } else if ((0, _base.isArray)(a) || (0, _base.isArray)(b)) {
          if (this.options.array == 'ref') {
            if (a !== b) {
              break;
            }
          }
          if (!this._arrayEqualityComparer.equals(a, b)) {
            break;
          }
        } else if ((0, _base.isPrimitive)(a) || (0, _base.isPrimitive)(b)) {
          if (this.options.primitive == "loose") {
            if (!EqualityComparer.Primitive.Loose.equals(a, b)) {
              break;
            }
          } else {
            if (!EqualityComparer.Primitive.Tight.equals(a, b)) {
              break;
            }
          }
        } else if ((0, _base.isNullOrEmpty)(a) || (0, _base.isNullOrEmpty)(b)) {
          if (this.options["null"] == "loose") {
            if (!EqualityComparer.Null.Loose.equals(a, b)) {
              break;
            }
          } else {
            if (!EqualityComparer.Null.Tight.equals(a, b)) {
              break;
            }
          }
        } else if ((0, _base.isIterable)(a) || (0, _base.isIterable)(b)) {
          if (!this._iterableEqualityComparer.equals(a, b)) {
            break;
          }
        } else if ((0, _base.isFunction)(a) || (0, _base.isFunction)(b)) {
          if (!this._functionEqualityComparer.equals(a, b)) {
            break;
          }
        }
        result = true;
      } while (false);
      return result;
    }
  }]);
  return BaseEqualityComparer;
}(EqualityComparer);
exports.BaseEqualityComparer = BaseEqualityComparer;
var NullOrEmptyEqualityComparer = /*#__PURE__*/function (_EqualityComparer2) {
  _inherits(NullOrEmptyEqualityComparer, _EqualityComparer2);
  var _super2 = _createSuper(NullOrEmptyEqualityComparer);
  function NullOrEmptyEqualityComparer(options) {
    var _this2;
    _classCallCheck(this, NullOrEmptyEqualityComparer);
    if ((0, _base.isFunction)(options)) {
      _this2 = _super2.call(this, {
        "null": options
      });
    } else {
      _this2 = _super2.call(this, options);
    }
    return _possibleConstructorReturn(_this2);
  }
  _createClass(NullOrEmptyEqualityComparer, [{
    key: "equals",
    value: function equals(x, y) {
      if ((0, _base.isFunction)(this.options["null"])) {
        return this.options["null"](x, y);
      }
      if (this.options["null"] == "loose") {
        return (0, _base.isNullOrEmpty)(x) && (0, _base.isNullOrEmpty)(y);
      }
      return x === y && (0, _base.isNullOrEmpty)(x) && (0, _base.isNullOrEmpty)(y);
    }
  }]);
  return NullOrEmptyEqualityComparer;
}(EqualityComparer);
exports.NullOrEmptyEqualityComparer = NullOrEmptyEqualityComparer;
var FunctionEqualityComparer = /*#__PURE__*/function (_BaseEqualityComparer) {
  _inherits(FunctionEqualityComparer, _BaseEqualityComparer);
  var _super3 = _createSuper(FunctionEqualityComparer);
  function FunctionEqualityComparer(options) {
    _classCallCheck(this, FunctionEqualityComparer);
    return _super3.call(this, options, "function");
  }
  _createClass(FunctionEqualityComparer, [{
    key: "equals",
    value: function equals(x, y) {
      if ((0, _base.isFunction)(this.options["function"])) {
        return this.options["function"](x, y);
      }
      if (this.options["function"] == "ignore") {
        return true;
      }
      if ((0, _base.isFunction)(x) && (0, _base.isFunction)(y)) {
        if (this.options["function"] == "source") {
          return x.toString() == y.toString();
        }
        return x == y;
      }
      return false;
    }
  }]);
  return FunctionEqualityComparer;
}(BaseEqualityComparer);
exports.FunctionEqualityComparer = FunctionEqualityComparer;
var StringEqualityComparer = /*#__PURE__*/function (_BaseEqualityComparer2) {
  _inherits(StringEqualityComparer, _BaseEqualityComparer2);
  var _super4 = _createSuper(StringEqualityComparer);
  function StringEqualityComparer(options) {
    _classCallCheck(this, StringEqualityComparer);
    return _super4.call(this, options, "string");
  }
  _createClass(StringEqualityComparer, [{
    key: "equals",
    value: function equals(strA, strB) {
      if ((0, _base.isFunction)(this.options.string)) {
        return this.options.string(strA, strB);
      }
      var isStrA = (0, _base.isString)(strA);
      var isStrB = (0, _base.isString)(strB);
      if (this.options.primitive == "loose") {
        // contract: we assume '' and null or '' and undefined are equal
        if ((0, _base.isNullOrEmpty)(strA) && (0, _base.isNullOrEmpty)(strB)) {
          return true;
        }
        if ((0, _base.isNullOrEmpty)(strA) || (0, _base.isNullOrEmpty)(strB)) {
          return false;
        }
        return this.options.string == "ordinal" ? strA.toString() == strB.toString() : strA.toString().toLowerCase() === strB.toString().toLowerCase();
      } else {
        if (isStrA && isStrB) {
          return this.options.string == "ordinal" ? strA == strB : strA.toLowerCase() == strB.toLowerCase();
        } else {
          return false;
        }
      }
    }
  }]);
  return StringEqualityComparer;
}(BaseEqualityComparer);
exports.StringEqualityComparer = StringEqualityComparer;
var PrimitiveEqualityComparer = /*#__PURE__*/function (_BaseEqualityComparer3) {
  _inherits(PrimitiveEqualityComparer, _BaseEqualityComparer3);
  var _super5 = _createSuper(PrimitiveEqualityComparer);
  function PrimitiveEqualityComparer(options) {
    _classCallCheck(this, PrimitiveEqualityComparer);
    return _super5.call(this, options, "primitive");
  }
  _createClass(PrimitiveEqualityComparer, [{
    key: "equals",
    value: function equals(x, y) {
      // string is an exception among primitive types

      if ((0, _base.isString)(x) || (0, _base.isString)(y)) {
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
      if ((0, _base.isPrimitive)(x) && (0, _base.isPrimitive)(y)) {
        if ((0, _base.isFunction)(this.options.primitive)) {
          return this.options.primitive(x, y);
        }
        return this.options.primitive == "tight" ? x === y : x == y;
      } else {
        return false;
      }
    }
  }]);
  return PrimitiveEqualityComparer;
}(BaseEqualityComparer);
exports.PrimitiveEqualityComparer = PrimitiveEqualityComparer;
var ArrayEqualityComparer = /*#__PURE__*/function (_BaseEqualityComparer4) {
  _inherits(ArrayEqualityComparer, _BaseEqualityComparer4);
  var _super6 = _createSuper(ArrayEqualityComparer);
  function ArrayEqualityComparer(options) {
    _classCallCheck(this, ArrayEqualityComparer);
    return _super6.call(this, options, "array");
  }
  _createClass(ArrayEqualityComparer, [{
    key: "equals",
    value: function equals(arrA, arrB) {
      var result = false;
      this._init(this);
      if ((0, _base.isArray)(arrA) && (0, _base.isArray)(arrB) && arrA.length === arrB.length) {
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
  return ArrayEqualityComparer;
}(BaseEqualityComparer);
exports.ArrayEqualityComparer = ArrayEqualityComparer;
var IterableEqualityComparer = /*#__PURE__*/function (_BaseEqualityComparer5) {
  _inherits(IterableEqualityComparer, _BaseEqualityComparer5);
  var _super7 = _createSuper(IterableEqualityComparer);
  function IterableEqualityComparer(options) {
    _classCallCheck(this, IterableEqualityComparer);
    return _super7.call(this, options, "iterable");
  }
  _createClass(IterableEqualityComparer, [{
    key: "equals",
    value: function equals(itA, itB) {
      if ((0, _base.isIterable)(itA) && (0, _base.isIterable)(itB)) {
        this._init(null, this);
        if ((0, _base.isArray)(itA) && (0, _base.isArray)(itB)) {
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
  return IterableEqualityComparer;
}(BaseEqualityComparer);
exports.IterableEqualityComparer = IterableEqualityComparer;
var ObjectEqualityComparer = /*#__PURE__*/function (_BaseEqualityComparer6) {
  _inherits(ObjectEqualityComparer, _BaseEqualityComparer6);
  var _super8 = _createSuper(ObjectEqualityComparer);
  function ObjectEqualityComparer(options) {
    _classCallCheck(this, ObjectEqualityComparer);
    return _super8.call(this, options, "object");
  }
  _createClass(ObjectEqualityComparer, [{
    key: "equals",
    value: function equals(objA, objB) {
      var result = false;
      this._init(null, null, this);
      do {
        if (!(0, _base.isObject)(objA) || !(0, _base.isObject)(objB)) {
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
  return ObjectEqualityComparer;
}(BaseEqualityComparer);
exports.ObjectEqualityComparer = ObjectEqualityComparer;
EqualityComparer.Null = {
  Loose: new NullOrEmptyEqualityComparer(false),
  Tight: new NullOrEmptyEqualityComparer(true)
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
var Comparer = /*#__PURE__*/function () {
  function Comparer() {
    _classCallCheck(this, Comparer);
    (0, _exception.throwIfInstantiateAbstract)(Comparer, this);
  }
  _createClass(Comparer, [{
    key: "compare",
    value: function compare(x, y) {
      (0, _exception.throwNotImplementedException)("".concat(this.constructor.name, ".compare(x, y)"));
    }
  }]);
  return Comparer;
}();
exports.Comparer = Comparer;
var StringOrdinalComparer = /*#__PURE__*/function (_Comparer) {
  _inherits(StringOrdinalComparer, _Comparer);
  var _super9 = _createSuper(StringOrdinalComparer);
  function StringOrdinalComparer() {
    _classCallCheck(this, StringOrdinalComparer);
    return _super9.apply(this, arguments);
  }
  _createClass(StringOrdinalComparer, [{
    key: "compare",
    value: function compare(a, b) {
      var strA = (0, _base.isNullOrEmpty)(a) ? "" : a.toString();
      var strB = (0, _base.isNullOrEmpty)(b) ? "" : b.toString();
      if (strA == strB) {
        return 0;
      }
      if (strA < strB) {
        return -1;
      }
      return 1;
    }
  }]);
  return StringOrdinalComparer;
}(Comparer);
exports.StringOrdinalComparer = StringOrdinalComparer;
var StringOrdinalIgnoreCaseComparer = /*#__PURE__*/function (_Comparer2) {
  _inherits(StringOrdinalIgnoreCaseComparer, _Comparer2);
  var _super10 = _createSuper(StringOrdinalIgnoreCaseComparer);
  function StringOrdinalIgnoreCaseComparer() {
    _classCallCheck(this, StringOrdinalIgnoreCaseComparer);
    return _super10.apply(this, arguments);
  }
  _createClass(StringOrdinalIgnoreCaseComparer, [{
    key: "compare",
    value: function compare(a, b) {
      var strA = (0, _base.isNullOrEmpty)(a) ? "" : a.toString();
      var strB = (0, _base.isNullOrEmpty)(b) ? "" : b.toString();
      if (strA.toLowerCase() == strB.toLowerCase()) {
        return 0;
      }
      if (strA < strB) {
        return -1;
      }
      return 1;
    }
  }]);
  return StringOrdinalIgnoreCaseComparer;
}(Comparer);
exports.StringOrdinalIgnoreCaseComparer = StringOrdinalIgnoreCaseComparer;
var StringComparer = {
  Ordinal: new StringOrdinalComparer(),
  IgnoreCase: new StringOrdinalIgnoreCaseComparer()
};
exports.StringComparer = StringComparer;
var isComparable = function isComparable(x) {
  return (0, _base.isObject)(x) && typeof x.compareTo == "function";
};
exports.isComparable = isComparable;
