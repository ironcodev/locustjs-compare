import { EqualityComparer } from "../index.esm.js";

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
      const r = EqualityComparer.Primitive.Loose.equals(1, '1');

      expect(r).toBeTrue();
    },
  ]
];

export default tests;
