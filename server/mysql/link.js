/*
 * @Description: 
 * @Author: 笙痞77
 * @Date: 2023-04-06 10:51:17
 * @LastEditors: 笙痞77
 * @LastEditTime: 2023-04-06 10:57:38
 */
import mysql2 from "mysql2"
import express from "express"
import log4js from "log4js"

const app = express()
const logger = log4js.getLogger("mysqlErr")

const options = {
  host: "114.215.147.166", // 主机名
  port: '3310',
  user: 'root', // 数据库用户名
  password: 'QWer!@34$%',
  database: "cim-cloud" // 数据库名称
}

let db;
const handeError = (err) => {
  logger.error("mysql connect error:", err)
  if (err) {
    // 断开重连
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code == 4031) {
      connect();
    } else {
      console.log(err.stack || err)
    }
  }
}

const connect = () => {
  db = mysql2.createConnection(options)
  db.connect(handeError)
  db.on('error', handeError)
}

connect()

log4js.configure({
  appenders: {
    access: {
      type: 'file',
      filename: 'mysql-err.log',
    }
  },
  categories: { default: { appenders: ["access"], level: "error" } }
})
app.use(log4js.connectLogger(log4js.getLogger("access"), {
  level: 'auto'
}))

export default db;