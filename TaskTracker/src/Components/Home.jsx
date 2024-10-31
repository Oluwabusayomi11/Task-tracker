// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [pendingTotal, setPendingTotal] = useState();
  const [progressTotal, setProgressTotal] = useState();
  const [completedTotal, setCompletedTotal] = useState();
  const [holdTotal, setHoldTotal] = useState();
  const [pends, setPends] = useState([]);

  useEffect(() => {
    pendingCount();
    progressCount();
    completedCount();
    holdCount();
    pendRecords();
  }, []);

  const pendRecords = () => {
    axios.get("http://localhost:5000/auth/pend_records").then((result) => {
      if (result.data.Status) {
        setPends(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    });
  };
  const pendingCount = () => {
    axios.get("http://localhost:5000/auth/pending_count").then((result) => {
      if (result.data.Status) {
        setPendingTotal(result.data.Result[0].pending);
      } else {
        alert(result.data.Error);
      }
    });
  };
  const progressCount = () => {
    axios.get("http://localhost:5000/auth/progress_count").then((result) => {
      if (result.data.Status) {
        setProgressTotal(result.data.Result[0].progress);
      } else {
        alert(result.data.Error);
      }
    });
  };
  const completedCount = () => {
    axios.get("http://localhost:5000/auth/completed_count").then((result) => {
      if (result.data.Status) {
        setCompletedTotal(result.data.Result[0].completed);
      } else {
        alert(result.data.Error);
      }
    });
  };
  const holdCount = () => {
    axios.get("http://localhost:5000/auth/hold_count").then((result) => {
      if (result.data.Status) {
        setHoldTotal(result.data.Result[0].hold);
      } else {
        alert(result.data.Error);
      }
    });
  };

  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Pending Tasks</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{pendingTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Tasks In Progress</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{progressTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Completed Tasks</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{completedTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Tasks On-Hold</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{holdTotal}</h5>
          </div>
        </div>
      </div>
      <div className="mt-4 px-5 pt-3">
        <h3>Pending Tasks</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Task Title</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pends.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{new Date(a.due_date).toLocaleDateString("en-GB")}</td>
                <td>{a.priority}</td>
                <td>
                  <button
                    to={"/dashboard/editTask/" + a.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
