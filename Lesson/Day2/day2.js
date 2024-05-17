const express = require('express') //thư viện đã cài đặt ban đầu npm init... ->dependence 
const app = express()
const port = 3000
const users = [
    {
        id: 1,
        name: 'Anna',
        age:22
    },
    {
        id: 2,
        name: 'Belle',
        age:22
    },
    {
        id: 3,
        name: 'Cindy',
        age:25
    },
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', (req, res) => {
    console.log(req.query);
    users.sort((a,b) => b.id - a.id)
    res.send(users)
})

app.get('/users/:id', (req, res) => {   //  / hiện trên url  /: thế vào giá trị tương ứng
    console.log(req.params.id);
    const user = users.filter(user => user.id === parseInt(req.params.id))   // vi id request dang ở dạng string
    res.send(user)
})

app.get('/users/:id/hihi/:haha', (req, res) => {   //  / hiện trên url  /: thế vào giá trị tương ứng
    console.log(req.params);
    // users.filter(user => user.id == res)
    res.send(users)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})