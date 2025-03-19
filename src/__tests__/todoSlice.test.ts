import { describe, expect, test, vi, beforeEach } from "vitest";
import todoReducer, {
    toggleTask,
    deleteTask,
    setFilter,
    reorderTasks,
    sortTasksByDueDate,
    deleteExpiredTasks,
    Task,
} from "../store/todoSlice";
import { setLocalStorage } from "../utils/localStorage";

vi.mock("../utils/localStorage", () => ({
    getLocalStorage: vi.fn(() => "[]"),
    setLocalStorage: vi.fn(),
}));

describe("todoSlice reducer", () => {
    let initialState: { tasks: Task[]; filter: "all" | "active" | "completed" };

    beforeEach(() => {
        initialState = { tasks: [], filter: "all" };
        vi.clearAllMocks();
    });

    test("should return initial state", () => {
        const state = todoReducer(undefined, { type: '' });
        expect(state).toEqual({ tasks: [], filter: "all" });
    });


    test("should toggle task completion", () => {
        const task = { id: "1", text: "Test Task", completed: false };
        const state = { ...initialState, tasks: [task] };

        const newState = todoReducer(state, toggleTask("1"));

        expect(newState.tasks[0].completed).toBe(true);
        expect(setLocalStorage).toHaveBeenCalledWith("tasks", JSON.stringify(newState.tasks));
    });

    test("should delete a task", () => {
        const task = { id: "1", text: "Task to Delete", completed: false };
        const state = { ...initialState, tasks: [task] };

        const newState = todoReducer(state, deleteTask("1"));

        expect(newState.tasks).toHaveLength(0);
        expect(setLocalStorage).toHaveBeenCalledWith("tasks", JSON.stringify(newState.tasks));
    });

    test("should set task filter", () => {
        const newState = todoReducer(initialState, setFilter("completed"));
        expect(newState.filter).toBe("completed");
    });

    test("should reorder tasks", () => {
        const state = {
            ...initialState,
            tasks: [
                { id: "1", text: "Task 1", completed: false },
                { id: "2", text: "Task 2", completed: false },
            ],
        };

        const newState = todoReducer(state, reorderTasks({ sourceIndex: 0, destinationIndex: 1 }));

        expect(newState.tasks[0].id).toBe("2");
        expect(newState.tasks[1].id).toBe("1");
        expect(setLocalStorage).toHaveBeenCalledWith("tasks", JSON.stringify(newState.tasks));
    });

    test("should sort tasks by due date", () => {
        const state = {
            ...initialState,
            tasks: [
                { id: "1", text: "Task 1", completed: false, dueDate: "2025-03-25" },
                { id: "2", text: "Task 2", completed: false, dueDate: "2025-03-20" },
                { id: "3", text: "Task 3", completed: false },
            ],
        };

        const newState = todoReducer(state, sortTasksByDueDate());

        expect(newState.tasks[0].id).toBe("2");
        expect(newState.tasks[1].id).toBe("1");
        expect(newState.tasks[2].id).toBe("3");
        expect(setLocalStorage).toHaveBeenCalledWith("tasks", JSON.stringify(newState.tasks));
    });

    test("should delete expired tasks", () => {
        vi.useFakeTimers().setSystemTime(new Date("2025-03-22"));

        const state = {
            ...initialState,
            tasks: [
                { id: "1", text: "Task 1", completed: false, dueDate: "2025-03-21" },
                { id: "2", text: "Task 2", completed: false, dueDate: "2025-03-23" },
            ],
        };

        const newState = todoReducer(state, deleteExpiredTasks());

        expect(newState.tasks).toHaveLength(1);
        expect(newState.tasks[0].id).toBe("2");
        expect(setLocalStorage).toHaveBeenCalled();
    });
});