import { axiosInstance } from "../helpers/axiosInstance";

export class AuthService {
  createAccount = async ({ email, fullname, password }) => {
    try {
      const response = await axiosInstance.post(`users/register`, {
        email,
        fullname,
        password,
      });
      if (response) {
        return this.loginUser({ email, password });
      }
      return response.data;
    } catch (error) {
      console.log(
        "Error while creating account :",
        error.response.data.message
      );
      throw error.response.data;
    }
  };

  loginUser = async ({ email, password }) => {
    try {
      const response = await axiosInstance.post(`/users/login`, {
        email,
        password,
      });
      window.sessionStorage.setItem(
        "accessToken",
        response.data.data.accessToken
      );
      return response.data;
    } catch (error) {
      console.log("Error while logging in:", error.response.data.message);
      throw error.response.data;
    }
  };

  logoutUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };
      await axiosInstance.post(`/users/logout`, {}, config);
      window.sessionStorage.setItem("accessToken", "");
    } catch (error) {
      console.log("Error while loggin out:", error.response.data.message);
      throw error;
    }
  };

  currentUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };
      const response = await axiosInstance.get(`/users/current-user`, config);
      return response.data.data;
    } catch (error) {
      console.log(
        "Error while fetching current user details:",
        error.response.data.message
      );
    }
  };

  currentUsersPosts = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };
      const response = await axiosInstance.get(`/users/user-posts`, config);
      return response.data;
    } catch (error) {
      console.log(
        "Error while fetching users posts:",
        error.response.data.message
      );
    }
  };
}

const authService = new AuthService();
export default authService;
