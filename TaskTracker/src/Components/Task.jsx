// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Task = () => {
  const [task, setTask] = useState([]);
  const [project, setProject] = useState({})

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/task")
      .then((result) => {
        if (result.data.Status) {
          setTask(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

      axios
      .get("http://localhost:5000/auth/project")
      .then((result) => {
        if(result.data.Status){
        const projectMap = result.data.Result.reduce((map, project) => {
          map[project.id] = project.name;
          return map;
        }, {})
        setProject(projectMap)
      } else {
        alert(result.data.Error)
      }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete("http://localhost:5000/auth/deleteTask/"+id)
    .then(result => {
      if(result.data.Status){
        setTask(task.filter(task => task.id !== id));
      }else{
          alert(result.data.Error)
        }
    })
  }

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Tasks List</h3>
      </div>
      <Link to="/dashboard/addTask" className="btn btn-success">
        Add New Task
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Task Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Project Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {task?.map((c) => (
              <tr key={c.id}>
                <td>{c.title}</td>
                <td>{c.status}</td>
                <td>{c.priority}</td>
                <td>{new Date(c.due_date).toLocaleDateString("en-GB")}</td>
                <td>{project[c.project_id]}</td>
                <td>
                  <Link to={'/dashboard/editTask/' + c.id} className="btn btn-info btn-sm me-2">Edit</Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task