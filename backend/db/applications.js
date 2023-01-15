// import required modules
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const sequelize = require("./connection");
const { DataTypes } = require("sequelize");

// define table 'applications'
const Applications = sequelize.define(
   "applications",
   {
      applicationId: {
         type: Sequelize.UUID,
         defaultValue: Sequelize.UUIDV4,
         allowNull: false,
         primaryKey: true,
      },
      status: {
         type: Sequelize.STRING,
         defaultValue: "",
         validate: {
            // add a custom validator to check if the status value is valid
            validateStatus: (value) => {
               const enums = [
                  "applied", // when an applicant has applied
                  "shortlisted", // when an applicant is shortlisted
                  "accepted", // when an applicant is accepted
                  "rejected", // when an applicant is rejected
                  "deleted", // when any job is deleted
                  "finished", // when a job is finished
               ];
               if (!enums.includes(value)) {
                  throw new Error("Not a valid status type!");
               }
            },
         },
      },
      dateOfApplication: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
      },
      dateOfJoining: {
         type: DataTypes.DATE,
      },
      // statement of purpose - add word limit
      sop: {
         type: Sequelize.STRING,
         validate: {
            validator: (value) => {
               if (value.split(" ").filter((ele) => ele != "").length > 250) {
                  throw new Error(
                     "Statement of purpose should not be greater than 250 words"
                  );
               }
            },
         },
      },
   },
   { timestamps: false }
);

module.exports = Applications;