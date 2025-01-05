import React, { useEffect, useState } from "react";

const EmployeeForm = ({ editEmployee, onUpdate }) => {
  const [name, setName] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [employmentType, setEmploymentType] = useState<string>("");
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>();

  useEffect(() => {
    if (editEmployee) {
      setName(editEmployee.name);
      setJobTitle(editEmployee.jobTitle);
      setDepartment(editEmployee.department);
      setEmploymentType(editEmployee.employmentType);
      setButtonText("Update Employee");
    } else {
      setName("");
      setJobTitle("");
      setDepartment("");
      setEmploymentType("");
      setButtonText("Add Employee");
    }
  }, [editEmployee]);

  const employeeDetails = {
    name,
    jobTitle,
    department,
    employmentType,
  };

  const addEmployeeFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    // I will add my employee to database
    e.preventDefault();

    if (editEmployee) {
      fetch(`http://localhost:3000/updateEmployee/${editEmployee.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(employeeDetails),
      })
        .then(function (res) {
          setButtonText("Updated Successfully");
          setTimeout(() => {
            setButtonText("Add Employee");
          }, 1000);
          onUpdate();
        })
        .catch(function (error) {
          console.log(error);
        });
      setName("");
      setJobTitle("");
      setIsFormSubmitted(true);
    } else {
      fetch(`http://localhost:3000/addEmployee`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(employeeDetails),
      })
        .then(function (res) {
          setButtonText("Added Successfully");
          setTimeout(() => {
            setButtonText("Add Employee");
          }, 1000);
          onUpdate();
        })
        .catch(function (error) {
          console.log(error);
        });

      setName("");
      setJobTitle("");
      setIsFormSubmitted(true);
    }
  };

  return (
    <div className="container w-50 mt-5">
      <h2 className="mb-3">Employee Management</h2>
      <form
        onSubmit={addEmployeeFormHandler}
        className="border px-3 py-3 rounded"
        action=""
      >
        <label className="form-label" htmlFor="name">
          Name:
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-3"
          type="text"
          id="name"
          value={name}
          required
        />
        <label className="form-label" htmlFor="job">
          Job Title:
        </label>
        <input
          onChange={(e) => setJobTitle(e.target.value)}
          className="form-control mb-3"
          type="text"
          id="job"
          value={jobTitle}
          required
        />
        <label className="form-label" htmlFor="">
          Department:
        </label>
        <select
          onChange={(e) => setDepartment(e.target.value)}
          className="form-select mb-3"
          name=""
          id=""
          // value={isFormSubmitted ? "" : department}
          required
        >
          <option selected value="">
            Please select an option
          </option>
          <option value="Design">Design</option>
          <option value="Engineering">Engineering</option>
        </select>
        <label className="form-label " htmlFor="">
          Employement Type
        </label>
        <select
          onChange={(e) => setEmploymentType(e.target.value)}
          className="form-select mb-3"
          name=""
          id=""
          // value={isFormSubmitted ? "" : employmentType}
          required
        >
          <option selected value="">
            Please select an option
          </option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>

        <button type="submit" className="btn btn-primary">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
