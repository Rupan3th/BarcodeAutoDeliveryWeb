import mysql from "mysql";
import dbconfig  from "../config/database";


let messageModel = {};

messageModel.InsertNewRow = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION    
    
    var sql = 'INSERT INTO messages (cam_model,phone_num,serial_num,uid,send_time,message,image) VALUES("'    
                +req.body.cam_model+'","'
                +req.body.phone_num+'","'
                +req.body.serial_num+'","'
                +req.body.uid+'",NOW(),"'
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
    
    var sql = 'SELECT  message, send_time FROM messages WHERE phone_num="'   
                +req.body.phone_num+'" AND serial_num="'
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

messageModel.getMessageList = (callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    if (conn) {
        conn.query('set names utf8',
            (err, rows) => {
                if (err) {
                    throw err
                }
                else {
                    conn.query('SELECT * FROM messages',
                        (err, rows) => {
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
        )
    }
}

messageModel.GetIdxSelected = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    if (conn) {
        conn.query('SELECT idx FROM messages WHERE cam_model="'+req.body.cam_model+'" AND phone_num="'+req.body.phone_num+'" AND serial_num="'+req.body.serial_num+'" AND message="'+req.body.message+'"',
            (err, rows) => {
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

messageModel.DeleteSelectedRow = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    if (conn) {
        conn.query('DELETE FROM messages WHERE idx="'+req.body.idx+'"',
            (err, rows) => {
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