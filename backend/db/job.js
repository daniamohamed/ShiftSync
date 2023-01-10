// importing required modules
const Sequelize = require("sequelize");
const sequelize = require("./connection");
const { DataTypes } = require("sequelize");

// defining jobs added by employer
const Job = sequelize.define(
   "jobs",
   {
      jid: {
         type: Sequelize.UUID,
         defaultValue: Sequelize.UUIDV4,
         allowNull: false,
         primaryKey: true,
      },
      title: {
         type: Sequelize.STRING,
         allowNull: false,
         validate: {
            notEmpty: {
               messsage: "Title is required",
            },
         },
      },
      maxApplicants: {
         type: Sequelize.INTEGER,
         validate: {
            isInt: {
               messsage: "Maximum number of applicants should be an integer",
            },
            min: {
               args: 1,
               messsage: "Maximum number of applicants should greater than 0",
            },
         },
      },
      maxPositions: {
         type: Sequelize.INTEGER,
         validate: {
            isInt: {
               messsage: "Maximum number of positions should be an integer",
            },
            min: {
               args: 1,
               messsage: "Maximum number of positions should greater than 0",
            },
            // custom validation that number of positions available is always lesser than or equal to number of applicants
            checkMaxPositions(value) {
               if (value > this.maxApplicants) {
                  throw new Error(
                     "Maximum number of positions should be less than or equal to the maximum number of applicants"
                  );
               }
            },
         },
      },
      activeApplications: {
         type: Sequelize.INTEGER,
         defaultValue: 0,
         validate: {
            isInt: {
               messsage: "Number of active applications should be an integer",
            },
         },
      },
      acceptedCandidates: {
         type: Sequelize.INTEGER,
         defaultValue: 0,
         validate: {
            isInt: {
               messsage: "Number of accepted candidates should be an integer",
            },
         },
      },
      dateOfPosting: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
      },
      deadline: {
         type: DataTypes.DATE,
      },
      skillsets: Sequelize.ARRAY(Sequelize.STRING),
      jobType: {
         type: Sequelize.STRING,
         allowNull: false,
      },
      duration: {
         type: Sequelize.INTEGER,
         validate: {
            isInt: {
               messsage: "Duration should be an integer",
            },
            min: 0,
         },
      },
      salary: {
         type: Sequelize.INTEGER,
         validate: {
            isInt: {
               messsage: "Salary should be an integer",
            },
            min: {
               args: 1,
               messsage: "Salary should be greater than 0",
            },
         },
      },
      rating: {
         type: Sequelize.FLOAT,
         max: 5.0,
         defaultValue: 0,
         validate: {
            min: {
               args: -1,
               messsage: "Invalid Rating",
            },
            max: {
               args: 5,
               messsage: "Invalid Rating",
            },
         },
      },
   },
   {
      timestamps: false,
   }
);

module.exports = Job;
