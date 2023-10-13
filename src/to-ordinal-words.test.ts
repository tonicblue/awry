import { expect, test } from 'bun:test';
import toOrdinalWords from './to-ordinal-words';

export type ToEnglishOrdinalTest = [input: number, removeAnds: boolean, expected: string];

const tests: ToEnglishOrdinalTest[] = [
  [1, false, 'first'],
  [12, false, 'twelfth'],
  [123, false, 'oneHundredAndTwentyThird'],
  [1234, false, 'oneThousandTwoHundredAndThirtyFourth'],
  [12345, false, 'twelveThousandThreeHundredAndFortyFifth'],
  [123456, false, 'oneHundredAndTwentyThreeThousandFourHundredAndFiftySixth'],
  [1234567, false, 'oneMillionTwoHundredAndThirtyFourThousandFiveHundredAndSixtySeventh'],
  [12345678, false, 'twelveMillionThreeHundredAndFortyFiveThousandSixHundredAndSeventyEighth'],
  [123456789, false, 'oneHundredAndTwentyThreeMillionFourHundredAndFiftySixThousandSevenHundredAndEightyNinth'],
  [1234567890, false, 'oneBillionTwoHundredAndThirtyFourMillionFiveHundredAndSixtySevenThousandEightHundredAndNinetieth'],
  [1234567800, false, 'oneBillionTwoHundredAndThirtyFourMillionFiveHundredAndSixtySevenThousandEightHundredth'],
  [1234567000, false, 'oneBillionTwoHundredAndThirtyFourMillionFiveHundredAndSixtySevenThousandth'],
  [1234560000, false, 'oneBillionTwoHundredAndThirtyFourMillionFiveHundredAndSixtyThousandth'],
  [1234500000, false, 'oneBillionTwoHundredAndThirtyFourMillionFiveHundredThousandth'],
  [1234000000, false, 'oneBillionTwoHundredAndThirtyFourMillionth'],
  [1230000000, false, 'oneBillionTwoHundredAndThirtyMillionth'],
  [1200000000, false, 'oneBillionTwoHundredMillionth'],
  [1000000000, false, 'oneBillionth'],
  [1000000001, false, 'oneBillionAndFirst'],
  [1000000021, false, 'oneBillionAndTwentyFirst'],
  [2000000321, false, 'twoBillionThreeHundredAndTwentyFirst'],
  [3000004321, false, 'threeBillionFourThousandThreeHundredAndTwentyFirst'],
  [4000054321, false, 'fourBillionFiftyFourThousandThreeHundredAndTwentyFirst'],
  [5000654321, false, 'fiveBillionSixHundredAndFiftyFourThousandThreeHundredAndTwentyFirst'],
  [6007654321, false, 'sixBillionSevenMillionSixHundredAndFiftyFourThousandThreeHundredAndTwentyFirst'],
  [7087654321, false, 'sevenBillionEightySevenMillionSixHundredAndFiftyFourThousandThreeHundredAndTwentyFirst'],
  [8987654321, false, 'eightBillionNineHundredAndEightySevenMillionSixHundredAndFiftyFourThousandThreeHundredAndTwentyFirst'],
  [9876543210, false, 'nineBillionEightHundredAndSeventySixMillionFiveHundredAndFortyThreeThousandTwoHundredAndTenth'],
  [9876543200, false, 'nineBillionEightHundredAndSeventySixMillionFiveHundredAndFortyThreeThousandTwoHundredth'],
  [9876543000, false, 'nineBillionEightHundredAndSeventySixMillionFiveHundredAndFortyThreeThousandth'],
  [9876540000, false, 'nineBillionEightHundredAndSeventySixMillionFiveHundredAndFortyThousandth'],
  [9876500000, false, 'nineBillionEightHundredAndSeventySixMillionFiveHundredThousandth'],
  [9876000000, false, 'nineBillionEightHundredAndSeventySixMillionth'],
  [9870000000, false, 'nineBillionEightHundredAndSeventyMillionth'],
  [9800000000, false, 'nineBillionEightHundredMillionth'],
  [9000000000, false, 'nineBillionth'],
  [999999999999999, false, 'nineHundredAndNinetyNineTrillionNineHundredAndNinetyNineBillionNineHundredAndNinetyNineMillionNineHundredAndNinetyNineThousandNineHundredAndNinetyNinth'],
];

for (const [input, removeAnds, expected] of tests) {
  test(`convert ${input.toLocaleString('en-GB')} into '${expected}'`, () => {
    const output = toOrdinalWords(input, removeAnds);
    expect(output).toBe(expected);
  });
}

// for (let x = 0; x < 10; x++) {
//   const random = Math.floor(Math.random() * 99999);
//   test(`performance test: convert digits between ${(random - 100).toLocaleString('en-GB')} and ${random.toLocaleString('en-GB')}`, () => {
//     let totalCalls = 0;
//     for (let input = random - 100; input < random; input++) {
//       for (let y = 0; y < 99999; y++) {
//         const output = toOrdinalWords(input);
//         totalCalls++;
//         expect(output).toBe(output);
//       }
//     }
//     console.log(`Total calls: ${totalCalls}`);
//   });
// }