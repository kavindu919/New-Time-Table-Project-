import prisma from "../../../../lib/prismaclient.js";
import { generatePDFReport } from "../../../utils/reportGenarator.js";

export const userActivity = async (req, res) => {
  const { userId, startDate, endDate } = req.query;
  const filters = {};
  if (userId) {
    filters.userId = userId;
  }
  if (startDate && endDate) {
    filters.timestamp = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    };
  }
  const activities = await prisma.userActivity.findMany({
    where: filters,
    include: { user: true },
  });
  return res.status(200).json({ activities });
};

export const userActivityReprot = async (req, res) => {
  const { userId, startDate, endDate } = req.query;
  const filters = {};
  if (userId) {
    filters.userId = userId;
  }
  if (startDate && endDate) {
    filters.timestamp = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    };
  }
  const activities = await prisma.userActivity.findMany({
    where: filters,
    include: { user: true },
  });
  const filePath = "user_activity_report.pdf";
  await generatePDFReport(activities, filePath, "User Activity Re port");
};
