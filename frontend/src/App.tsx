import { useEffect, useState } from "react";
import "./App.css";
import EmployeeForm from "./components/EmployeeForm";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = () => {
      fetch("http://localhost:3000/getEmployees")
        .then((res) => res.json())
        .then((data) => setEmployees(data.allEmployees));
    };

    fetchEmployees();
  }, []);

  return (
    <>
      <NavBar />
      <EmployeeForm />

      {/* employess list */}
    </>
  );
};

export default App;
