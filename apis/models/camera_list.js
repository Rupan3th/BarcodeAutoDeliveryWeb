import mysql from "mysql";
import dbconfig  from "../config/database";



let camera_listModel = {};

camera_listModel.getCameraList = (callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    if (conn) {
        conn.query('SELECT * FROM cameralist',
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

camera_listModel.InsertNewRow = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    var sql = 'INSERT INTO cameralist (cam_model,phone_num,start_time,start_hour,end_time,end_hour,serial_num,client_name,remarks) VALUES("'    
                +req.body.cam_model+'","'
                +req.body.phone_num+'","'
                +req.body.start_time+'","'
                +req.body.start_hour+'","'
                +req.body.end_time+'","'
                +req.body.end_hour+'","'
                +req.body.serial_num+'","'
                +req.body.client_name+'","'
                +req.body.remarks+'")'
    if(req.body.client_name == null || req.body.remarks == null){
        sql = 'INSERT INTO cameralist (cam_model,phone_num,start_time,start_hour,end_time,end_hour,serial_num,client_name,remarks) VALUES("'    
                +req.body.cam_model+'","'
                +req.body.phone_num+'","'
                +req.body.start_time+'","'
                +req.body.start_hour+'","'
                +req.body.end_time+'","'
                +req.body.end_hour+'","'
                +req.body.serial_num+'","不确定","不")'
    }
    
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


camera_listModel.GetIdxSelected = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    if (conn) {
        conn.query('SELECT idx FROM cameralist WHERE cam_model="'+req.body.cam_model+'" AND phone_num="'+req.body.phone_num+'" AND serial_num="'+req.body.serial_num+'"',
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

camera_listModel.UpdateSelectedRow = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    var sql = 'UPDATE cameralist SET cam_model="'+req.body.cam_model+'", phone_num="'
                                                +req.body.phone_num+'", start_time="'
                                                +req.body.start_time+'", start_hour="'
                                                +req.body.start_hour+'", end_time="'
                                                +req.body.end_time+'", end_hour="'
                                                +req.body.end_hour+'", serial_num="'
                                                +req.body.serial_num+'", client_name="'
                                                +req.body.client_name+'", remarks="'
                                                +req.body.remarks+'" WHERE idx="'
                                                +req.body.idx+'"'
    if(req.body.client_name == null || req.body.remarks == null){
        sql = 'UPDATE cameralist SET cam_model="'+req.body.cam_model+'", phone_num="'
                                                +req.body.phone_num+'", start_time="'
                                                +req.body.start_time+'", start_hour="'
                                                +req.body.start_hour+'", end_time="'
                                                +req.body.end_time+'", end_hour="'
                                                +req.body.end_hour+'", serial_num="'
                                                +req.body.serial_num+'" WHERE idx="'
                                                +req.body.idx+'"'
    }
    
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

camera_listModel.DeleteSelectedRow = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    if (conn) {
        conn.query('DELETE FROM cameralist WHERE idx="'+req.body.idx+'"',
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

export default camera_listModel