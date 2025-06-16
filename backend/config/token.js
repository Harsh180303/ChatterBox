import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '3d',
    })

    return token
  } catch (error) {
    console.log("token generation failed", error)
    return null
  }
}

export default generateToken