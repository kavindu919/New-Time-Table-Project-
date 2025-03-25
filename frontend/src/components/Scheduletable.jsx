// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const ScheduleTable = () => {
//   const [schedules, setSchedules] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const [currentSchedule, setCurrentSchedule] = useState({
//     id: "",
//     courseName: "",
//     date: "",
//     startTime: "",
//     endTime: "",
//     venue: "",
//     duration: "",
//     description: "",
//     recipientType: "", // Added recipientType
//   });

//   const navigate = useNavigate();
//   const handleScheduleClick = (userId) => {
//     navigate(`/schuledetails/${userId}`);
//   };

//   const fetchSchedules = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/admin/getallschedule"
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setSchedules(data.data);
//       }
//     } catch (error) {
//       toast.error("Error fetching schedules");
//       console.error(error);
//     }
//   };
//   useEffect(() => {
//     fetchSchedules();
//   }, []);

//   const handleEdit = (schedule) => {
//     setCurrentSchedule({
//       id: schedule.id,
//       courseName: schedule.course?.name || "",
//       date: schedule.date,
//       startTime: schedule.startTime,
//       endTime: schedule.endTime,
//       venue: schedule.venue,
//       duration: schedule.duration || "", // Added duration
//       description: schedule.description || "", // Added description
//       recipientType: schedule.recipientType || "", // Added recipientType
//     });
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setCurrentSchedule({
//       id: "",
//       courseName: "",
//       date: "",
//       startTime: "",
//       endTime: "",
//       venue: "",
//       duration: "",
//       description: "",
//       recipientType: "",
//     });
//   };

//   const handleUpdate = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/admin/updateschedule",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(currentSchedule),
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         toast.success(data.message);
//         setSchedules(
//           schedules.map((schedule) =>
//             schedule.id === currentSchedule.id ? currentSchedule : schedule
//           )
//         );
//         closeModal();
//         fetchSchedules();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("Error updating schedule");
//       console.error(error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/admin/deleteschedule",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ id: id }),
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         toast.success(data.message);
//         setSchedules(
//           schedules.filter((schedule) => schedule.id !== currentSchedule.id)
//         );
//         setShowDeleteModal(false);
//         fetchSchedules();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("Error deleting schedule");
//       console.error(error);
//     }
//   };

//   const openDeleteModal = (schedule) => {
//     setCurrentSchedule(schedule);
//     setShowDeleteModal(true);
//   };

//   const closeDeleteModal = () => {
//     setShowDeleteModal(false);
//     setCurrentSchedule(null);
//   };

//   const formatDate = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toISOString().split("T")[0];
//   };

//   const formatTime = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toISOString().split("T")[1].split(".")[0];
//   };

//   return (
//     <div>
//       <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//         <table className="min-w-full table-auto">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="py-3 px-6 font-medium text-sm text-gray-600">
//                 Course Name
//               </th>
//               <th className="py-3 px-6 font-medium text-sm text-gray-600">
//                 Date
//               </th>
//               <th className="py-3 px-6 font-medium text-sm text-gray-600">
//                 Start Time
//               </th>
//               <th className="py-3 px-6 font-medium text-sm text-gray-600">
//                 End Time
//               </th>
//               <th className="py-3 px-6 font-medium text-sm text-gray-600">
//                 Venue
//               </th>
//               <th className="py-3 px-6 font-medium text-sm text-gray-600">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {schedules.map((schedule, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td
//                   className="py-4 px-6 text-sm text-gray-600"
//                   onClick={() => handleScheduleClick(schedule.id)}
//                 >
//                   {schedule.course?.name}
//                 </td>
//                 <td className="py-4 px-6 text-sm text-gray-600">
//                   {schedule.date}
//                 </td>
//                 <td className="py-4 px-6 text-sm text-gray-600">
//                   {schedule.startTime}
//                 </td>
//                 <td className="py-4 px-6 text-sm text-gray-600">
//                   {schedule.endTime}
//                 </td>
//                 <td className="py-4 px-6 text-sm text-gray-600">
//                   {schedule.venue}
//                 </td>
//                 <td className="py-4 px-6">
//                   <button
//                     onClick={() => handleEdit(schedule)}
//                     className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(schedule.id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal for editing schedule */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-lg z-50">
//           <div className="bg-white p-6 rounded-lg w-2xl">
//             <h3 className="text-xl font-semibold mb-4">Edit Schedule</h3>
//             <div className="grid grid-cols-2 gap-4">
//               {/* Course Name */}
//               <div className="mb-4">
//                 <label className="block text-sm text-gray-600 mb-2">
//                   Course Name
//                 </label>
//                 <input
//                   type="text"
//                   value={currentSchedule.courseName}
//                   onChange={(e) =>
//                     setCurrentSchedule({
//                       ...currentSchedule,
//                       courseName: e.target.value,
//                     })
//                   }
//                   className="w-full px-3 py-2 border rounded-md"
//                 />
//               </div>
//               {/* Date */}
//               <div className="mb-4">
//                 <label className="block text-sm text-gray-600 mb-2">Date</label>
//                 <input
//                   type="date"
//                   value={formatDate(currentSchedule.date)}
//                   onChange={(e) =>
//                     setCurrentSchedule({
//                       ...currentSchedule,
//                       date: e.target.value,
//                     })
//                   }
//                   className="w-full px-3 py-2 border rounded-md"
//                 />
//               </div>
//               {/* Start Time */}
//               <div className="mb-4">
//                 <label className="block text-sm text-gray-600 mb-2">
//                   Start Time
//                 </label>
//                 <input
//                   type="time"
//                   value={formatTime(currentSchedule.startTime)}
//                   onChange={(e) =>
//                     setCurrentSchedule({
//                       ...currentSchedule,
//                       startTime: e.target.value,
//                     })
//                   }
//                   className="w-full px-3 py-2 border rounded-md"
//                 />
//               </div>
//               {/* End Time */}
//               <div className="mb-4">
//                 <label className="block text-sm text-gray-600 mb-2">
//                   End Time
//                 </label>
//                 <input
//                   type="time"
//                   value={formatTime(currentSchedule.endTime)}
//                   onChange={(e) =>
//                     setCurrentSchedule({
//                       ...currentSchedule,
//                       endTime: e.target.value,
//                     })
//                   }
//                   className="w-full px-3 py-2 border rounded-md"
//                 />
//               </div>
//               {/* Venue */}
//               <div className="mb-4">
//                 <label className="block text-sm text-gray-600 mb-2">
//                   Venue
//                 </label>
//                 <input
//                   type="text"
//                   value={currentSchedule.venue}
//                   onChange={(e) =>
//                     setCurrentSchedule({
//                       ...currentSchedule,
//                       venue: e.target.value,
//                     })
//                   }
//                   className="w-full px-3 py-2 border rounded-md"
//                 />
//               </div>
//               {/* Duration */}
//               <div className="mb-4">
//                 <label className="block text-sm text-gray-600 mb-2">
//                   Duration
//                 </label>
//                 <input
//                   type="text"
//                   value={currentSchedule.duration}
//                   onChange={(e) =>
//                     setCurrentSchedule({
//                       ...currentSchedule,
//                       duration: e.target.value,
//                     })
//                   }
//                   className="w-full px-3 py-2 border rounded-md"
//                 />
//               </div>
//               {/* Recipient Type */}
//               <div className="mb-4">
//                 <label className="block text-sm text-gray-600 mb-2">
//                   Recipient Type
//                 </label>
//                 <select
//                   name="recipientType"
//                   value={currentSchedule.recipientType || ""}
//                   onChange={(e) =>
//                     setCurrentSchedule({
//                       ...currentSchedule,
//                       recipientType: e.target.value,
//                     })
//                   }
//                   className="w-full px-3 py-2 border rounded-md"
//                 >
//                   <option value="">Select</option>
//                   <option value="students">Students</option>
//                   <option value="teachers">Teachers</option>
//                   <option value="all">All</option>
//                 </select>
//               </div>
//             </div>
//             {/* Description Field (Spans 2 Columns) */}
//             <div className="mb-4 col-span-2">
//               <label className="block text-sm text-gray-600 mb-2">
//                 Description
//               </label>
//               <textarea
//                 value={currentSchedule.description}
//                 onChange={(e) =>
//                   setCurrentSchedule({
//                     ...currentSchedule,
//                     description: e.target.value,
//                   })
//                 }
//                 className="w-full px-3 py-2 border rounded-md"
//                 rows="4"
//               />
//             </div>
//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={closeModal}
//                 className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdate}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {showDeleteModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800 z-50">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h3 className="text-xl font-semibold mb-4">
//               Are you sure you want to delete this schedule?
//             </h3>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={closeDeleteModal}
//                 className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ScheduleTable;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ScheduleTable = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);

  const [editFormData, setEditFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    duration: "",
    description: "",
    recipientType: "",
  });

  const navigate = useNavigate();
  const handleScheduleClick = (scheduleId) => {
    navigate(`/scheduledetails/${scheduleId}`);
  };

  const fetchSchedules = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/getallschedule"
      );
      const data = await response.json();
      if (response.ok) {
        setSchedules(data.data);
        toast.success(data.message || "Schedules fetched successfully");
      } else {
        throw new Error(data.message || "Failed to fetch schedules");
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message || "Error fetching schedules");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleEdit = (schedule) => {
    setSelectedScheduleId(schedule.id);
    setEditFormData({
      date: schedule.date.split("T")[0], // Extract date part from ISO string
      startTime: schedule.startTime.split("T")[1].substring(0, 5), // Extract HH:MM from ISO string
      endTime: schedule.endTime.split("T")[1].substring(0, 5), // Extract HH:MM from ISO string
      venue: schedule.venue,
      duration: schedule.duration?.toString() || "",
      description: schedule.description || "",
      recipientType: schedule.recipientType || "",
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedScheduleId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/deleteschedule",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: selectedScheduleId }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete schedule");
      }

      setSchedules(
        schedules.filter((schedule) => schedule.id !== selectedScheduleId)
      );
      toast.success(data.message || "Schedule deleted successfully");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setShowDeleteModal(false);
      setSelectedScheduleId(null);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/updateschedule",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: selectedScheduleId,
            ...editFormData,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update schedule");
      }

      // Update the local state with the new schedule data
      setSchedules((prevSchedules) =>
        prevSchedules.map((schedule) =>
          schedule.id === selectedScheduleId
            ? {
                ...schedule,
                date: editFormData.date,
                startTime: `${editFormData.date}T${editFormData.startTime}:00Z`,
                endTime: `${editFormData.date}T${editFormData.endTime}:00Z`,
                venue: editFormData.venue,
                duration: parseInt(editFormData.duration),
                description: editFormData.description,
                recipientType: editFormData.recipientType,
              }
            : schedule
        )
      );

      toast.success(data.message || "Schedule updated successfully");
      setShowEditModal(false);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-xl overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Schedules List
      </h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-sm uppercase tracking-wider">
            <th className="px-4 py-3">Course Name</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Start Time</th>
            <th className="px-4 py-3">End Time</th>
            <th className="px-4 py-3">Venue</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr
              key={schedule.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td
                className="px-4 py-3 cursor-pointer text-gray-600"
                onClick={() => handleScheduleClick(schedule.id)}
              >
                {schedule.course?.name || "N/A"}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {new Date(schedule.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {schedule.startTime.split("T")[1].substring(0, 5)}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {schedule.endTime.split("T")[1].substring(0, 5)}
              </td>
              <td className="px-4 py-3 text-gray-600">{schedule.venue}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleEdit(schedule)}
                  className="px-2 py-1 text-xs font-semibold bg-blue-500 text-white rounded hover:bg-blue-600 transition mr-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(schedule.id)}
                  className="px-2 py-1 text-xs font-semibold bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-lg z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl w-full">
            <h3 className="text-lg font-semibold mb-4">Edit Schedule</h3>
            <form onSubmit={handleSubmitEdit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={editFormData.date}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={editFormData.startTime}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    End Time
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={editFormData.endTime}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Venue
                  </label>
                  <input
                    type="text"
                    name="venue"
                    value={editFormData.venue}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={editFormData.duration}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Recipient Type
                  </label>
                  <select
                    name="recipientType"
                    value={editFormData.recipientType}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  >
                    <option value="">Select</option>
                    <option value="students">Students</option>
                    <option value="teachers">Teachers</option>
                    <option value="all">All</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                  rows="3"
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

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-lg z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this schedule?</p>
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
    </div>
  );
};

export default ScheduleTable;
