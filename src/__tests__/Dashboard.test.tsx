import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, expect, vi, describe, test } from "vitest";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import useAuth from "../hooks/useAuth.js";
import Dashboard from "../components/Dashboard.js";

vi.mock("../hooks/useAuth", () => ({
  default: vi.fn(),
}));
vi.mock("../hooks/useDeleteExpiredTasks", () => ({
  default: vi.fn(),
}));

const mockStore = configureStore();
const initialState = { todo: { filter: "all", tasks: [] } };

describe("Dashboard Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = vi.fn();
    // @ts-ignore
    (useAuth as vi.Mock).mockReturnValue({
      user: "testUser",
      logout: vi.fn(),
    });
  });

  test("renders Dashboard with title and logout button", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("To-Do List")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  test("calls logout function on logout button click", () => {
    const mockLogout = vi.fn();
    // @ts-ignore
    (useAuth as vi.Mock).mockReturnValue({
      user: "testUser",
      logout: mockLogout,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  test("does not render task components if no user is logged in", () => {
    // @ts-ignore
    (useAuth as vi.Mock).mockReturnValue({
      user: null,
      logout: vi.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText("TaskFilter")).not.toBeInTheDocument();
    expect(screen.queryByText("AddTask")).not.toBeInTheDocument();
    expect(screen.queryByText("TaskList")).not.toBeInTheDocument();
  });
});
