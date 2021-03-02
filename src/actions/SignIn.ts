export const UPDATE_EMAIL = "UPDATE_EMAIL"
export const UPDATE_PASSWORD = "UPDATE_PASSWORD"

export const updateEmail = (email: string) => {
  return {
    type: UPDATE_EMAIL,
    payload: email,
  }
}

export const updatePassword = (password: string) => {
  return {
    type: UPDATE_PASSWORD,
    payload: password,
  }
}
