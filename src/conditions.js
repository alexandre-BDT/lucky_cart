function eq(a, b) {
  if (Array.isArray(a)) {
    return a.some((el) => el == b);
  }
  return a == b;
}

function greaterThan(a, b) {
  if (Array.isArray(a)) {
    return a.some((el) => el > b);
  }
  return a > b;
}

function lesserThan(a, b) {
  if (Array.isArray(a)) {
    return a.some((el) => el < b);
  }
  return a < b;
}

function greaterThanOrEqual(a, b) {
  if (Array.isArray(a)) {
    return a.some((el) => el >= b);
  }
  return a >= b;
}

function lesserThanOrEqual(a, b) {
  if (Array.isArray(a)) {
    return a.some((el) => el <= b);
  }
  return a <= b;
}

function inArray(a, b) {
  if (Array.isArray(a)) {
    return a.some((el) => b.includes(el));
  }
  return b.includes(a);
}

function and(list) {
  return list.every((el) => el);
}

function or(list) {
  return list.some((el) => el);
}

const CONDITIONS = {
  eq: eq,
  gt: greaterThan,
  lt: lesserThan,
  gte: greaterThanOrEqual,
  lte: lesserThanOrEqual,
  in: inArray,
  and: and,
  or: or,
}

module.exports = {
  CONDITIONS
}