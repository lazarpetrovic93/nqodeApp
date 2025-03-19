import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TaskItem from "../components/TaskItem";
import { toggleTask, deleteTask } from "../store/todoSlice";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockStore = configureStore();
const initialState = { todo: { tasks: [] } };

describe("TaskItem Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = vi.fn();
  });

  const mockTask = {
    id: "1",
    text: "Test Task",
    completed: false,
    dueDate: "2025-03-20T12:00:00.000Z",
  };

  it("should render task text and due date", () => {
    render(
      <Provider store={store}>
        <TaskItem task={mockTask} />
      </Provider>
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();

    expect(
      screen.getByText((content) => content.includes("Due:"))
    ).toBeInTheDocument();
  });

  it("should toggle task when clicked", async () => {
    render(
      <Provider store={store}>
        <TaskItem task={mockTask} />
      </Provider>
    );

    const taskText = screen.getByText("Test Task");
    await userEvent.click(taskText);

    expect(store.dispatch).toHaveBeenCalledWith(toggleTask(mockTask.id));
  });

  it("should dispatch deleteTask when delete button is clicked", async () => {
    render(
      <Provider store={store}>
        <TaskItem task={mockTask} />
      </Provider>
    );

    const deleteButton = screen.getByText("Delete");
    await userEvent.click(deleteButton);

    expect(store.dispatch).toHaveBeenCalledWith(deleteTask(mockTask.id));
  });
});
