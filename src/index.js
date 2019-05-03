import 'dotenv/config';
import cors from 'cors';
import express from 'express';



// acces a la variable d'environnement MY_SECRET
console.log(process.env.MY_SECRET);

//notre app utilise express
const app = express();
//notre app est proteger par cors
app.use(cors());

// une route de express
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// notre app ecoute sur le port 3000
app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);
