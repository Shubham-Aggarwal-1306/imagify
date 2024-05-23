import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import Loader from './Loader';
const Navbar = props => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const navHandler = () => {
    if (isAuthenticated) {
      dispatch({ type: "LogoutRequest" });
    } else {
      window.location.href = "/login";
    }
  }
  return (
    // Tailwind CSS Navbar

    <nav className="flex items-center justify-between border-b border-gray-800 mx-10 py-4">
      {/* Imagify Heading */}
      <h1 className="text-3xl font-bold text-[var(--primary)]">Imagify</h1>
      {/* Sign Up Button */}
      <button className="border border-[var(--primary)] px-4 py-2 text-[var(--primary)]" onClick={navHandler}>
        {
          loading ? <Loader/> : isAuthenticated ? "Logout" : "Login"
        }
      </button>
    </nav>
  )
}

Navbar.propTypes = {

}

export default Navbar
