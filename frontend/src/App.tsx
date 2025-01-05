import { useEffect, useState } from "react";
import "./App.css";
import EmployeeForm from "./components/EmployeeForm";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  interface Employee {
    id: number;
    name: string;
    jobTitle: string;
    department: string;
    employmentType: string;
  }

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editEmployee, setEditEmployee] = useState<Employee>();

  const fetchEmployees = () => {
    fetch("http://localhost:3000/getEmployees")
      .then((res) => res.json())
      .then((data) => setEmployees(data.allEmployees));
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  // update Handler
  const updateHandler = (employee: Employee) => {
    console.log(`Clicked on updated`, employee);
    setEditEmployee(employee);
  };

  const handleEmployeeUpdate = () => {
    fetchEmployees();
  };

  return (
    <>
      <NavBar />
      <EmployeeForm
        editEmployee={editEmployee}
        onUpdate={handleEmployeeUpdate}
      />

      {/* employess list */}
      <ul className="list-group mx-5">
        {employees.map((employee) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={employee.id}
          >
            <div>
              <strong>{employee.name}</strong> ({employee.jobTitle}) -{" "}
              {employee.department} - {employee.employmentType}
            </div>
            <div>
              <button
                onClick={() => updateHandler(employee)}
                className="btn btn-sm btn-primary"
              >
                Edit
              </button>
              <button className="btn btn-sm btn-danger">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
