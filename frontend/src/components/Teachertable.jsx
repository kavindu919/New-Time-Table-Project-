import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TeachersTable = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [selectedVerifyId, setSelectedVerifyId] = useState(null);

  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    contactNumber: "",
    avatar: "",
  });

  const navigate = useNavigate();
  const handleUserProfileClick = (userId) => {
    navigate(`/teacherprofile/${userId}`);
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/admin/getallteachers"
        );
        const data = await response.json();
        console.log(data);
        setTeachers(data.data);
        toast.success(data.message);
      } catch (error) {
        setError(error.message);
        toast.error("Error fetching teachers");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleEdit = (teacher) => {
    setSelectedTeacherId(teacher.id);
    setEditFormData({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      gender: teacher.gender,
      contactNumber: teacher.contactNumber,
      avatar: teacher.avatar,
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedTeacherId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/deleteteacher",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: selectedTeacherId }),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to delete teacher");

      setTeachers(
        teachers.filter((teacher) => teacher.id !== selectedTeacherId)
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setShowDeleteModal(false);
      setSelectedTeacherId(null);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/updateteacher",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: selectedTeacherId,
            ...editFormData,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update teacher");

      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher.id === selectedTeacherId
            ? { ...teacher, ...editFormData }
            : teacher
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setShowEditModal(false);
      setSelectedTeacherId(null);
    }
  };

  const handleVerifyClick = (id) => {
    setSelectedVerifyId(id);
    setShowVerifyModal(true);
  };

  const confirmVerify = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/verifyteacher",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: selectedVerifyId, status: "active" }),
        }
      );

      const data = await response.json();
      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher.id === selectedVerifyId
            ? { ...teacher, status: "active" }
            : teacher
        )
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setShowVerifyModal(false);
      setSelectedVerifyId(null);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-xl overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Teachers List
      </h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-sm uppercase tracking-wider">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Avatar</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr
              key={teacher.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleUserProfileClick(teacher.id)}
              >
                {teacher.id}
              </td>
              <td className="px-4 py-3">
                <img
                  src={`http://localhost:8080${teacher.avatar}`}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border"
                />
              </td>
              <td className="px-4 py-3">
                {teacher.firstName} {teacher.lastName}
              </td>
              <td className="px-4 py-3">{teacher.contactNumber}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    teacher.status === "active"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {teacher.status === "active" ? "Completed" : "Failed"}
                </span>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleEdit(teacher)}
                  className="px-2 py-1 text-xs font-semibold bg-blue-500 text-white rounded hover:bg-blue-600 transition mr-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(teacher.id)}
                  className="px-2 py-1 text-xs font-semibold bg-red-500 text-white rounded hover:bg-red-600 transition mr-1"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleVerifyClick(teacher.id)}
                  className="px-2 py-1 text-xs font-semibold bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Verify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-lg z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Edit Teacher</h3>
            <form onSubmit={handleSubmitEdit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={editFormData.firstName}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={editFormData.lastName}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={editFormData.contactNumber}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 mr-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-lg z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this teacher?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 mr-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showVerifyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-lg z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Verify Teacher</h3>
            <p>Are you sure you want to verify this teacher?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowVerifyModal(false)}
                className="px-4 py-2 mr-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmVerify}
                className="px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600 transition"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersTable;
