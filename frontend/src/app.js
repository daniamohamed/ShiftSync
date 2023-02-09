// import required modules
import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";
import MessagePopup from "./lib/msg_popup";
import Navbar from "./component/navbar";
import Login from "./component/login";
import Logout from "./component/logout";
import Signup from "./component/user_signup";
import Profile from "./component/user_profile";
import Applications from "./component/applications";
import RecruiterProfile from "./component/recruiter/recruiter_profile";
import { userType } from "./lib/auth";
import CreateJobs from "./component/recruiter/create_jobs";
import MyJobs from "./component/recruiter/recruiter_jobs";
import Home from "./component/home";
import JobApplications from "./component/recruiter/job_applications";
import AcceptedApplicants from "./component/recruiter/accepted_applicants";
import Welcome, { ErrorPage } from "./component/welcome";

// defining css
const useStyles = makeStyles((theme) => ({
   body: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "70vh",
      paddingTop: "64px",
      boxSizing: "border-box",
      width: "100%",
      backgroundColor: "#fefefe",
   },
}));

export const SetPopupContext = createContext();

function App() {
   const classes = useStyles();
   const [popup, setPopup] = useState({
      open: false,
      severity: "",
      message: "",
   });

   // rendering main layout of app
   return (
      <BrowserRouter>
         <SetPopupContext.Provider value={setPopup}>
            <Grid container direction="column">
               <Grid item xs>
                  <Navbar id="navbar" />
               </Grid>
               <Grid item className={classes.body}>
                  <Routes>
                     <Route exact path="/" element={<Welcome />} />
                     <Route exact path="/login" element={<Login />} />
                     <Route exact path="/signup" element={<Signup />} />
                     <Route exact path="/logout" element={<Logout />} />
                     <Route exact path="/home" element={<Home />} />
                     <Route
                        exact
                        path="/profile"
                        element={
                           userType() === "recruiter" ? (
                              <RecruiterProfile />
                           ) : (
                              <Profile />
                           )
                        }
                     />
                     <Route exact path="/addjob" element={<CreateJobs />} />
                     <Route exact path="/myjobs" element={<MyJobs />} />
                     <Route
                        exact
                        path="/job/applications/:jobId"
                        element={<JobApplications />}
                     />
                     <Route
                        exact
                        path="/applications"
                        element={<Applications />}
                     />
                     <Route
                        exact
                        path="/employees"
                        element={<AcceptedApplicants />}
                     />
                     <Route path="*" element={<ErrorPage />} />
                  </Routes>
               </Grid>
            </Grid>
            <MessagePopup
               open={popup.open}
               setOpen={(status) =>
                  setPopup({
                     ...popup,
                     open: status,
                  })
               }
               severity={popup.severity}
               message={popup.message}
            />
         </SetPopupContext.Provider>
      </BrowserRouter>
   );
}

export default App;