import React, { useState } from "react";
import { LogoutBtn, Logo, Container } from "../index";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const navItems = [
    {
      name: "Home",
      slug: "",
      active: true,
    },
    {
      name: "Login",
      slug: "login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "signup",
      active: !authStatus,
    },
    {
      name: "My posts",
      slug: "all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "add-post",
      active: authStatus,
    },
  ];

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  return (
    <header className="py-3 shadow bg-gray-500 ">
      <Container>
        <nav className="flex justify-between">
          <div className="mr-4">
            <NavLink to="/">
              <Logo />
            </NavLink>
          </div>

          <ul className="hidden sm:flex ml-auto ">
            {navItems.map((item) =>
              item.active ? (
                <NavLink
                  key={item.name}
                  to={item.slug}
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-white hover:text-black" : "text-black "
                    }`
                  }
                >
                  <li className="sm:inline-block hidden px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
                    {item.name}
                  </li>
                </NavLink>
              ) : null
            )}
            {authStatus && (
              <NavLink to={"/"}>
                <li>
                  <LogoutBtn />
                </li>
              </NavLink>
            )}
          </ul>
          <div className="flex  justify-end sm:hidden">
            <button onClick={toggleNavbar}>
              {isNavbarVisible ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
        {isNavbarVisible && (
          <ul className="flex justify-around mt-3 sm:hidden">
            {navItems.map((item) =>
              item.active ? (
                <NavLink
                  key={item.name}
                  to={item.slug}
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-white hover:text-black" : "text-black "
                    }`
                  }
                >
                  <li className="p-3 duration-200 hover:bg-blue-100 rounded-full">
                    {item.name}
                  </li>
                </NavLink>
              ) : null
            )}
            {authStatus && (
              <NavLink to={"/"}>
                <li>
                  <LogoutBtn />
                </li>
              </NavLink>
            )}
          </ul>
        )}
      </Container>
    </header>
  );
};
export default Header;
