const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "rootpassword",
  database: "todolist",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const completed = req.body.completed;

  db.query(
    "INSERT INTO todo (name, completed) VALUES (?,?)",
    [name, completed],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/todo", (req, res) => {
  db.query("SELECT * FROM todo", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/todoEdit", (req, res) => {
  db.query("SELECT id, name FROM todo", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/todoEditName", (req, res) => {
  db.query("SELECT name FROM todo", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const completed = req.body.completed;
  db.query(
    "UPDATE todo SET completed = ? WHERE id = ?",
    [completed, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updateEdit", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const completed = req.body.completed;
  db.query(
    "UPDATE todo SET name = ?, completed = ? WHERE id = ?",
    [name, completed, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM todo WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.listen(3001, () => {
  console.log("Yey! Running on port 3001");
});