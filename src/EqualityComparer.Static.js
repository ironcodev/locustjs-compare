import { FunctionEqualityComparerType } from "./enums";
import EqualityComparer from "./EqualityComparer";
import EqualityComparerOptions from "./EqualityComparerOptions";
import {
  NullOrEmptyEqualityComparer,
  PrimitiveEqualityComparer,
  StringEqualityComparer,
  ObjectEqualityComparer,
  ArrayEqualityComparer,
  IterableEqualityComparer,
  FunctionEqualityComparer,
} from "./EqualityComparers";

EqualityComparer.Null = {
  Loose: new NullOrEmptyEqualityComparer(false),
  Tight: new NullOrEmptyEqualityComparer(true),
};
EqualityComparer.Function = {
  Ref: new FunctionEqualityComparer(FunctionEqualityComparerType.ref),
  Source: new FunctionEqualityComparer(FunctionEqualityComparerType.source),
  Ignore: new FunctionEqualityComparer(FunctionEqualityComparerType.ignore),
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
