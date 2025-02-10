import { EqualityComparer } from "../src";

const tests = [
  [
    "EqualityComparer.Array.LooseShape 1-1",
    function (expect) {
      const r = EqualityComparer.Array.LooseShape.equals([1], [1]);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Array.LooseShape 1-2",
    function (expect) {
      const r = EqualityComparer.Array.LooseShape.equals([1], ["1"]);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Array.LooseShape 1-3",
    function (expect) {
      const r = EqualityComparer.Array.LooseShape.equals(
        [1, null],
        ["1", undefined]
      );

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Array.LooseShape 1-4",
    function (expect) {
      const r = EqualityComparer.Array.LooseShape.equals([null], [""]);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Array.LooseShape 1-5",
    function (expect) {
      const r = EqualityComparer.Array.LooseShape.equals([undefined], [""]);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Array.LooseShape 1-6",
    function (expect) {
      const r = EqualityComparer.Array.LooseShape.equals([{}], [{}]);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Array.LooseShape 1-7",
    function (expect) {
      const r = EqualityComparer.Array.LooseShape.equals(
        [{ a: 1 }],
        [{ a: 1 }]
      );

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Array.LooseShape 1-8",
    function (expect) {
      const r = EqualityComparer.Array.LooseShape.equals(
        [{ a: 1 }],
        [{ a: "1" }]
      );

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Array.LooseShape 1-9",
    function (expect) {
      const r = EqualityComparer.Array.LooseShape.equals(
        [{ a: 1, b: { x: 5, s: [1] } }],
        [{ a: "1", b: { x: "5", s: ["1"] } }]
      );

      expect(r).toBeTrue();
    },
  ],
];

export default tests;
