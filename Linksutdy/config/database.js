/**
 * Database 정보기록
 * 주의사항! DB를 변경하면 꼭 table을 생성하고 확인해줄 것!
 *
 */

const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: 3306,
  database: "nodejs_DB"
});

conn.connect();
module.exports = conn;