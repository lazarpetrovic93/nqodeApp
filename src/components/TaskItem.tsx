import { Task, toggleTask, deleteTask } from "../store/todoSlice.js";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store.js";

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex justify-between flex-row items-center p-2 bg-white">
      <div
        className="flex flex-row gap-6 items-center"
        onClick={() => dispatch(toggleTask(task.id))}
      >
        <label className="flex items-center space-x-2 cursor-pointer">
          <div className="w-5 h-5 flex items-center justify-center rounded-md border border-gray-500 peer-checked:bg-white peer-checked:border-purple-600 transition relative">
            {task.completed && (
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 288.941 288.941"
                xmlSpace="preserve"
                className="absolute h-6 left-0 bottom-[0] fill-primary"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <path
                      id="Check"
                      d="M285.377,46.368c-4.74-4.704-12.439-4.704-17.179,0L96.309,217.114L20.734,142.61 c-4.74-4.704-12.439-4.704-17.179,0s-4.74,12.319,0,17.011l84.2,82.997c4.692,4.644,12.499,4.644,17.191,0l180.43-179.239 C290.129,58.687,290.129,51.06,285.377,46.368C280.637,41.664,290.129,51.06,285.377,46.368z"
                    ></path>{" "}
                    <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            )}
          </div>
        </label>
        <div className="flex flex-col">
          <span
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
      </div>
      <button
        onClick={() => dispatch(deleteTask(task.id))}
        className="ml-4 text-white px-3 py-2 rounded-md transition active:scale-95 lg:text-sm text-xs"
      >
        <svg
          data-testid="trashIcon"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 text-gray-500 hover:text-red transition duration-200"
        >
          <path
            d="M17.5 4.98307C14.725 4.70807 11.9333 4.56641 9.15 4.56641C7.5 4.56641 5.85 4.64974 4.2 4.81641L2.5 4.98307"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.08325 4.14199L7.26659 3.05033C7.39992 2.25866 7.49992 1.66699 8.90825 1.66699H11.0916C12.4999 1.66699 12.6083 2.29199 12.7333 3.05866L12.9166 4.14199"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.7087 7.61621L15.167 16.0079C15.0753 17.3162 15.0003 18.3329 12.6753 18.3329H7.32533C5.00033 18.3329 4.92533 17.3162 4.83366 16.0079L4.29199 7.61621"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.6084 13.75H11.3834"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.91675 10.417H12.0834"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
