import express from 'express';

const app = express()

const port = 3000
let users = [
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
    }
]

const checkAuthentication = (req, res, next ) => {
    const token = req.headers ['Authorization'];
    console.log(token !== undefined);
    if (token) {
        console.log("middleware to authentication" );
        req.user = token;
        next();
    } else {
        req.send("user chua login")
    }
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Day la may cua Nhi')
})

app.get('/users',checkAuthentication, (req, res) => {
    console.log(req.query);
    res.send(users)
})

app.get('/users/:id', (req, res) => { 
    console.log(req.params.id);
    const user = users.filter(user => user.id === parseInt(req.params.id)) 
    res.send(user)
})

app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        ...req.body
    };
    users.push(newUser);
    console.log('Post:', req.body);
    res.send(users)
});


app.put('/users/:id', (req, res) => {
    console.log('Put:', req.body);
    console.log("Change user Id", req.params.id);
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    if (userIndex !== -1) {
        users[userIndex] = { id: parseInt(req.params.id), ...req.body };
    } else {
        res.status(404).send('NOT FOUND!!');
    }
    res.send(users)
});


app.delete('/users/:id', (req, res) => {
    console.log("Delete user Id", req.params.id);
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
    } else {
        res.status(404).send('NOT FOUND!!');
    }
    res.send(users)
});


app.get('/users/hihi', (req, res) => {
    res.send('Hihi hihi ')
});



// const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
