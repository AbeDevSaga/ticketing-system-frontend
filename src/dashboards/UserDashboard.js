import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { fetchTickets, createTicket } from "../redux/ticketSlice";
import TicketCard from "../components/TicketCard";
import ProfileCard from "../components/ProfileCard";

const UserDashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tickets, status, error } = useSelector((state) => state.tickets);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill in all fields");
      return;
    }
    await dispatch(createTicket({ title, description }));
    setTitle("");
    setDescription("");
    setIsFormOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white pt-20 py-2">
      <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg z-50">
        <div className="w-full max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">User Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="w-full max-w-6xl px-4 mt-2">
        <div className="mb-8">
          <ProfileCard user={user} />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your Tickets</h2>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
            >
              Create Ticket
            </button>
          </div>

          {status === "loading" && (
            <p className="text-center">Loading tickets...</p>
          )}
          {status === "failed" && (
            <p className="text-center text-red-500">{error}</p>
          )}
          {status === "succeeded" && tickets.length === 0 ? (
            <p className="text-center text-xl">No tickets available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tickets.map((ticket) => (
                <TicketCard key={ticket._id} ticket={ticket} />
              ))}
            </div>
          )}
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 z-50">
          <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-md shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-4">Create a New Ticket</h2>
            <form onSubmit={handleCreateTicket} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
              >
                Create Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
