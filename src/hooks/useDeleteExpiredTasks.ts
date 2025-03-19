import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { deleteExpiredTasks } from "../store/todoSlice";

const useDeleteExpiredTasks = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(deleteExpiredTasks());
        const intervalId = setInterval(() => {
            dispatch(deleteExpiredTasks());
        }, 3600000); // every hour

        return () => clearInterval(intervalId);
    }, [dispatch]);
};

export default useDeleteExpiredTasks;