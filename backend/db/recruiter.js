// import required modules
const Sequelize = require("sequelize");
const sequelize = require("./connection");
const Job = require("./job");

// defining recruiter table
const Recruiter = sequelize.define(
  "recruiter",
  {
    rid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bio: {
      type: Sequelize.TEXT,
    },
    contactNumber: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        // custom validator for phone number
        validator: function (v) {
          if (v !== "") {
            const regex = /^\+44\d{10}$/.test(v);
            if (!regex) {
              throw new Error("Phone number is invalid");
            } else return true;
          }
        },
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Recruiter;