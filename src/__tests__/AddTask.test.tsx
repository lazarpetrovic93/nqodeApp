import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { addTask } from "../store/todoSlice";
import AddTask from "../components/AddTask";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockStore = configureStore();
const initialState = { todo: { tasks: [] } };

describe("AddTask Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = vi.fn();
  });

  it("should render input, date picker, and button", () => {
    render(
      <Provider store={store}>
        <AddTask />
      </Provider>
    );

    expect(
      screen.getByPlaceholderText("Add a new task...")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Select due date")).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  it("should not dispatch addTask if input is empty", () => {
    render(
      <Provider store={store}>
        <AddTask />
      </Provider>
    );

    fireEvent.click(screen.getByText("Add Task"));
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it("should disable the button when input is empty", () => {
    render(
      <Provider store={store}>
        <AddTask />
      </Provider>
    );

    expect(screen.getByText("Add Task")).toBeDisabled();
  });
});
