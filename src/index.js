import 'dotenv/config';
import cors from 'cors';
import express from 'express';



// acces a la variable d'environnement MY_SECRET
console.log(process.env.MY_SECRET);

//notre app utilise express
const app = express();
//notre app est proteger par cors
app.use(cors());

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

// notre app ecoute sur le port 3000
app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);
