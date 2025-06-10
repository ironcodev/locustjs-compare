import EqualityComparer from "./EqualityComparer";
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
  Loose: NullOrEmptyEqualityComparer.Loose,
  Tight: NullOrEmptyEqualityComparer.Tight,
};
EqualityComparer.Function = {
  Ref: FunctionEqualityComparer.Ref,
  Source: FunctionEqualityComparer.Source,
  Ignore: FunctionEqualityComparer.Ignore,
};
EqualityComparer.String = {
  LooseOrdinal: StringEqualityComparer.LooseOrdinal,
  LooseIgnoreCase: StringEqualityComparer.LooseIgnoreCase,
  TightOrdinal: StringEqualityComparer.TightOrdinal,
  TightIgnoreCase: StringEqualityComparer.TightIgnoreCase,
};
EqualityComparer.String.Ordinal = StringEqualityComparer.LooseOrdinal;
EqualityComparer.String.IgnoreCase = StringEqualityComparer.LooseIgnoreCase;

EqualityComparer.Primitive = {
  Loose: PrimitiveEqualityComparer.Loose,
  Tight: PrimitiveEqualityComparer.Tight,
};
EqualityComparer.Array = {
  LooseShape: ArrayEqualityComparer.LooseShape,
  TightShape: ArrayEqualityComparer.TightShape,
  LooseRef: ArrayEqualityComparer.LooseRef,
  TightRef: ArrayEqualityComparer.TightRef,
};
EqualityComparer.Iterable = {
  LooseShape: IterableEqualityComparer.LooseShape,
  TightShape: IterableEqualityComparer.TightShape,
  LooseRef: IterableEqualityComparer.LooseRef,
  TightRef: IterableEqualityComparer.TightRef,
};
EqualityComparer.Object = {
  LooseShape: ObjectEqualityComparer.LooseShape,
  TightShape: ObjectEqualityComparer.TightShape,
  LooseRef: ObjectEqualityComparer.LooseRef,
  TightRef: ObjectEqualityComparer.TightRef,
};
