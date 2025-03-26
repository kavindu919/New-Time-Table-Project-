import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { FiBook } from "react-icons/fi";
import { IoNotificationsSharp } from "react-icons/io5";

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
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
