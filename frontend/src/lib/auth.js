// function that checks whether the user is authenticated
const isAuth = () => {
    return localStorage.getItem("token");
 };
 
 // function that returns the type of user stored
 export const userType = () => {
    return localStorage.getItem("type");
 };
 
 export default isAuth;
 