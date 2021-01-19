export class DataStorageException extends Error {}


interface IDataStorage {
    setItem<T>(key: string, value: T): void;
    getItem<T>(key: string): T | null;
    removeItem(key: string): void;
}

export default IDataStorage;
