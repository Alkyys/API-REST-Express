import models from '../models';
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

//custom Express middleware
app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1],
    };
    next();
});

//session
app.get('/session', (req, res) => {
    return res.send(req.context.models.users[req.context.me.id]);
});

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
    return res.send(Object.values(req.context.models.users));
});

app.post('/users', (req, res) => {
    return res.send('POST HTTP method on user resource');
});

//routes user/id
app.get('/users/:userId', (req, res) => {
    return res.send(req.context.models.users[req.params.userId]);
});

app.put("/users/:userId", (req, res) => {
    return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

app.delete('/users/:userId', (req, res) => {
    return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});



//route message
app.get('/messages', (req, res) => {
    return res.send(Object.values(req.context.models.messages));
});

app.get('/messages/:messageId', (req, res) => {
    return res.send(req.context.models.messages[req.params.messageId]);
});

app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
        id,
        text: req.body.text,
        userId: req.context.me.id,
    };

    req.context.models.messages[id] = message;

    return res.send(message);
});

app.delete('/messages/:messageId', (req, res) => {
    const {
        [req.params.messageId]: message,
        ...otherMessages
    } = req.context.models.messages;

    req.context.models.messages = otherMessages;

    return res.send(message);
});


// notre app ecoute sur le port 3000
app.listen(process.env.PORT, () =>
    console.log(`Super mon app tourne sur le port: ${process.env.PORT} !`),
);
