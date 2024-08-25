import { EqualityComparer } from "../index.esm.js";

const tests = [
  [
    "EqualityComparer.Object.TightRef 1-1",
    function (expect) {
      const r = EqualityComparer.Object.TightRef.equals({}, {});

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.TightRef 1-2",
    function (expect) {
      const r = EqualityComparer.Object.TightRef.equals({ a: 1 }, { a: 1 });

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.TightRef 1-3",
    function (expect) {
      const r = EqualityComparer.Object.TightRef.equals({ a: 1 }, { a: "1" });

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Object.TightRef 1-4",
    function (expect) {
      const r = EqualityComparer.Object.TightRef.equals(
        { a: 1, b: true, c: null },
        { a: 1, b: true, c: undefined }
      );

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Object.TightRef 1-5",
    function (expect) {
      const r = EqualityComparer.Object.TightRef.equals({ a: {} }, { a: {} });

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Object.TightRef 1-6",
    function (expect) {
      const r = EqualityComparer.Object.TightRef.equals(
        { a: { b: 1 } },
        { a: { b: "1" } }
      );

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Object.TightRef 1-7",
    function (expect) {
      const r = EqualityComparer.Object.TightRef.equals(
        { a: { b: 1, c: undefined } },
        { a: { b: "1", c: "" } }
      );

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Object.TightRef 1-8",
    function (expect) {
      const r = EqualityComparer.Object.TightRef.equals(
        { a: { b: 1, c: undefined } },
        { a: { b: 1, c: undefined } }
      );

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Object.TightRef 1-9",
    function (expect) {
      const x = { a: { b: 1, c: undefined } }
      const y = { a: x.a }
      const r = EqualityComparer.Object.TightRef.equals(x, y);

      expect(r).toBeTrue();
    },
  ]
];

export default tests;
