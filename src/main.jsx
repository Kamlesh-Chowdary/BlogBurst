import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import AddPost from "./Pages/AddPost.jsx";
import EditPost from "./Pages/EditPost.jsx";
import Login from "./Pages/Login.jsx";
import { AuthLayout } from "./components/index.js";
import Signup from "./Pages/Signup.jsx";
import Post from "./Pages/Post.jsx";
import UsersPosts from "./Pages/UsersPosts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout isAuthenticated={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout isAuthenticated={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout isAuthenticated>
            {" "}
            <UsersPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout isAuthenticated>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout isAuthenticated>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route path="/" element={<Home />} />

//       <Route
//         path="/all-posts"
//         element={
//           <AuthLayout isAuthenticated>
//             <AllPosts />
//           </AuthLayout>
//         }
//       >
//         <Route path="/post/:slug" element={<Post />} />
//       </Route>

//       <Route
//         path="/add-post"
//         element={
//           <AuthLayout isAuthenticated>
//             <AddPost />
//           </AuthLayout>
//         }
//       />
//       <Route
//         path="/signup"
//         element={
//           <AuthLayout isAuthenticated={false}>
//             <Signup />
//           </AuthLayout>
//         }
//       />
//       <Route
//         path="/edit-post/:slug"
//         element={
//           <AuthLayout isAuthenticated>
//             <EditPost />
//           </AuthLayout>
//         }
//       />
//       <Route path="/post/:slug" element={<Post />} />
//       <Route
//         path="/login"
//         element={
//           <AuthLayout isAuthenticated={false}>
//             <Login />
//           </AuthLayout>
//         }
//       />
//     </Route>
//   )
// );
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
