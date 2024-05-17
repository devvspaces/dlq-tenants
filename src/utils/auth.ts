import { jwtDecode } from "jwt-decode";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { LOGIN, DASHBOARD } from "@/constants/path";
import axios from "axios";
import { AuthResponse } from "./types";

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
          if (typeof window !== "undefined") {
            window.localStorage.setItem("accessToken", responseData.token);

            window.localStorage.setItem("user", JSON.stringify(data.user));

            setTimeout(() => {
              window.location.href = DASHBOARD;
            }, 2000);
          }
        }
      })
      .catch((error: Error) => console.log(error));
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
