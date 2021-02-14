import NotificationModel from '../models/NotificationModel'
import { myHttpClient } from '../plugins/axios'

export default class NotificationsRepository {

  public static async getNotifications(
    userUid: string,
  ): Promise<NotificationModel[]> {
    const result = await myHttpClient.get('/notifications', { params: {
      user_id: userUid
    }})
    return result.data
  }

  public static async getUncheckedNotificationsCount(
    userUid: string,
  ): Promise<number> {
    const result = await myHttpClient.get('/notifications/unchecked_notification_count', { params: {
      user_id: userUid
    }})
    return result.data
  }

  public static async checkNotifications(
    userUid: string,
  ){
    const result = await myHttpClient.get('/notifications/check', { params: {
      user_id: userUid
    }})
    return result.data
  }

}