import NotificationModel from '../models/NotificationModel'
import { myHttpClient } from '../plugins/axios'

export default class NotificationsRepository {
  public static async getNotifications(): Promise<NotificationModel[]> {
    const result = await myHttpClient.get('/notifications')
    return result.data
  }

  public static async getUncheckedNotificationsCount(): Promise<number> {
    const result = await myHttpClient.get(
      '/notifications/unchecked_notification_count'
    )
    return result.data
  }

  public static async checkNotifications() {
    const result = await myHttpClient.get('/notifications/check')
    return result.data
  }
}
