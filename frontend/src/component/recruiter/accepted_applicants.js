import { useState, useEffect, useContext } from "react";
import {
   Button,
   Chip,
   Grid,
   IconButton,
   makeStyles,
   Paper,
   Typography,
   Modal,
   Checkbox,
   Avatar,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { SetPopupContext } from "../../app";

import apiList, { server } from "../../lib/api_list";

   const colorSet = {
      applied: "#3454D1",
      shortlisted: "#DC851F",
      accepted: "#09BC8A",
      rejected: "#D1345B",
      deleted: "#B49A67",
      cancelled: "#FF8484",
      finished: "#4EA5D9",
   };

   const updateStatus = (status) => {
      const address = `${apiList.applications}/${application.applicationId}`;
      const statusData = {
         status: status,
         dateOfJoining: new Date().toISOString(),
      };
      axios
         .put(address, statusData, {
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
            handleCloseEndJob();
            getData();
         })
         .catch((err) => {
            setPopup({
               open: true,
               severity: "error",
               message: err.response.data.message,
            });
            console.log(err.response);
            handleCloseEndJob();
         });
   };

   return (
      <Paper className={classes.jobTileOuter} elevation={3}>
         <Grid container>
            <Grid
               item
               xs={2}
               style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <Avatar
                  src={`${server}${application.Jobapplicant.profile}`}
                  className={classes.avatar}
               />
            </Grid>
            <Grid container item xs={7} spacing={1} direction="column">
               <Grid item>
                  <Typography variant="h5">
                     {application.Jobapplicant.name}
                  </Typography>
               </Grid>
               <Grid item>
                  <Rating
                     value={
                        application.Jobapplicant.rating !== -1
                           ? application.Jobapplicant.rating
                           : null
                     }
                     readOnly
                  />
               </Grid>
               <Grid item>Job Title: {application.job.title}</Grid>
               <Grid item> Type: {application.job.jobType}</Grid>
               <Grid item>Applied On: {appliedOn.toLocaleDateString()}</Grid>
               <Grid item>Payment: Pending</Grid>
               <Grid item>
                  {application.Jobapplicant.skills.map((skill) => (
                     <Chip label={skill} style={{ marginRight: "2px" }} />
                  ))}
               </Grid>
            </Grid>
            <Grid item container direction="column" xs={3}>
               <Grid item container xs>
                  <Button
                     variant="contained"
                     color="primary"
                     className={classes.statusBlock}
                     style={{
                        background: "#09BC8A",
                     }}
                     onClick={() => {
                        setOpenEndJob(true);
                     }}
                  >
                     End Job
                  </Button>
               </Grid>
               <Grid item>
                  <Button
                     variant="contained"
                     color="secondary"
                     className={classes.statusBlock}
                     onClick={() => {
                        setOpenPayment(true);
                     }}
                  >
                     Payment Made
                  </Button>
               </Grid>
               <Grid item>
                  <Button
                     variant="contained"
                     color="primary"
                     className={classes.statusBlock}
                     onClick={() => {
                        setOpen(true);
                     }}
                  >
                     Rate Applicant
                  </Button>
               </Grid>
            </Grid>
         </Grid>
         <Modal
            open={openPayment}
            onClose={handleClosePayment}
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
               <Button
                  variant="contained"
                  color="primary"
                  style={{ padding: "10px 50px" }}
                  onClick={() => changeRating()}
               >
                  PAY
               </Button>
            </Paper>
         </Modal>
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
               <Rating
                  name="simple-controlled"
                  style={{ marginBottom: "30px" }}
                  value={rating === -1 ? null : rating}
                  onChange={(event, newValue) => {
                     setRating(newValue);
                  }}
               />
               <Button
                  variant="contained"
                  color="primary"
                  style={{ padding: "10px 50px" }}
                  onClick={() => changeRating()}
               >
                  Submit
               </Button>
            </Paper>
         </Modal>
         <Modal
            open={openEndJob}
            onClose={handleCloseEndJob}
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
               <Grid container justifyContent="center" spacing={5}>
                  <Grid item>
                     <Button
                        variant="contained"
                        color="secondary"
                        style={{ padding: "10px 50px" }}
                        onClick={() => {
                           updateStatus("finished");
                        }}
                     >
                        Yes
                     </Button>
                  </Grid>
                  <Grid item>
                     <Button
                        variant="contained"
                        color="primary"
                        style={{ padding: "10px 50px" }}
                        onClick={() => handleCloseEndJob()}
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

const AcceptedApplicants = (props) => {
   const setPopup = useContext(SetPopupContext);
   const [applications, setApplications] = useState([]);
   const [filterOpen, setFilterOpen] = useState(false);
   const [searchOptions, setSearchOptions] = useState({
      sort: {
         "Jobapplicant.name": {
            status: false,
            desc: false,
         },
         "job.title": {
            status: false,
            desc: false,
         },
         dateOfJoining: {
            status: true,
            desc: true,
         },
         "Jobapplicant.rating": {
            status: false,
            desc: false,
         },
      },
   });

   useEffect(() => {
      getData();
   }, []);

   const getData = () => {
      let searchParams = [];
      searchParams = [...searchParams, `status=accepted`];

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
      let address = `${apiList.applicants}`;
      if (queryString !== "") {
         address = `${address}?${queryString}`;
      }

      console.log(address);

      axios
         .get(address, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         })
         .then((response) => {
            console.log(response.data);
            setApplications(response.data);
         })
         .catch((err) => {
            console.log(err);
            setApplications([]);
            setPopup({
               open: true,
               severity: "error",
               message: err.response.data.message,
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
            <Grid item>
               <Typography variant="h2">Employees</Typography>
            </Grid>
            <Grid item>
               <IconButton onClick={() => setFilterOpen(true)}>
                  <FilterListIcon />
               </IconButton>
            </Grid>
            <Grid
               container
               item
               xs
               direction="column"
               style={{ width: "100%" }}
               alignItems="stretch"
               justifyContent="center"
            >
               {applications.length > 0 ? (
                  applications.map((obj) => (
                     <Grid item>
                        <ApplicationTile application={obj} getData={getData} />
                     </Grid>
                  ))
               ) : (
                  <Typography variant="h5" style={{ textAlign: "center" }}>
                     No Applications Found
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

export default AcceptedApplicants;
