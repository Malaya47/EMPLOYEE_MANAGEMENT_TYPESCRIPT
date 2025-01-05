import express, { Request, Response } from "express";
import { dbConnection } from "../config/dbConnection";
import { EmployeeModel } from "./model/employeeModel";
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    Credential: true,
  })
);

EmployeeModel.sync({ force: false });

// Basic Route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Node.js!");
});

// Add employee route
app.post("/addEmployee", async (req: Request, res: Response) => {
  try {
    const employeeDetails = req.body;
    const employee = await EmployeeModel.create(employeeDetails);
    res
      .status(200)
      .json({ message: "Employee details added successfully", employee });
  } catch (error) {
    res.status(500).json({ message: "An error occured while adding employee" });
  }
});

// Update employee route
app.put("/updateEmployee/:id", async (req: Request, res: Response) => {
  try {
    const employeeId = req.params.id;
    const updatedEmployee = req.body;
    const employee = await EmployeeModel.findByPk(employeeId);

    if (employee) {
      await employee.update(updatedEmployee);
      res.status(200).json({ message: "Employee updated successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occured while updating data" });
  }
});

// Get all employee route
app.get("/getEmployees", async (req: Request, res: Response) => {
  try {
    const allEmployees = await EmployeeModel.findAll();
    res
      .status(200)
      .json({ message: "Employees found successfully", allEmployees });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occured while getting employees" });
  }
});

// Start Server
const PORT = 3000;

app.listen(PORT, () => {
  dbConnection();
  console.log(`Server is running on http://localhost:${PORT}`);
});
