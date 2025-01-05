import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("employee_db", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

export const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
