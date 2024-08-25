import { EqualityComparer } from "../index.esm.js";

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
  ]
];

export default tests;
