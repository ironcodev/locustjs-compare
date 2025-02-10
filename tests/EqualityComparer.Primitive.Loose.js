import { EqualityComparer } from "../src";

const tests = [
  [
    "EqualityComparer.Primitive.Loose 1-1",
    function (expect) {
      const r = EqualityComparer.Primitive.Loose.equals(1, 1);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Primitive.Loose 1-2",
    function (expect) {
      const r = EqualityComparer.Primitive.Loose.equals(1, "1");

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Primitive.Loose 1-3",
    function (expect) {
      const r = EqualityComparer.Primitive.Loose.equals(true, true);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Primitive.Loose 1-4",
    function (expect) {
      const r = EqualityComparer.Primitive.Loose.equals(true, new Boolean(true));

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Primitive.Loose 1-5",
    function (expect) {
      const r = EqualityComparer.Primitive.Loose.equals(true, "true");

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Primitive.Loose 1-6",
    function (expect) {
      const r = EqualityComparer.Primitive.Loose.equals(true, "true   ");

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Primitive.Loose 1-7",
    function (expect) {
      const r = EqualityComparer.Primitive.Loose.equals(true, "True");

      expect(r).toBeFalse();
    },
  ],
];

export default tests;
