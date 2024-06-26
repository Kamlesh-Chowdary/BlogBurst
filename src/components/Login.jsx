import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Logo, Button, Input } from "./index";
import { login } from "../store/authSlice";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Login = () => {
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
  const demoPassword = import.meta.env.VITE_DEMO_PASSWORD;

  const handleDemoLogin = async () => {
    try {
      const session = await authService.loginUser({
        email: demoEmail,
        password: demoPassword,
      });
      if (session) {
        const userData = await authService.currentUser();
        if (userData) {
          dispatch(login(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  const handleLogin = async (data) => {
    setErrors("");
    try {
      const session = await authService.loginUser(data);
      if (session) {
        const userData = await authService.currentUser();
        if (userData) {
          dispatch(login(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full p-3">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center ">
          <Logo />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {errors && <p className="text-red-600 mt-8 text-center">{errors}</p>}
        <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <div className="space-y-2.5">
              <Button type="submit" className="w-full">
                Sign in
              </Button>
              <p className="text-center">or</p>
              <Button className="w-full" onClick={handleDemoLogin}>
                Login with Demo Credentials
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
