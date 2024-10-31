import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/dashboard";
import Home from "./Components/Home";
import Task from "./Components/Task";
import Project from "./Components/Project";
import AddProject from "./Components/AddProject";
import AddTask from "./Components/AddTask";
import EditTask from "./Components/editTask";
import EditProject from "./Components/EditProject";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/dashboard/task" element={<Task />}></Route>
          <Route path="/dashboard/project" element={<Project />}></Route>
          <Route path="/dashboard/addProject" element={<AddProject />}></Route>
          <Route path="/dashboard/addTask" element={<AddTask />}></Route>
          <Route path="/dashboard/editTask/:id" element={<EditTask />}></Route>
          <Route
            path="/dashboard/editProject/:id"
            element={<EditProject />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
