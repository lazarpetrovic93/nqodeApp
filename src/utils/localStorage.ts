export const getLocalStorage = <T,>(key: string, defaultValue: T): T => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error getting localStorage key "${key}":`, error);
        return defaultValue;
    }
};

export const setLocalStorage = <T,>(key: string, value: T) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
    }
};

export const removeLocalStorage = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing localStorage key "${key}":`, error);
    }
};