import { EqualityComparer } from "../src";

const tests = [
  [
    "EqualityComparer.Primitive.Tight 1-1",
    function (expect) {
      const r = EqualityComparer.Primitive.Tight.equals(1, 1);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Primitive.Tight 1-2",
    function (expect) {
      const r = EqualityComparer.Primitive.Tight.equals(1, '1');

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Primitive.Tight 1-3",
    function (expect) {
      const r = EqualityComparer.Primitive.Tight.equals(true, true);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Primitive.Tight 1-4",
    function (expect) {
      const r = EqualityComparer.Primitive.Tight.equals(true, new Boolean(true));

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Primitive.Tight 1-5",
    function (expect) {
      const r = EqualityComparer.Primitive.Tight.equals(true, "true");

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Primitive.Tight 1-6",
    function (expect) {
      const r = EqualityComparer.Primitive.Tight.equals(true, "True");

      expect(r).toBeFalse();
    },
  ],
];

export default tests;
