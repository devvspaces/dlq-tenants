import { jwtDecode } from "jwt-decode";
import { signInWithPopup, getIdToken } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { LOGIN, DASHBOARD } from "@/constants/path";
import axios from "axios";
import { AuthResponse } from "./types";
import { setCookie } from "cookies-next";

// SignIn with google
const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then(async (data) => {
    const token = await data.user.getIdToken();

    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/google`, null, {
        headers: {
          "x-api-key": token,
        },
      })
      .then((res: any) => {
        const { data: responseData, success } = res.data as AuthResponse;

        if (success) {
          // set token in cookie
          setCookie("token", responseData.token);

          if (typeof window !== "undefined") {
            window.localStorage.setItem("accessToken", responseData.token);

            window.localStorage.setItem("user", JSON.stringify(data.user));

            window.location.href = DASHBOARD;
          }
        }
      })
      .catch((error: Error) => console.log(error));
  });
};

export const fetchTenantsData = async () => {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/tenants`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbWlsYXJldG9sdWxvcGUxQGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE3MTY4ODM4NDJ9.FJjvrpGKIAh_ZATiKISG1UJi2LDyYF81gKXdP7CkGQc",
    },
  });
};

const setToken = (token: string) => {
  window.localStorage.setItem("token", token);
};

const setRefreshToken = (token: string) => {
  window.localStorage.setItem("refreshToken", token);
};

const getToken = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("accessToken");
  }
};

const getRefreshToken = () => {
  return window.localStorage.getItem("refreshToken");
};

const getDecodedJwt = () => {
  try {
    const token = getToken();
    return jwtDecode(token!);
  } catch (e) {
    return {};
  }
};

const logOut = () => {
  window.localStorage.clear();
  window.location.replace(LOGIN);
};

const isAuthenticated = () => {
  try {
    const decodedToken = getDecodedJwt();

    const { exp } = decodedToken;
    const currentTime = Date.now() / 1000;

    return exp! > currentTime;
  } catch (e) {
    return false;
  }
};

const Auth = {
  signInWithGoogle,
  isAuthenticated,
  getDecodedJwt,
  setToken,
  getToken,
  setRefreshToken,
  getRefreshToken,
  logOut,
};

export default Auth;
