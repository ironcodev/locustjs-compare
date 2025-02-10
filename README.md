# @locustjs/compare
This library provides classes for equality comparison and comparers. These comparers are useful mainly when working with complex data types like arrays and objects.

One good usecase is when we want to find an element in an aray of objects and prefer to perform a shape comparison. We cannot use the ordinary Array `find` method, because it performs a reference comparison.

## Current Version
```
2.1.0
```

# Equality Comparers
In order for a class to be an equality comparer it should derive from a base abstract class named `EqualityComparer` and implement an `equals(x, y)` method. This method is used to check whether the two arguments `x` and `y` are equal or not.

```javascript
class EqualityComparer {
    equals(x, y) {
        throwNotImplementedException(`equals(x, y)`);
    }
}
```

List of equality comparers:
- `NullOrEmptyEqualityComparer`
- `PrimitiveEqualityComparer`
- `StringEqualityComparer`
- `ObjectEqualityComparer`
- `ArrayEqualityComparer`
- `IterableEqualityComparer`
- `FunctionEqualityComparer`

There is a `BaseEqualityComparer` class derived from `EqualityComparer` with a common functionality for performing equality comparison. All of the above equality comparers (except `NullOrEmptyEqualityComparer`) derive from `BaseEqualityComparer`.

## NullOrEmptyEqualityComparer
This class is used to check equality of `null`, `undefined`, `NaN` or empty (zero-length) strings.

By default it uses `loose` comparison which assumes `null`, `undefined`, `NaN` and empty string (`''`) are equal.

Example:
```javascript
const ec = new NullOrEmptyEqualityComparer();   // loose equality comparison

console.log(ec.equals(null, undefined)) // true
console.log(ec.equals(undefined, '')) // true
console.log(ec.equals(undefined, NaN)) // true
console.log(ec.equals(null, '')) // true
console.log(ec.equals(NaN, '')) // true
console.log(ec.equals(null, NaN)) // true
```

In order to perform a strict or `tight` comparison we can pass a `true` argument to `NullOrEmptyEqualityComparer` constructor.
```javascript
const ec = new NullOrEmptyEqualityComparer(true);

console.log(ec.equals(null, undefined)) // false
console.log(ec.equals(null, NaN)) // false
console.log(ec.equals(undefined, '')) // false
console.log(ec.equals(null, '')) // false
console.log(ec.equals(null, null)) // true
console.log(ec.equals(undefined, undefined)) // true
```

`EqualityComparer` class provides a static `Null` property which returns an object with `Loose` and `Tight` properties.
They return default `NullOrEmptyEqualityComparer` instances with proper setting, making it easier to use `NullOrEmptyEqualityComparer` withought manually instantiating from this class.

```javascript
console.log(EqualityComparer.Null.Loose.equals(null, undefined)) // true
console.log(EqualityComparer.Null.Tight.equals(null, undefined)) // false
```

## StringEqualityComparer
This class is used to check equality of strings.

Example:
```javascript
const ec = new StringEqualityComparer();

console.log(ec.equals("hello", "Hello")) // false
```

By default, it performs `ordinal` comparison. By passing a `StringEqualityComparerType` enum or string value to its constructor, it can perform ignore-case comparison.

```javascript
const ec = new StringEqualityComparer(StringEqualityComparerType.ignoreCase);
// or ec = new StringEqualityComparer('ignoreCase');

console.log(ec.equals("hello", "Hello")) // true
```

`EqualityComparer` class provides a static `String` property which returns an object with default `StringEqualityComparer` instances with proper setting, making it easier to use `StringEqualityComparer`.

```javascript
const s1 = "hello";
const s2 = "Hello";

console.log(EqualityComparer.String.Ordinal.equals(s1, s2)) // false
console.log(EqualityComparer.String.IgnoreCase.equals(s1, s2)) // true
```

## PrimitiveEqualityComparer
This class is used to check equality of primitve data types (`number`, `boolean`, `string`, `date`).

