import { renderHook, act } from "@testing-library/react";
import useAuth from "../hooks/useAuth";
import * as localStorageUtils from "../utils/localStorage";
import { describe, beforeEach, afterEach, test, expect, vi } from "vitest";

vi.mock("../utils/localStorage");

describe("useAuth hook", () => {
    beforeEach(() => {
        vi.spyOn(localStorageUtils, "getLocalStorage").mockReturnValue(null);
        vi.spyOn(localStorageUtils, "setLocalStorage").mockImplementation(() => { });
        vi.spyOn(localStorageUtils, "removeLocalStorage").mockImplementation(() => { });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("should return initial state with no user", () => {
        const { result } = renderHook(() => useAuth());
        expect(result.current.user).toBeNull();
        expect(result.current.error).toBeNull();
    });

    test("should login with valid credentials", () => {
        const { result } = renderHook(() => useAuth());

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