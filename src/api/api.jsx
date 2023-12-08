import axios from "axios";
import { create } from "apisauce";
const baseURL = process.env.REACT_APP_URL;
const api = create({
  baseURL,
  axiosInstance: axios.create({
    baseURL,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  }),
});

export default api;

// import axios from "axios";
// import { create } from "apisauce";
// import { toast } from "react-toastify";

// const baseURL = process.env.REACT_APP_URL || "https://api.github.com";
// const api = create({
//   baseURL,
//   axiosInstance: axios.create({
//     baseURL,
//   }),
// });

// api.addRequestTransform((request) => {
//   const authToken = "Bearer " + localStorage.getItem("accessToken");
//   if (authToken) {
//     request.headers.Authorization = authToken;
//   }
// });

// api.addResponseTransform((response) => {
//   if (response.status === 401) {
//     const authToken = localStorage.getItem("accessToken");
//     if (authToken) {
//       toast.error("Session Expired");
//       localStorage.removeItem("accessToken");
//       window.location.replace("/");
//     }
//   } else if (response.status === 403) {
//     toast.error("Restricted Route!!");
//   }
// });

// export default api;
