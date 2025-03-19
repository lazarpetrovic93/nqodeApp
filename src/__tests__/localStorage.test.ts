import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage,
} from "../utils/localStorage";

describe("localStorage Utils", () => {
    beforeEach(() => {
        vi.spyOn(Storage.prototype, "getItem");
        vi.spyOn(Storage.prototype, "setItem");
        vi.spyOn(Storage.prototype, "removeItem");
    });

    afterEach(() => {
        vi.restoreAllMocks();
        localStorage.clear();
    });

    it("should return default value when key is not found", () => {
        Storage.prototype.getItem = vi.fn().mockReturnValue(null);
        const result = getLocalStorage("nonexistent", "default");
        expect(result).toBe("default");
    });

    it("should return parsed value when key exists", () => {
        Storage.prototype.getItem = vi.fn().mockReturnValue(JSON.stringify("testValue"));
        const result = getLocalStorage("existingKey", "default");
        expect(result).toBe("testValue");
    });

    it("should handle JSON parse errors gracefully", () => {
        Storage.prototype.getItem = vi.fn().mockReturnValue("{invalidJson");
        const result = getLocalStorage("invalidKey", "fallback");
        expect(result).toBe("fallback");
    });

    it("should set localStorage value correctly", () => {
        setLocalStorage("newKey", "newValue");
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "newKey",
            JSON.stringify("newValue")
        );
    });

    it("should remove localStorage value correctly", () => {
        removeLocalStorage("newKey");
        expect(localStorage.removeItem).toHaveBeenCalledWith("newKey");
    });
});