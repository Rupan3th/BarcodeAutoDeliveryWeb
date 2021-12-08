import mysql from "mysql";
import dbconfig  from "../config/database";


let versionsModel = {};

versionsModel.InsertUpload = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION    
    
    var sql = 'INSERT INTO versionlist (ver_num,org_name,size,filename,info,dir_path,full_name,upload_time) VALUES("'    
                +req.body.version+'","'
                +req.body.originalname+'","'
                +req.body.size+'","'
                +req.body.filename+'","'
                +req.body.info+'","'     
                +req.body.path+'","'           
                +req.body.path+req.body.filename+'",NOW())'   
                
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

versionsModel.getVersionInfo = (req, callback) => {
  const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION    
  console.log("request get getVersionInfo === ", req.body)
  
  var sql = 'SELECT * FROM versionlist WHERE filename="'   
              +req.body.filename+'"'   
              
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

versionsModel.getLastVersion = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION    
    console.log("request get getLastVersion === ", req.body)
    
    var sql = 'SELECT MAX(ver_num) AS "lastVersion" FROM versionlist'  
                
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


  versionsModel.ReqUpdate = (req, callback) => {
    const conn = mysql.createConnection(dbconfig.connection);//CREAMOS LA CONECCION    
    console.log("request get ReqUpdate === ", req.body)
    
    var sql = 'SELECT ver_num, filename, dir_path FROM versionlist WHERE ver_num = (SELECT MAX(ver_num) FROM versionlist)'  
                
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


export default versionsModel