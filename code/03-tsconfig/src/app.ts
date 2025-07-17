import fs from 'node:fs';

console.log(fs.readFileSync('./package.json', 'utf-8'));

let userName: string;

userName = 'Max';

console.log(userName);

function add(a: any, b: any) {
  return a + b;
}

console.log(add(1, 2));