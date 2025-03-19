import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { setFilter, sortTasksByDueDate } from "../store/todoSlice";
import TaskFilter from "../components/TaskFilter";
import "@testing-library/jest-dom";
import { describe, beforeEach, test, expect, vi } from "vitest";

const mockStore = configureStore();
const initialState = { todo: { filter: "all" } };

describe("TaskFilter Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = vi.fn();
  });

  test("renders filter buttons", () => {
    render(
      <Provider store={store}>
        <TaskFilter />
      </Provider>
    );

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Sort By Due Date")).toBeInTheDocument();
  });

  test("dispatches action when clicking filter buttons", () => {
    render(
      <Provider store={store}>
        <TaskFilter />
      </Provider>
    );

    fireEvent.click(screen.getByText("Active"));
    expect(store.dispatch).toHaveBeenCalledWith(setFilter("active"));

    fireEvent.click(screen.getByText("Completed"));
    expect(store.dispatch).toHaveBeenCalledWith(setFilter("completed"));

    fireEvent.click(screen.getByText("Sort By Due Date"));
    expect(store.dispatch).toHaveBeenCalledWith(sortTasksByDueDate());
  });
});
