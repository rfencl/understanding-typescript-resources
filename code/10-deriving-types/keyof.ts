type User = { name: string; age: number };
type UserKeys = keyof User;

let validKey: UserKeys;

validKey = 'name';
validKey = 'age';

function getProp<T extends object, U extends keyof T>(obj: T, key: U) {
  const val = obj[key];

  if (val === undefined || val === null) {
    // throw new Error('Accessing undefined or null value.');
    throw new Error(`Accessing undefined or null value. \'${key}\' is not a valid key for the provided object.`);
  }

  return val;
}

const data = { id: 1, isStored: false, values: [1, -5, 10] };
const isStored = getProp(data, 'isStored');
console.log(isStored);
console.log(getProp(data, 'values'));
const user = { name: 'Max', age: 35 };

console.log(getProp(user, 'age'));
console.log(getProp(user, 'lastname'));
