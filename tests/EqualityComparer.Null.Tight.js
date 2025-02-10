import { EqualityComparer } from "../src";

const tests = [
  [
    "EqualityComparer.Null.Tight 1-1",
    function (expect) {
      const r = EqualityComparer.Null.Tight.equals(null, null);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Null.Tight 1-2",
    function (expect) {
      const r = EqualityComparer.Null.Tight.equals(undefined, undefined);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Null.Tight 2-1",
    function (expect) {
      const r = EqualityComparer.Null.Tight.equals(null, undefined);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Null.Tight 2-2",
    function (expect) {
      const r = EqualityComparer.Null.Tight.equals(undefined, null);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Null.Tight 3-1",
    function (expect) {
      const r = EqualityComparer.Null.Tight.equals(undefined, "");

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Null.Tight 3-2",
    function (expect) {
      const r = EqualityComparer.Null.Tight.equals("", undefined);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Null.Tight 4-1",
    function (expect) {
      const r = EqualityComparer.Null.Tight.equals(null, "");

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Null.Tight 4-2",
    function (expect) {
      const r = EqualityComparer.Null.Tight.equals("", null);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.Null.Tight 5",
    function (expect) {
      const r = EqualityComparer.Null.Tight.equals("", "");

      expect(r).toBeTrue();
    },
  ],
];

export default tests;
