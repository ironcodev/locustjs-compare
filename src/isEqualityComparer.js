import { isFunction } from "@locustjs/base";

const isEqualityComparer = (x) => isObject(x) && isFunction(x.equals);

export default isEqualityComparer;
