import { EqualityComparer } from "../src";

const tests = [
  [
    "EqualityComparer.String.TightOrdinal 1-1",
    function (expect) {
      const r = EqualityComparer.String.TightOrdinal.equals(1, 1);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.String.TightOrdinal 1-2",
    function (expect) {
      const r = EqualityComparer.String.TightOrdinal.equals(1, '1');

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.String.TightOrdinal 1-3",
    function (expect) {
      const r = EqualityComparer.String.TightOrdinal.equals(null, '');

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.String.TightOrdinal 1-4",
    function (expect) {
      const r = EqualityComparer.String.TightOrdinal.equals('', undefined);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.String.TightOrdinal 1-5",
    function (expect) {
      const r = EqualityComparer.String.TightOrdinal.equals('', null);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.String.TightOrdinal 1-6",
    function (expect) {
      const r = EqualityComparer.String.TightOrdinal.equals('a', 'a');

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.String.TightOrdinal 1-7",
    function (expect) {
      const r = EqualityComparer.String.TightOrdinal.equals('a', 'A');

      expect(r).toBeFalse();
    },
  ]
];

export default tests;
