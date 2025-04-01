export const getProperty = <T extends object, K extends keyof T>(obj: T, key: K) => {
    if (key in obj) {
        return obj[key];
    }
    throw new Error(`Property ${String(key)} does not exist on provided type`);
}