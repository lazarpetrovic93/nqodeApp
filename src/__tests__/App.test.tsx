import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import App from "../App";
import useAuth from "../hooks/useAuth";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";

vi.mock("../hooks/useAuth");

describe("App Component", () => {
  test("redirects to login if user is not authenticated", () => {
    // @ts-ignore
    (useAuth as vi.Mock).mockReturnValue({ user: null });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("LoginHeader")).toBeInTheDocument();
  });

  test("renders dashboard if user is authenticated", () => {
    // @ts-ignore
    (useAuth as vi.Mock).mockReturnValue({ user: "lazar" });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("To-Do List")).toBeInTheDocument();
  });

  test("logs out and redirects to login", async () => {
    const logoutMock = vi.fn();
    // @ts-ignore
    (useAuth as vi.Mock).mockReturnValue({
      user: "lazar",
      logout: logoutMock,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const logoutButton = screen.getByText("Logout");
    await userEvent.click(logoutButton);

    expect(logoutMock).toHaveBeenCalled();
  });
});