Example:
```javascript
const ec = new PrimitiveEqualityComparer();

console.log(ec.equals(25, "25")) // true
console.log(ec.equals(true, "true")) // true
console.log(ec.equals(true, new Boolean(true))) // true
```

By default, it performs `loose` comparison, i.e., `25` equals `"25"` or `true` equals `"true"`. By passing `false` to its constructor, we can ask a `tight` comparison to be made. It should be pointed out that, in `tight` mode, `bool` and `Boolean` are still asumed equal.

```javascript
const ec = new PrimitiveEqualityComparer(false);

console.log(ec.equals(25, "25")) // false
console.log(ec.equals(true, "true")) // false
console.log(ec.equals(true, new Boolean(true))) // true
```

`EqualityComparer` class provides a static `Primitive` property which returns an object with default `PrimitiveEqualityComparer` instances with proper setting, making it easier to use `PrimitiveEqualityComparer`.

```javascript
console.log(EqualityComparer.Primitive.Loose.equals(25, "25")) // true
console.log(EqualityComparer.Primitive.Tight.equals(25, "25")) // false
```

## ArrayEqualityComparer
This class is used to check equality of arrays.

Example:
```javascript
const ec = new ArrayEqualityComparer();

console.log(ec.equals([25], ["25"])) // true
console.log(ec.equals([{ a: 25 }], [{ a: "25" }])) // true
```

By default, it performs `loose-shape` comparison, i.e., for primitive data types the comparison is `loose` and for complex data types (objects, arrays, iterables) the comparison is by `shape`.
By passing a `EqualityComparerType` enum value, this can be changed.

```javascript
const ec = new ArrayEqualityComparer(EqualityComparerType.looseRef);

console.log(ec.equals([25], ["25"])) // true
console.log(ec.equals([{ a: 25 }], [{ a: 25 }])) // false

ec = new ArrayEqualityComparer(EqualityComparerType.tightShape);

console.log(ec.equals([25], ["25"])) // false
console.log(ec.equals([{ a: 25 }], [{ a: 25 }])) // true

ec = new ArrayEqualityComparer(EqualityComparerType.tightRef);

console.log(ec.equals([25], ["25"])) // false
console.log(ec.equals([{ a: 25 }], [{ a: 25 }])) // false
```

`EqualityComparer` class provides a static `Array` property which returns an object with default `ArrayEqualityComparer` instances with proper setting, making it easier to use `ArrayEqualityComparer`.

```javascript
console.log(EqualityComparer.Array.LooseShape.equals([25], ["25"])) // true
console.log(EqualityComparer.Array.TightShape.equals([25], ["25"])) // false
```

## IterableEqualityComparer
This class is used to check equality of iterables (anything that returns an iterator and could be iterated).

Example:
```javascript
const ec = new IterableEqualityComparer();

function* f1() {
	yield 25;
}
function* f2() {
	yield "25";
}

console.log(ec.equals(f1(), f2())) // true
```

```javascript
const ec = new IterableEqualityComparer();

function* f1() {
	yield { a: 25 };
}
function* f2() {
	yield { a: "25" };
}

console.log(ec.equals(f1(), f2())) // true
```

By default, it performs `loose-shape` comparison, i.e., for primitive data types the comparison is `loose` and for complex data types (objects, arrays and iterables) the comparison is by `shape`.
By passing a `EqualityComparerType` enum value, this can be changed.

`EqualityComparer` class provides a static `Iterable` property which returns an object with default `IterableEqualityComparer` instances with proper setting, making it easier to use `IterableEqualityComparer`.

```javascript
function* f1() {
	yield 25;
}
function* f2() {
	yield "25";
}

console.log(EqualityComparer.Iterable.LooseShape.equals(f1(), f2())) // true
console.log(EqualityComparer.Iterable.TightShape.equals(f1(), f2())) // false
```

if the two arguments passed to `IterableEqualityComparer` are arryas, it uses an internal `ArrayEqualityComparer` instance to compare the arguments.

