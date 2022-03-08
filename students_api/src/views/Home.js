import { useState, useEffect } from "react";

const axios = require("axios");

export default function Home() {
  const [student, setStudent] = useState();
  const [studentsList, setStudentsList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/students")
      .then((res) => {
        studentsList.push(res.data);
        // console.log("DATA", res.data);
      })
      .then(() => {
        console.log(studentsList);
      });
  }, []);

  const onChange = (e) => {
    setStudent(e.target.value);
  };

  const onSubmit = () => {
    axios.post();
  };

  return (
    <>
      <h1>Liste des étudiants</h1>

      {studentsList.length > 0 &&
        studentsList.map((student) => {
          <ul>
            <li>{student[0].name}</li>
          </ul>;
        })}

      <form action="POST">
        <input type="text" onChange={onChange} />
        <button type="submit" onClick={onSubmit}>
          SUBMIT
        </button>
      </form>
    </>
  );
}
