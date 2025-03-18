import { renderHook, act } from "@testing-library/react";
import useAuth from "../hooks/useAuth";
import * as localStorageUtils from "../utils/localStorage";

jest.mock("../utils/localStorage");

describe("useAuth hook", () => {
    beforeEach(() => {
        jest.spyOn(localStorageUtils, "getLocalStorage").mockReturnValue(null);
        jest.spyOn(localStorageUtils, "setLocalStorage").mockImplementation(() => { });
        jest.spyOn(localStorageUtils, "removeLocalStorage").mockImplementation(() => { });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should return initial state with no user", () => {
        const { result } = renderHook(() => useAuth());
        expect(result.current.user).toBeNull();
        expect(result.current.error).toBeNull();
    });

    test("should login with valid credentials", () => {
        const { result } = renderHook(() => useAuth());
        console.log('result', result)

        act(() => {
            result.current.login("lazar", "password123!");
        });

        expect(result.current.user).toBe("lazar");
        expect(result.current.error).toBeNull();
        expect(localStorageUtils.setLocalStorage).toHaveBeenCalledWith("user", "lazar");
    });

    test("should not login with invalid credentials", () => {
        const { result } = renderHook(() => useAuth());

        act(() => {
            result.current.login("wrongUser", "wrongPassword");
        });

        expect(result.current.user).toBeNull();
        expect(result.current.error).toBe("Invalid username or password");
        expect(localStorageUtils.setLocalStorage).not.toHaveBeenCalled();
    });

    test("should logout and remove user from storage", () => {
        const { result } = renderHook(() => useAuth());

        act(() => {
            result.current.login("admin", "password123!");
        });

        act(() => {
            result.current.logout();
        });

        expect(result.current.user).toBeNull();
        expect(localStorageUtils.removeLocalStorage).toHaveBeenCalledWith("user");
    });
});