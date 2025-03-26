import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { FiBook } from "react-icons/fi";
import { IoNotificationsSharp } from "react-icons/io5";
import { LuNewspaper } from "react-icons/lu";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";

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

          {/* Users Link */}
          <li className="hover:bg-indigo-600 transition-all duration-300 ease-in-out">
            <Link
              to="/usertable"
              className="flex items-center p-3 hover:text-white"
            >
              <FaUsers className="mr-3 text-xl" />
              <span className="text-lg">Users</span>
            </Link>
          </li>

          {/* Teacher Link */}
          <li className="hover:bg-indigo-600 transition-all duration-300 ease-in-out">
            <Link
              to="/teachertable"
              className="flex items-center p-3 hover:text-white"
            >
              <GiTeacher className="mr-3 text-xl" />
              <span className="text-lg">Teacher</span>
            </Link>
          </li>
          <li className="hover:bg-indigo-600 transition-all duration-300 ease-in-out">
            <Link
              to="/requesttable"
              className="flex items-center p-3 hover:text-white"
            >
              <VscGitPullRequestNewChanges className="mr-3 text-xl" />
              <span className="text-lg">Request</span>
            </Link>
          </li>

          {/* Schedule Link with Dropdown */}
          <li className="hover:bg-indigo-600 transition-all duration-300 ease-in-out">
            <button
              onClick={toggleDropdown}
              className="flex items-center p-3 w-full text-left hover:text-white"
            >
              <AiOutlineSchedule className="mr-3 text-xl" />
              <span className="text-lg">Schedule</span>
              <FaChevronDown
                className={`ml-2 text-sm transition-transform duration-300 ${
                  isDropdownOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <ul className="pl-8 mt-2 space-y-2">
                <li className="hover:bg-indigo-500 transition-all duration-300 ease-in-out">
                  <Link to="/addschecule" className="flex items-center p-2">
                    <span className="text-lg">Add Schedule</span>
                  </Link>
                </li>
                <li className="hover:bg-indigo-500 transition-all duration-300 ease-in-out">
                  <Link to="/scheuletable" className="flex items-center p-2">
                    <span className="text-lg">All Schedule</span>
                  </Link>
                </li>

                {/* Additional dropdown items can go here */}
              </ul>
            )}
          </li>
          <li className="hover:bg-indigo-600 transition-all duration-300 ease-in-out">
            <Link
              to="/activitytable"
              className="flex items-center p-3 hover:text-white"
            >
              <LuNewspaper className="mr-3 text-xl" />
              <span className="text-lg">User Activity</span>
            </Link>
          </li>

          <li className="hover:bg-indigo-600 transition-all duration-300 ease-in-out">
            <Link
              to="/coursetable"
              className="flex items-center p-3 hover:text-white"
            >
              <FiBook className="mr-3 text-xl" />
              <span className="text-lg">Course</span>
            </Link>
          </li>
          <li className="hover:bg-indigo-600 transition-all duration-300 ease-in-out">
            <Link
              to="/notificationtable"
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
