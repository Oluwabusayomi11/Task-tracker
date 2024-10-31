import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [task, setTask] = useState({
    taskTitle: "",
    description: "",
    status: "Not Started",
    priority: "High",
    dueDate: "",
    project: "",
  });
  const [project, setProject] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/project")
      .then((result) => {
        if (result.data.Status) {
          setProject(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.taskTitle || !task.description || !task.project) {
      alert("Please fill in all required fields.");
      return;
    }
    axios
      .post("http://localhost:5000/auth/addTask", task)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/task");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.error("Error response:", err.response); // Log the full error response
      });
  };
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3>Add New Task</h3>
        <form onSubmit={handleSubmit} className="row g-1">
          <div className="col-12">
            <label htmlFor="taskTitle" className="form-label">
              <strong>Task Title:</strong>
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="taskTitle"
              placeholder="Enter Task Title"
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
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
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
              onChange={(e) => {
                const statusValue = e.target.value;
                setTask({ ...task, status: statusValue });
              }}
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
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="dueDate" className="form-label">
              <strong>Due Date</strong>
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="dueDate"
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="project" className="form-label">
              <strong>Project Name</strong>
            </label>
            <select
              name="project"
              id="project"
              className="form-select"
              onChange={(e) => setTask({ ...task, project: e.target.value })}
            >
              <option value="">Select a project</option>
              {project?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
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
export default AddTask;
