import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import { genDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(filename, 'utf-8');

describe.each([['stylish'], ['plain'], ['json']])('%s formatter', (formatter) => {
  const filepathOfExpected = getFixturePath(`${formatter}.txt`);
  const expected = readFile(filepathOfExpected);

  test.each([['json'], ['yml'], ['yaml']])('%s files', (extension) => {
    const filepath1 = getFixturePath(`file1.${extension}`);
    const filepath2 = getFixturePath(`file2.${extension}`);

    const result = genDiff(filepath1, filepath2, formatter);

    expect(result).toBe(expected);
  });
});

// const received = genDiff(
//   getFixturePath('file1.json'),
//   getFixturePath('file2.json')
// );

// test('test-1', () => {
//   const received = genDiff(
//     getFixturePath('file1.json'),
//     getFixturePath('file2.json')
//   );
//   const expected = readFile('expected_file.txt');
//   expect(received).toEqual(expected);
// });

// test('test-2', () => {
//   const received = genDiff(
//     getFixturePath('file1.yaml'),
//     getFixturePath('file2.json')
//   );
//   expect(received).toEqual(null);
// });

// test.each([
//   [1, 1, 2],
//   [1, 2, 3],
//   [2, 1, 3],
// ])('.add(%i, %i)', (a, b, expected) => {
//   expect(a + b).toBe(expected);
// });

// test.each(testFormats)('genDiff in %s files in stylish format', (format) => {
//   const filepath1 = getFixturePath(`file1.${format}`);
//   const filepath2 = getFixturePath(`file2.${format}`);
//   expect(genDiff(filepath1, filepath2)).toEqual(expectedResultForStylish);
// });

// describe.each([['json'], ['yaml']])('$s extension', (extension) => {
//   test.each([['stylish'], ['plain']])('%s formatter', (formatter) => {
//     const file1Path = `__fixtures__/file1.${extension}`;
//     const file2Path = `__fixtures__/file2.${extension}`;
//     const expected = readFileSync(
//       getFixturesPath(`${formatter}-result.txt`),
//       'utf-8'
//     );
//     expect(genDiff(file1Path, file2Path, formatter)).toBe(expected);
//   });
// });
