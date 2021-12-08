import { Router } from 'express'
import  camera_listModel  from "../../models/camera_list";
const router = Router()


/* GET CameraList. */
router.post('/camera_list', function (req, res, next) {
    camera_listModel.getCameraList((err, data) => {
        res.status(200).json(data);
    });
    
})

/* GET trial list. */
router.post('/trial_list', function (req, res, next) {
    camera_listModel.getTrialList((err, data) => {
        res.status(200).json(data);
    });
    
})

/* GET Registration request list. */
router.post('/reg_req_list', function (req, res, next) {
    camera_listModel.getRegReqList((err, data) => {
        res.status(200).json(data);
    });
    
})

router.post('/get_order_list', function (req, res, next) {
    camera_listModel.getOrderList((err, data) => {
        res.status(200).json(data);
    });
    
})

/* GET Camera by phone and serial number. */
router.post('/get_cam_model', function (req, res, next) {
    camera_listModel.GetCamByPhoneAndSn(req, (err, data) => {
        res.status(200).json(data);
    });

})

/* Insert New Item */
router.post('/insert_new', function (req, res, next) {
    camera_listModel.InsertNewRow(req, (err, data) => {
        res.status(200).json(data);
    });
    
})

/* Insert New Item by phoneNum and SN */
router.post('/insert_nphone_sn', function (req, res, next) {
    camera_listModel.InsertNewPhoneSN(req, (err, data) => {
        res.status(200).json(data);
    });
    
})

router.post('/update_phone', function (req, res, next) {
    camera_listModel.updatePhoneNum(req, (err, data) => {
        res.status(200).json(data);
    });
    
})

router.post('/Req_Activation', function (req, res, next) {
    camera_listModel.ReqActivation(req, (err, data) => {
        res.status(200).json(data);
    });
    
})

/* Get idx Selected item db concect */
router.post('/get_idx_selected', function (req, res, next) {
    camera_listModel.GetIdxSelected(req, (err, data) => {
        res.status(200).json(data);
    });
    
})

/* Updete Selected Item */
router.post('/update_row', function (req, res, next) {
    camera_listModel.UpdateSelectedRow(req, (err, data) => {
        res.status(200).json(data);
    });
    
})

router.post('/allow_order_row', function (req, res, next) {
    camera_listModel.AllowOrderRow(req, (err, data) => {
        res.status(200).json(data);
    });
    
})

/* Delete Selected Item */
router.post('/delete_selected', function (req, res, next) {
    camera_listModel.DeleteSelectedRow(req, (err, data) => {
        res.status(200).json(data);
    });
    
})

export default router