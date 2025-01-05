import React, { useState } from "react";

const EmployeeForm = () => {
  const [name, setName] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [employmentType, setEmploymentType] = useState<string>("");

  const employeeDetails = {
    name,
    jobTitle,
    department,
    employmentType,
  };

  const addEmployeeFormHandler = (e) => {
    // I will add my employee to database
    e.preventDefault();

    fetch(`http://localhost:3000/addEmployee`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(employeeDetails),
    })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (res) {
        console.log(res);
      });

    setName("");
    setDepartment("");
    setEmploymentType("");
    setJobTitle("");
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
        />
        <label className="form-label" htmlFor="job">
          Job Title:
        </label>
        <input
          onChange={(e) => setJobTitle(e.target.value)}
          className="form-control mb-3"
          type="text"
          id="job"
        />
        <label className="form-label" htmlFor="">
          Department:
        </label>
        <select
          onChange={(e) => setDepartment(e.target.value)}
          className="form-select mb-3"
          name=""
          id=""
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
        >
          <option selected value="">
            Please select an option
          </option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>

        <button type="submit" className="btn btn-primary">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
