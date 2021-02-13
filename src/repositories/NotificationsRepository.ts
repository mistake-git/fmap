import NotificationModel from '../models/NotificationModel'
import { myHttpClient } from '../plugins/axios'

export default class NotificationsRepository {

  public static async getNotifications(
    user_uid: string,
  ): Promise<NotificationModel[]> {
    const result = await myHttpClient.get('/notifications', { params: {
      user_id: user_uid
    }})
    return result.data
  }

  public static async checkNotifications(
    user_uid: string,
  ): Promise<NotificationModel[]> {
    const result = await myHttpClient.get('/notifications/check', { params: {
      user_id: user_uid
    }})
    return result.data
  }

}