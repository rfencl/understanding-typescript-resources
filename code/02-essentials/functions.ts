function add(a: number, b: number) {
  return a + b;
}

function log(message: string) {
  console.log(`The message is ${message}`);
}

function hello(name: string) {
  console.log(`Hello ${name}!`);
}

function logAndThrow(errorMessage: string): never {
  console.log(errorMessage);
  throw new Error(errorMessage);
}

// Function types
const logMsg = (msg: string) => {
  console.log(msg);
};

function performJob(msg: string, cb: (msg: string) => void) {
  // ...
  cb(msg);
}

performJob('Job done', log);
performJob('Fred', hello)

type User = {
  name: string;
  age: number;
  greet: () => string;
};

let user: User = {
  name: 'Max',
  age: 39,
  greet() {
    console.log(`Hello there ${this.name}!`);
    return this.name;
  }
}

user.greet();