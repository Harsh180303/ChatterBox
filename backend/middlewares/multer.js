import multer from "multer"
import path from 'path'
import crypto from 'crypto'

// Destination folder (should exist or create on app start)
const uploadPath = './uploads'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname)
        const uniqueName = `${file.fieldname}-${Date.now()}-${crypto.randomBytes(6).toString('hex')}${extension}`
        cb(null, uniqueName)
    }
})

// File type filter 
const fileFilter = (req, file, cb) => {
    const allowedMimeType = ['image/jpg', 'image/png', 'image/webp', 'image/jpeg']
    if(allowedMimeType.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Only image files (jpg, png, webp) are allowed'), false)
    }
}

// Size limit of image (5 mb)
const limits = {
    fileSize: 5 * 1024 * 1024
}

const upload = multer({storage, fileFilter, limits})

export default upload