import { Router } from 'express'
import  camera_listModel  from "../../models/camera_list";
const router = Router()


/* GET CameraList. */
router.post('/camera_list', function (req, res, next) {
    camera_listModel.getCameraList((err, data) => {
        res.status(200).json(data);
    });
    
})

/* GET CameraList by cameraModel. */
router.get('/camera_list/:cam_model', function (req, res, next) {
    const id = parseInt(req.params.id)
    if (id >= 0 && id < camera_list.length) {
        res.json(camera_list[id])
    } else {
        res.sendStatus(404)
    }
})

/* Insert New Item */
router.post('/insert_new', function (req, res, next) {
    camera_listModel.InsertNewRow(req, (err, data) => {
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

/* Delete Selected Item */
router.post('/delete_selected', function (req, res, next) {
    camera_listModel.DeleteSelectedRow(req, (err, data) => {
        res.status(200).json(data);
    });
    
})

export default router