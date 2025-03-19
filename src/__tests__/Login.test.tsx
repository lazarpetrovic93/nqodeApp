import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "../components/Login";
import useAuth from "../hooks/useAuth";

vi.mock("../hooks/useAuth", () => ({
  default: vi.fn(() => ({
    user: null,
    error: null,
    login: vi.fn(),
  })),
}));

describe("Login Component", () => {
  it("renders login form correctly", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByTestId("LoginHeader")).toBeInTheDocument();
  });

  it("displays error message when login fails", () => {
    // @ts-ignore
    (useAuth as unknown as vi.Mock).mockReturnValue({
      user: null,
      error: "Invalid username or password",
      login: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Invalid username or password")
    ).toBeInTheDocument();
  });

  it("calls login function on successful login", async () => {
    const mockLogin = vi.fn();
    // @ts-ignore
    (useAuth as unknown as vi.Mock).mockReturnValue({
      user: null,
      error: null,
      login: mockLogin,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByTestId("LoginButton");

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "password123!" } });
    fireEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith("admin", "password123!");
  });
});
