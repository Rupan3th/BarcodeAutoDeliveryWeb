import mysql from "mysql";
import dbconfig  from "../config/database";


let messageModel = {};

messageModel.InsertNewRow = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION    
    
    var sql = 'INSERT INTO messages (cam_model,order_num,phone_num,ex_serial_num,serial_num,send_time,message,image) VALUES("'    
                +req.body.cam_model+'","'
                +req.body.order_num+'","'
                +req.body.phone_num+'","'
                +req.body.ex_serial_num+'","'
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
    
    var sql = 'SELECT  message, send_time FROM messages WHERE phone_num="'   
                +req.body.phone_num+'" AND ex_serial_num="'
                +req.body.ex_serial_num+'"'   
                
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
        conn.query('SELECT idx FROM messages WHERE message="'+req.body.message+'" AND order_num="'+req.body.order_num+'" AND phone_num="'+req.body.phone_num+'" AND ex_serial_num="'+req.body.ex_serial_num+'"',
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


messageModel.DeleteSelectedRows = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    var sql = 'DELETE FROM messages WHERE idx IN ('+req.body.idxs+')'
    console.log(sql)
    if (conn) {        
        conn.query(sql,
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