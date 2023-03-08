import { useState, useEffect, useContext } from "react";
import {
   Button,
   Chip,
   Grid,
   makeStyles,
   Paper,
   TextField,
   Typography,
   Modal,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";

import { SetPopupContext } from "../../app";

import apiList from "../../lib/api_list";

const useStyles = makeStyles((theme) => ({
   body: {
      height: "inherit",
   },
   button: {
      width: "100%",
      height: "100%",
   },
   jobTileOuter: {
      fontFamily: "system-ui",
      padding: "30px",
      margin: "20px 0",
      boxSizing: "border-box",
      width: "100%",
   },
   popupDialog: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
   },
   statusBlock: {
      width: "100%",
      height: "85%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textTransform: "uppercase",
   },
}));

const JobTile = (props) => {
   const classes = useStyles();
   let navigate = useNavigate();
   const { job, getData } = props;
   const setPopup = useContext(SetPopupContext);

   const [open, setOpen] = useState(false);
   const [openUpdate, setOpenUpdate] = useState(false);
   const [jobDetails, setJobDetails] = useState(job);

   const handleInput = (key, value) => {
      setJobDetails({
         ...jobDetails,
         [key]: value,
      });
   };

   const handleClick = (location) => {
      navigate(location);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleCloseUpdate = () => {
      setOpenUpdate(false);
   };

   const handleDelete = () => {
      axios
         .delete(`${apiList.jobs}/${job._id}`, {
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
            getData();
            handleClose();
         })
         .catch((err) => {
            console.log(err.response);
            setPopup({
               open: true,
               severity: "error",
               message: err.response.data.message,
            });
            handleClose();
         });
   };

   const handleJobUpdate = () => {
      axios
         .put(`${apiList.jobs}/${job._id}`, jobDetails, {
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
            getData();
            handleCloseUpdate();
         })
         .catch((err) => {
            console.log(err.response);
            setPopup({
               open: true,
               severity: "error",
               message: err.response.data.message,
            });
            handleCloseUpdate();
         });
   };

   const postedOn = new Date(job.dateOfPosting);

   return (
      <Paper className={classes.jobTileOuter} elevation={3}>
         <Grid container>
            <Grid container item xs={9} spacing={1} direction="column">
               <Grid item>
                  <Typography variant="h5">{job.title}</Typography>
               </Grid>
               <Grid item>
                  <Rating
                     value={job.rating !== -1 ? job.rating : null}
                     readOnly
                  />
               </Grid>
               <Grid item>Role : {job.jobType}</Grid>
               <Grid item>Salary : &#163; {job.salary} per hour</Grid>
               <Grid item>
                  Duration :{" "}
                  {job.duration !== 0 ? `${job.duration} hours` : `Flexible`}
               </Grid>
               <Grid item>
                  Date Of Posting: {postedOn.toLocaleDateString()}
               </Grid>
               <Grid item>
                  Remaining Number of Positions:{" "}
                  {job.maxPositions - job.acceptedCandidates}
               </Grid>
               <Grid item>
                  {job.skillsets.map((skill) => (
                     <Chip label={skill} style={{ marginRight: "2px" }} />
                  ))}
               </Grid>
            </Grid>
            <Grid item container direction="column" xs={3}>
               <Grid item xs>
                  <Button
                     variant="contained"
                     color="primary"
                     className={classes.statusBlock}
                     onClick={() => handleClick(`/job/applications/${job.jid}`)}
                  >
                     View Applications
                  </Button>
               </Grid>
               <Grid item>
                  <Button
                     variant="contained"
                     className={classes.statusBlock}
                     onClick={() => {
                        setOpenUpdate(true);
                     }}
                     style={{
                        background: "#FC7A1E",
                        color: "#fff",
                     }}
                  >
                     Update Details
                  </Button>
               </Grid>
               <Grid item>
                  <Button
                     variant="contained"
                     color="secondary"
                     className={classes.statusBlock}
                     onClick={() => {
                        setOpen(true);
                     }}
                  >
                     Delete Job
                  </Button>
               </Grid>
            </Grid>
         </Grid>
         <Modal
            open={open}
            onClose={handleClose}
            className={classes.popupDialog}
         >
            <Paper
               style={{
                  padding: "20px",
                  outline: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minWidth: "30%",
                  alignItems: "center",
               }}
            >
               <Typography variant="h4" style={{ marginBottom: "10px" }}>
                  Are you sure?
               </Typography>
               <Grid container justify="center" spacing={5}>
                  <Grid item>
                     <Button
                        variant="contained"
                        color="secondary"
                        style={{ padding: "10px 50px" }}
                        onClick={() => handleDelete()}
                     >
                        Delete
                     </Button>
                  </Grid>
                  <Grid item>
                     <Button
                        variant="contained"
                        color="primary"
                        style={{ padding: "10px 50px" }}
                        onClick={() => handleClose()}
                     >
                        Cancel
                     </Button>
                  </Grid>
               </Grid>
            </Paper>
         </Modal>
         <Modal
            open={openUpdate}
            onClose={handleCloseUpdate}
            className={classes.popupDialog}
         >
            <Paper
               style={{
                  padding: "20px",
                  outline: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minWidth: "30%",
                  alignItems: "center",
               }}
            >
               <Typography variant="h4" style={{ marginBottom: "10px" }}>
                  Update Details
               </Typography>
               <Grid
                  container
                  direction="column"
                  spacing={3}
                  style={{ margin: "10px" }}
               >
                  <Grid item>
                     <TextField
                        label="Application Deadline"
                        type="datetime-local"
                        value={jobDetails.deadline.substr(0, 16)}
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
                           handleInput("maxApplicants", event.target.value);
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
                           handleInput("maxPositions", event.target.value);
                        }}
                        InputProps={{ inputProps: { min: 1 } }}
                        fullWidth
                     />
                  </Grid>
               </Grid>
               <Grid container justifyContent="center" spacing={5}>
                  <Grid item>
                     <Button
                        variant="contained"
                        color="secondary"
                        style={{ padding: "10px 50px" }}
                        onClick={() => handleJobUpdate()}
                     >
                        Update
                     </Button>
                  </Grid>
                  <Grid item>
                     <Button
                        variant="contained"
                        color="primary"
                        style={{ padding: "10px 50px" }}
                        onClick={() => handleCloseUpdate()}
                     >
                        Cancel
                     </Button>
                  </Grid>
               </Grid>
            </Paper>
         </Modal>
      </Paper>
   );
};

