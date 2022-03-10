import { useState, useEffect } from "react";

const axios = require("axios");

export default function Home() {
  const [student, setStudent] = useState();
  const [studentsList, setStudentsList] = useState();
  const [reload, setReload] = useState(false);

  // UseEffect
  useEffect(() => {
    fetchStudents();
  }, [reload]);

  // Fonction fetch API
  const fetchStudents = async () => {
    await axios.get("http://localhost:8000/students").then((res) => {
      const data = res.data;
      setStudentsList(data);
    });
  };

  // Input
  const onChange = (e) => {
    setStudent(e.target.value);
    // console.log("INPUT", student);
  };

  // Fonction ajout d'un étudiant à la liste
  const onSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/students", {
      id: studentsList.length + 1,
      name: student,
    });

    setReload((prev) => !prev);
  };

  // Fonction de suppression d'un étudiant :
  const onDelete = (stud) => {
    axios.delete("http://localhost:8000/students", {
      data: { name: stud },
    });

    const result = studentsList.filter((student) => student.name !== stud);
    setStudentsList(result);

    setReload((prev) => !prev);
  };

  return (
    <>
      <h1 style={{ fontWeight: "bold", fontSize: "50px", textAlign: "center" }}>
        Liste des étudiants
      </h1>
      <form style={{ textAlign: "center" }}>
        <input style={{ height: "15px" }} type="text" onChange={onChange} />
        <button
          style={{
            margin: "10px",
            padding: "5px",
            borderRadius: "5px",
            backgroundColor: "rgba(0, 150, 255, 0.8)",
            fontWeight: "bold",
          }}
          type="submit"
          onClick={onSubmit}
        >
          SUBMIT
        </button>
      </form>
      {studentsList &&
        studentsList.map((stu) => {
          return (
            <ul style={{ textAlign: "center" }}>
              <li
                style={{
                  fontWeight: "bold",
                  listStyle: "none",
                  fontSize: "25px",
                }}
              >
                {stu.name} --
                <button
                  style={{
                    margin: "2px 5px",
                    backgroundColor: "rgba(255, 50, 30, 0.7)",
                  }}
                  onClick={() => onDelete(stu.name)}
                >
                  X
                </button>
              </li>
            </ul>
          );
        })}
    </>
  );
}
