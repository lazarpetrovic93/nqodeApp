import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store.js";
import { setFilter, sortTasksByDueDate } from "../store/todoSlice.js";

const TaskFilter = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: any) => state.todo.filter);

  return (
    <div className="flex flex-row h-full justify-center lg:text-sm text-xs">
      <button
        className={`px-4 py-2 rounded-l-md transition  ${
          currentFilter === "all"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => dispatch(setFilter("all"))}
      >
        All
      </button>
      <button
        className={`px-4 py-2 transition ${
          currentFilter === "active"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => dispatch(setFilter("active"))}
      >
        Active
      </button>
      <button
        className={`px-4 py-2 transition ${
          currentFilter === "completed"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => dispatch(setFilter("completed"))}
      >
        Completed
      </button>
      <button
        className="px-4 py-2 rounded-r-md bg-gray-500 text-white transition hover:bg-gray-600"
        onClick={() => dispatch(sortTasksByDueDate())}
      >
        Sort
      </button>
    </div>
  );
};

export default TaskFilter;
