# `Awry(1, 2, 3, 4);`

`Awry` is a simple little extension to the JavaScript `Array` object to solve the age old debate of whether or not indices should be index `0`, or `1`. `Awry` posits that neither are optimal in every circumstance and allowing the user to change where arrays start may be confusing to readers. When doing computery stuff, we still suggest using index `0` which `Awry` obviously supports; **BUT** when it comes to those icky-squishy humans, `Awry` offers an alternative.

```typescript
const myFavouriteNumbersInAscendingPreferenceOrder = Awry(3, 5, 9, 11);
console.log(`My favourite number is ${myFavouriteNumbersInAscendingPreferenceOrder.first}`);
// -> My favourite number is 3
```

I hope you can see where we are going with this. All features explained below. But `.first` we need to get you up and running.

# Getting started

## Installation

You can install `Awry` into any JavaScript project using any tool that can grab packages from NPM. For examples:

```bash
# The NPM package manager (Node's Node Package Manager package manager)
npm i -S 'awrys'

# Yarn (Facebook's Node Package Manager)
yarn i 'awrys'

# PNPM (🔥🔥NPM🔥🔥)
pnpm i 'awrys'

# Bun (🥟)
bun i 'awrys'
```

We are confident this will be picked up by all the popular CDNs and can be directly injected into your HTML via `<script>` tag really soon. The minified size is only 1.96 KB!

## Using in your project

Just import or require it. We are only outputting ESM just now because that's all Bun can do and since Bun's release I've forgotten how JavaScript works.

```typescript
// TypeScript standard
import Awry from 'awrys';

// REPL?
const { Awry } = await import('./build/awry.js');
```

# Features

As alluded to up top, `Awry` can do a little more than `coolGifs.first`.

## Accessing the first few elements - `Awry` 100

What if we want to access anything but the first element? Well it may come as no surprise that you can also do the following:

```typescript
Awry(1, 2, 3, 4).second; // -> 2
Awry(1, 2, 3, 4).third; // -> 3
Awry(1, 2, 3, 4).fourth; // -> 4
```

Pretty neat huh?!

## Accessing more elements - `Awry` 101

"Four elements? Big whoop! My array has tens of elements". Well not to worry, `Awry` has got you there too:

```typescript
const dopeNumbers = Awry();

for (let x = 1; x <= 37; x++)
  dopeNumbers.push(x);

console.log(dopeNumber.twelfth); // -> 12
console.log(dopeNumber.twentyEighth); // -> 28
```

## Accessing even more elements - kinda how it works

Now the curious among you might be wondering if I just pre-generated a load of number words and am simply adding them as properties to the 'Awry' object. My sweet summer child no, we like to get a bit more stupid around here. We use `Proxy`s! Lets increase the previous example to 1,000 and you can watch in "slow-motion" that something else is at play.

```typescript
const dopeNumbers = Awry();

for (let x = 1; x <= 1000; x++)
  dopeNumbers.push(x);

console.log(dopeNumber.nineHundredAndNinetyNinth); // -> 999
console.log(dopeNumber.oneThousandth); // -> 1000
```

This took my tired and overworked 5-year-old HP Ultrabook G4 1,848.21ms to run as a Bun test. I'll work on performance once I see how successful this becomes. You can theoretically reference elements by name up-to:

```typescript
console.log(dopeNumbers.nineHundredAndNinetyNineTrillionNineHundredAndNinetyNineBillionNineHundredAndNinetyNineMillionNineHundredAndNinetyNineThousandNineHundredAndNinetyNinth.toLocaleString('en-GB'));
// -> 999,999,999,999,999 (that's a lot of dope numbers!)
```

JavaScriptCore can start going a bit weird after that &mdash; Not tested outside of Bun. I don't think JavaScript arrays can even have that many elements anyway. And also adding that many properties to an object will take longer than we all have.

## Accessing the end - but what about `sickAssList.last`?

What about it? You can do it, you can even go two (or considerably more) steps further. Check this out:

```typescript
const sickAssList = Awry(1, 2, 3);

console.log(sickAssList.last); // -> 3
console.log(sickAssList.secondLast); // -> 2
console.log(sickAssList.thirdLast); // -> 1
```
💅

## Converting an `Awry` to a POJSO - what does an `Awry` look like?

The ordinal properties are not enumerable for reasons but you can see under the bonnet (hood) doing this:

```typescript
const anotherAwry = Awry(1, 2, 3);

console.log(anotherAwry.toObject());
/* -> {
  "0": 1,
  "1": 2,
  "2": 3,
  first: 1,
  thirdLast: 1,
  second: 2,
  secondLast: 2,
  third: 3,
  last: 3
} */
```

# Future features

I genuinely think it might be neat to provide extensions for Array iterator functions that passes the worded ordinal index as a last parameter.

# Known issues

* It adds a bit of latency where you wouldn't usually expect it, but hey, it's all about the journey.
* Sometimes for some reason under some circumstances, properties may not be immediately available. I have my suspicions but haven't bothered to do anything about it.

# FAQ

...