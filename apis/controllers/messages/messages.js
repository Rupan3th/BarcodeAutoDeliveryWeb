import { Router } from 'express'
import  messageModel  from "../../models/messages";
const router = Router()

/* Insert message */
router.post('/send_sms', function (req, res, next) {
    console.log('req body of send message ===', req.body)    
    messageModel.InsertNewRow(req, (err, data) => {
        res.status(200).json(data);
    });
    
})

/* Insert message */
router.post('/get_sms', function (req, res, next) {    
    messageModel.getMessagebySN(req, (err, data) => {
        res.status(200).json(data);
    });
    
})


export default router