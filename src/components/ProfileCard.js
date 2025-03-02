import { FaUserTie } from "react-icons/fa"; 

const ProfileCard = ({ user }) => {
  return (
    <div className="bg-white bg-opacity-20 p-8 rounded-lg backdrop-blur-md shadow-md text-center space-y-2">
      <div className="flex justify-center">
        <FaUserTie className="w-24 h-24 text-white" />
      </div>
      <h2 className="text-2xl font-semibold text-white">{user.username}</h2>
      <p className="text-lg text-gray-200">
        Role: <span className="font-semibold">{user.role}</span>
      </p>
    </div>
  );
};

export default ProfileCard;