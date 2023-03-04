import { useContext, useEffect, useState } from "react";
import {
   Button,
   Grid,
   Typography,
   Modal,
   Paper,
   makeStyles,
   TextField,
   MenuItem,
} from "@material-ui/core";
import axios from "axios";
import ChipInput from "material-ui-chip-input";

import { SetPopupContext } from "../../app";

import apiList from "../../lib/api_list";

const useStyles = makeStyles((theme) => ({
   body: {
      height: "inherit",
   },
   popupDialog: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
   },
}));

const CreateJobs = (props) => {
   const classes = useStyles();
   const setPopup = useContext(SetPopupContext);

   const [jobDetails, setJobDetails] = useState({
      title: "",
      maxApplicants: 20,
      maxPositions: 2,
      deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
         .toISOString()
         .substr(0, 16),
      skillsets: [],
      jobType: "Part Time",
      duration: 0,
      salary: 9.5,
   });

   const handleInput = (key, value) => {
      setJobDetails({
         ...jobDetails,
         [key]: value,
      });
   };

   const handleUpdate = () => {
      axios
         .post(apiList.jobs, jobDetails, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         })
         .then((response) => {
            setPopup({
               open: true,
               severity: "success",
               message: response.data.message,
            });
            setJobDetails({
               title: "",
               maxApplicants: 20,
               maxPositions: 2,
               deadline: new Date(
                  new Date().getTime() + 10 * 24 * 60 * 60 * 1000
               )
                  .toISOString()
                  .substr(0, 16),
               skillsets: [],
               jobType: "Part Time",
               duration: 0,
               salary: 9.5,
            });
         })
         .catch((err) => {
            setPopup({
               open: true,
               severity: "error",
               message: err.response.data.message,
            });
            console.log(err.response);
         });
   };

   return (
      <>
         <Grid
            container
            item
            direction="column"
            alignItems="center"
            style={{ padding: "40px", minHeight: "93vh" }}
         >
            <Grid item>
               <Typography variant="h2">Create Shift</Typography>
            </Grid>
            <Grid item container xs direction="column" justifyContent="center">
               <Grid item>
               </Grid>
            </Grid>
         </Grid>
      </>
   );
};

export default CreateJobs;
