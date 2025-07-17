let hobbies = ['Sports', 'Cooking'];

// hobbies.push(10);

// let users: (string | number)[];
let users: Array<string | number>;

users = [1, 'Max'];
users = [5, 1];
users = ['Max', 'Anna'];

// let possibleResults: number[]
let possibleResults: [number, number] = [1, -1]

// possibleResults = [1, -1];
// possibleResults = [5, 10, 12];
console.log(possibleResults);

// objects
let user: {
  name: string;
  age: number | string;
  hobbies: string[];
  role: {
    description: string;
    id: number;
  }
} = {
  name: 'Max',
  age: 38,
  hobbies: ['Sp orts', 'Cooking'],
  role: {
    description: 'admin',
    id: 5
  }
};

let val: {} = 'is a type';

console.log(val)

let data: Record<string, number | string>;

data = {
  entry1: 1,
  entry2: 'some string'
};