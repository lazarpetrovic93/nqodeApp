import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setFilter, sortTasksByDueDate } from "../store/todoSlice";

const TaskFilter = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.todo.filter);

  return (
    <div className="w-full flex flex-col sm:flex-row gap-5 justify-center my-4">
      <button
        className={`h-9 text-base px-2 justify-center rounded sm:text-xs ${
          currentFilter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => dispatch(setFilter("all"))}
      >
        All
      </button>
      <button
        className={`h-9 text-base px-2 justify-center rounded sm:text-xs ${
          currentFilter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => dispatch(setFilter("active"))}
      >
        Active
      </button>
      <button
        className={`h-9 text-base px-2 justify-center rounded sm:text-xs ${
          currentFilter === "completed"
            ? "bg-blue-500 text-white"
            : "bg-gray-200"
        }`}
        onClick={() => dispatch(setFilter("completed"))}
      >
        Completed
      </button>
      <button
        className="h-9 text-base px-2 justify-center rounded sm:text-xs bg-gray-500 text-white"
        onClick={() => dispatch(sortTasksByDueDate())}
      >
        Sort by Due Date
      </button>
    </div>
  );
};

export default TaskFilter;
