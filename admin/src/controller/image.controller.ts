import { Request, Response } from 'express'
import multer from 'multer'
import { extname } from 'path'

export const UploadImages = async (req: Request, res: Response) => { 
  //Upload images
  const storage = multer.diskStorage({
    destination: './uploads',
    filename(_, file, callback) {
      const randomName = Math.random().toString(20).substring(2, 12)
      return callback(null, `${randomName}${extname(file.originalname)}`)
    }
  })
  
  const upload = multer({ storage }).single('image')

  upload(req, res, async err => {
    if (err) {
      return res.status(400).send({ error: 'Error uploading file' })
    }
    res.send({
      url: `http://localhost:8000/api/uploads/${req.file.filename}`
    })
  })

  
}