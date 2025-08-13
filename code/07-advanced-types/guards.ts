// type FileSource = { type: 'file'; path: string };
// const fileSource: FileSource = {
//   type: 'file',
//   path: 'some/path/to/file.csv',
// };

// type DBSource = { type: 'db', connectionUrl: string };
// const dbSource: DBSource = {
//   type: 'db',
//   connectionUrl: 'some-connection-url',
// };

// type Source = FileSource | DBSource;

// function isFile(source: Source) {
//   return source.type === 'file';
// }

class FileSource {
  type: 'file' = 'file';
  constructor(public path: string) {}
}

class DBSource {
  type: 'db' = 'db';
  constructor(public connectionUrl: string) {}
}

type Source = FileSource | DBSource;

const fileSource = new FileSource('some/path/to/file.csv');
const dbSource = new DBSource('some-connection-url');

/**
function isFile(source: Source): source is FileSource {  return source.type === 'file';}
The part source is FileSource is called a type predicate.
It tells TypeScript that if isFile(source) returns true, then within that scope, source should be treated as a FileSource (not just a generic Source).
This enables TypeScript to provide proper type checking and autocompletion for FileSource properties (like path) after you check with isFile.
 */

function isFile(source: Source): source is FileSource {
  return source.type === 'file';
}

function loadData(source: Source) {
  // if ('path' in source) {
  // if (source.type === 'file') {
  if (source instanceof FileSource) {
    // source.path
    // source.path; => use that to open the file
    return;
  }
  // source.connectionUrl; => to reach out to database
}

loadData(fileSource)
class User {
  constructor(public name: string) {}

  join() {
    // ...
  }
}

class Admin {
  constructor(permissions: string[]) {}

  scan() {
    // ...
  }
}

const user = new User('Max');
const admin = new Admin(['ban', 'restore']);

type Entity = User | Admin;

function init(entity: Entity) {
  if (entity instanceof User) {
    entity.join();
    return;
  }

  entity.scan();
}
