import { useState } from "react";

export default function useLocalStorage(name, initialValue) {
    let storedValue = JSON.parse(localStorage.getItem(name));
    if (!storedValue) {
        storedValue = initialValue;
    }
    const [stored, setStored] = useState(storedValue);
    const updateStored = (newValue) => {
        setStored(newValue);
        localStorage.setItem(name, JSON.stringify(newValue));
    }
    return [stored, updateStored];
}