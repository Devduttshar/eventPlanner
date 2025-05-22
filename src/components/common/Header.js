import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  return (
    <header className="bg-[#0B0B1F] shadow-md fixed w-full top-0 z-50">
      <div className="mx-[8%] px-0 py-2">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo/Brand Name */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-white">Event Planner</span>
          </Link>

          {/* Navigation Links and Auth Buttons */}
          <div className="flex items-center space-x-4">
            {token && userType === "admin" && (
              <>
                <Link
                  to="/create-event"
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                >
                  Create
                </Link>
                <Link
                  to="/my-events"
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                >
                  Events
                </Link>
              </>
            )}
            {(!token || userType === "user") && (
              <Link
                to="/events"
                className="text-white hover:text-gray-300 transition-colors duration-200"
              >
                All Events
              </Link>
            )}
            {token && userType === "user" && (
              <>
                <Link
                  to="/user-events"
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                >
                  My Plans
                </Link>
              </>
            )}

            {!token ? (
              <>
                <CustomButton
                  text="Login"
                  bgColor="bg-[#7C3AED]"
                  textColor="text-white"
                  padding="px-6 py-2"
                  width="w-[100px]"
                  className="rounded-md hover:bg-[#6D28D9]"
                  onClick={() => navigate("/login")}
                />
                <CustomButton
                  text="SignUp"
                  bgColor="bg-[#7C3AED]"
                  textColor="text-white"
                  padding="px-6 py-2"
                  width="w-[100px]"
                  className="rounded-md hover:bg-[#6D28D9]"
                  onClick={() => navigate("/signup")}
                />
              </>
            ) : (
              <CustomButton
                text="Logout"
                bgColor="bg-red-600"
                textColor="text-white"
                padding="px-6 py-2"
                width="w-[100px]"
                className="rounded-md hover:bg-red-700"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userType"); // Add this line to remove userType
                  navigate("/login");
                }}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
