import { useState, useContext } from "react";
import {
   Grid,
   TextField,
   Button,
   Typography,
   makeStyles,
   Paper,
   MenuItem,
} from "@material-ui/core";
import axios from "axios";
import { Navigate } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import PasswordInput from "../lib/pass_input";
import EmailInput from "../lib/email_input";
import { SetPopupContext } from "../app";

import apiList from "../lib/api_list";
import isAuth from "../lib/auth";

const useStyles = makeStyles((theme) => ({
   body: {
      padding: "50px",
      fontFamily: "Courier New",
      height: "800px",
   },
   inputBox: {
      width: "400px",
   },
   submitButton: {
      width: "200px",
   },
}));

const MultifieldInput = (props) => {
   const classes = useStyles();
   const { education, setEducation } = props;

   return (
      <>
         {education.map((obj, key) => (
            <Grid
               item
               container
               className={classes.inputBox}
               key={key}
               style={{ paddingLeft: 0, paddingRight: 0 }}
            >
               <Grid item xs={6}>
                  <TextField
                     label={`Institution Name #${key + 1}`}
                     value={education[key].institutionName}
                     onChange={(event) => {
                        const newEdu = [...education];
                        newEdu[key].institutionName = event.target.value;
                        setEducation(newEdu);
                     }}
                     variant="outlined"
                  />
               </Grid>
               <Grid item xs={3}>
                  <TextField
                     label="Start Year"
                     value={obj.startYear}
                     variant="outlined"
                     type="number"
                     onChange={(event) => {
                        const newEdu = [...education];
                        newEdu[key].startYear = event.target.value;
                        setEducation(newEdu);
                     }}
                  />
               </Grid>
               <Grid item xs={3}>
                  <TextField
                     label="End Year"
                     value={obj.endYear}
                     variant="outlined"
                     type="number"
                     onChange={(event) => {
                        const newEdu = [...education];
                        newEdu[key].endYear = event.target.value;
                        setEducation(newEdu);
                     }}
                  />
               </Grid>
            </Grid>
         ))}
         <Grid item>
            <Button
               variant="contained"
               color="secondary"
               onClick={() =>
                  setEducation([
                     ...education,
                     {
                        institutionName: "",
                        startYear: "",
                        endYear: "",
                     },
                  ])
               }
               className={classes.inputBox}
            >
               Add another institution details
            </Button>
         </Grid>
      </>
   );
};