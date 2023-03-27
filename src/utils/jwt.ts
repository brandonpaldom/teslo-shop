import jwt from 'jsonwebtoken'

const JWT_SECRET: string | undefined = process.env.JWT_SECRET

export const generateToken = (_id: string, email: string) => {
  if (!JWT_SECRET || JWT_SECRET.length === 0) {
    throw new Error('The environment variable JWT_SECRET is not set')
  }

  return jwt.sign({ _id, email }, JWT_SECRET, { expiresIn: '1d' })
}

export const verifyToken = (token: string): Promise<string> => {
  if (!JWT_SECRET || JWT_SECRET.length === 0) {
    throw new Error('The environment variable JWT_SECRET is not set')
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return reject('Invalid token')
        }

        const { _id } = decoded as { _id: string }
        resolve(_id)
      })
    } catch (err) {
      reject('Invalid token')
    }
  })
}
