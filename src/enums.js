import { Enum } from "@locustjs/enum";

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

export {
  ScalerEqualityComparerType,
  ComplexEqualityComparerType,
  FunctionEqualityComparerType,
  EqualityComparerType,
  StringEqualityComparerType,
  EqualityComparerSymbol,
};
