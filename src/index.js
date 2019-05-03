import uuidv4 from 'uuid/v4';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';


// acces a la variable d'environnement MY_SECRET
console.log(process.env.MY_SECRET);

//notre app utilise express
const app = express();
//notre app est proteger par cors
app.use(cors());
//on va utiliser body parser
//body-parser sert a extraire les entiter de body dans les requetes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//mes users
let users = {
    1: {
        id: '1',
        username: 'Robin Wieruch',
    },
    2: {
        id: '2',
        username: 'Dave Davids',
    },
};

let messages = {
    1: {
        id: '1',
        text: 'Hello World',
        userId: '1',
    },
    2: {
        id: '2',
        text: 'By World',
        userId: '2',
    },
};

// les routes de express
app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});

app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
});

//routes users
app.get('/users', (req, res) => {
    return res.send(Object.values(users));
});

app.post('/users', (req, res) => {
    return res.send('POST HTTP method on user resource');
});

//routes user/id
app.get('/users/:userId', (req, res) => {
    return res.send(users[req.params.userId]);
});

app.put("/users/:userId", (req, res) => {
    return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

app.delete('/users/:userId', (req, res) => {
    return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

//custom Express middleware
app.use((req, res, next) => {
    req.me = users[1];
    next();
});

//route message
app.get('/messages', (req, res) => {
    return res.send(Object.values(messages));
});

app.get('/messages/:messageId', (req, res) => {
    return res.send(messages[req.params.messageId]);
});

app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
        id,
        text: req.body.text,
        userId: req.me.id,
    };

    messages[id] = message;

    return res.send(message);
});


// notre app ecoute sur le port 3000
app.listen(process.env.PORT, () =>
    console.log(`Super mon app tourne sur le port: ${process.env.PORT} !`),
);
