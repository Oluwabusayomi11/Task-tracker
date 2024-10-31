// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState({
    taskTitle: "",
    description: "",
    status: "Not Started",
    priority: "High",
    dueDate: "",
    project: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/task/" + id)
      .then((result) => {
        if (result.data.Status) {
          setTask((task) => ({
            ...task,
            taskTitle: result.data.Result[0].title,
            description: result.data.Result[0].description,
            status: result.data.Result[0].status,
            priority: result.data.Result[0].priority,
            dueDate: result.data.Result[0].due_date
              ? result.data.Result[0].due_date.split("T")[0]
              : "",
            project: result.data.Result[0].project_id,
          }));
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put('http://localhost:5000/auth/editTask/'+id, task)
    .then(result => {
      if(result.data.Status) {
        navigate("/dashboard/task")
      }else{
        alert(result.data.Error)
      }
    }).catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3>Edit Task</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="taskTitle" className="form-label">
              <strong>Task Title:</strong>
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="taskTitle"
              placeholder="Enter Task Title"
              value={task.taskTitle || ""}
              onChange={(e) => setTask({ ...task, taskTitle: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="taskDesc" className="form-label">
              <strong>Description:</strong>
            </label>
            <textarea
              className="form-control rounded-0"
              id="taskDesc"
              placeholder="Enter Task Description"
              value={task.description || ""}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              rows="3"
            ></textarea>
          </div>
          <div className="col-12">
            <label htmlFor="status" className="form-label">
              <strong>Status</strong>
            </label>
            <select
              name="status"
              id="status"
              className="form-select"
              value={task.status || "Not Started"}
              onChange={(e) => setTask({ ...task, status: e.target.value })}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="priority" className="form-label">
              <strong>Priority</strong>
            </label>
            <select
              name="priority"
              id="priority"
              className="form-select"
              value={task.priority || "High"}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-2">
            Save Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
