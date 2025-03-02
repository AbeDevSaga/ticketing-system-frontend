import React from "react";

const TicketCard = ({ ticket }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "open":
        return "text-green-400";
      case "in progress":
        return "text-yellow-400";
      case "closed":
        return "text-red-400";
      default:
        return "text-gray-300";
    }
  };

  return (
    <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-md shadow-md mb-4">
      <h3 className="text-2xl font-semibold mb-2 text-white">{ticket.title}</h3>
      <p className="text-gray-200 mb-4">{ticket.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-300">
          Status:{" "}
          <span className={`font-semibold ${getStatusColor(ticket.status)}`}>
            {ticket.status}
          </span>
        </p>
        <p className="text-sm text-gray-300">
          Created By:{" "}
          <span className="font-semibold">{ticket.createdBy.username}</span>
        </p>
      </div>
    </div>
  );
};

export default TicketCard;
