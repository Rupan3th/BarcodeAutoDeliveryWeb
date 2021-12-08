import { Router } from 'express'
import axios from 'axios'

const fs = require('fs');
const {uploadFile} = require("../../middleware/upload");
const router = Router();
const directoryPath = "D:/MyProject13/BarcodeAutoDeliveryWeb/BarcodeAutoDelivery/static/uploads/";

router.post('/upload', uploadFile, async function (req, res, next) {
// const upload = async (req, res) => {
    console.log("Uploaded the file info: ", req.file, req.body.v_num, req.body.v_info)
    

    await axios.post('/apis/versions/upload_db', 
        {
            'originalname': req.file.originalname, 
            'version': req.body.v_num, 
            'filename': req.file.filename, 
            'info': req.body.v_info, 
            'size': parseInt(req.file.size/1024) + 'KB', 
            'path': directoryPath 
        })
    .then(res => {
        console.log('response ====', res.data)
    })
    .catch(err => {
      console.log('err ====', err)
    }) 

    // if (error) {
    //     res.status(500).send({
    //         message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    //     });
    // }
    if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
    }
    
    res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
    });
});


router.post('/getListFiles', function (req, res, next) {
// const getListFiles = (req, res) => {
  

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    // console.log(files);
    let fileInfos = files.map(file => ({name: file, url: directoryPath+file}));

    res.status(200).send(fileInfos);
  });
});


router.post('/download', function (req, res, next) {
// const download = (req, res) => {
  const fileName = req.body.name;
  console.log("Download req file info: ", req.body.name)  

  res.download(directoryPath + fileName, fileName, (err) => {
    console.log("Download res info: ", res)  
    
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
});

// module.exports = {
//   upload,
//   getListFiles,
//   download,
// };

export default router;