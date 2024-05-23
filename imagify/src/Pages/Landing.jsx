import React from 'react'
import { useSelector } from 'react-redux';
const Landing = () => {
    const { isAuthenticated, user, loading } = useSelector((state) => state.user);
    const ctaHandler = () => {
        if (isAuthenticated) {
            window.location.href = "/dashboard";
        } else {
            window.location.href = "/login";
        }
    }
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-75px)] text-center space-y-4">
            <h1 className="text-4xl font-bold text-white mb-2">
                Welcome to
                <span className="text-[var(--primary)]"> Imagify</span>
            </h1>
            <p className="text-lg text-white pb-6">The best place to upload and share your images</p>
            <button
                className="border font-bold border-white px-4 py-2 text-white hover:bg-white hover:text-black transition duration-300"
                onClick={ctaHandler}
            >
                Get Started
            </button>
        </div>
    )
}


export default Landing
