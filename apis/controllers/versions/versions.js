import { Router } from 'express'
import  versionsModel  from "../../models/versions";
const router = Router()

/* Insert message */
router.post('/upload_db', function (req, res, next) {
    console.log('req body of send message ===', req.body)    
    versionsModel.InsertUpload(req, (err, data) => {
        res.status(200).json(data);
    });
    
}),

router.post('/get_version_info', function (req, res, next) {
    console.log('req body of send message ===', req.body)    
    versionsModel.getVersionInfo(req, (err, data) => {
        res.status(200).json(data);
    });
    
}),

router.post('/get_last_version', function (req, res, next) {
    console.log('req body of send get_last_version ===', req.body)    
    versionsModel.getLastVersion(req, (err, data) => {
        res.status(200).json(data);
    });
    
}),

router.post('/req_update', function (req, res, next) {
    console.log('req body of req_update ===', req.body)    
    versionsModel.ReqUpdate(req, (err, data) => {
        res.status(200).json(data);
    });
    
})



export default router