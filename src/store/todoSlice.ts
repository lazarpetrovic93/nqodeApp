import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

export type Task = {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: string;
};

interface TodoState {
  tasks: Task[];
  filter: "all" | "active" | "completed";
}

const initialState: TodoState = {
  tasks: JSON.parse(getLocalStorage('tasks', '[]')),
  filter: "all",
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ text: string; dueDate?: string }>) => {
      state.tasks.push({ id: crypto.randomUUID(), text: action.payload.text, completed: false, dueDate: action.payload.dueDate });
      setLocalStorage('tasks', JSON.stringify(state.tasks));
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        setLocalStorage('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      setLocalStorage('tasks', JSON.stringify(state.tasks));
    },
    setFilter: (state, action: PayloadAction<"all" | "active" | "completed">) => {
      state.filter = action.payload;
    },
    reorderTasks: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [movedTask] = state.tasks.splice(sourceIndex, 1);
      state.tasks.splice(destinationIndex, 0, movedTask);
      setLocalStorage('tasks', JSON.stringify(state.tasks));
    },
    sortTasksByDueDate: (state) => {
      state.tasks.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
      setLocalStorage('tasks', JSON.stringify(state.tasks));
    },
    deleteExpiredTasks: (state) => {
      const now = new Date();
      state.tasks = state.tasks.filter(task =>
        !task.dueDate || new Date(task.dueDate) >= now
      );
    },
  },
});

export const { addTask, toggleTask, deleteTask, setFilter, reorderTasks, sortTasksByDueDate, deleteExpiredTasks } = todoSlice.actions;
export default todoSlice.reducer;