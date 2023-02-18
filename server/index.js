const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todolist",
});

app.get("/api/get", (req, res) => {
  let sqlquery = "SELECT * FROM items";
  conn.query(sqlquery, (err, results) => {
    if (err) throw err;
    else {
      res.send(results);
    }
  });
});

app.get("/api/get/low", (req, res) => {
  let sqlquery = "SELECT * FROM items WHERE priority='low'";
  conn.query(sqlquery, (err, results) => {
    if (err) throw err;
    else {
      res.send(results);
    }
  });
});

app.get("/api/get/middle", (req, res) => {
  let sqlquery = "SELECT * FROM items WHERE priority='middle'";
  conn.query(sqlquery, (err, results) => {
    if (err) throw err;
    else {
      res.send(results);
    }
  });
});

app.get("/api/get/high", (req, res) => {
  let sqlquery = "SELECT * FROM items WHERE priority='high'";
  conn.query(sqlquery, (err, results) => {
    if (err) throw err;
    else {
      res.send(results);
    }
  });
});

app.post("/api/post", (req, res) => {
  const work = req.body.item;
  const workpriority = req.body.priority;
  const sqlquery = "INSERT INTO items(priority,item) VALUES(?,?)";
  conn.query(sqlquery, [workpriority, work], (err, result) => {
    if (err) throw err;
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlquery = "DELETE FROM items WHERE id=?";
  conn.query(sqlquery, id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const id = req.params.id;
  let sqlquery = "SELECT * FROM items WHERE id=?";
  conn.query(sqlquery, [id], (err, results) => {
    if (err) throw err;
    else {
      res.send(results);
    }
  });
});

app.put("/api/update/:id", (req, res) => {
  const id = req.params.id;
  const item = req.body.item;
  const priority = req.body.priority;
  let sqlquery =
    "UPDATE items SET priority='" +
    priority +
    "', item='" +
    item +
    "' WHERE id=" +
    id +
    ";";
  conn.query(sqlquery, (err, results) => {
    if (err) throw err;
    else {
      res.send(results);
    }
  });
});

conn.connect((err) => {
  if (err) throw err;
  else console.log("mysql started successfully");
});

app.listen(5000, () => {
  console.log("app running on port 5000");
});
