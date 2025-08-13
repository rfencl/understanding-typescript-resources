type DataStore = {
  [prop: string]: string | number | boolean;
};

let store: DataStore = {};

// ...

store.id = 5;
store.isOpen = false;
store.name = 'Max';

let store2: DataStore = {
  id: 6,
  isOpen: true,
  name: 'Fred'
} satisfies DataStore;

console.log('store =', store, '\nstore2 =', store2);

let roles = ['admin', 'guest', 'editor'] as const;
// roles.push('max');
const firstRole = roles[0];

const dataEntries = {
  entry1: 0.51,
  entry2: -1.23
} satisfies Record<string, number>;

// ...

// dataEntries.entry3