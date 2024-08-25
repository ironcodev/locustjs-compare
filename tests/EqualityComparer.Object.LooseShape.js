import { EqualityComparer } from "../index.esm.js";

const tests = [
  [
    "EqualityComparer.Object.LooseShape 1-1",
    function (expect) {
      const r = EqualityComparer.Object.LooseShape.equals({}, {});

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.LooseShape 1-2",
    function (expect) {
      const r = EqualityComparer.Object.LooseShape.equals({ a: 1 }, { a: 1 });

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.LooseShape 1-3",
    function (expect) {
      const r = EqualityComparer.Object.LooseShape.equals({ a: 1 }, { a: "1" });

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.LooseShape 1-4",
    function (expect) {
      const r = EqualityComparer.Object.LooseShape.equals(
        { a: 1, b: true, c: null },
        { a: "1", b: true, c: undefined }
      );

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.LooseShape 1-5",
    function (expect) {
      const r = EqualityComparer.Object.LooseShape.equals({ a: {} }, { a: {} });

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.LooseShape 1-6",
    function (expect) {
      const r = EqualityComparer.Object.LooseShape.equals(
        { a: { b: 1 } },
        { a: { b: "1" } }
      );

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.LooseShape 1-7",
    function (expect) {
      const r = EqualityComparer.Object.LooseShape.equals(
        { a: { b: 1, c: undefined } },
        { a: { b: "1", c: "" } }
      );

      expect(r).toBeTrue();
    },
  ],
];

export default tests;
