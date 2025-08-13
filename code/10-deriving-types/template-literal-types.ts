// const mainUserName = 'Max';

// const greeting = `Hi there, ${mainUserName}.`;

type ReadPermissions = 'no-read' | 'read';
type WritePermissions = 'no-write' | 'write';

type FilePermissions = `${ReadPermissions}-${WritePermissions}`;

type DataFile = {
  data: string;
  permissions: FilePermissions;
};

type DataFileEventNames = `${keyof DataFile}Changed`;

type DataFileEvents = {
  [Key in DataFileEventNames]: () => void;
};

const fileEvents: DataFileEvents = {
  dataChanged:  () => console.log('Data changed!'),
  permissionsChanged: () => console.log('Permissions changed!'),
};

fileEvents.dataChanged();
fileEvents.permissionsChanged();
