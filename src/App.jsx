import { useEffect } from "react";
import { Header, Footer, LoadingComponent } from "./components/index";
import authService from "./services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import { setLoading } from "./store/postSlice";
import { Outlet } from "react-router-dom";

const App = () => {
  const loading = useSelector((state) => state.post.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const userData = await authService.currentUser();
      if (userData) {
        dispatch(login(userData));
      } else {
        dispatch(logout());
      }
      dispatch(setLoading(false));
    })();
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
