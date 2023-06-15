import {create} from "zustand";
import {Task} from "@/pages/tasks";

type updateTask = {
  title: string
}
interface TaskManagerStore {
  tasks: Task[],
  setSearchTask: (toSearch: string) => String,
  searchTask: String,
  addTask: (newTask: Task) => void,
  updateTask: (taskId: number, updateTask: {title: string}) => void,
  deleteTask: (taskId: number) => void
}
const useTaskManager = create<TaskManagerStore>()((set) => ({
  tasks: [],
  setSearchTask: toSearch => {
    const foundTask: Task =  useTaskManager.getState().tasks.filter(task => task.title == toSearch)[0];
    useTaskManager.getState().searchTask = foundTask.title;
    return foundTask.title ?? "Task not found";
  },
  searchTask: "",
  addTask: newTask => set(state => ({
    tasks: [...state.tasks, newTask]
  })),
  updateTask: (taskId, taskTitle) => {
    useTaskManager.getState().deleteTask(taskId);
    const updateTask: Task = {id: taskId, title: taskTitle.title, completed: false};
    useTaskManager.getState().addTask(updateTask);

  },
  deleteTask: taskId => set(state => ({
      tasks: state.tasks.filter(task => task.id !== taskId)
  }))
}))

export {
  useTaskManager
}