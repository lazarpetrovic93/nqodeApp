import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer, { reorderTasks } from "../store/todoSlice";
import TaskList from "../components/TaskList";
import { describe, it, expect, vi } from "vitest";

const setupStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      todo: todoReducer,
    },
    preloadedState,
  });
};

describe("TaskList Component", () => {
  it("renders a list of tasks", () => {
    const store = setupStore({
      todo: {
        tasks: [
          { id: "1", text: "Task 1", completed: false },
          { id: "2", text: "Task 2", completed: true },
        ],
        filter: "all",
      },
    });

    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });
});
