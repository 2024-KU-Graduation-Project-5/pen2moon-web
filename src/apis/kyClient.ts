import ky from "ky";
import { API_URL } from "../utils/constants";

export const kyClient = ky.create({
  prefixUrl: API_URL,
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        console.log("AA", response);
        if (response.status === 401) {
          window.location.href = "/login";
        }
        return response;
      },
    ],
  },
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});

export const multiKyClient = ky.create({
  prefixUrl: API_URL,
  credentials: "include",
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          window.location.href = "/login";
        }
        return response;
      },
    ],
  },
  // headers: {
  //   "Content-Type": "multipart/form-data",
  // },
  // hooks: {
  //   beforeRequest: [
  //     (request) => {
  //       const token = localStorage.getItem("token");
  //     },
  //   ],
  // },
});
