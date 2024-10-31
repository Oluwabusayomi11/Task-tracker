import express from "express";
import con from "../utility/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const sql = "SELECT * from user WHERE email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign({ role: "user", email: email }, "jwt_secret_key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});

router.get("/project", (req, res) => {
  const sql = "SELECT * FROM project";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});

router.post("/addProject", (req, res) => {
  const sql = "INSERT INTO project (name) VALUES (?)";
  con.query(sql, [req.body.project], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: { id: result.insertId, name: req.body.project } });
  });
});

router.get("/project/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM project WHERE id =?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});

router.put("/editProject/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE project SET name=? WHERE id = ?";
  const values = [req.body.name];
  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/deleteProject/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE from project WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/task", (req, res) => {
  const sql = "SELECT * FROM tasks";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/task/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM tasks WHERE id =?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});

router.put("/editTask/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE tasks SET status=?, priority=? WHERE id = ?";
  const values = [req.body.status, req.body.priority];
  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});

router.post("/addTask", (req, res) => {
  const { taskTitle, description, status, priority, dueDate, project } =
    req.body;

  if (
    !taskTitle ||
    !description ||
    !status ||
    !priority ||
    !dueDate ||
    !project
  ) {
    return res
      .status(400)
      .json({ Status: false, Error: "All fields are required." });
  }
  const sql =
    "INSERT INTO tasks (title, description, status, priority, due_date, project_id) VALUES (?)";
  const values = [taskTitle, description, status, priority, dueDate, project];

  con.query(sql, [values], (err, result) => {
    if (err) {
      console.error(err); // Log the error for debugging
      return res
        .status(500)
        .json({ Status: false, Error: "Database query error", Details: err });
    }
    return res.status(201).json({ Status: true, Result: result });
  });
});

router.delete("/deleteTask/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE from tasks WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/pending_count", (req, res) => {
  const sql =
    "SELECT count(id) as pending FROM tasks WHERE status = 'Not Started'";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/progress_count", (req, res) => {
  const sql =
    "SELECT count(id) as progress FROM tasks WHERE status = 'In Progress'";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/completed_count", (req, res) => {
  const sql =
    "SELECT count(id) as completed FROM tasks WHERE status = 'Completed'";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/hold_count", (req, res) => {
  const sql = "SELECT count(id) as hold FROM tasks WHERE status = 'On Hold'";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/pend_records", (req, res) => {
  const sql = "SELECT * FROM tasks WHERE status = 'Not Started'";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as userRouter };
