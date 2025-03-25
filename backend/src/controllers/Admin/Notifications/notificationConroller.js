import prisma from "../../../../lib/prismaclient.js";

export const addNotification = async (req, res) => {
  const { title, message, recipientType } = req.body;

  try {
    await prisma.notification.create({
      data: {
        title,
        message,
        recipientType,
      },
    });

    return res.status(200).json({ message: "Notification added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateNotification = async (req, res) => {
  const { id, title, message, recipientType } = req.body;

  try {
    await prisma.notification.update({
      where: { id: id },
      data: { title, message, recipientType },
    });

    return res
      .status(200)
      .json({ message: "Notification updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteNotification = async (req, res) => {
  const { id } = req.body;

  try {
    await prisma.notification.delete({
      where: { id: id },
    });

    return res
      .status(200)
      .json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany();
    return res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getSingleNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
