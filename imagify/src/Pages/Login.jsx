import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Actions/User";
import Loader from "../components/Loader";

export default function Login() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const formRef = useRef();
  const handleLogin = () => {
    const mail = formRef.current[0].value;
    const pass = formRef.current[1].value;
    if (mail === "" || pass === "") {
      alert("Please fill all the details");
      return;
    }
    dispatch(loginUser(mail, pass));
  };

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated])



  return (
    <>
      {/* Form for Login */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-75px)] text-center space-y-4">
        <h1 className="text-4xl font-bold text-white mb-2">
          Login to
          <span className="text-[var(--primary)]"> Imagify</span>
        </h1>
        <form
          ref={formRef}
          className="flex flex-col items-center justify-center border border-gray-800 p-4 space-y-4 rounded-lg"
        >
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
          <button
            type="button"
            className="border font-bold border-white px-4 py-2 text-white hover:bg-white hover:text-black transition duration-300 w-full"
            onClick={handleLogin}
          >
            {loading ? <Loader/> : "Login"}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-white">
          Don't have an account?{" "}
          <a href="/signup" className="text-[var(--primary)] px-2">
            Sign Up
          </a>
        </div>
      </div>
    </>
  );
}
