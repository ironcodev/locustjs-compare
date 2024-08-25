import TestRunner from "@locustjs/test";
import test1 from "./EqualityComparer.Null.Loose";
import test2 from "./EqualityComparer.Null.Tight";
import test3 from "./EqualityComparer.Primitive.Loose";
import test4 from "./EqualityComparer.Primitive.Tight";
import test5 from "./EqualityComparer.String.LooseOrdinal";
import test6 from "./EqualityComparer.String.LooseIgnoreCase";
import test7 from "./EqualityComparer.String.TightOrdinal";
import test8 from "./EqualityComparer.String.TightIgnoreCase";
import test9 from "./EqualityComparer.Object.LooseShape";
import test10 from "./EqualityComparer.Object.TightShape";
import test11 from "./EqualityComparer.Object.LooseRef";
import test12 from "./EqualityComparer.Object.TightRef";
import test13 from "./EqualityComparer.Array.LooseShape";
import test14 from "./EqualityComparer.Array.LooseRef";
import test15 from "./EqualityComparer.Array.TightShape";
import test16 from "./EqualityComparer.Array.TightRef";
import test17 from "./EqualityComparer.Iterable.LooseShape";
import test18 from "./EqualityComparer.Iterable.LooseRef";

const tests = [
    ...test1,
    ...test2,
    ...test3,
    ...test4,
    ...test5,
    ...test6,
    ...test7,
    ...test8,
    ...test9,
    ...test10,
    ...test11,
    ...test12,
    ...test13,
    ...test14,
    ...test15,
    ...test16,
    ...test17,
    ...test18,
];

TestRunner.start(tests);
