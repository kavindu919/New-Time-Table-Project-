import { useState } from "react";
import { toast } from "react-toastify";

const ScheduleForm = () => {
  const [formData, setFormData] = useState({
    courseId: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    duration: "",
    description: "",
    teacherId: "",
    recipientType: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/addschedule",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setFormData({
          courseId: "",
          date: "",
          startTime: "",
          endTime: "",
          venue: "",
          duration: "",
          description: "",
          teacherId: "",
          recipientType: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white p-5 rounded-lg shadow-md"
    >
      {/* Left Column */}
      <div className="space-y-4">
        <div>
          <label className="block">Course ID</label>
          <input
            type="text"
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block">Start Time</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block">End Time</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block">Venue</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-4">
        <div>
          <label className="block">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block">Teacher ID</label>
          <input
            type="text"
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block">Recipient Type</label>
          <select
            name="recipientType"
            value={formData.recipientType}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Select</option>
            <option value="students">Students</option>
            <option value="teachers">Teachers</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {/* Full Width Button */}
      <div className="col-span-1 md:col-span-2">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ScheduleForm;
