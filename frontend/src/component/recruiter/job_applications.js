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
   FormControlLabel,
   Checkbox,
   Avatar,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { SetPopupContext } from "../../app";

import apiList, { server } from "../../lib/api_list";

const useStyles = makeStyles((theme) => ({
   body: {
      height: "inherit",
   },
   statusBlock: {
      width: "100%",
      height: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textTransform: "uppercase",
   },
   jobTileOuter: {
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
   avatar: {
      padding: "10px",
      marginRight: "30px",
   },
}));

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
                     Application Status
                  </Grid>
                  <Grid container item xs={9} justifyContent="space-around">
                     <Grid item>
                        <FormControlLabel
                           control={
                              <Checkbox
                                 name="rejected"
                                 checked={searchOptions.status.rejected}
                                 onChange={(event) => {
                                    setSearchOptions({
                                       ...searchOptions,
                                       status: {
                                          ...searchOptions.status,
                                          [event.target.name]:
                                             event.target.checked,
                                       },
                                    });
                                 }}
                              />
                           }
                           label="Rejected"
                        />
                     </Grid>
                     <Grid item>
                        <FormControlLabel
                           control={
                              <Checkbox
                                 name="applied"
                                 checked={searchOptions.status.applied}
                                 onChange={(event) => {
                                    setSearchOptions({
                                       ...searchOptions,
                                       status: {
                                          ...searchOptions.status,
                                          [event.target.name]:
                                             event.target.checked,
                                       },
                                    });
                                 }}
                              />
                           }
                           label="Applied"
                        />
                     </Grid>
                     <Grid item>
                        <FormControlLabel
                           control={
                              <Checkbox
                                 name="shortlisted"
                                 checked={searchOptions.status.shortlisted}
                                 onChange={(event) => {
                                    setSearchOptions({
                                       ...searchOptions,
                                       status: {
                                          ...searchOptions.status,
                                          [event.target.name]:
                                             event.target.checked,
                                       },
                                    });
                                 }}
                              />
                           }
                           label="Shortlisted"
                        />
                     </Grid>
                  </Grid>
               </Grid>
               <Grid container item alignItems="center">
                  <Grid item xs={3}>
                     Sort
                  </Grid>
                  <Grid item container direction="row" xs={9}>
                     <Grid
                        item
                        container
                        xs={4}
                        justifyContent="space-around"
                        alignItems="center"
                        style={{
                           border: "1px solid #D1D1D1",
                           borderRadius: "5px",
                        }}
                     >
                        <Grid item>
                           <Checkbox
                              name="name"
                              checked={
                                 searchOptions.sort["Jobapplicant.name"].status
                              }
                              onChange={(event) =>
                                 setSearchOptions({
                                    ...searchOptions,
                                    sort: {
                                       ...searchOptions.sort,
                                       "Jobapplicant.name": {
                                          ...searchOptions.sort[
                                             "Jobapplicant.name"
                                          ],
                                          status: event.target.checked,
                                       },
                                    },
                                 })
                              }
                              id="name"
                           />
                        </Grid>
                        <Grid item>
                           <label for="name">
                              <Typography>Name</Typography>
                           </label>
                        </Grid>
                        <Grid item>
                           <IconButton
                              disabled={
                                 !searchOptions.sort["Jobapplicant.name"].status
                              }
                              onClick={() => {
                                 setSearchOptions({
                                    ...searchOptions,
                                    sort: {
                                       ...searchOptions.sort,
                                       "Jobapplicant.name": {
                                          ...searchOptions.sort[
                                             "Jobapplicant.name"
                                          ],
                                          desc: !searchOptions.sort[
                                             "Jobapplicant.name"
                                          ].desc,
                                       },
                                    },
                                 });
                              }}
                           >
                              {searchOptions.sort["Jobapplicant.name"].desc ? (
                                 <ArrowDownwardIcon />
                              ) : (
                                 <ArrowUpwardIcon />
                              )}
                           </IconButton>
                        </Grid>
                     </Grid>
                     <Grid
                        item
                        container
                        xs={4}
                        justify="space-around"
                        alignItems="center"
                        style={{
                           border: "1px solid #D1D1D1",
                           borderRadius: "5px",
                        }}
                     >
                        <Grid item>
                           <Checkbox
                              name="dateOfApplication"
                              checked={
                                 searchOptions.sort.dateOfApplication.status
                              }
                              onChange={(event) =>
                                 setSearchOptions({
                                    ...searchOptions,
                                    sort: {
                                       ...searchOptions.sort,
                                       dateOfApplication: {
                                          ...searchOptions.sort
                                             .dateOfApplication,
                                          status: event.target.checked,
                                       },
                                    },
                                 })
                              }
                              id="dateOfApplication"
                           />
                        </Grid>
                        <Grid item>
                           <label for="dateOfApplication">
                              <Typography>Date of Application</Typography>
                           </label>
                        </Grid>
                        <Grid item>
                           <IconButton
                              disabled={
                                 !searchOptions.sort.dateOfApplication.status
                              }
                              onClick={() => {
                                 setSearchOptions({
                                    ...searchOptions,
                                    sort: {
                                       ...searchOptions.sort,
                                       dateOfApplication: {
                                          ...searchOptions.sort
                                             .dateOfApplication,
                                          desc: !searchOptions.sort
                                             .dateOfApplication.desc,
                                       },
                                    },
                                 });
                              }}
                           >
                              {searchOptions.sort.dateOfApplication.desc ? (
                                 <ArrowDownwardIcon />
                              ) : (
                                 <ArrowUpwardIcon />
                              )}
                           </IconButton>
                        </Grid>
                     </Grid>
                     <Grid
                        item
                        container
                        xs={4}
                        justifyContent="space-around"
                        alignItems="center"
                        style={{
                           border: "1px solid #D1D1D1",
                           borderRadius: "5px",
                        }}
                     >
                        <Grid item>
                           <Checkbox
                              name="rating"
                              checked={
                                 searchOptions.sort["Jobapplicant.rating"]
                                    .status
                              }
                              onChange={(event) =>
                                 setSearchOptions({
                                    ...searchOptions,
                                    sort: {
                                       ...searchOptions.sort,
                                       "Jobapplicant.rating": {
                                          ...searchOptions.sort[
                                             ["Jobapplicant.rating"]
                                          ],
                                          status: event.target.checked,
                                       },
                                    },
                                 })
                              }
                              id="rating"
                           />
                        </Grid>
                        <Grid item>
                           <label for="rating">
                              <Typography>Rating</Typography>
                           </label>
                        </Grid>
                        <Grid item>
                           <IconButton
                              disabled={
                                 !searchOptions.sort["Jobapplicant.rating"]
                                    .status
                              }
                              onClick={() => {
                                 setSearchOptions({
                                    ...searchOptions,
                                    sort: {
                                       ...searchOptions.sort,
                                       "Jobapplicant.rating": {
                                          ...searchOptions.sort[
                                             "Jobapplicant.rating"
                                          ],
                                          desc: !searchOptions.sort[
                                             "Jobapplicant.rating"
                                          ].desc,
                                       },
                                    },
                                 });
                              }}
                           >
                              {searchOptions.sort["Jobapplicant.rating"]
                                 .desc ? (
                                 <ArrowDownwardIcon />
                              ) : (
                                 <ArrowUpwardIcon />
                              )}
                           </IconButton>
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
               <Typography variant="h2">Applications</Typography>
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
               justify="center"
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

export default JobApplications;
