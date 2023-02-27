import { AppBar, Toolbar, Button, makeStyles } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import WorkIcon from "@material-ui/icons/Work";
import PeopleIcon from "@material-ui/icons/People";
import CreateIcon from "@material-ui/icons/Create";
import DescriptionIcon from "@material-ui/icons/Description";
import { useNavigate } from "react-router-dom";
import isAuth, { userType } from "../lib/auth";

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   title: {
      flexGrow: 1,
      fontWeight: "bold",
   },
   Toolbar: {
      boxShadow: "0px 1px",
      backgroundColor: "#19272E",
      color: "white",
      justifyContent: "center",
      fontSize: "2.0rem",
   },
   button: {
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      padding: "20px",
      fontSize: 20,
   },
   noBox: {
      boxShadow: "0px 0px",
      backgroundColor: "#fff",
   },
   navbarContainer: {
      position: "fixed",
      bottom: 0,
      width: "100%",
      left: 0,
   },
}));

const Navbar = () => {
   const classes = useStyles();
   const navigate = useNavigate();

   const handleClick = (location) => {
      console.log(location);
      navigate(location);
   };

   return (
      <div className={classes.navbarContainer}>
         <AppBar position="static" className={classes.noBox}>
            <Toolbar className={classes.Toolbar}>
               {isAuth() ? (
                  userType() === "recruiter" ? (
                     <>
                        <Button
                           color="inherit"
                           onClick={() => handleClick("/home")}
                           className={classes.button}
                        >
                           <HomeIcon fontSize="large" />
                        </Button>
                        <Button
                           color="inherit"
                           onClick={() => handleClick("/addjob")}
                        >
                           <AddIcon fontSize="large" />
                        </Button>
                        <Button
                           color="inherit"
                           onClick={() => handleClick("/myjobs")}
                        >
                           <WorkIcon fontSize="large" />
                        </Button>
                        <Button
                           color="inherit"
                           onClick={() => handleClick("/employees")}
                        >
                           <PeopleIcon fontSize="large" />
                        </Button>
                        <Button
                           color="inherit"
                           onClick={() => handleClick("/profile")}
                        >
                           <CreateIcon fontSize="large" />
                        </Button>
                        <Button
                           color="inherit"
                           onClick={() => handleClick("/logout")}
                        >
                           Logout
                        </Button>
                     </>
                  ) : (
                     <>
                        <Button
                           color="inherit"
                           onClick={() => handleClick("/home")}
                        >
                           <HomeIcon fontSize="large" />
                        </Button>
                        <Button
                           color="inherit"
                           onClick={() => handleClick("/applications")}
                        >
                           <DescriptionIcon fontSize="large" />
                        </Button>
                        <Button
                           color="inherit"
                           onClick={() => handleClick("/profile")}
                        >
                           <CreateIcon fontSize="large" />
                        </Button>
                        <Button
                           color="inherit"
                           onClick={() => handleClick("/logout")}
                        >
                           Logout
                        </Button>
                     </>
                  )
               ) : (
                  <>
                     <Button
                        color="inherit"
                        onClick={() => handleClick("/login")}
                        className={classes.button}
                     >
                        Login
                     </Button>
                     <Button
                        color="inherit"
                        onClick={() => handleClick("/signup")}
                        className={classes.button}
                     >
                        Signup
                     </Button>
                  </>
               )}
            </Toolbar>
         </AppBar>
      </div>
   );
};

export default Navbar;
