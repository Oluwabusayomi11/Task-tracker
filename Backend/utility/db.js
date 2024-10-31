import mysql from "mysql";

const con = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "",
  database: "tasktracker",
  debug: true,
});


con.connect(function (err) {
  if (err) {
    console.log("connection error");
  } else {
    console.log("Connected");
  }
});

export default con; 
