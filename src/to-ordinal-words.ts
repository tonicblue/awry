const GROUP_SUFFIXES = [ '',
  'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion',
];
const UNDER_TWENTY = [ '',
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
  'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
];
const UNDER_TWENTY_ORDINALS = [ '',
  'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth',
  'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth',
  'eighteenth', 'nineteenth',
];
const TENS = [ '', '',
  'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety',
];
const TENS_ORDINALS = [ '', '',
  'twentieth', 'thirtieth', 'fortieth', 'fiftieth', 'sixtieth', 'seventieth', 'eightieth',
  'ninetieth',
];
const LOOKUP_CACHE = [
  new Map<number, string>(),
  new Map<number, string>(),
];

export default function toOrdinalWords (number: number, removeAnds = false) {
  const cached = LOOKUP_CACHE[+removeAnds].get(number);
  if (cached) return cached;

  const digits = number.toString().split('');
  const parts: string[] = [];

  let rmnzReached = false;
  let group = 0;

  while (digits.length) {
    const units = parseInt(digits.pop() || '0');
    const tens = parseInt(digits.pop() || '0');
    const hundreds = parseInt(digits.pop() || '0');
    const groupParts = parseGroup(hundreds, tens, units);
    parts.unshift(...groupParts);
  }

  const ordinalWords = parts.map((part, index) => (
    index
      ? part.charAt(0).toUpperCase() + part.substring(1)
      : part
  )).join('');

  LOOKUP_CACHE[+removeAnds].set(number, ordinalWords);

  return ordinalWords;

  function parseGroup (hundreds = 0, tens = 0, units = 0) {
    if (!hundreds && !tens && !units) {
      group++;
      return [];
    }

    const parts: string[] = [];
    const initialRmnzReached = rmnzReached;
    const isFirstGroup = group === 0;

    if (tens === 1 || units) {
      const lookupIndex = (
        tens > 0 && tens < 2
          ? 9 + tens + units
          : units
      );

      parts.push(
        !isFirstGroup || rmnzReached
          ? UNDER_TWENTY[lookupIndex]
          : UNDER_TWENTY_ORDINALS[lookupIndex]
        );
      rmnzReached = true;
    }

    if (tens > 1) {
      parts.unshift(
        !isFirstGroup || rmnzReached
          ? TENS[tens]
          : TENS_ORDINALS[tens]
        );
      rmnzReached = true;
    }

    if (hundreds > 0) {
      const hundredsParts: string[] = [
        UNDER_TWENTY[hundreds],
        (!isFirstGroup || rmnzReached ? 'hundred' : 'hundredth')
      ];

      if (!removeAnds && (units || tens)) hundredsParts.push('and');

      rmnzReached = true;
      parts.unshift(...hundredsParts);
    } else if (isFirstGroup && digits.length > 3) {
      parts.unshift('and');
    }

    if (!isFirstGroup) {
      parts.push(
        !initialRmnzReached && rmnzReached
          ? GROUP_SUFFIXES[group] + 'th'
          : GROUP_SUFFIXES[group]
      );
    }

    group++;

    return parts;
  }
}