import { useState } from "react";
import { getLocalStorage, setLocalStorage, removeLocalStorage } from "../utils/localStorage";

const useAuth = () => {
    const [user, setUser] = useState<string | null>(getLocalStorage("user", null));
    const [error, setError] = useState<string | null>(null);
    const login = (username: string, password: string) => {
        if (username === "lazar" && password === "password123!") {
            setUser(username);
            setLocalStorage("user", username);
            setError(null);
        } else {
            setError("Invalid username or password");
        }
    };

    const logout = () => {
        setUser(null);
        removeLocalStorage("user");
    };

    return { user, error, login, logout };
};

export default useAuth;