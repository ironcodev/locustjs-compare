import { EqualityComparer } from "../src";

const tests = [
  [
    "EqualityComparer.Object.TightShape 1-1",
    function (expect) {
      const r = EqualityComparer.Object.TightShape.equals({}, {});

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.TightShape 1-2",
    function (expect) {
      const r = EqualityComparer.Object.TightShape.equals({ a: 1 }, { a: 1 });

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.TightShape 1-3",
    function (expect) {
      const r = EqualityComparer.Object.TightShape.equals({ a: 1 }, { a: "1" });

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Object.TightShape 1-4",
    function (expect) {
      const r = EqualityComparer.Object.TightShape.equals(
        { a: 1, b: true, c: null },
        { a: 1, b: true, c: undefined }
      );

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Object.TightShape 1-5",
    function (expect) {
      const r = EqualityComparer.Object.TightShape.equals({ a: {} }, { a: {} });

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.TightShape 1-6",
    function (expect) {
      const r = EqualityComparer.Object.TightShape.equals(
        { a: { b: 1 } },
        { a: { b: "1" } }
      );

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Object.TightShape 1-7",
    function (expect) {
      const r = EqualityComparer.Object.TightShape.equals(
        { a: { b: 1, c: undefined } },
        { a: { b: "1", c: "" } }
      );

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Object.TightShape 1-8",
    function (expect) {
      const r = EqualityComparer.Object.TightShape.equals(
        { a: { b: 1, c: undefined } },
        { a: { b: 1, c: undefined } }
      );

      expect(r).toBeTrue();
    },
  ],
];

export default tests;
