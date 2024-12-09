import { AddTaskForm } from "./components/AddTaskForm";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Task } from "./components/Task";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "./components/utils";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const { data } = axios.get(API_URL);
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTaskForm fetchTasks={fetchTasks} />
      {tasks.map((task) => (
        <Task task={task} key={task.id} fetchTasks={fetchTasks} />
      ))}
    </ThemeProvider>
  );
}

export default App;
