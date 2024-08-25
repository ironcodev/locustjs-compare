import { EqualityComparer } from "../index.esm.js";

const tests = [
  [
    "EqualityComparer.Iterable.LooseShape 1-11",
    function (expect) {
      const r = EqualityComparer.Iterable.LooseShape.equals([1], [1]);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseShape 1-12",
    function (expect) {
      const x = function*() { yield 1; }
      const y = function*() { yield 1; }
      const r = EqualityComparer.Iterable.LooseShape.equals(x(), y());

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseShape 1-21",
    function (expect) {
      const r = EqualityComparer.Iterable.LooseShape.equals([1], ["1"]);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseShape 1-22",
    function (expect) {
      const x = function*() { yield 1; }
      const y = function*() { yield "1"; }
      const r = EqualityComparer.Iterable.LooseShape.equals(x(), y());

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseShape 1-31",
    function (expect) {
      const r = EqualityComparer.Iterable.LooseShape.equals(
        [1, null],
        ["1", undefined]
      );

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseShape 1-32",
    function (expect) {
      const x = function*() { yield null; }
      const y = function*() { yield undefined; }
      const r = EqualityComparer.Iterable.LooseShape.equals(x(), y());

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseShape 1-41",
    function (expect) {
      const r = EqualityComparer.Iterable.LooseShape.equals([null], [""]);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseShape 1-42",
    function (expect) {
      const x = function*() { yield null; }
      const y = function*() { yield ""; }
      const r = EqualityComparer.Iterable.LooseShape.equals(x(), y());

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseShape 1-51",
    function (expect) {
      const r = EqualityComparer.Iterable.LooseShape.equals([undefined], [""]);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseShape 1-52",
    function (expect) {
      const x = function*() { yield undefined; }
      const y = function*() { yield ""; }
      const r = EqualityComparer.Iterable.LooseShape.equals(x(), y());

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseShape 1-61",
    function (expect) {
      const r = EqualityComparer.Iterable.LooseShape.equals([{}], [{}]);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseShape 1-62",
    function (expect) {
      const x = function*() { yield {}; }
      const y = function*() { yield {}; }
      const r = EqualityComparer.Iterable.LooseShape.equals(x(), y());

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseShape 1-71",
    function (expect) {
      const r = EqualityComparer.Iterable.LooseShape.equals(
        [{ a: 1 }],
        [{ a: 1 }]
      );

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseShape 1-72",
    function (expect) {
      const x = function*() { yield { a: 1 }; }
      const y = function*() { yield { a: 1 }; }
      const r = EqualityComparer.Iterable.LooseShape.equals(x(), y());

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseShape 1-81",
    function (expect) {
      const r = EqualityComparer.Iterable.LooseShape.equals(
        [{ a: 1 }],
        [{ a: "1" }]
      );

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseShape 1-82",
    function (expect) {
      const x = function*() { yield { a: 1 }; }
      const y = function*() { yield { a: "1" }; }
      const r = EqualityComparer.Iterable.LooseShape.equals(x(), y());

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseShape 1-91",
    function (expect) {
      const r = EqualityComparer.Iterable.LooseShape.equals(
        [{ a: 1, b: { x: 5, s: [1] } }],
        [{ a: "1", b: { x: "5", s: ["1"] } }]
      );

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.LooseShape 1-92",
    function (expect) {
      const x = function*() { yield { a: 1, b: { x: 5, s: [1] } }; }
      const y = function*() { yield { a: "1", b: { x: "5", s: ["1"] } }; }
      const r = EqualityComparer.Iterable.LooseShape.equals(x(), y());

      expect(r).toBeTrue();
    },
  ],
];

export default tests;
