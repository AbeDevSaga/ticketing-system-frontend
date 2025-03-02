import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const LandingPage = () => (
  <div className="min-h-screen flex flex-col bg-gradient">
    <div className="flex-grow flex flex-col justify-center items-center text-white px-4 py-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-bounce">
          Welcome to the Ticketing System
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Efficiently manage support tickets with ease. Get started today!
        </p>
        <div className="flex items-center justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <Link
            to="/login"
            className="bg-white text-blue-600 px-6 py-3 w-full rounded-lg font-semibold hover:bg-blue-50 transition duration-300 text-center"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-transparent border-2 border-white px-6 py-3 w-full rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300 text-center"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <div className="mt-16 w-full max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-md hover:bg-opacity-20 transition duration-300">
            <h2 className="text-2xl font-bold mb-2">Create Tickets</h2>
            <p className="text-gray-200">
              Users can easily create support tickets for their issues.
            </p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-md hover:bg-opacity-20 transition duration-300">
            <h2 className="text-2xl font-bold mb-2">Track Progress</h2>
            <p className="text-gray-200">
              Admins can update and track the status of all tickets.
            </p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-md hover:bg-opacity-20 transition duration-300">
            <h2 className="text-2xl font-bold mb-2">Role-Based Access</h2>
            <p className="text-gray-200">
              Secure and role-based access control for users and admins.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default LandingPage;
