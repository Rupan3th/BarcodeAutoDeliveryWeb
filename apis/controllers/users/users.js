import { Router } from 'express'
import  userModel  from "../../models/users";
const router = Router()


/* GET users listing. */
router.get('/users', function (req, res, next) {
    userModel.getUsers((err, data) => {
        res.status(200).json(data);
    });
    
})

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
    const id = parseInt(req.params.id)
    if (id >= 0 && id < users.length) {
        res.json(users[id])
    } else {
        res.sendStatus(404)
    }
})

/* GET userList. */
router.post('/get_users', function (req, res, next) {
    console.log('----req.body === ', req.body)
    userModel.getUsers(req, (err, data) => {
        res.status(200).json(data);
    });    
})

/* Get idx Selected item db concect */
router.post('/get_idx_selected', function (req, res, next) {
    userModel.GetIdxSelected(req, (err, data) => {
        res.status(200).json(data);
    });
    
})

/* Insert New Item */
router.post('/insert_new', function (req, res, next) {
    userModel.InsertNewRow(req, (err, data) => {
        res.status(200).json(data);
    });
    
})

/* Updete Selected Item */
router.post('/update_row', function (req, res, next) {
    userModel.UpdateSelectedRow(req, (err, data) => {
        res.status(200).json(data);
    });
    
})

/* Delete Selected Item */
router.post('/delete_selected', function (req, res, next) {
    userModel.DeleteSelectedRow(req, (err, data) => {
        res.status(200).json(data);
    });
    
})

export default router