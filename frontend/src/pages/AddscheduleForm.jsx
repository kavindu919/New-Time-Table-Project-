import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ScheduleForm = () => {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState({
    courses: false,
    teachers: false,
  });
  const [formData, setFormData] = useState({
    courseId: "",
    courseName: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    duration: "",
    description: "",
    teacherId: "",
    teacherName: "",
    recipientType: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch courses
        setLoading((prev) => ({ ...prev, courses: true }));
        const coursesResponse = await fetch(
          "http://localhost:8080/api/admin/allcourses"
        );
        const coursesData = await coursesResponse.json();
        if (coursesResponse.ok) {
          setCourses(coursesData.data);
        }

        // Fetch teachers
        setLoading((prev) => ({ ...prev, teachers: true }));
        const teachersResponse = await fetch(
          "http://localhost:8080/api/admin/getallteachers"
        );
        const teachersData = await teachersResponse.json();
        if (teachersResponse.ok) {
          setTeachers(teachersData.data || []);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading({ courses: false, teachers: false });
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle course selection
    if (name === "courseName") {
      const selectedCourse = courses.find((course) => course.name === value);
      setFormData({
        ...formData,
        courseName: value,
        courseId: selectedCourse ? selectedCourse.id : "",
      });
    }
    // Handle teacher selection
    else if (name === "teacherName") {
      const selectedTeacher = teachers.find(
        (teacher) => `${teacher.firstName} ${teacher.lastName}` === value
      );
      setFormData({
        ...formData,
        teacherName: value,
        teacherId: selectedTeacher ? selectedTeacher.id : "",
      });
    }
    // Handle other fields
    else {
      setFormData({ ...formData, [name]: value });
    }
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
        // Reset form
        setFormData({
          courseId: "",
          courseName: "",
          date: "",
          startTime: "",
          endTime: "",
          venue: "",
          duration: "",
          description: "",
          teacherId: "",
          teacherName: "",
          recipientType: "",
        });
        navigate("/scheuletable");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Add New Schedule
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course
            </label>
            <select
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading.courses}
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
            <input type="hidden" name="courseId" value={formData.courseId} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teacher
            </label>
            <select
              name="teacherName"
              value={formData.teacherName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading.teachers}
            >
              <option value="">Select a teacher</option>
              {teachers.map((teacher) => (
                <option
                  key={teacher.id}
                  value={`${teacher.firstName} ${teacher.lastName}`}
                >
                  {teacher.firstName} {teacher.lastName}
                </option>
              ))}
            </select>
            <input type="hidden" name="teacherId" value={formData.teacherId} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Type
            </label>
            <select
              name="recipientType"
              value={formData.recipientType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select recipient type</option>
              <option value="students">Students</option>
              <option value="teachers">Teachers</option>
              <option value="all">All</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Venue
            </label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Full Width Fields */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Create Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleForm;
