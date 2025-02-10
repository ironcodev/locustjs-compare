import Comparer from "./Comparer";

class StringOrdinalComparer extends Comparer {
  compare(a, b) {
    const strA = isNullOrEmpty(a) ? "" : a.toString();
    const strB = isNullOrEmpty(b) ? "" : b.toString();

    if (strA == strB) {
      return 0;
    }
    if (strA < strB) {
      return -1;
    }

    return 1;
  }
}

class StringOrdinalIgnoreCaseComparer extends Comparer {
  compare(a, b) {
    const strA = isNullOrEmpty(a) ? "" : a.toString();
    const strB = isNullOrEmpty(b) ? "" : b.toString();

    if (strA.toLowerCase() == strB.toLowerCase()) {
      return 0;
    }
    if (strA < strB) {
      return -1;
    }

    return 1;
  }
}

const StringComparer = {
  Ordinal: new StringOrdinalComparer(),
  IgnoreCase: new StringOrdinalIgnoreCaseComparer(),
};

export {
  StringOrdinalComparer,
  StringOrdinalIgnoreCaseComparer,
  StringComparer,
};
