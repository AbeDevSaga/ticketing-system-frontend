import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { fetchTickets } from "../redux/ticketSlice";
import ProfileCard from "../components/ProfileCard";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tickets, status, error } = useSelector((state) => state.tickets);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tickets/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(fetchTickets()); 
    } catch (err) {
      console.error("Failed to update ticket status:", err);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 pt-20">
      <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg z-50">
        <div className="w-full max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
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
          <h2 className="text-2xl font-bold mb-4">All Tickets</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white bg-opacity-20 rounded-lg backdrop-blur-md shadow-lg">
              <thead>
                <tr className="bg-white text-left bg-opacity-30">
                  <th className="px-4 py-2 hidden md:table-cell">Title</th>
                  <th className="px-4 py-2 hidden md:table-cell">Description</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Created By</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No tickets available.
                    </td>
                  </tr>
                ) : (
                  tickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="border-b border-white border-opacity-10"
                    >
                      <td className="px-4 py-2 hidden md:table-cell">
                        {ticket.title}
                      </td>
                      <td className="px-4 py-2 hidden md:table-cell">
                        {ticket.description}
                      </td>
                      <td className="px-4 py-2">{ticket.status}</td>
                      <td className="px-4 py-2">{ticket.createdBy.username}</td>
                      <td className="px-4 py-2">
                        <select
                          value={ticket.status}
                          onChange={(e) =>
                            handleUpdateStatus(ticket._id, e.target.value)
                          }
                          className="bg-white bg-opacity-20 text-white px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option className="bg-purple-400" value="Open">
                            Open
                          </option>
                          <option className="bg-purple-400" value="In Progress">
                            In Progress
                          </option>
                          <option className="bg-purple-400" value="Closed">
                            Closed
                          </option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;