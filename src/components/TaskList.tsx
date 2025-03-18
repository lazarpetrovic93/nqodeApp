import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import TaskItem from "./TaskItem";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { reorderTasks } from "../store/todoSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.todo.tasks);
  const filter = useSelector((state: RootState) => state.todo.filter);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    dispatch(
      reorderTasks({
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      })
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="w-full mx-auto bg-white rounded-md lg:text-sm text-xs">
      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3 h-[calc(100vh-380px)]  lg:h-[calc(100vh-310px)] overflow-auto"
              >
                {filteredTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-3 border bg-white rounded-lg shadow-md transition-all"
                      >
                        <TaskItem task={task} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default TaskList;
