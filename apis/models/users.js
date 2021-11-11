import mysql from "mysql";
import dbconfig  from "../config/database";

let userModel = {};

userModel.getUsers = (req, callback) => {
    var sql = 'SELECT * FROM user ORDER BY idx'    
    if(req.body.level == '2') {
        sql = 'SELECT * FROM user where level="'+req.body.level+'" ORDER BY idx'
    }
    if(req.body.id != null) {
        sql = 'SELECT * FROM user where id="'+req.body.id+'"'
    }
    console.log('sql === ', sql)
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
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

userModel.login = (req, callback) => {
    var sql = 'SELECT * FROM user where id="'+req.body.id+'" AND pw="'+req.body.pw+'"'    
    console.log('sql === ', sql)
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
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

userModel.GetIdxSelected = (req, callback) => {
    console.log('SELECT idx FROM user WHERE id="'+req.body.id+'" AND phone_num="'+req.body.phone_num+'"')
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    if (conn) {        
        conn.query('SELECT idx FROM user WHERE id="'+req.body.id+'" AND phone_num="'+req.body.phone_num+'"',
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

userModel.InsertNewRow = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    var sql = 'INSERT INTO user (id,name,phone_num,company,job_title,pw,level) VALUES("'    
                +req.body.id+'","'
                +req.body.name+'","'
                +req.body.phone_num+'","'
                +req.body.company+'","'
                +req.body.job_title+'","'
                +req.body.pw+'","'
                +req.body.level+'")'        
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

userModel.UpdateSelectedRow = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    var sql = 'UPDATE user SET id="'+req.body.id+'", name="'
                                                +req.body.name+'", phone_num="'
                                                +req.body.phone_num+'", company="'
                                                +req.body.company+'", job_title="'
                                                +req.body.job_title+'", pw="'
                                                +req.body.pw+'", level="'
                                                +req.body.level+'" WHERE idx="'
                                                +req.body.idx+'"'   
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

userModel.DeleteSelectedRow = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION
    if (conn) {
        conn.query('DELETE FROM user WHERE idx="'+req.body.idx+'"',
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


export default userModel