import { useState, useEffect, useContext } from "react";
import {
   Button,
   Chip,
   Grid,
   IconButton,
   InputAdornment,
   makeStyles,
   Paper,
   TextField,
   Typography,
   Modal,
   FormControlLabel,
   Radio,
   Checkbox,
   Avatar,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";

import { SetPopupContext } from "../app";

import apiList from "../lib/api_list";
import { userType } from "../lib/auth";

const useStyles = makeStyles((theme) => ({
   body: {
      fontFamily: "system-ui",
      height: "inherit",
   },
   button: {
      width: "100%",
      height: "20%",
   },
   jobTileOuter: {
      fontFamily: "system-ui",
      padding: "30px",
      margin: "20px 0",
      boxSizing: "border-box",
      width: "100%",
   },
   popupDialog: {
      fontFamily: "system-ui",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
   },
}));

const JobTile = (props) => {
   const classes = useStyles();
   const { job } = props;
   const setPopup = useContext(SetPopupContext);

   const [open, setOpen] = useState(false);
   const [sop, setSop] = useState("");
   const handleClose = () => {
      setOpen(false);
      setSop("");
   };

   const handleApply = () => {
      axios
         .post(
            `${apiList.jobs}/${job.jid}/applications`,
            {
               sop: sop,
            },
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
            }
         )
         .then((response) => {
            setPopup({
               open: true,
               severity: "success",
               message: response.data.message,
            });
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

   const deadline = new Date(job.deadline).toLocaleDateString();

   return (
      <Paper className={classes.jobTileOuter} elevation={3}>
         <Grid container>
            <Grid container item xs={9} spacing={1} direction="column">
               <Grid item>
                  <Typography variant="h5">
                     <b>{job.recruiter.name} - </b> {job.title}
                  </Typography>
               </Grid>
               <Grid item>
                  <Rating
                     value={job.rating !== -1 ? job.rating : null}
                     readOnly
                  />
               </Grid>
               <Grid item>Role Type : {job.jobType}</Grid>
               <Grid item>Salary : &#163; {job.salary} per hour</Grid>
               <Grid item>Positions Available : {job.maxApplicants}</Grid>
               <Grid item>Application Deadline : {deadline}</Grid>
               <Grid item>
                  {job.skillsets.map((skill) => (
                     <Chip label={skill} style={{ marginRight: "2px" }} />
                  ))}
               </Grid>
               <Grid item>About us : {job.recruiter.bio}</Grid>
            </Grid>
            <Grid item xs={3}>
               <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => {
                     setOpen(true);
                  }}
                  disabled={userType() === "recruiter"}
               >
                  Apply
               </Button>
               <Avatar
                  alt="Profile picture"
                  src="/path/to/profile-pic.png"
                  style={{
                     marginTop: "25px",
                     marginLeft: "10px",
                     width: "100px",
                     height: "100px",
                  }}
               />
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
                  minWidth: "50%",
                  alignItems: "center",
               }}
            >
               <TextField
                  label="Please share what specific skills and experiences you bring to the table that make you a strong fit for this role. (upto 250 words)"
                  multiline
                  minRows={8}
                  style={{ width: "100%", marginBottom: "30px" }}
                  variant="outlined"
                  value={sop}
                  onChange={(event) => {
                     if (
                        event.target.value.split(" ").filter(function (n) {
                           return n !== "";
                        }).length <= 250
                     ) {
                        setSop(event.target.value);
                     }
                  }}
               />
               <Button
                  variant="contained"
                  color="primary"
                  style={{ padding: "10px 50px" }}
                  onClick={() => handleApply()}
               >
                  Submit
               </Button>
            </Paper>
         </Modal>
      </Paper>
   );
};

