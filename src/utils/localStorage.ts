function setValueByKey<TValue>(key: string, value: TValue): boolean {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

function getValueByKey<TValue>(key: string, defaultValue: TValue): TValue {
    try {
        const value: string | null = localStorage.getItem(key);

        if (value) {
            return JSON.parse(value) as TValue;
        }

        return defaultValue;
    } catch (err) {
        console.error(err);
        return defaultValue;
    }
}

export {getValueByKey, setValueByKey};
