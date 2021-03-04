
interface FlashMessageModel {
  message: string
  severity: 'success'| 'error'| 'info'| undefined
}

export default FlashMessageModel;
