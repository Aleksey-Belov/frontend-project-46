import { readFileSync } from 'fs';
import process from 'process';
import path from 'path';
import _ from 'lodash';

const extensionCheck = (filepath1, filepath2) => {
  const fileExtension1 = filepath1.split('.').at(-1);
  const fileExtension2 = filepath2.split('.').at(-1);
  if (!(fileExtension1 === 'json' && fileExtension2 === 'json')) return false;
};

const genDiffСomparison = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);
  const sortKey = _.sortBy(keys);

  const result = [];
  sortKey.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      //ключь одинаковые значения разные (+)
      result.push(` + ${key}: ${data2[key]}`);
    } else if (!Object.hasOwn(data2, key)) {
      // есть в первом (-)
      result.push(` - ${key}: ${data1[key]}`);
    } else if (data1[key] !== data2[key]) {
      // ключь одинаковые значения разные (+/-)
      result.push(` - ${key}: ${data1[key]}`);
      result.push(` + ${key}: ${data2[key]}`);
    } else {
      // ключь и значение одинаковые ()'
      result.push(`   ${key}: ${data1[key]}`);
    }
  });
  const out = ['{', ...result, `}`].join('\n');
  return out;
};

const genDiff = (filepath1, filepath2) => {
  if (extensionCheck(filepath1, filepath2) === false) {
    console.log('Incorrect format of transferred file');
    return false;
  }
  const arrayOfPaths = [filepath1, filepath2];
  const test4 = arrayOfPaths.map((item) => {
    const current = process.cwd();
    const test2 = path.resolve(current, item);
    return JSON.parse(readFileSync(test2, 'utf8'));
  });
  // console.log(test4);
  return genDiffСomparison(test4[0], test4[1]);
};
export { genDiff };

// -------------------------------------------------------
// 1. Работа с обсолютными путями и относительными +
// 2. Правельный вызов 2 оргументами +
// 3. формат данных определечться на основе расширения +
// 4. точку входа в пакет в свойстве main файла package.json. +
// 5. дебаг текущего кода
// 6. Тест как библиотеки +

// const current2 = process.cwd();
// const current3 = process.cwd();
// const test2 = path.resolve(current2, filepath1);
// const test3 = path.resolve(current3, filepath2);
// console.log(test2);
// console.log(test3);

// const content = JSON.parse(readFileSync(test2, 'utf8'));
// const content2 = JSON.parse(readFileSync(test3, 'utf8'));
//   console.log(content, content2);
