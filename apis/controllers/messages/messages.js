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

/* GET messageList. */
router.post('/message_list', function (req, res, next) {
    messageModel.getMessageList((err, data) => {
        res.status(200).json(data);
    });
    
})

/* Get idx Selected item db concect */
router.post('/get_idx_selected', function (req, res, next) {
    messageModel.GetIdxSelected(req, (err, data) => {
        res.status(200).json(data);
    });
    
})

/* Delete Selected Item */
router.post('/delete_selected', function (req, res, next) {
    messageModel.DeleteSelectedRow(req, (err, data) => {
        res.status(200).json(data);
    });
    
})


export default router