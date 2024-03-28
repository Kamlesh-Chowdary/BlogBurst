import React from "react";
import authService from "../../services/auth.service";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService
      .logoutUser()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        throw error;
      });
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
