import { EqualityComparer } from "../index.esm.js";

const tests = [
  [
    "EqualityComparer.Object.LooseRef 1-1",
    function (expect) {
      const r = EqualityComparer.Object.LooseRef.equals({}, {});

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.LooseRef 1-2",
    function (expect) {
      const r = EqualityComparer.Object.LooseRef.equals({ a: 1 }, { a: 1 });

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.LooseRef 1-3",
    function (expect) {
      const r = EqualityComparer.Object.LooseRef.equals({ a: 1 }, { a: "1" });

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.LooseRef 1-4",
    function (expect) {
      const r = EqualityComparer.Object.LooseRef.equals(
        { a: 1, b: true, c: null },
        { a: "1", b: true, c: undefined }
      );

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.LooseRef 1-5",
    function (expect) {
      const r = EqualityComparer.Object.LooseRef.equals({ a: {} }, { a: {} });

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Object.LooseRef 1-6",
    function (expect) {
      const r = EqualityComparer.Object.LooseRef.equals(
        { a: { b: 1 } },
        { a: { b: "1" } }
      );

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Object.LooseRef 1-7",
    function (expect) {
      const x = { a: { b: 1 } };
      const y = { a: x.a };

      const r = EqualityComparer.Object.LooseRef.equals(x, y);

      expect(r).toBeTrue();
    },
  ],
];

export default tests;
