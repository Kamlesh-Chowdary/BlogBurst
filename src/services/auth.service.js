import { axiosInstance } from "../helpers/axiosInstance";

export class AuthService {
  createAccount = async ({ email, fullname, password }) => {
    try {
      const response = await axiosInstance.post(`users/register`, {
        email,
        fullname,
        password,
      });
      return response.data;
    } catch (error) {
      console.log(
        "Error while creating account :",
        error.response.data.message
      );
    }
  };

  loginUser = async ({ email, password }) => {
    try {
      const response = await axiosInstance.post(`/users/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.log("Error while logging in:", error.response.data.message);
    }
  };

  logoutUser = async () => {
    try {
      await axiosInstance.post(`/users/logout`);
    } catch (error) {
      console.log("Error while loggin out:", error.response.data.message);
    }
  };

  currentUser = async () => {
    try {
      const response = await axiosInstance.get(`/users/current-user`);
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
      const response = await axiosInstance.get(`/users/users-post`);
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
