import { EqualityComparer } from "../index.esm.js";

const tests = [
  [
    "EqualityComparer.String.Ordinal 1-1",
    function (expect) {
      const r = EqualityComparer.String.Ordinal.equals(1, 1);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.String.Ordinal 1-2",
    function (expect) {
      const r = EqualityComparer.String.Ordinal.equals(1, '1');

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.String.Ordinal 1-3",
    function (expect) {
      const r = EqualityComparer.String.Ordinal.equals(null, '');

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.String.Ordinal 1-4",
    function (expect) {
      const r = EqualityComparer.String.Ordinal.equals('', undefined);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.String.Ordinal 1-5",
    function (expect) {
      const r = EqualityComparer.String.Ordinal.equals('', null);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.String.Ordinal 1-6",
    function (expect) {
      const r = EqualityComparer.String.Ordinal.equals('a', 'a');

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.String.Ordinal 1-7",
    function (expect) {
      const r = EqualityComparer.String.Ordinal.equals('a', 'A');

      expect(r).toBeFalse();
    },
  ]
];

export default tests;
