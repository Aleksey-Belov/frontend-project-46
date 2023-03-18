import { readFileSync } from 'fs';
import process from 'process';
import path from 'path';
import _ from 'lodash';
import { parsersJs, parsersYaml } from './parsers.js';
// const extensionCheck = (filepath1, filepath2) => {
//   const fileExtension1 = filepath1.split('.').at(-1);
//   const fileExtension2 = filepath2.split('.').at(-1);
//   if (fileExtension1 === 'json' && fileExtension2 === 'json') return true;
//   if (fileExtension1 === 'yml' && fileExtension2 === 'yml') return true;
//   if (fileExtension1 === 'yaml' && fileExtension2 === 'yaml') return true;
// return false;
const readingFile = (item) => {
  const test2 = path.resolve(process.cwd(), item);
  const test5 = readFileSync(test2, 'utf8');
  return test5;
};

const extensionCheck = (filepath1, filepath2) => {
  const arrayOfPaths = [filepath1, filepath2];

  const test4 = arrayOfPaths.map((item) => {
    const fileExtension1 = item.split('.').at(-1);

    switch (fileExtension1) {
      case 'json':
        return parsersJs(readingFile(item));
      case 'yml':
        return parsersYaml(readingFile(item));
      case 'yaml':
        return parsersYaml(readingFile(item));
      default:
        throw new Error(`No such extension "${fileExtension1}".\nSupported formats: json, yaml and yml.`);
    }

    // return JSON.parse(readFileSync(test2, 'utf8'));
  });

  // switch (signForExpression) {
  //   case '+':
  //     return randomNumber1 + randomNumber2;
  //   case '-':
  //     return randomNumber1 - randomNumber2;
  //   case '*':
  //     return randomNumber1 * randomNumber2;
  //   default:
  //     throw new Error(`Unknown arithmetic operator "${signForExpression}"!`);
  // }
  return test4;
};
// };

const genDiffСomparison = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);
  const sortKey = _.sortBy(keys);

  const result = [];
  sortKey.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      // ключь одинаковые значения разные (+)
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
    return result;
  });
  const out = ['{', ...result, '}'].join('\n');
  return out;
};

const genDiff = (filepath1, filepath2) => {
  // if (extensionCheck(filepath1, filepath2) === false) {
  //   console.log('Incorrect format of transferred file');
  //   return null;
  // }

  // const arrayOfPaths = [filepath1, filepath2];
  // const test4 = arrayOfPaths.map((item) => {
  //   const current = process.cwd();
  //   const test2 = path.resolve(current, item);
  //   return JSON.parse(readFileSync(test2, 'utf8'));
  // });
  // console.log(test4);
  const [fali3, fali4] = extensionCheck(filepath1, filepath2);
  return genDiffСomparison(fali3, fali4);
};

export { genDiff, genDiffСomparison };

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
