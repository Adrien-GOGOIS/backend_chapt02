const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Confirmation de requête :
app.use((req, res, next) => {
  console.log("requête reçu");
  next(); //
});

// Tableau données API
const students = [
  {
    id: 1,
    name: "Adrien",
  },
];

// Routes liste étudiants
app.get("/students", (req, res) => {
  res.json(students);
});

// Post nouvel étudiant :
app.post("/students/", (req, res) => {
  students.push({
    id: students.length + 1,
    name: req.body.name,
  });
  res.send(students);
});

// Démarrage serveur
app.listen(8000, console.log("Listening......"));

exports.students = students;
