import CommentFormModel from '../forms/CommentFormModel'
import CommentModel from '../models/CommentModel'
import NotificationModel from '../models/NotificationModel'
import { myHttpClient } from '../plugins/axios'

export default class NotificationsRepository {

  public static async getNotifications(
    user_id: number,
  ): Promise<NotificationModel> {
    const result = await myHttpClient.get('/notifications', { params: {
      user_id: user_id
    }})
    return result.data
  }

  public static async checkNotifications(
    user_id: number,
  ): Promise<NotificationModel> {
    const result = await myHttpClient.get('/notifications/check', { params: {
      user_id: user_id
    }})
    return result.data
  }

}