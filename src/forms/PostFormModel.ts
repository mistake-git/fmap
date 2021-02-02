interface PostFormModel {
  name: string
  size: number
  weight: number
  weather: string
  number?: number
  feed: string
  memo: string
  date: Date
  time: Date
  status?: number
  user_id: number
  latitude: number
  longitude: number
}
export default PostFormModel
