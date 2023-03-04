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
                  <Paper
                     style={{
                        padding: "20px",
                        outline: "none",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                     }}
                  >
                     <Grid
                        container
                        direction="column"
                        alignItems="stretch"
                        spacing={3}
                     >
                        <Grid item>
                           <TextField
                              label="Title"
                              value={jobDetails.title}
                              onChange={(event) =>
                                 handleInput("title", event.target.value)
                              }
                              variant="outlined"
                              fullWidth
                           />
                        </Grid>
                        <Grid item>
                           <ChipInput
                              className={classes.inputBox}
                              label="Skills"
                              variant="outlined"
                              helperText="Press enter to add skills"
                              value={jobDetails.skillsets}
                              onAdd={(chip) =>
                                 setJobDetails({
                                    ...jobDetails,
                                    skillsets: [...jobDetails.skillsets, chip],
                                 })
                              }
                              onDelete={(chip, index) => {
                                 let skillsets = jobDetails.skillsets;
                                 skillsets.splice(index, 1);
                                 setJobDetails({
                                    ...jobDetails,
                                    skillsets: skillsets,
                                 });
                              }}
                              fullWidth
                           />
                        </Grid>
                        <Grid item>
                           <TextField
                              select
                              label="Job Type"
                              variant="outlined"
                              value={jobDetails.jobType}
                              onChange={(event) => {
                                 handleInput("jobType", event.target.value);
                              }}
                              fullWidth
                           >
                              <MenuItem value="Part Time">Part Time</MenuItem>
                              <MenuItem value="Work From Home">
                                 Work From Home
                              </MenuItem>
                           </TextField>
                        </Grid>
                        <Grid item>
                           <TextField
                              select
                              label="Duration"
                              variant="outlined"
                              value={jobDetails.duration}
                              onChange={(event) => {
                                 handleInput("duration", event.target.value);
                              }}
                              fullWidth
                           >
                              <MenuItem value={0}>Flexible</MenuItem>
                              <MenuItem value={1}>1 Hour</MenuItem>
                              <MenuItem value={2}>2 Hours</MenuItem>
                              <MenuItem value={3}>3 Hours</MenuItem>
                              <MenuItem value={4}>4 Hours</MenuItem>
                              <MenuItem value={5}>5 Hours</MenuItem>
                              <MenuItem value={6}>6 Hours</MenuItem>
                           </TextField>
                        </Grid>
                        <Grid item>
                           <TextField
                              label="Salary (per hour)"
                              type="number"
                              variant="outlined"
                              value={jobDetails.salary}
                              onChange={(event) => {
                                 handleInput("salary", event.target.value);
                              }}
                              InputProps={{ inputProps: { min: 0 } }}
                              fullWidth
                           />
                        </Grid>
                        <Grid item>
                           <TextField
                              label="Application Deadline"
                              type="datetime-local"
                              value={jobDetails.deadline}
                              onChange={(event) => {
                                 handleInput("deadline", event.target.value);
                              }}
                              InputLabelProps={{
                                 shrink: true,
                              }}
                              variant="outlined"
                              fullWidth
                           />
                        </Grid>
                        <Grid item>
                           <TextField
                              label="Maximum Number Of Applicants"
                              type="number"
                              variant="outlined"
                              value={jobDetails.maxApplicants}
                              onChange={(event) => {
                                 handleInput(
                                    "maxApplicants",
                                    event.target.value
                                 );
                              }}
                              InputProps={{ inputProps: { min: 1 } }}
                              fullWidth
                           />
                        </Grid>
                        <Grid item>
                           <TextField
                              label="Positions Available"
                              type="number"
                              variant="outlined"
                              value={jobDetails.maxPositions}
                              onChange={(event) => {
                                 handleInput(
                                    "maxPositions",
                                    event.target.value
                                 );
                              }}
                              InputProps={{ inputProps: { min: 1 } }}
                              fullWidth
                           />
                        </Grid>
                     </Grid>
                     <Button
                        variant="contained"
                        color="primary"
                        style={{ padding: "10px 50px", marginTop: "30px" }}
                        onClick={() => handleUpdate()}
                     >
                        Create Job
                     </Button>
                  </Paper>
               </Grid>
            </Grid>
         </Grid>
      </>
   );
};

export default CreateJobs;