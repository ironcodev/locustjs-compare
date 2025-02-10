import { EqualityComparer } from "../src";

const tests = [
  [
    "EqualityComparer.String.LooseIgnoreCase 1-1",
    function (expect) {
      const r = EqualityComparer.String.LooseIgnoreCase.equals(1, 1);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.String.LooseIgnoreCase 1-2",
    function (expect) {
      const r = EqualityComparer.String.LooseIgnoreCase.equals(1, '1');

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.String.LooseIgnoreCase 1-3",
    function (expect) {
      const r = EqualityComparer.String.LooseIgnoreCase.equals(null, '');

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.String.LooseIgnoreCase 1-4",
    function (expect) {
      const r = EqualityComparer.String.LooseIgnoreCase.equals('', undefined);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.String.LooseIgnoreCase 1-5",
    function (expect) {
      const r = EqualityComparer.String.LooseIgnoreCase.equals('', null);

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.String.LooseIgnoreCase 1-6",
    function (expect) {
      const r = EqualityComparer.String.LooseIgnoreCase.equals('a', 'a');

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.String.LooseIgnoreCase 1-7",
    function (expect) {
      const r = EqualityComparer.String.LooseIgnoreCase.equals('a', 'A');

      expect(r).toBeTrue();
    },
  ]
];

export default tests;
