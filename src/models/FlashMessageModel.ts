interface FlashMessageModel {
  message: string
  severity: 'success' | 'error' | 'info' | undefined
  isOpen: boolean
}

export default FlashMessageModel
