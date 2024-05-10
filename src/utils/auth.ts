import { jwtDecode } from "jwt-decode";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { LOGIN, DASHBOARD } from "@/constants/path";

// SignIn with google
const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then(async (data) => {
    // Save token and user data
    const token = await data.user.getIdToken();
    localStorage.setItem("accessToken", token);

    localStorage.setItem("user", JSON.stringify(data.user));

    setTimeout(() => {
      window.location.href = DASHBOARD;
    }, 2000);
  });
};

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

const setRefreshToken = (token: string) => {
  localStorage.setItem("refreshToken", token);
};

const getToken = () => {
  return localStorage.getItem("token");
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
