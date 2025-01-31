import logo from './logo.svg';
import './App.css';
import TaskList from "./components/Tasklist";
import TaskForm from "./components/Taskform";
import TaskDetails from "./components/Taskdetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">

        <h2 className="headingh2">Add Task</h2>
        {/* TaskForm is rendered here */}
        <TaskForm />
        {/* TaskList is rendered below */}
        <TaskList />
      
    </div>
  );
}

export default App;
