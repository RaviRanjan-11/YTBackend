
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, next) {
      next(null, './public/temp')
    },
    filename: function (req, file, next) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      next(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  export const upload = multer({ storage: storage })