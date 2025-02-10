import { EqualityComparer } from "../src";

const tests = [
  [
    "EqualityComparer.Iterable.TightRef 1-1",
    function (expect) {
      function* itA() {
        yield 1;
      }
      function* itB() {
        yield 1;
      }
      const r = EqualityComparer.Iterable.TightRef.equals(itA(), itB());

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.TightRef 1-2",
    function (expect) {
      function* itA() {
        yield 1;
      }
      function* itB() {
        yield "1";
      }
      const r = EqualityComparer.Iterable.TightRef.equals(itA(), itB());

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Iterable.TightRef 1-3",
    function (expect) {
      function* itA() {
        yield 1;
        yield null;
      }
      function* itB() {
        yield 1;
        yield undefined;
      }
      const r = EqualityComparer.Iterable.TightRef.equals(itA(), itB());

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Iterable.TightRef 1-4",
    function (expect) {
      function* itA() {
        yield null;
      }
      function* itB() {
        yield "";
      }
      const r = EqualityComparer.Iterable.TightRef.equals(itA(), itB());

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Iterable.TightRef 1-5",
    function (expect) {
      function* itA() {
        yield undefined;
      }
      function* itB() {
        yield "";
      }
      const r = EqualityComparer.Iterable.TightRef.equals(itA(), itB());

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Iterable.TightRef 1-6",
    function (expect) {
      function* itA() {
        yield {};
      }
      function* itB() {
        yield {};
      }
      const r = EqualityComparer.Iterable.TightRef.equals(itA(), itB());

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Iterable.TightRef 1-7",
    function (expect) {
      function* itA() {
        yield { a: 1 };
      }
      function* itB() {
        yield { a: 1 };
      }
      const r = EqualityComparer.Iterable.TightRef.equals(itA(), itB());

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Iterable.TightRef 1-8",
    function (expect) {
      const x = { a: 1 };
      function* itA() {
        yield x;
      }
      function* itB() {
        yield x;
      }
      const r = EqualityComparer.Iterable.TightRef.equals(itA(), itB());

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.TightRef 1-9",
    function (expect) {
      const x = { a: 1, b: { x: 5, s: [1] } };
      const y = x;
      function* itA() {
        yield x;
      }
      function* itB() {
        yield y;
      }
      const r = EqualityComparer.Iterable.TightRef.equals(itA(), itB());

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Iterable.TightRef 1-10",
    function (expect) {
      const x = { a: 1, b: { x: 5, s: [1] } };
      const y = { a: 1, b: x.b };
      function* itA() {
        yield x;
      }
      function* itB() {
        yield y;
      }
      const r = EqualityComparer.Iterable.TightRef.equals(itA(), itB());

      expect(r).toBeFalse();
    },
  ],
];

export default tests;
