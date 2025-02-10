import { isFunction } from "@locustjs/base";

const isComparable = (x) => isObject(x) && isFunction(x.compareTo);

export default isComparable;
