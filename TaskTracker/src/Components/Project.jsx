import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Project = () => {
  const [project, setProject] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/project")
      .then((result) => {
        console.log(result.data)
        if (result.data.Status) {
          setProject(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete("http://localhost:5000/auth/deleteProject/"+id)
    .then(result => {
      if(result.data.Status){
        setProject(project.filter(project => project.id !== id));
      }else{
          alert(result.data.Error)
        }
    })
  }

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Projects</h3>
      </div>
      <Link to="/dashboard/addProject" className="btn btn-success">
        Add New Project
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {project?.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>
                  <Link to={'/dashboard/editProject/' + c.id} className="btn btn-info btn-sm me-2">Edit</Link>
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

export default Project;
