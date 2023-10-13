import toOrdinalWords from './to-ordinal-words';

type AwryType = (any[] & {
  toObject(): any;
  first: any;
  last: any;
  [key: string]: any;
});

export function Awry (...items: any[]): AwryType {
  let updating = false;

  const awry = new Proxy(items, {
    get: function(target, name) {
      updateOrdinals();

      return Reflect.get(target, name);
    },

    set: function (target, name, value, receiver) {
      updateOrdinals();

      return Reflect.set(target, name, value, receiver);
    }
  });

  Object.defineProperty(awry, 'toObject', {
    writable: false,
    configurable: false,
    value: function toObject () {
      return Object.fromEntries(Object.entries(awry));
    },
  });

  return awry as AwryType;

  function updateOrdinals () {
    if (updating) return;

    updating = true;

    const length = awry.length;
    if (!length) return updating = false;

    for (let x = 1; x <= length; x++) {
      const numberWord = toOrdinalWords(x);
      const lastNumberWord = (
        x === length
          ? 'last'
          : toOrdinalWords(length - x + 1) + 'Last'
      );

      if (!(numberWord in awry)) {
        Object.defineProperty(awry, numberWord, {
          get: () => awry[x - 1],
          set: value => (awry[x - 1] = value),
          enumerable: true,
        });
      }

      if (!(lastNumberWord in awry)) {
        Object.defineProperty(awry, lastNumberWord, {
          get: () => awry[x - 1],
          set: value => (awry[x - 1] = value),
          enumerable: true,
        });
      }
    }

    updating = false;
  }
}