const MyJobs = (props) => {
   const [jobs, setJobs] = useState([]);
   const [filterOpen, setFilterOpen] = useState(false);
   const [searchOptions, setSearchOptions] = useState({
      query: "",
      jobType: {
         fullTime: false,
         partTime: false,
         wfh: false,
      },
      salary: [0, 100],
      duration: "0",
      sort: {
         salary: {
            status: false,
            desc: false,
         },
         duration: {
            status: false,
            desc: false,
         },
         rating: {
            status: false,
            desc: false,
         },
      },
   });

   const setPopup = useContext(SetPopupContext);
   useEffect(() => {
      getData();
   }, []);

   const getData = () => {
      let searchParams = [`myjobs=1`];
      if (searchOptions.query !== "") {
         searchParams = [...searchParams, `q=${searchOptions.query}`];
      }
      if (searchOptions.jobType.fullTime) {
         searchParams = [...searchParams, `jobType=Full%20Time`];
      }
      if (searchOptions.jobType.partTime) {
         searchParams = [...searchParams, `jobType=Part%20Time`];
      }
      if (searchOptions.jobType.wfh) {
         searchParams = [...searchParams, `jobType=Work%20From%20Home`];
      }
      if (searchOptions.salary[0] != 0) {
         searchParams = [
            ...searchParams,
            `salaryMin=${searchOptions.salary[0] * 1000}`,
         ];
      }
      if (searchOptions.salary[1] != 100) {
         searchParams = [
            ...searchParams,
            `salaryMax=${searchOptions.salary[1] * 1000}`,
         ];
      }
      if (searchOptions.duration != "0") {
         searchParams = [...searchParams, `duration=${searchOptions.duration}`];
      }

      let asc = [],
         desc = [];

      Object.keys(searchOptions.sort).forEach((obj) => {
         const item = searchOptions.sort[obj];
         if (item.status) {
            if (item.desc) {
               desc = [...desc, `desc=${obj}`];
            } else {
               asc = [...asc, `asc=${obj}`];
            }
         }
      });
      searchParams = [...searchParams, ...asc, ...desc];
      const queryString = searchParams.join("&");
      let address = apiList.jobs;
      if (queryString !== "") {
         address = `${address}?${queryString}`;
      }

      axios
         .get(address, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         })
         .then((response) => {
            console.log(response.data);
            setJobs(response.data);
         })
         .catch((err) => {
            console.log(err.response.data);
            setPopup({
               open: true,
               severity: "error",
               message: "Error",
            });
         });
   };

   return (
      <>
         <Grid
            container
            item
            direction="column"
            alignItems="center"
            style={{ padding: "30px", minHeight: "93vh" }}
         >
            <Grid
               item
               container
               direction="column"
               justifyContent="center"
               alignItems="center"
            >
               <Grid item xs>
                  <Typography variant="h2">My Jobs</Typography>
               </Grid>
            </Grid>

            <Grid
               container
               item
               xs
               direction="column"
               alignItems="stretch"
               justifyContent="center"
            >
               {jobs.length > 0 ? (
                  jobs.map((job) => {
                     return <JobTile job={job} getData={getData} />;
                  })
               ) : (
                  <Typography variant="h5" style={{ textAlign: "center" }}>
                     No jobs found
                  </Typography>
               )}
            </Grid>
         </Grid>
      </>
   );
};

export default MyJobs;