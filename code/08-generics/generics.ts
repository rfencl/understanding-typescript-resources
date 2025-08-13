let names: Array<string> = ['Max', 'Anna'];
let names2: string[] = ['Max', 'Anna'];      // Both are equivalent

type DataStore<T> = {   
  [key: string]: T;
};

let store: DataStore<string | boolean> = {};
store.name = 'Max';
store.isInstructor = true;

let nameStore: DataStore<string> = {};

function merge<T, U>(a: T, b: U) {
  return [a, b];
}

const ids = merge(1, 'Max');

function mergeObj<T extends object, U extends object>(a: T, b: U) {
  return { ...a, ...b };
}

const merged = mergeObj({ userName: 'Max' }, { age: 35 });
console.log(merged);

class User<T> {
  constructor(public id: T) {}
}

const user = new User('i1');
console.log(user.id);

const user2 = new User(1);
console.log(user2.id);