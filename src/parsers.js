// const yaml = require('js-yaml');
import YAML from 'js-yaml';

const parsersJs = (test1) => JSON.parse(test1);

const parsersYaml = (test1) => YAML.load(test1);

export { parsersJs, parsersYaml };
