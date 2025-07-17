// enum Role {
//   Admin,
//   Editor,
//   Guest,
// }

// type MyNumber = number;
type Role = 'admin' | 'editor' | 'guest' | 'reader';
type User = {
  name: string;
  age: number;
  role: Role;
  permissions: string[];
};

let userRole: Role = 'admin';
console.log(userRole);

let user: User = {
  name: 'Max',
  age: 30,
  role: userRole,
  permissions: ['read', 'write']
};
console.log('User:', user);
// ...

userRole = 'guest';

let possibleResults: [1 | -1, 1 | -1]; // [1, -1]

possibleResults = [1, -1];

function access(role: Role) {
  // ...
}