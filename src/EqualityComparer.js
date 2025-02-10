import {
  isPrimitive,
  isNullOrEmpty,
  isString,
  isBool,
  isFunction,
} from "@locustjs/base";
import {
  throwIfInstantiateAbstract,
  throwNotImplementedException,
} from "@locustjs/exception";
import {
  ComplexEqualityComparerType,
  EqualityComparerType,
  FunctionEqualityComparerType,
  ScalerEqualityComparerType,
  StringEqualityComparerType,
  EqualityComparerSymbol,
} from "./enums";
import EqualityComparerOptions from "./EqualityComparerOptions";

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
        [EqualityComparerSymbol]: true,
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

export default EqualityComparer;
