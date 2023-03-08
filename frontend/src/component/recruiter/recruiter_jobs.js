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
};

export default MyJobs;
