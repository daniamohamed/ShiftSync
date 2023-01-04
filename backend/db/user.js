// importing required module
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const sequelize = require("./connection");

// defining user table
const User = sequelize.define(
  "users",
  {
    uid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        typeValidator: (value) => {
          const enums = ["recruiter", "applicant"];
          if (!enums.includes(value)) {
            throw new Error("Not a valid User type");
          }
        },
      },
    },
    created_on: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  },
  {
    // encrypting user password
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, "a");
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    },
    timestamps: false,
  }
);

module.exports = User;
