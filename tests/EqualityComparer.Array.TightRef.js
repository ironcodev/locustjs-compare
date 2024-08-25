import { EqualityComparer } from "../index.esm.js";

const tests = [
  [
    "EqualityComparer.Array.TightRef 1-1",
    function (expect) {
      const r = EqualityComparer.Array.TightRef.equals([1], [1]);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Array.TightRef 1-2",
    function (expect) {
      const r = EqualityComparer.Array.TightRef.equals([1], ["1"]);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Array.TightRef 1-3",
    function (expect) {
      const r = EqualityComparer.Array.TightRef.equals(
        [1, null],
        ["1", undefined]
      );

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Array.TightRef 1-4",
    function (expect) {
      const r = EqualityComparer.Array.TightRef.equals([null], [""]);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Array.TightRef 1-5",
    function (expect) {
      const r = EqualityComparer.Array.TightRef.equals([undefined], [""]);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Array.TightRef 1-6",
    function (expect) {
      const r = EqualityComparer.Array.TightRef.equals([{}], [{}]);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Array.TightRef 1-7",
    function (expect) {
      const r = EqualityComparer.Array.TightRef.equals([{ a: 1 }], [{ a: 1 }]);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Array.TightRef 1-8",
    function (expect) {
      const x = [{ a: 1 }];
      const y = [x[0]];
      const r = EqualityComparer.Array.TightRef.equals(x, y);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Array.TightRef 1-9",
    function (expect) {
      const x = [{ a: 1, b: { x: 5, s: [1] } }];
      const y = [x[0]];
      const r = EqualityComparer.Array.TightRef.equals(x, y);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Array.TightRef 1-10",
    function (expect) {
      const x = [{ a: 1, b: { x: 5, s: [1] } }];
      const y = [{ a: 1, b: x[0].b }];
      const r = EqualityComparer.Array.TightRef.equals(x, y);

      expect(r).toBeFalse();
    },
  ],
];

export default tests;
