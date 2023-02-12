// import required modules
const uuid = require("uuid"); // for generating unique ids
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/auth_keys");

const User = require("../db/user");
const Recruiter = require("../db/recruiter");
const JobApplicant = require("../db/job_applicant");

const router = express.Router();

// route for user signup
router.post("/signup", (req, res) => {
   // extract user data from request body
   const data = req.body;
   const user_data = {
      uid: uuid.v4(), // generate unique user id
      email: data.email,
      password: data.password,
      type: data.type,
   };

   // create a new user in the database
   User.create(user_data)
      .then(() => {
         // if user type is recruiter
         if (data.type == "recruiter") {
            Recruiter.create({
               rid: user_data.uid,
               name: data.name,
               contactNumber: data.contactNumber,
               bio: data.bio,
            })
               .then(() => {
                  const token = jwt.sign(
                     { _id: user_data.uid },
                     authKeys.jwtSecretKey
                  );
                  res.json({
                     token: token,
                     type: user_data.type,
                  });
               })
               // if there was an error creating the recruiter
               .catch((err) => {
                  // delete the created user
                  User.destroy({ where: { uid: user_data.uid } })
                     .then(() => {
                        res.status(400).json(err);
                     })
                     .catch((err) => {
                        res.json({ error: err });
                     });
                  err;
               });
         } else {
            // if user type is applicant
            JobApplicant.create({
               aid: user_data.uid,
               name: data.name,
               education: data.education,
               skills: data.skills,
               rating: data.rating,
            })
               .then(() => {
                  // generate a token for the user
                  const token = jwt.sign(
                     { _id: user_data.uid },
                     authKeys.jwtSecretKey
                  );
                  // respond with the token and user type
                  res.json({
                     token: token,
                     type: user_data.type,
                  });
               })
               // if there was an error creating the applicant
               .catch((err) => {
                  // delete the created user
                  User.destroy({ where: { uid: user_data.uid } })
                     .then(() => {
                        res.status(400).json(err);
                     })
                     .catch((err) => {
                        res.json({ error: err });
                     });
                  err;
               });
         }
      })
      .finally(() => {
         console.log("Done"); // log status to the console when finished
      });
});

// route for user login
router.post("/login", (req, res, next) => {
   passport.authenticate(
      "local",
      { session: false },
      function (err, user, info) {
         if (err) {
            return next(err);
         }
         // if there's no user found, respond with a 401 status page
         if (!user) {
            res.status(401).json(info);
            return;
         }
         // if a user is found, generate a token for the user
         const token = jwt.sign({ _id: user.uid }, authKeys.jwtSecretKey);
         // Respond with the token and user type
         res.json({
            token: token,
            type: user.type,
         });
      }
   )(req, res, next);
});

module.exports = router;