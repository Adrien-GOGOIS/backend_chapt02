import { useState, useEffect } from "react";

const axios = require("axios");

export default function Home() {
  const [student, setStudent] = useState();
  const [studentsList, setStudentsList] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/students").then((res) => {
      const data = res.data;
      setStudentsList(data);
      console.log("TEST axios", studentsList);
    });
  }, [reload]);

  const onChange = (e) => {
    setStudent(e.target.value);
    // console.log("INPUT", student);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/students", {
      id: studentsList.length + 1,
      name: student,
    });

    setReload((prev) => !prev);
  };

  return (
    <>
      <h1>Liste des étudiants</h1>
      <form>
        <input type="text" onChange={onChange} />
        <button type="submit" onClick={onSubmit}>
          SUBMIT
        </button>
      </form>
      {studentsList &&
        studentsList.map((stu) => {
          return (
            <ul>
              <li>{stu.name}</li>
            </ul>
          );
        })}
    </>
  );
}
