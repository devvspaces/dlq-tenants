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
    // const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNjOTNjMWEyNGNhZjgyN2I4ZGRlOWY4MmQyMzE1MzY1MDg4YWU2MTIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSHVkaGF5ZmFoIElzbWFpbCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKTzFtbnJkWFM3MmlkUmRwM3Q2MXlfa3hpclVsdjhveFppdkNBR203VVJFTldpOVE9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmxvb210ZXN0LTI5OTZjIiwiYXVkIjoiYmxvb210ZXN0LTI5OTZjIiwiYXV0aF90aW1lIjoxNzE1OTU2OTY2LCJ1c2VyX2lkIjoiNk96UlJCVWZucVhXamRZdklOYTdXeUluV3FSMiIsInN1YiI6IjZPelJSQlVmbnFYV2pkWXZJTmE3V3lJbldxUjIiLCJpYXQiOjE3MTU5NTY5NjYsImV4cCI6MTcxNTk2MDU2NiwiZW1haWwiOiJob2lzbWFpbDIwMjNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDE5MTI4MDY5MTMzODY5MzQxNjIiXSwiZW1haWwiOlsiaG9pc21haWwyMDIzQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.Eg7bk6bIsD1aR4wKITiFoRx3Cke5T7yRCXRFZTUwFpoGaDjt4uw_z0BOLMsU6Sym3t-EZrtRe3NN28Fk0bC1-wGfJbAoB33i134FtKvG_jZ09obAj3xdsXl7JeoaGhbj6TSGxZ0sXbIpZhPh2Pujb_G9GEUkWL_Iv5Of0n-cJZn4XiZqLC9OuHhy1l3McMrX7uSlh4u5vHlkvkMCS9uf1LxZYnI7T2dXyhuUyB1Ujp-zUR9XJBAntYb4RFvm4remgYmC3awwF9WUF98nJWxBN5MzP8CgK7MbumztfoRPVDyVW3xUzI_nurODTJVv7htjY8N9Lan89_fd_coeBA5oUA";
    // console.log(token);

    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/google`, null, {
        headers: {
          "x-api-key": token,
        },
      })
      .then((res: any) => {
        const { data: responseData, success } = res.data as AuthResponse;

        if (success) {
          localStorage.setItem("accessToken", responseData.token);

          localStorage.setItem("user", JSON.stringify(data.user));

          setTimeout(() => {
            window.location.href = DASHBOARD;
          }, 2000);
        }
      })
      .catch((error: Error) => console.log(error));
  });
};

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

const setRefreshToken = (token: string) => {
  localStorage.setItem("refreshToken", token);
};

const getToken = () => {
  return localStorage.getItem("accessToken");
};

const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
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
  localStorage.clear();
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
