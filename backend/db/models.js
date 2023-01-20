// importing required modules
const User = require("./user");
const JOB = require("./job");
const JobApplicant = require("./job_applicant");
const Applications = require("./applications");
const Recruiter = require("./recruiter");
const sequelize = require("./connection");
const Sequelize = require("sequelize");
const { Rating } = require("./ratings");
const { DataTypes } = require("sequelize");

// establishing a foreign key constraint between Job model and Recruiter model
JOB.belongsTo(Recruiter, {
   foreignKey: {
      name: "rid",
      type: Sequelize.UUID,
      allowNull: false,
   },
});

// establishing a foreign key constraint between Applications model and Job model
Applications.belongsTo(JOB, {
   foreignKey: {
      name: "jid",
      type: Sequelize.UUID,
      allowNull: false,
   },
});

// establishing a foreign key constraint between Applications model and JobApplicant model
Applications.belongsTo(JobApplicant, {
   foreignKey: {
      name: "aid",
      type: Sequelize.UUID,
      allowNull: false,
   },
   targetKey: "aid",
});

// establishing a foreign key constraint between Applications model and Recruiter model
Applications.belongsTo(Recruiter, {
   foreignKey: "rid",
   type: Sequelize.UUID,
   allowNull: false,
});

sequelize
   .sync({ alter: true, force: false })
   .then(() => console.log("All Tables Created Successfully"));

// exporting the models and sequelize connection object
module.exports = {
   User,
   JOB,
   JobApplicant,
   Recruiter,
   sequelize,
   Applications,
   Rating,
};