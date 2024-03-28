import { useEffect, useState } from "react";
import { Header, Footer, LoadingComponent } from "./components/index";
import authService from "./services/auth.service";
import postService from "./services/post.service";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import { setLoading, setPosts } from "./store/postSlice";
import { Outlet } from "react-router-dom";

const App = () => {
  const loading = useSelector((state) => state.post.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .currentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
          postService.getAllPosts().then((posts) => {
            if (posts) dispatch(setPosts(posts));
          });
        } else dispatch(logout());
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-300 font-rubik">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-300 font-rubik">
      <div className="w-full block">
        <Header />
        <main>
          <LoadingComponent />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
