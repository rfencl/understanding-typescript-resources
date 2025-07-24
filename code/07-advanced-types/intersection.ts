type FileData = {
  path: string;
  content: string;
};

type DatabaseData = {
  connectionUrl: string;
  credentials: string;
}

type Status = {
  isOpen: boolean;
  errorMessage?: string;
};

type AccessedFileData = FileData & Status;
type AccessedDatabaseData = DatabaseData & Status;

interface IFileData  {
  path: string;
  content: string;
};

interface IDatabaseData  {
  connectionUrl: string;
  credentials: string;
}

interface IStatus  {
  isOpen: boolean;
  errorMessage?: string;
};

interface IAccessedFileData extends FileData, Status {};
interface IAccessedDatabaseData extends DatabaseData, Status{};