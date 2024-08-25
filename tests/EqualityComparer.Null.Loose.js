import { EqualityComparer } from "../index.esm.js";

const tests = [
  [
    "EqualityComparer.Null.Loose 1-1",
    function (expect) {
      const r = EqualityComparer.Null.Loose.equals(null, null);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Null.Loose 1-2",
    function (expect) {
      const r = EqualityComparer.Null.Loose.equals(undefined, undefined);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Null.Loose 2-1",
    function (expect) {
      const r = EqualityComparer.Null.Loose.equals(null, undefined);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Null.Loose 2-2",
    function (expect) {
      const r = EqualityComparer.Null.Loose.equals(undefined, null);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Null.Loose 3-1",
    function (expect) {
      const r = EqualityComparer.Null.Loose.equals(undefined, "");

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Null.Loose 3-2",
    function (expect) {
      const r = EqualityComparer.Null.Loose.equals("", undefined);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Null.Loose 4-1",
    function (expect) {
      const r = EqualityComparer.Null.Loose.equals(null, "");

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Null.Loose 4-2",
    function (expect) {
      const r = EqualityComparer.Null.Loose.equals("", null);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Null.Loose 5",
    function (expect) {
      const r = EqualityComparer.Null.Loose.equals("", "");

      expect(r).toBeTrue();
    },
  ],
];

export default tests;
