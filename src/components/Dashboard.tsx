import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import AddTask from "./AddTask";
import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";

const Dashboard = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2"
      >
        Logout
      </button>
      <div className="w-full mx-auto mt-10 p-4 shadow-lg rounded-lg bg-white">
        {user && (
          <>
            <h1 className="text-3xl font-bold mb-4 text-center">To-Do List</h1>
            <TaskFilter />
            <AddTask />
            <TaskList />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
