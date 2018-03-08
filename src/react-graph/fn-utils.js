export const curry = (fn, ctx) => {
  const arity = fn.length;
  let params = [];

  return function curried(...args) {
    Array.prototype.push.apply(params, args);

    if (params.length < arity) {
      return curried;
    }

    const res = fn.apply(ctx, params);
    params = [];

    return res;
  };
};

export const pipe = (...fns) => fns.reduce((a, b) => arg => b(a(arg)));
