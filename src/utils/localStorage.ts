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

function deleteValueByKey(key: string): boolean {
    const valueExist: boolean = localStorage.getItem(key) !== null;

    if (!valueExist) {
        return false;
    }

    localStorage.removeItem(key);

    return true;
}

export { getValueByKey, setValueByKey, deleteValueByKey };
