import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ScheduleTable = () => {
  const [schedules, setSchedules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [currentSchedule, setCurrentSchedule] = useState({
    id: "",
    courseName: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    duration: "",
    description: "",
    recipientType: "", // Added recipientType
  });

  const navigate = useNavigate();
  const handleScheduleClick = (userId) => {
    navigate(`/schuledetails/${userId}`);
  };

  const fetchSchedules = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/getallschedule"
      );
      const data = await response.json();
      if (response.ok) {
        setSchedules(data.data);
      }
    } catch (error) {
      toast.error("Error fetching schedules");
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleEdit = (schedule) => {
    setCurrentSchedule({
      id: schedule.id,
      courseName: schedule.course?.name || "",
      date: schedule.date,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      venue: schedule.venue,
      duration: schedule.duration || "", // Added duration
      description: schedule.description || "", // Added description
      recipientType: schedule.recipientType || "", // Added recipientType
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentSchedule({
      id: "",
      courseName: "",
      date: "",
      startTime: "",
      endTime: "",
      venue: "",
      duration: "",
      description: "",
      recipientType: "",
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/updateschedule",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentSchedule),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setSchedules(
          schedules.map((schedule) =>
            schedule.id === currentSchedule.id ? currentSchedule : schedule
          )
        );
        closeModal();
        fetchSchedules();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error updating schedule");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/deleteschedule",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: id }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setSchedules(
          schedules.filter((schedule) => schedule.id !== currentSchedule.id)
        );
        setShowDeleteModal(false);
        fetchSchedules();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting schedule");
      console.error(error);
    }
  };

  const openDeleteModal = (schedule) => {
    setCurrentSchedule(schedule);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentSchedule(null);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0];
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[1].split(".")[0];
  };

  return (
    <div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-6 font-medium text-sm text-gray-600">
                Course Name
              </th>
              <th className="py-3 px-6 font-medium text-sm text-gray-600">
                Date
              </th>
              <th className="py-3 px-6 font-medium text-sm text-gray-600">
                Start Time
              </th>
              <th className="py-3 px-6 font-medium text-sm text-gray-600">
                End Time
              </th>
              <th className="py-3 px-6 font-medium text-sm text-gray-600">
                Venue
              </th>
              <th className="py-3 px-6 font-medium text-sm text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td
                  className="py-4 px-6 text-sm text-gray-600"
                  onClick={() => handleScheduleClick(schedule.id)}
                >
                  {schedule.course?.name}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {schedule.date}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {schedule.startTime}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {schedule.endTime}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {schedule.venue}
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleEdit(schedule)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(schedule.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for editing schedule */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-lg z-50">
          <div className="bg-white p-6 rounded-lg w-2xl">
            <h3 className="text-xl font-semibold mb-4">Edit Schedule</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Course Name */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">
                  Course Name
                </label>
                <input
                  type="text"
                  value={currentSchedule.courseName}
                  onChange={(e) =>
                    setCurrentSchedule({
                      ...currentSchedule,
                      courseName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              {/* Date */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">Date</label>
                <input
                  type="date"
                  value={formatDate(currentSchedule.date)}
                  onChange={(e) =>
                    setCurrentSchedule({
                      ...currentSchedule,
                      date: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              {/* Start Time */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={formatTime(currentSchedule.startTime)}
                  onChange={(e) =>
                    setCurrentSchedule({
                      ...currentSchedule,
                      startTime: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              {/* End Time */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={formatTime(currentSchedule.endTime)}
                  onChange={(e) =>
                    setCurrentSchedule({
                      ...currentSchedule,
                      endTime: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              {/* Venue */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">
                  Venue
                </label>
                <input
                  type="text"
                  value={currentSchedule.venue}
                  onChange={(e) =>
                    setCurrentSchedule({
                      ...currentSchedule,
                      venue: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              {/* Duration */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={currentSchedule.duration}
                  onChange={(e) =>
                    setCurrentSchedule({
                      ...currentSchedule,
                      duration: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              {/* Recipient Type */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">
                  Recipient Type
                </label>
                <select
                  name="recipientType"
                  value={currentSchedule.recipientType || ""}
                  onChange={(e) =>
                    setCurrentSchedule({
                      ...currentSchedule,
                      recipientType: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select</option>
                  <option value="students">Students</option>
                  <option value="teachers">Teachers</option>
                  <option value="all">All</option>
                </select>
              </div>
            </div>
            {/* Description Field (Spans 2 Columns) */}
            <div className="mb-4 col-span-2">
              <label className="block text-sm text-gray-600 mb-2">
                Description
              </label>
              <textarea
                value={currentSchedule.description}
                onChange={(e) =>
                  setCurrentSchedule({
                    ...currentSchedule,
                    description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
                rows="4"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this schedule?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeDeleteModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTable;
