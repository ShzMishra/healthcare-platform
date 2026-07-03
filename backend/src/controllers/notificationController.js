const { PrismaClient } =
require("@prisma/client");

const prisma =
new PrismaClient();

exports.getNotifications =
async (req, res) => {

  try {

    const notifications =
    await prisma.notification.findMany({

      where: {
        userId: req.user.id
      },

      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(notifications);

  } catch (error) {

    res.status(500).json({
      message:
      "Unable to fetch notifications"
    });

  }
};

exports.markAsRead =
async (req, res) => {

  try {

    const { id } =
    req.params;

    await prisma.notification.update({

      where: {
        id
      },

      data: {
        read: true
      }
    });

    res.json({
      message:
      "Notification updated"
    });

  } catch (error) {

    res.status(500).json({
      message:
      "Unable to update notification"
    });

  }
};

exports.getUnreadCount =
async (req, res) => {

  try {

    const count =
    await prisma.notification.count({

      where: {
        userId: req.user.id,
        read: false
      }
    });

    res.json({
      count
    });

  } catch (error) {

    res.status(500).json({
      message:
      "Unable to fetch count"
    });

  }
};