## ObjectEqualityComparer
This class is used to check equality of Objects.

Example 1:
```javascript
const ec = new ObjectEqualityComparer();

const a = { x; 10, y: 23.5, name: "A101" }
const b = { x; "10", y: "23.5", name: "A101" }

console.log(ec.equals(a, b)) // true
```

Example 1:
```javascript
const ec = new ObjectEqualityComparer();

const p1 = {
    name: "Ali",
    location: {
        city: {
            id: 101,
            name: "Tehran"
        }
    },
    points: [17.5, 19.25, 14.0 ],
    addresses: [
        { id: 5274, value: "address 1", default: true },
        { id: 5705, value: "address 2", default: false }
    ]
}
const p2 = {
    name: "Ali",
    location: {
        city: {
            id: 101,
            name: "Tehran"
        }
    },
    points: [17.5, 19.25, 14.0 ],
    addresses: [
        { id: 5274, value: "address 1", default: true },
        { id: 5705, value: "address 2", default: false }
    ]
}

console.log(ec.equals(p1, p2)) // true
```

By default, it performs `loose-shape` comparison, i.e., for primitive data types the comparison is `loose` and for complex data types the comparison is by `shape`.
By passing a `EqualityComparerType` enum value, this can be changed.

`EqualityComparer` class provides a static `Object` property which returns an object with default `ObjectEqualityComparer` instances with proper setting, making it easier to use `ObjectEqualityComparer`.

```javascript
const a = { x; 10, y: 23.5, name: "A101" }
const b = { x; "10", y: "23.5", name: "A101" }

console.log(EqualityComparer.Object.TightShape.equals(a, b)) // false
```

If an object includes nested objects or arrays, `ObjectEqualityComparer` uses itself and an internal `ArrayEqualityComparer` instance recursively to compare the arguments.

## FunctionEqualityComparer
This class is used to check equality of functions.

Example:
```javascript
const ec = new FunctionEqualityComparer();
const f1 = function() { }
const f2 = function() { }
const f3 = f1;

console.log(ec.equals(f1, f2)) // false
console.log(ec.equals(f3, f1)) // true
```

By default, `FunctionEqualityComparer` checks reference equality. By passing a `FunctionEqualityComparerType` enum value or a string value to its constructor, it can perform source equality.

```javascript
const ec = new FunctionEqualityComparer(FunctionEqualityComparerType.source);
// or ec = new FunctionEqualityComparer('source');

const f1 = function() { }
const f2 = function() { }

console.log(ec.equals(f1, f2)) // true
```

`EqualityComparer` class provides a static `Function` property which returns an object with default `FunctionEqualityComparer` instances with proper setting, making it easier to use `FunctionEqualityComparer`.

```javascript
const f1 = function() { }
const f2 = function() { }

console.log(EqualityComparer.Function.Ref.equals(f1, f2)) // false
console.log(EqualityComparer.Function.Source.equals(f1, f2)) // true
```

# Enums
## ScalerEqualityComparerType
```javascript
{
    loose: 0,   // == comparison
    tight: 1,   // === comparison
}
```

## ComplexEqualityComparerType
```javascript
{
    shape: 0,   // compare objects' shape
    ref: 1,     // compare objects' references
}
```

## FunctionEqualityComparerType
```javascript
{
    ref: 0,     // checking functions' references (default)
    source: 1,  // checking functions' source-codes
    ignore: 2,  // ignore equality checking and assume the functions are equal
}
```

## EqualityComparerType
```javascript
{
    looseShape: 0,
    looseRef: 1,
    tightShape: 2,
    tightRef: 3,
}
```

## StringEqualityComparerType
```javascript
{
    ordinal: 0,
    ignoreCase: 1,
}
```

# Customizing Equality Comparers
All equality comparers that derive from `EqualityComparer` have an `options` prop. It has an option with the following structure:

```javascript
{
    null: string // e.g. "loose",
    primitive: string // e.g. "loose",
    string: string // e.g. "ordinal",
    array: string // e.g. "shape",
    iterable: string // e.g. "shape",
    object: string // e.g. "shape",
    function: string // e.g. "ref"
}
```

