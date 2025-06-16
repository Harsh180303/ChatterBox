const errorMiddleware = async (err, req, res, next) => {
    console.error('Error Caught ', err.stack)

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode

    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    })
}

export default errorMiddleware