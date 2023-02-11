import { Grid, Typography } from "@material-ui/core";

// welcome page for web application
const Welcome = () => {
   return (
      <Grid
         container
         item
         direction="column"
         alignItems="center"
         justifyContent="center"
      >
         <Grid item>
            <Typography
               variant="h2"
               align="center"
               style={{
                  fontWeight: 600,
                  padding: "30px",
                  paddingBottom: "0px",
                  color: "#0A9396",
               }}
            >
               ShiftSync
            </Typography>
            <Typography
               variant="h5"
               align="center"
               style={{
                  fontWeight: 300,
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  color: "#0A9396",
               }}
            >
               Connecting Students and Businesses
            </Typography>
         </Grid>
      </Grid>
   );
};

export default Welcome;