example:
loose-shape equality comparison option:
```javascript
{
    null: "loose",
    primitive: "loose",
    string: "ordinal",
    array: "shape",
    iterable: "shape",
    object: "shape",
    function: "ref",
}
```

It specifies how an equality comparer should behave, based on the type of arguments passed to `equals()` method. This is mainly important for complex equality comparers such as `ArrayEqualityComparer` or `ObjectEqualityComparer`.

By manipulating a specific prop in the `options`, we can customize the existing equality comparers' behavior.

For example, we may want an `ObjectEqualityComparer`, not to perform a `loose` comparison on `null` values.

To do this, we can pass an `options` object to constructor of the equality comparer.

```javascript
const ec = new ObjectEqualityComparer({
    null: "tight",
    primitive: "loose",
    string: "ordinal",
    array: "shape",
    iterable: "shape",
    object: "shape",
    function: "ref",
})
```

By default, `EqualityComparer` performs a `loose-shape` comparison. So, we just need to customized the prop we want.

```javascript
const ec = new ObjectEqualityComparer({
    null: "tight"
})
```

The value of each prop can also be a function. This way, it is possible to perform a custom logic when doing an equality comparison for a specific data type.

```javascript
const ec = new ObjectEqualityComparer({
    null: (x, y) => isNullOrUndefined(x) && isNullOrUndefined(y) && x == y
})
```

Here, we customized our `ObjectEqualityComparer` in a way that it only assumes `null` and `undefined` to be equal, not `null`, `undefined` and empty (zero-length) strings, which is the default behavior.

We can also define a class for such equality comparer for later use.

```javascript
class MyObjectEqualityComparer extends ObjectEqualityComparer {
    constructor() {
        super({
            null: (x, y) => isNullOrUndefined(x) && isNullOrUndefined(y) && x == y
        })
    }
}
```

# Practical example
Equality comparer is mainly used in find, lookup, search and filtering.

Assuming we have an rray of objects, we can write a `findElementIndex` method that looks up an element, based on its shape.

```javascript
function findElementIndex(arr, obj) {
    return arr.findIndex(x => EqualityComparer.Object.LooseShape.equals(x, obj))
}
function elementExists(arr, obj) {
    return findIndex(arr, obj) >= 0
}

const data = [
    { id: 10, code: "CB101", size: 27.46 },
    { id: 11, code: "F5H01", size: 43.61 },
    { id: 16, code: "MK927", size: 19.37 },
    { id: 13, code: "WO325", size: 72.02 },
    { id:  5, code: "ZP664", size: 36.37 },
    { id: 22, code: "XH237", size: 52.19 },
    { id: 12, code: "JQ018", size: 42.84 },
    { id: 20, code: "RU845", size: 65.92 },
    { id: 14, code: "TY362", size: 18.16 },
]

const x = { id:  5, code: "ZP664", size: 36.37 }

console.log(elementExists(data, x));    // true
```

We can also, extend functionality of native `Array.find` and `Array.findIndex` and support argument lookup, isntead of function predicates.

```javascript
const _native_array_find = Array.prototype.find;
const _native_array_findIndex = Array.prototype.findIndex;

Array.prototype.find = function (arg) {
    if (isFunction(arg)) {
        return _native_array_find.call(this, arg)
    }

    return _native_array_find(x => EqualityComparer.Object.LooseShape.equals(x, arg))
}
Array.prototype.findIndex = function (arg) {
    if (isFunction(arg)) {
        return _native_array_findIndex.call(this, arg)
    }

    return _native_array_findIndex(x => EqualityComparer.Object.LooseShape.equals(x, arg))
}
```

Our final code will be this way:

```javascript
const x = { id:  5, code: "ZP664", size: 36.37 }
const y = data.find(x);

console.log(y == undefined);    // false
console.log(y == x);    // false
console.log(data.findIndex(x));    // 4
```


