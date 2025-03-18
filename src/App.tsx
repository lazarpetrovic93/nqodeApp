import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./store/authSlice";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector(selectUser);
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
