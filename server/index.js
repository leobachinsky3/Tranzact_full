const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "tranzact",
});

app.post("/create", (req, res) => {
  const oname = req.body.oname;
  const business_role = req.body.business_role;
  const owner_address = req.body.owner_address;

  db.query(
    "INSERT INTO owner (oname, business_role, owner_address) values (?, ?, ?)",
    [oname, business_role, owner_address],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/owner", (req, res) => {
  db.query("SELECT * FROM owner", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.delete("/delete/:oid", (req, res) => {
  const oid = req.params.oid;
  db.query("DELETE FROM owner WHERE oid = ?", oid, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
