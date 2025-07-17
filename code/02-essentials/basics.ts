let userName: string = 'Max'; // number, boolean
let userAge = 38;


function add(a: number, b = 5) {
  return a + b;
}

console.log(add(10));
// // add('10');
// add(10, 6);
// // add(10, '6');

console.log('Hello ' + userName + '!');