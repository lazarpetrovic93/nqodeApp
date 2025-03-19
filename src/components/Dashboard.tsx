import useAuth from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import AddTask from "./AddTask.js";
import TaskFilter from "./TaskFilter.js";
import TaskList from "./TaskList.js";
import useDeleteExpiredTasks from "../hooks/useDeleteExpiredTasks.js";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  useDeleteExpiredTasks();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-6 ">
      <div className="w-full max-w-4xl flex flex-row justify-between items-center bg-white shadow-md p-5 rounded-lg">
        <h1 className="text-xl lg:text-2xl font-bold text-center text-gray-700">
          To-Do List
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-md transition hover:bg-red-600 active:scale-95 lg:text-sm text-xs"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col gap-6 flex-grow w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg pb-6 mt-4">
        {user && (
          <>
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
