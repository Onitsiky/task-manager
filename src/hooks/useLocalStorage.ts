import {Task} from "@/pages/tasks";

const useLocalStorage = (value: Task[]) => {
  localStorage.setItem('Tasks', JSON.stringify(value))
  return localStorage.getItem("Tasks")
}

export {
  useLocalStorage
}