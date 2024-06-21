// import express from 'express';
// import fs from 'fs';
// import router from './apis/users/user.router';
// // const express = require('express');
// const app = express();
// const port = 3000;
// app.use(express.json());

//////////////////////////////////////////
import express from 'express';
import fs from 'fs';
import routers from './apis/index.js';
import connection from './database/database.connection.js';
const app = express()
app.use(express.json())

app.use('/api', routers);


const port = process.env.PORT || 3000

// const checkAuthentication = (req, res, next ) => {
//     const token = req.headers ['authorization'];
//     console.log(token !== undefined);
//     if (token) {
//         console.log("middleware to authentication" );
//         req.user = token;
//         next();
//     } else {
//         res.send("user chua login")
//     }
// }

app.use(express.json());

// app.get('/users', (req, res) => {
//     console.log("Get users: ");
//     // console.log(users);c
//     // res.send(users)
//     return res.sendStatus(200)
// })

// app.get('/users/:id', (req, res) => { 
//     console.log(req.params.id);
//     const user = users.filter(user => user.id === parseInt(req.params.id)) 
//     res.send(user)
// })

// app.post('/users', (req, res) => {
//     const newUser = {
//         id: users.length + 1,
//         ...req.body
//     };
//     users.push(newUser);

//     writeUsers(users);

//     console.log('Post:', req.body);
//     res.send(users)
// });


// app.put('/users/:id', (req, res) => {
//     console.log('Put:', req.body);
//     console.log("Change user Id", req.params.id);
//     const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
//     if (userIndex !== -1) {
//         users[userIndex] = { id: parseInt(req.params.id), ...req.body };
//         writeUsers(users);
//         res.send(users);
//     } else {
//         res.status(404).send('NOT FOUND!!');
//     }
//     res.send(users)
// });


// app.delete('/users/:id', (req, res) => {
//     console.log("Delete user Id", req.params.id);
//     const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
//     if (userIndex !== -1) {
//         users.splice(userIndex, 1);
//         writeUsers(users);
//         res.send(users);
//     } else {
//         res.status(404).send('NOT FOUND!!');
//     }
//     res.send(users)
// });


// A simple SELECT query
// connection.query(
//     'SELECT * FROM `users`',
//     function (err, results, fields) {
//         if(err) {
//             console.log("error", err);
//         }
//       console.log(results); // results contains rows returned by server
//       console.log(fields); // fields contains extra meta data about results, if available
//     }
//   );
// const port = process.env.PORT || 3000

// (async() => {
//     try{
//         await connection.getConnection();
//         console.log("database connect success")
//     }catch(error){
//         console.log(error)
//     }
// })()
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})


