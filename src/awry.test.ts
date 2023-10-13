import { test, expect } from 'bun:test';

import { Awry } from './awry';

test('should be able to initialise awry with items and reference them', () => {
  const awry = Awry(1, 2, 3);

  expect(awry.first).toBe(1);
  expect(awry.second).toBe(2);
  expect(awry.third).toBe(3);
  expect(awry.fourth).toBe(undefined);
});

test('should be able to push items to an awry and reference them', () => {
  const awry = Awry();
  awry.push(1, 2, 3);

  expect(awry.first).toBe(1);
  expect(awry.second).toBe(2);
  expect(awry.third).toBe(3);
  expect(awry.fourth).toBe(undefined);

  awry.push(4, 5, 6)

  expect(awry.fourth).toBe(4);
  expect(awry.fifth).toBe(5);
  expect(awry.sixth).toBe(6);
  expect(awry.seventh).toBe(undefined);
});

test('should be able to set items by index in an awry and reference them', () => {
  const awry = Awry();
  awry[0] = 1;
  awry[1] = 2;
  awry[2] = 3;

  expect(awry.first).toBe(1);
  expect(awry.second).toBe(2);
  expect(awry.third).toBe(3);
  expect(awry.fourth).toBe(undefined);

  awry[3] = 4;
  awry[4] = 5;
  awry[5] = 6;

  expect(awry.fourth).toBe(4);
  expect(awry.fifth).toBe(5);
  expect(awry.sixth).toBe(6);
  expect(awry.seventh).toBe(undefined);
});

test('should be able to do huge awrys', () => {
  const awry = Awry();

  for (let x = 1; x <= 1000; x++)
    awry.push(x);

  expect(awry.nineHundredAndNinetyNinth).toBe(999);
  expect(awry.oneThousandth).toBe(1000);
});

test('should be able to reference items in the position from the end of an awry', () => {
  const awry = Awry(1, 2, 3);

  expect(awry.last).toBe(3);
  expect(awry.secondLast).toBe(2);
  expect(awry.thirdLast).toBe(1);
});

test('should be able to awry convert awry to an object and see all keys', () => {
  const awry = Awry(1, 2, 3);
  const object = awry.toObject();
  const expected = {
    '0': 1,
    '1': 2,
    '2': 3,
    first: 1,
    thirdLast: 1,
    second: 2,
    secondLast: 2,
    third: 3,
    last: 3
  };

  expect(object).toEqual(expected);
});

console.log(Awry(1,2,3).toObject());