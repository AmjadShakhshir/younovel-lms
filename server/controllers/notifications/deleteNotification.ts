import cron from "node-cron";
import notificationService from "../../services/notificationService";

/*
@ Desc     Delete notification older than 30 days
@ Route    DELETE /api/v1/notifications/delete-notification
@ Access   Private/Admin
*/
cron.schedule("0 0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await notificationService.deleteNotification(thirtyDaysAgo);
});
