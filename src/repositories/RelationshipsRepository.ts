import UserModel from '../models/UserModel'
import { myHttpClient } from '../plugins/axios'

export default class RelationshipsRepository {
  public static async createRelationships(
    followId: number
  ): Promise<UserModel> {
    const result = await myHttpClient.post('/relationships', {
      follow_id: followId,
    })
    return result.data
  }

  public static async destroyRelationships(
    followId: number
  ): Promise<UserModel> {
    const result = await myHttpClient.delete('/relationships/delete', {
      params: {follow_id: followId },
    })
    return result.data
  }

  public static async isFollowed(
    followId: number
  ): Promise<boolean> {
    const result = await myHttpClient.get('/relationships/is_followed', {
      params: {follow_id: followId },
    })
    return result.data
  }
}