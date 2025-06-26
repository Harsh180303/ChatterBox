import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        // console.log('Cookies received:', req.cookies)
        // console.log('Token received:', req.cookies.token)
        const token = req.cookies.token
        // console.log('cookie token ', token)
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
        console.log(error)
        res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid or expired token'
        })
    }
}

export default isAuth