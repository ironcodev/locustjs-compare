import { EqualityComparerSymbol } from "./enums";

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

export default EqualityComparerOptions;
