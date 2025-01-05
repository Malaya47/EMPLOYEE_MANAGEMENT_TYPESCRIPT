const { DataTypes } = require("sequelize");

import { sequelize } from "../../config/dbConnection";

export const EmployeeModel = sequelize.define(
  "Employee",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employmentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);
