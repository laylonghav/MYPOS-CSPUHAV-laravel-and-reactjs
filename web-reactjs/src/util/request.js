import axios from "axios";
import config from "./config";

export const request = (url = "", method = "", data = {}) => {
  // url="customer/search"
  return axios({
    url: config.base_url + url,
    method: method, // get, post,put, delete
    data: data,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      const response = error.response;
      if (response) {
        const status = response.status;
        const data = response.data;
        let errors = {};
        Object.keys(data.errors).map((key) => {
          errors[key] = {
            help: data.errors[key][0], // get error message
            validateStatus: "error",
            hasFeedback: true,
          };
        });
        return {
          status: status,
          // ...data,
          errors,
        };
      }
    });
};
