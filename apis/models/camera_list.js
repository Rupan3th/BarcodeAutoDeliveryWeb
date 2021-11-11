import mysql from "mysql";
import dbconfig  from "../config/database";



let camera_listModel = {};

camera_listModel.getRegReqList = (callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    if (conn) {
        conn.query('SELECT * FROM cameralist WHERE end_time <= NOW()',
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

camera_listModel.getOrderList = (callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    if (conn) {
        conn.query('SELECT * FROM cameralist WHERE allow = "1"',
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
    var sql = 'INSERT INTO cameralist (cam_model,phone_num,uid,start_time,start_hour,end_time,end_hour,serial_num,client_name,remarks) VALUES("'    
                +req.body.cam_model+'","'
                +req.body.phone_num+'","'
                +req.body.uid+'","'
                +req.body.start_time+'","'
                +req.body.start_hour+'","'
                +req.body.end_time+'","'
                +req.body.end_hour+'","'
                +req.body.serial_num+'","'
                +req.body.client_name+'","'
                +req.body.remarks+'")'
    if(req.body.client_name == null || req.body.remarks == null){
        sql = 'INSERT INTO cameralist (cam_model,phone_num,uid,start_time,start_hour,end_time,end_hour,serial_num,client_name,remarks) VALUES("'    
                +req.body.cam_model+'","'
                +req.body.phone_num+'","'
                +req.body.uid+'","'
                +req.body.start_time+'","'
                +req.body.start_hour+'","'
                +req.body.end_time+'","'
                +req.body.end_hour+'","'
                +req.body.serial_num+'","不确定","试用版")'
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

camera_listModel.InsertNewPhoneSN = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    var today = new Date();
    var current_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var current_time = today.getHours() + ":" + today.getMinutes()
    var Eff_date = new Date();
    Eff_date.setDate(today.getDate() + 15);
    var effective_date = Eff_date.getFullYear()+'-'+(Eff_date.getMonth()+1)+'-'+Eff_date.getDate();
    var effective_time = Eff_date.getHours() + ":" + Eff_date.getMinutes();

    var sql = 'SELECT idx FROM cameralist WHERE serial_num="'+req.body.serial_num+'" AND uid = "'+req.body.uid+'"'    
    console.log('sql === ', sql)
    if (conn) {
        conn.query(sql, (err, rows) => {
                if (err) {
                    throw err
                }
                else {
                    console.log('rows === ', rows.length)
                    if(rows.length > 0){
                        callback(null, rows);
                        conn.end()
                    }else{
                        sql = 'INSERT INTO cameralist (cam_model,phone_num,uid,start_time,start_hour,end_time,end_hour,serial_num,client_name,remarks) VALUES("不确定","'
                                    +req.body.phone_num+'","'
                                    +req.body.uid+'","'
                                    +current_date+'","'
                                    +current_time+'","'
                                    +effective_date+'","'
                                    +effective_time+'","'
                                    +req.body.serial_num+'","不确定","试用版")'
                        
                        console.log('sql === ', sql)
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

                }
            }
        )
    }

    // var sql = 'INSERT INTO cameralist (cam_model,phone_num,uid,start_time,start_hour,end_time,end_hour,serial_num,client_name,remarks) VALUES("不确定","'
    //             +req.body.phone_num+'","'
    //             +req.body.uid+'","'
    //             +current_date+'","'
    //             +current_time+'","'
    //             +effective_date+'","'
    //             +effective_time+'","'
    //             +req.body.serial_num+'","不确定","试用版")'
    
    // console.log('sql === ', sql)
    // if (conn) {
    //     conn.query(sql, (err, rows) => {
    //             if (err) {
    //                 throw err
    //             }
    //             else {
    //                 callback(null, rows);
    //                 conn.end()
    //             }
    //         }
    //     )
    // }
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


camera_listModel.GetCamByPhoneAndSn = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    if (conn) {
        conn.query('SELECT * FROM cameralist WHERE phone_num="'+req.body.phone_num+'" AND serial_num="'+req.body.serial_num+'"',
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
                                                +req.body.phone_num+'", uid="'
                                                +req.body.uid+'", start_time="'
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
                                                +req.body.phone_num+'", uid="'
                                                +req.body.uid+'", start_time="'
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

camera_listModel.AllowOrderRow = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    var sql = 'UPDATE cameralist SET cam_model="'+req.body.cam_model+'", end_time="'+req.body.req_time+'", allow="2" WHERE idx="'+req.body.idx+'"'    
    
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

camera_listModel.updatePhoneNum = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    var sql = 'UPDATE cameralist SET phone_num="'+req.body.new_phone_num+'" WHERE serial_num="'
                                                +req.body.serial_num+'" AND phone_num="'+req.body.old_phone_num+'"'
    
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

camera_listModel.ReqActivation = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    var sql = 'UPDATE cameralist SET req_time="'+req.body.req_time+'", allow = "1" WHERE serial_num="'
                                                +req.body.serial_num+'" AND phone_num="'+req.body.phone_num+'" AND uid="'+req.body.uid+'"'
    
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