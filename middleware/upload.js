const multer = require("multer")
const maxSize = 200 * 1024 * 1024
const directoryPath = "D:/MyProject13/BarcodeAutoDeliveryWeb/BarcodeAutoDelivery/static/uploads/"
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,  directoryPath)
  },
  
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)  
    
  }
})

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize }
}).single("file")

// let uploadFileMiddleware = util.promisify(uploadFile)
module.exports = {
  uploadFile
}