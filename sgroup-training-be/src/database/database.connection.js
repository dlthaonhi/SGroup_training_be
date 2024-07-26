 import mysql from 'mysql2/promise'

// const conn  = mysql.createConnection({
// 	host: "localhost",
// 	user: "root",
// 	password:  "",
// 	database: "sgroupnew"
// });

// conn.query("SELECT * FROM users", (err, rows ) => {
// 	if (err) throw err;
// 	console.log(rows);
// })

// Get the client

// Create the connection to database
const dbConfig= ({
  host: 'localhost',
  user: 'root',
  port: 3306,
  database: 'sgroupnew',
});

// A simple SELECT query
// connection.query(
//   'SELECT * FROM `users`',
//   function (err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );


const pool = mysql.createPool(dbConfig);

export default pool;