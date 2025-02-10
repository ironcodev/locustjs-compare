import { EqualityComparer } from "../src";

const tests = [
  [
    "EqualityComparer.Iterable.TightShape 1-1",
    function (expect) {
      function* itA() {
        yield 1;
      }
      function* itB() {
        yield 1;
      }
      const r = EqualityComparer.Iterable.TightShape.equals(itA(), itB());

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.TightShape 1-2",
    function (expect) {
      function* itA() {
        yield 1;
      }
      function* itB() {
        yield "1";
      }
      const r = EqualityComparer.Iterable.TightShape.equals(itA(), itB());

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Iterable.TightShape 1-3",
    function (expect) {
      function* itA() {
        yield 1;
        yield null;
      }
      function* itB() {
        yield 1;
        yield undefined;
      }
      const r = EqualityComparer.Iterable.TightShape.equals(itA(), itB());

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Iterable.TightShape 1-4",
    function (expect) {
      function* itA() {
        yield "";
      }
      function* itB() {
        yield null;
      }
      const r = EqualityComparer.Iterable.TightShape.equals(itA(), itB());

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Iterable.TightShape 1-5",
    function (expect) {
      function* itA() {
        yield undefined;
      }
      function* itB() {
        yield null;
      }
      const r = EqualityComparer.Iterable.TightShape.equals(itA(), itB());

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Iterable.TightShape 1-6",
    function (expect) {
      function* itA() {
        yield {};
      }
      function* itB() {
        yield {};
      }
      const r = EqualityComparer.Iterable.TightShape.equals(itA(), itB());

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.TightShape 1-7",
    function (expect) {
      function* itA() {
        yield { a: 1 };
      }
      function* itB() {
        yield { a: 1 };
      }
      const r = EqualityComparer.Iterable.TightShape.equals(itA(), itB());

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.TightShape 1-8",
    function (expect) {
      function* itA() {
        yield { a: 1 };
      }
      function* itB() {
        yield { a: "1" };
      }
      const r = EqualityComparer.Iterable.TightShape.equals(itA(), itB());

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Iterable.TightShape 1-9",
    function (expect) {
      function* itA() {
        yield { a: 1, b: { x: 5, s: [1] } };
      }
      function* itB() {
        yield { a: 1, b: { x: 5, s: [1] } };
      }
      const r = EqualityComparer.Iterable.TightShape.equals(itA(), itB());

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.TightShape 1-10",
    function (expect) {
      function* itA() {
        yield { a: 1, b: { x: 5, s: [1, null] } };
      }
      function* itB() {
        yield { a: 1, b: { x: 5, s: [1, undefined] } };
      }
      const r = EqualityComparer.Iterable.TightShape.equals(itA(), itB());

      expect(r).toBeFalse();
    },
  ],
];

export default tests;
