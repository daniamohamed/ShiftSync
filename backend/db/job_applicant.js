// importing required modules
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const sequelize = require("./connection");

const JobApplicant = sequelize.define(
   "Jobapplicant",
   {
      // defining 'jobapplicant' model
      // job applicant - individual applying for a specific job
      aid: {
         type: Sequelize.UUID,
         defaultValue: Sequelize.UUIDV4,
         allowNull: false,
         primaryKey: true,
      },
      name: {
         type: Sequelize.STRING,
         allowNull: false,
      },
      skills: {
         type: Sequelize.ARRAY(Sequelize.TEXT),
         allowNull: true,
      },
      education: {
         type: Sequelize.ARRAY(DataTypes.JSON),
         allowNull: true,
         // adding a custom validator to check if years are valid
         validate: {
            validator: function (value) {
               value.forEach((obj) => {
                  if (!Number.isInteger(obj.startYear)) {
                     throw new Error("Start Year should be an integer");
                  }
                  if (!Number.isInteger(obj.endYear)) {
                     throw new Error("End Year should be an integer");
                  }
                  if (obj.endYear <= obj.startYear) {
                     throw new Error(
                        "End year should be greater than Start year"
                     );
                  }
               });
               return value;
            },
         },
      },
      rating: {
         type: Sequelize.INTEGER,
         defaultValue: 0,
         min: 0,
         max: 5.0,
      },
   },
   {
      timestamps: false,
   }
);

module.exports = JobApplicant;