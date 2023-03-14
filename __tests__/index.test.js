import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import { genDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('test-1', () => {
  const received = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expected = readFile('expected_file.txt');
  expect(received).toEqual(expected);
});

test('test-2', () => {
  const received = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.json'));
  expect(received).toEqual(null);
});
