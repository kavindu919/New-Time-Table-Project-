import express from "express";
import {
  deleteUser,
  getAllStudents,
  getSingleStudents,
  registerUser,
  setUserState,
  updateUser,
} from "../controllers/Admin/Student/studentAuthController.js";
import {
  deleteTeacher,
  getAllTeachers,
  getSingleTeacher,
  registerTeacher,
  setTeacherState,
  updateTeacher,
} from "../controllers/Admin/teacher/teacherAuthController.js";
import {
  addSchedule,
  deleteSchedule,
  getAllSchedules,
  getSingleSchedule,
  reassignSchedule,
  updateSchedule,
} from "../controllers/Admin/Schedules/scheduleController.js";
import {
  addNotification,
  deleteNotification,
  getNotifications,
  getSingleNotification,
  getTeacherAndAllNotifications,
  updateNotification,
} from "../controllers/Admin/Notifications/notificationConroller.js";
import getCourse, {
  addCourse,
  // assignTeacher,
  deleteCourse,
  getAllCourses,
} from "../controllers/Admin/Course/courseController.js";
import {
  userActivity,
  userActivityReprot,
} from "../controllers/Admin/Reports/reportController.js";
import upload from "../../lib/multerconfig.js";
import { authMiddleware } from "../utils/authMiddleware .js";

const router = express.Router();

// router.use(authMiddleware);

//Route For User Authentication and User Management
router.post("/adduser", upload.single("avatar"), registerUser);
router.post("/updateuser", updateUser);
router.post("/deleteuser", deleteUser);
// router.post("/deleteuser", deleteUser);
router.post("/verifyuser", setUserState);

router.get("/getallusers", getAllStudents);
router.get("/getuser/:id", getSingleStudents);

//Route For Teacher Authentication and Teacher Management
router.post("/addteacher", registerTeacher);
router.post("/updateteacher", updateTeacher);
router.post("/deleteteacher", deleteTeacher);
router.post("/verifyteacher", setTeacherState);

router.get("/getallteachers", getAllTeachers);
router.get("/getteacher/:id", getSingleTeacher);

//Route For Schedule Authentication and Schedule Management
router.post("/addschedule", addSchedule);
router.post("/deleteschedule", deleteSchedule);
router.post("/updateschedule", updateSchedule);
router.post("/reassignschedule", reassignSchedule);

router.get("/getallschedule", getAllSchedules);
router.get("/getsingleschedule/:id", getSingleSchedule);

//Route For Notification Authentication and Notification Management
router.post("/addnotification", addNotification);
router.post("/updatenotification", updateNotification);
router.post("/deleteNotification", deleteNotification);

router.get("/getallNotification", getNotifications);
router.post("/getnotification", getSingleNotification);
router.get("/getteachernotifiation", getTeacherAndAllNotifications);

//Route For Course Authentication and Course Management
router.post("/addcourse", addCourse);
router.post("/deletecourse", deleteCourse);
router.get("/allcourses", getAllCourses);
router.post("/getcoursedetails", getCourse);
// router.post("/assignteacher", assignTeacher);

//Route For Reports Management
router.post("/useractivity", userActivity);
router.post("/useractivityreports", userActivityReprot);

export default router;
