import IDataStorage, {DataStorageException} from "./IDataStorage";

class DataStorage implements IDataStorage {
    getItem<T>(key: string): T | null {
        const strValue = localStorage.getItem(key);
        if (!strValue) {
            return null;
        }
        try {
            return JSON.parse(strValue);
        } catch (_) {
            return null;
        }
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    setItem<T>(key: string, value: T): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (_) {
            throw new DataStorageException(`Error: Failed to store value '${value}' as JSON string.`);
        }
    }
}

export default DataStorage;
