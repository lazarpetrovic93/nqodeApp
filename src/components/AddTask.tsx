import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/todoSlice";
import { AppDispatch } from "../store/store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTask = () => {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch(
      addTask({ text, dueDate: dueDate ? dueDate.toISOString() : undefined })
    );
    setText("");
    setDueDate(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl mx-auto lg:text-sm sm:text-xs"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
      />
      <div className="relative w-full sm:w-auto">
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          placeholderText="Select due date"
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
        />
      </div>
      <button
        className={`w-full sm:w-auto px-5 py-2 text-white font-medium rounded-md transition
          ${
            text && dueDate
              ? "bg-blue-500 hover:bg-blue-600 active:scale-95"
              : "bg-gray-400 cursor-not-allowed"
          }
        `}
        disabled={!text || !dueDate}
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
