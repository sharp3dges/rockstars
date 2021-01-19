import IDataStorage from "../../../core/storage/IDataStorage";

class MockDataStorage implements IDataStorage {

    data: {[key: string]: any} = {};

    getItem<T>(key: string): T | null {
        return this.data[key] || null;
    }

    removeItem(key: string): void {
        delete this.data[key];
    }

    setItem<T>(key: string, value: T): void {
        this.data[key] = value;
    }

}
export default MockDataStorage;
