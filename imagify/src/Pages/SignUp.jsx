import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Actions/User";
import Loader from "../components/Loader";

export default function Login() {
  const dispatch = useDispatch();

  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const formRef = useRef();
  const handleSignup = (e) => {
    e.preventDefault();
    const name = formRef.current[0].value;
    const email = formRef.current[1].value;
    const password = formRef.current[2].value;
    if (name === "" || email === "" || password === "") {
      alert("Please fill all the details");
      return;
    }
    if (formRef.current[3].value !== password) {
      alert("Passwords do not match");
      return;
    }
    dispatch(registerUser(name, email, password));
  };
  return (
    <>
      {/* Form for Login */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-75px)] text-center space-y-4">
        <h1 className="text-4xl font-bold text-white mb-2">
          Signup for
          <span className="text-[var(--primary)]"> Imagify</span>
        </h1>
        <form
          ref={formRef}
          className="flex flex-col items-center justify-center border border-gray-800 p-4 space-y-4 rounded-lg"
        >
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-800 px-4 py-2 w-full rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-800 px-4 py-2 w-full rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-800 px-4 py-2 w-full rounded"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border border-gray-800 px-4 py-2 w-full rounded"
          />
          <button
            type="button"
            className="border font-bold border-white px-4 py-2 text-white hover:bg-white hover:text-black transition duration-300 w-full"
            onClick={handleSignup}
          >
            {loading ? <Loader /> : "Sign Up"}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-white">
          Already have an account?{" "}
          <a href="/login" className="text-[var(--primary)] px-2">
            Login
          </a>
        </div>
      </div>
    </>
  );
}
