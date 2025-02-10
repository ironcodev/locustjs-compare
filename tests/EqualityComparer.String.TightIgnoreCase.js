import { EqualityComparer } from "../src";

const tests = [
  [
    "EqualityComparer.String.TightIgnoreCase 1-1",
    function (expect) {
      const r = EqualityComparer.String.TightIgnoreCase.equals(1, 1);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.String.TightIgnoreCase 1-2",
    function (expect) {
      const r = EqualityComparer.String.TightIgnoreCase.equals(1, '1');

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.String.TightIgnoreCase 1-3",
    function (expect) {
      const r = EqualityComparer.String.TightIgnoreCase.equals(null, '');

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.String.TightIgnoreCase 1-4",
    function (expect) {
      const r = EqualityComparer.String.TightIgnoreCase.equals('', undefined);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.String.TightIgnoreCase 1-5",
    function (expect) {
      const r = EqualityComparer.String.TightIgnoreCase.equals('', null);

      expect(r).toBeFalse();
    },
  ],
  [
    "EqualityComparer.String.TightIgnoreCase 1-6",
    function (expect) {
      const r = EqualityComparer.String.TightIgnoreCase.equals('a', 'a');

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.String.TightIgnoreCase 1-7",
    function (expect) {
      const r = EqualityComparer.String.TightIgnoreCase.equals('a', 'A');

      expect(r).toBeTrue();
    },
  ]
];

export default tests;
