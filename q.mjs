import { loadFile, writeToFile } from './utils/io.mjs';
import { data } from './tmp/input.mjs';

const output = './tmp/output.txt';
const result = writeToFile(output,JSON.stringify(data));

console.log(result);