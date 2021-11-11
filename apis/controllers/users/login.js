import { Router } from 'express'
import  userModel  from "../../models/users";
const router = Router()


/* login user. */
router.post('/login', function (req, res, next) {
        
    userModel.login(req, (err, data) => {
        
        // console.log(" login db connect", data[0].level)
        // console.log(" login length", data.length)
        
        if (data != null) {                  
            console.log(" return new data000", data[0])             
            res.send(data[0])
        }else {
            let faildata = {
                id: '',
                pw: '',
            }
            res.send(faildata)
        }        
    });            
   
})

/* GET user by ID. */
router.get('/login/:id', function (req, res, next) {
    const id = parseInt(req.params.id)
    if (id >= 0 && id < users.length) {
        res.json(users[id])
    } else {
        res.sendStatus(404)
    }
})

export default router