const FilterPopup = (props) => {
   const classes = useStyles();
   const { open, handleClose, searchOptions, setSearchOptions, getData } =
      props;
   return (
      <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
         <Paper
            style={{
               padding: "50px",
               outline: "none",
               minWidth: "50%",
            }}
         >
            <Grid container direction="column" alignItems="center" spacing={3}>
               <Grid container item alignItems="center">
                  <Grid item xs={3}>
                     TYPE
                  </Grid>
                  <Grid container item xs={9}>
                     <Grid item>
                        <FormControlLabel
                           control={
                              <Checkbox
                                 name="partTime"
                                 checked={searchOptions.jobType.partTime}
                                 onChange={(event) => {
                                    setSearchOptions({
                                       ...searchOptions,
                                       jobType: {
                                          ...searchOptions.jobType,
                                          [event.target.name]:
                                             event.target.checked,
                                       },
                                    });
                                 }}
                              />
                           }
                           label="Part Time"
                        />
                     </Grid>
                     <Grid item>
                        <FormControlLabel
                           control={
                              <Checkbox
                                 name="wfh"
                                 checked={searchOptions.jobType.wfh}
                                 onChange={(event) => {
                                    setSearchOptions({
                                       ...searchOptions,
                                       jobType: {
                                          ...searchOptions.jobType,
                                          [event.target.name]:
                                             event.target.checked,
                                       },
                                    });
                                 }}
                              />
                           }
                           label="Work From Home"
                        />
                     </Grid>
                  </Grid>
               </Grid>
               <Grid container item alignItems="center">
                  <Grid item xs={3}>
                     SORT
                  </Grid>
                  <Grid item container direction="row" xs={5}>
                     <Grid
                        item
                        container
                        xs={8}
                        justifyContent="space-around"
                        alignItems="center"
                     >
                        <Grid item>
                           <FormControlLabel
                              value="salary"
                              control={
                                 <Radio
                                    checked={
                                       searchOptions.sort.type === "salary"
                                    }
                                    onChange={() =>
                                       setSearchOptions({
                                          ...searchOptions,
                                          sort: {
                                             type: "salary",
                                             desc: !searchOptions.sort.desc,
                                          },
                                       })
                                    }
                                 />
                              }
                              label="Salary"
                           />
                        </Grid>
                        <Grid item>
                           <FormControlLabel
                              value="rating"
                              control={
                                 <Radio
                                    checked={
                                       searchOptions.sort.type === "rating"
                                    }
                                    onChange={() =>
                                       setSearchOptions({
                                          ...searchOptions,
                                          sort: {
                                             type: "rating",
                                             desc: !searchOptions.sort.desc,
                                          },
                                       })
                                    }
                                 />
                              }
                              label="Rating"
                           />
                        </Grid>
                     </Grid>
                  </Grid>
               </Grid>

               <Grid item>
                  <Button
                     variant="contained"
                     color="primary"
                     style={{ padding: "10px 50px" }}
                     onClick={() => getData()}
                  >
                     Apply
                  </Button>
               </Grid>
            </Grid>
         </Paper>
      </Modal>
   );
};

const Home = (props) => {
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
      let searchParams = [];
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
      if (searchOptions.salary[0] !== 0) {
         searchParams = [
            ...searchParams,
            `salaryMin=${searchOptions.salary[0] * 1000}`,
         ];
      }
      if (searchOptions.salary[1] !== 100) {
         searchParams = [
            ...searchParams,
            `salaryMax=${searchOptions.salary[1] * 1000}`,
         ];
      }
      if (searchOptions.duration !== "0") {
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
            setJobs(
               response.data.filter((obj) => {
                  const today = new Date();
                  const deadline = new Date(obj.deadline);

                  return deadline > today;
               })
            );
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
                  <Typography variant="h2" style={{ paddingBottom: "20px" }}>
                     Jobs
                  </Typography>
               </Grid>
               <Grid item xs>
                  <TextField
                     label="Search Jobs"
                     value={searchOptions.query}
                     onChange={(event) =>
                        setSearchOptions({
                           ...searchOptions,
                           query: event.target.value,
                        })
                     }
                     onKeyPress={(ev) => {
                        if (ev.key === "Enter") {
                           getData();
                        }
                     }}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment>
                              <IconButton onClick={() => getData()}>
                                 <SearchIcon />
                              </IconButton>
                           </InputAdornment>
                        ),
                     }}
                     style={{ width: "500px" }}
                     variant="outlined"
                  />
               </Grid>
               <Grid item>
                  <IconButton onClick={() => setFilterOpen(true)}>
                     <FilterListIcon />
                  </IconButton>
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
                     return <JobTile job={job} />;
                  })
               ) : (
                  <Typography variant="h5" style={{ textAlign: "center" }}>
                     No jobs found
                  </Typography>
               )}
            </Grid>
         </Grid>
         <FilterPopup
            open={filterOpen}
            searchOptions={searchOptions}
            setSearchOptions={setSearchOptions}
            handleClose={() => setFilterOpen(false)}
            getData={() => {
               getData();
               setFilterOpen(false);
            }}
         />
      </>
   );
};

export default Home;