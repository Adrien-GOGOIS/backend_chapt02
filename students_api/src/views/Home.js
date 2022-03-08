import { useState, useEffect } from "react";

const axios = require("axios");

export default function Home() {
  const [student, setStudent] = useState();
  const [studentsList, setStudentsList] = useState();

  useEffect(() => {
    axios.get("http://localhost:8000/students").then((res) => {
      const data = res.data;
      setStudentsList(data);
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

      {studentsList.map((student) => {
        <ul>
          <li>{studentsList.name}</li>
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
