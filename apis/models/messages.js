import mysql from "mysql";
import dbconfig  from "../config/database";


let messageModel = {};

messageModel.InsertNewRow = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION    
    
    var sql = 'INSERT INTO messages (cam_model,phone_num,serial_num,send_time,message,image) VALUES("'    
                +req.body.cam_model+'","'
                +req.body.phone_num+'","'
                +req.body.serial_num+'",NOW(),"'
                +req.body.message+'","'                
                +req.body.image+'")'   
                
    console.log(sql)
    
    if (conn) {
        conn.query(sql, (err, rows) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, rows);
                    conn.end()
                }
            }
        )
    }
},

messageModel.getMessagebySN = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION    
    console.log("request get sms === ", req.body)
    
    var sql = 'SELECT * FROM messages WHERE cam_model="'   
                +req.body.cam_model+'" AND serial_num="'
                +req.body.serial_num+'"'   
                
    console.log(sql)
    
    if (conn) {
        conn.query(sql, (err, rows) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, rows);
                    conn.end()
                }
            }
        )
    }
}

messageModel.getMessages = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION    
    console.log("request get sms === ", req.body)
    
    var sql = 'SELECT * FROM messages'   
                
    console.log(sql)
    
    if (conn) {
        conn.query(sql, (err, rows) => {
                if (err) {
                    throw err
                }
                else {
                    callback(null, rows);
                    conn.end()
                }
            }
        )
    }
}



export default messageModel