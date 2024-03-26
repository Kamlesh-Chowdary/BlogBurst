import { axiosInstance } from "../helpers/axiosInstance";

export class AuthService {
  createAccount = async ({ email, fullname, password }) => {
    try {
      const response = await axiosInstance.post(`/users/register`, {
        email,
        fullname,
        password,
      });
      return response.data;
    } catch (error) {
      console.log("Error while creating account", error.message);
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
      console.log("Error while logging in", error.message);
    }
  };

  logoutUser = async () => {
    try {
      await axiosInstance.post(`/users/logout`);
    } catch (error) {
      console.log("Error while loggin out", error.message);
    }
  };

  currentUser = async () => {
    try {
      const response = await axiosInstance.get(`/users/current-user`);
      return response.data;
    } catch (error) {
      console.log("Error while fetching current user details", error.message);
    }
  };

  currentUsersPosts = async () => {
    try {
      const response = await axiosInstance.get(`/users/users-post`);
      return response.data;
    } catch (error) {
      console.log("Error while fetching users posts", error.message);
    }
  };
}

const authService = new AuthService();
export default authService;
