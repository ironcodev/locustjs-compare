import { EqualityComparer } from "../src";

const tests = [
  [
    "EqualityComparer.Array.TightShape 1-1",
    function (expect) {
      const r = EqualityComparer.Array.TightShape.equals([1], [1]);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Array.TightShape 1-2",
    function (expect) {
      const r = EqualityComparer.Array.TightShape.equals([1], ["1"]);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Array.TightShape 1-3",
    function (expect) {
      const r = EqualityComparer.Array.TightShape.equals(
        [1, null],
        ["1", undefined]
      );

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Array.TightShape 1-4",
    function (expect) {
      const r = EqualityComparer.Array.TightShape.equals([null], [""]);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Array.TightShape 1-5",
    function (expect) {
      const r = EqualityComparer.Array.TightShape.equals([undefined], [""]);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Array.TightShape 1-6",
    function (expect) {
      const r = EqualityComparer.Array.TightShape.equals([{}], [{}]);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Array.TightShape 1-7",
    function (expect) {
      const r = EqualityComparer.Array.TightShape.equals(
        [{ a: 1 }],
        [{ a: 1 }]
      );

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Array.TightShape 1-8",
    function (expect) {
      const r = EqualityComparer.Array.TightShape.equals(
        [{ a: 1 }],
        [{ a: "1" }]
      );

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Array.TightShape 1-9",
    function (expect) {
      const r = EqualityComparer.Array.TightShape.equals(
        [{ a: 1, b: { x: 5, s: [1] } }],
        [{ a: 1, b: { x: 5, s: [1] } }]
      );

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Array.TightShape 1-10",
    function (expect) {
      const r = EqualityComparer.Array.TightShape.equals(
        [{ a: 1, b: { x: 5, s: [1, null] } }],
        [{ a: 1, b: { x: 5, s: [1, undefined] } }]
      );

      expect(r).toBeFalse();
    },
  ]
];

export default tests;
