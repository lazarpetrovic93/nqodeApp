import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { error, user, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      return;
    }
    login(username, password);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 ">
      <div className="bg-white p-6 rounded shadow-md lg:text-sm text-xs">
        <h1
          className="text-xl lg:text-2xl font-bold mb-4"
          data-testid="LoginHeader"
        >
          Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red mb-4">{error}</p>}

        <button
          data-testid="LoginButton"
          onClick={handleLogin}
          className="h-9 flex items-center justify-center w-full text-white font-bold rounded bg-secondary hover:bg-primary disabled:bg-disabled disabled:cursor-not-allowed"
          disabled={!username || !password}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
