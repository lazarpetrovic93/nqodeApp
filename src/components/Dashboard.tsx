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
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6 ">
      {/* Header Section */}
      <div className="w-full max-w-4xl flex flex-row justify-between items-center bg-white shadow-md p-5 rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-700">
          To-Do List
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-md transition hover:bg-red-600 active:scale-95 lg:text-sm sm:text-xs"
        >
          Logout
        </button>
      </div>

      {/* Main To-Do Section - Zauzima preostali prostor */}
      <div className="flex flex-col gap-6 flex-grow w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg pb-6 mt-4">
        {user && (
          <>
            {/* Filters & Add Task Section */}
            <div className="flex flex-col sm:flex-row gap-4 h-10">
              <TaskFilter />
              <AddTask />
            </div>

            {/* Task List */}
            <TaskList />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
