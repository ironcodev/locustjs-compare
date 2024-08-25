import { EqualityComparer } from "../index.esm.js";

const tests = [
  [
    "EqualityComparer.Iterable.LooseRef 1-1",
    function (expect) {
      const r = EqualityComparer.Iterable.LooseRef.equals([1], [1]);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseRef 1-2",
    function (expect) {
      const r = EqualityComparer.Iterable.LooseRef.equals([1], ["1"]);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseRef 1-3",
    function (expect) {
      const r = EqualityComparer.Iterable.LooseRef.equals(
        [1, null],
        ["1", undefined]
      );

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseRef 1-4",
    function (expect) {
      const r = EqualityComparer.Iterable.LooseRef.equals([null], [""]);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseRef 1-5",
    function (expect) {
      const r = EqualityComparer.Iterable.LooseRef.equals([undefined], [""]);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseRef 1-6",
    function (expect) {
      const r = EqualityComparer.Iterable.LooseRef.equals([{}], [{}]);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseRef 1-7",
    function (expect) {
      const r = EqualityComparer.Iterable.LooseRef.equals([{ a: 1 }], [{ a: 1 }]);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseRef 1-8",
    function (expect) {
      const x = [{ a: 1 }];
      const y = [x[0]];
      const r = EqualityComparer.Iterable.LooseRef.equals(x, y);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseRef 1-9",
    function (expect) {
      const x = [{ a: 1, b: { x: 5, s: [1] } }];
      const y = [x[0]];
      const r = EqualityComparer.Iterable.LooseRef.equals(x, y);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseRef 1-10",
    function (expect) {
      const x = [{ a: 1, b: { x: 5, s: [1] } }];
      const y = [{ a: 1, b: x[0].b }];
      const r = EqualityComparer.Iterable.LooseRef.equals(x, y);

      expect(r).toBeFalse();
    },
  ],
];

export default tests;
