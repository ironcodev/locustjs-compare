import { EqualityComparer } from "../src";

const tests = [
  [
    "EqualityComparer.Object.LooseShape 1-1",
    function (expect) {
      const r = EqualityComparer.Object.LooseShape.equals({}, {});

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.LooseShape 1-2",
    function (expect) {
      const r = EqualityComparer.Object.LooseShape.equals({ a: 1 }, { a: 1 });

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.LooseShape 1-3",
    function (expect) {
      const r = EqualityComparer.Object.LooseShape.equals({ a: 1 }, { a: "1" });

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.LooseShape 1-4",
    function (expect) {
      const r = EqualityComparer.Object.LooseShape.equals(
        { a: 1, b: true, c: null },
        { a: "1", b: true, c: undefined }
      );

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.LooseShape 1-5",
    function (expect) {
      const r = EqualityComparer.Object.LooseShape.equals({ a: {} }, { a: {} });

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.LooseShape 1-6",
    function (expect) {
      const r = EqualityComparer.Object.LooseShape.equals(
        { a: { b: 1 } },
        { a: { b: "1" } }
      );

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.LooseShape 1-7",
    function (expect) {
      const r = EqualityComparer.Object.LooseShape.equals(
        { a: { b: 1, c: undefined } },
        { a: { b: "1", c: "" } }
      );

      expect(r).toBeTrue();
    },
  ],
  [
    "EqualityComparer.Object.LooseShape 1-8",
    function (expect) {
      const p1 = {
        name: "Ali",
        location: {
          city: {
            id: 101,
            name: "Tehran",
          },
        },
        points: [17.5, 19.25, 14.0],
        addresses: [
          { id: 5274, value: "address 1", default: true },
          { id: 5705, value: "address 2", default: false },
        ],
      };
      const p2 = {
        name: "Ali",
        location: {
          city: {
            id: 101,
            name: "Tehran",
          },
        },
        points: [17.5, 19.25, 14.0],
        addresses: [
          { id: 5274, value: "address 1", default: true },
          { id: 5705, value: "address 2", default: false },
        ],
      };
      const r = EqualityComparer.Object.LooseShape.equals(p1, p2);

      expect(r).toBeTrue();
    },
  ],
];

export default tests;
