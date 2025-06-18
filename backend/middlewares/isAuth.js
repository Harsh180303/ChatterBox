import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token not found"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid or expired token'
        })
    }
}

export default isAuth