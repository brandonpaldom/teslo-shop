export const isValidEmail = (email: string) => {
  const match = email.match(/^\s*(?=.{1,254})(?=.{1,64}@)[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)*@[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)*(?:\.[A-Za-z]{2,})\s*$/)

  return !!match
}

export const isEmail = (email: string) => {
  const isValid = isValidEmail(email)

  return isValid ? undefined : 'Invalid email'
}
