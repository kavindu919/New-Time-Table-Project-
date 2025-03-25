import prisma from "../../../../lib/prismaclient.js";

export const addCourse = async (req, res) => {
  const { name, description, teacherIds } = req.body;

  try {
    const course = await prisma.course.create({
      data: {
        name,
        description,
      },
    });

    const courseTeacherEntries = teacherIds.map((teacherId) => ({
      courseId: course.id,
      teacherId,
    }));

    await prisma.courseTeacher.createMany({
      data: courseTeacherEntries,
    });

    return res.status(200).json({ message: "Course added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteCourse = async (req, res) => {
  const { courseId } = req.body;

  try {
    await prisma.courseTeacher.deleteMany({
      where: { courseId },
    });

    await prisma.course.delete({
      where: { id: courseId },
    });

    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getCourse = async (req, res) => {
  const { id } = req.params; // Get course ID from URL params

  try {
    // Fetch only course details without teacher associations
    const course = await prisma.course.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      message: "Course retrieved successfully",
      data: course, // Returns just {id, name, description}
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return res.status(500).json({ message: "Failed to fetch course details" });
  }
};

export const assignTeacher = async (req, res) => {
  const { courseId, teacherId } = req.body;
  try {
    const courseassignment = await prisma.courseTeacher.findFirst({
      where: {
        courseId: courseId,
        teacherId: teacherId,
      },
    });
    if (courseassignment) {
      return res
        .status(404)
        .json({ message: "Already teacher assigned to the course" });
    }
    const newAssignment = await prisma.courseTeacher.create({
      data: {
        courseId: courseId,
        teacherId: teacherId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Teacher assigned successfully",
      data: newAssignment,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return res.status(500).json({ message: "Failed to assign teacher" });
  }
};

export default getCourse;
