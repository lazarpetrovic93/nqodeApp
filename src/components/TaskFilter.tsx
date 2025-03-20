import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store.js";
import { setFilter, sortTasksByDueDate } from "../store/todoSlice.js";

const TaskFilter = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.todo.filter);

  return (
    <div className="flex flex-row h-full justify-center lg:text-sm text-xs">
      <button
        className={`px-4 py-2 rounded-l-lg transition  ${
          currentFilter === "all"
            ? "bg-secondary text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => dispatch(setFilter("all"))}
      >
        All
      </button>
      <button
        className={`px-4 py-2 transition ${
          currentFilter === "active"
            ? "bg-secondary text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => dispatch(setFilter("active"))}
      >
        Active
      </button>
      <button
        className={`px-4 py-2 transition ${
          currentFilter === "completed"
            ? "bg-secondary text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => dispatch(setFilter("completed"))}
      >
        Completed
      </button>
      <button
        className="px-4 py-2 rounded-r-lg bg-gray-500 text-white transition hover:bg-secondary"
        onClick={() => dispatch(sortTasksByDueDate())}
      >
        Sort By Due Date
      </button>
    </div>
  );
};

export default TaskFilter;
