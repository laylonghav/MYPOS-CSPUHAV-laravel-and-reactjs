import axios from "axios";
import config from "./config";
import { profileStore } from "../store/profileStore";

export const request = (url = "", method = "", data = {}) => {
  let { access_token } = profileStore.getState();
  // url="customer/search"

  let headers = {
    "Content-Type": "application/json", // data = json
  };
  if (data instanceof FormData) {
    headers = {
      "Content-Type": "multipart/form-data", // data = form data
    };
  }
  return axios({
    url: config.base_url + url,
    method: method, // get, post,put, delete
    data: data,
    headers: {
      ...headers,
      Accept: "application/json",
      // "Content-Type": "application/json",
      Authorization: "Bearer" + access_token,
    },
  })
    .then((res) => {
      console.log("Response Data:", res.data);
      return res.data; // Return the response data
    })
    .catch((error) => {
      console.log(error);

      const response = error.response;
      if (response) {
       
        const status = response.status;
        const data = response.data;
        let errors = { message: data?.message };
        if (status == 500) {
          errors.message = "Request failed with status code 500";
        }

        if (response.data?.error) {
          errors = {
            help: response.data?.error, // get error message
            validateStatus: "error",
            hasFeedback: true,
          };
        }
        
        if (data.errors) {
          Object.keys(data.errors).map((key) => {
            errors[key] = {
              help: data.errors[key][0], // get error message
              validateStatus: "error",
              hasFeedback: true,
            };
          });
        }

        return {
          status: status,
          // ...data,
          errors: errors,
          // message: message,
        };
      }
    });
};
