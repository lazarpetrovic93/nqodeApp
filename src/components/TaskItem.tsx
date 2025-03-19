import { Task, toggleTask, deleteTask } from "../store/todoSlice.js";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store.js";

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex justify-between items-center p-2 bg-white">
      <div className="flex flex-col">
        <span
          onClick={() => dispatch(toggleTask(task.id))}
          className={`cursor-pointer ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.text}
        </span>
        {task.dueDate && (
          <span className="text-xs text-gray-500">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
      <button
        onClick={() => dispatch(deleteTask(task.id))}
        className="ml-4 bg-red-500 text-white px-3 py-2 rounded-md transition hover:bg-red-600 active:scale-95 lg:text-sm text-xs"
      >
        Delete
      </button>
    </div>
  );
}
