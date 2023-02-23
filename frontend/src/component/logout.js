import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

import { SetPopupContext } from "../app";

const Logout = () => {
   const setPopup = useContext(SetPopupContext);
   useEffect(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      setPopup({
         open: true,
         severity: "success",
         message: "Logged out successfully",
      });
   }, []);
   return <Navigate to="/" />;
};

export default Logout;
