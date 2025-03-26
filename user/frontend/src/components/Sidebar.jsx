import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers } from "react-icons/fa";
import { GrHistory } from "react-icons/gr";
import { IoNotificationsSharp } from "react-icons/io5";
import { BiMessageRoundedDetail } from "react-icons/bi";

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="h-full w-64 bg-gray-900 text-white shadow-lg">
      <div className="flex items-center justify-center py-6 border-b border-gray-700">
        <h2 className="text-3xl font-semibold text-indigo-500">
          Admin Dashboard
        </h2>
      </div>
      <nav className="mt-6">
        <ul>
          {/* Dashboard Link */}
          <li className="hover:bg-indigo-600 transition-all duration-300 ease-in-out">
            <Link to="/" className="flex items-center p-3 hover:text-white">
              <FaTachometerAlt className="mr-3 text-xl" />
              <span className="text-lg">Dashboard</span>
            </Link>
          </li>
          <li className="hover:bg-indigo-600 transition-all duration-300 ease-in-out">
            <Link
              to="/notifications"
              className="flex items-center p-3 hover:text-white"
            >
              <IoNotificationsSharp className="mr-3 text-xl" />
              <span className="text-lg">Notification</span>
            </Link>
          </li>
          <li className="hover:bg-indigo-600 transition-all duration-300 ease-in-out">
            <Link
              to="/requestschedule"
              className="flex items-center p-3 hover:text-white"
            >
              <BiMessageRoundedDetail className="mr-3 text-xl" />
              <span className="text-lg">Schedule</span>
            </Link>
          </li>
          <li className="hover:bg-indigo-600 transition-all duration-300 ease-in-out">
            <Link
              to="/requestshistory"
              className="flex items-center p-3 hover:text-white"
            >
              <GrHistory className="mr-3 text-xl" />
              <span className="text-lg">Request History</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
