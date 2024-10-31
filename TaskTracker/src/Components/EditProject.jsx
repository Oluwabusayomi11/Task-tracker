import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProject = () => {
    const { id } = useParams();
  const [project, setProject] = useState({
    name: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/project/" + id)
      .then((result) => {
        if (result.data.Status) {
          setProject((project) => ({
            ...project,
            name: result.data.Result[0].name,
          }));
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put('http://localhost:5000/auth/editProject/'+id, project)
    .then(result => {
      if(result.data.Status) {
        navigate("/dashboard/project")
      }else{
        alert(result.data.Error)
      }
    }).catch(err => console.log(err))
  }
  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="p-3 rounded w-25 border">
        <h2>Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="project">
              <strong>Project:</strong>
            </label>
            <input
              type="text"
              name="project"
              id="name"
              placeholder="Enter Project Name"
              value={project.name || ""}
              onChange={(e) => setProject({...project, name: e.target.value})}
              className="form-control rounded-0"
            />
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-2">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProject