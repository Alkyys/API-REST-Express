import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from '../routes';

import models, {connectDb} from '../models';


//notre app utilise express
const app = express();
//notre app est proteger par cors
app.use(cors());
//on va utiliser body parser
//body-parser sert a extraire les entiter de body dans les requetes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//mes routes
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

//custom Express middleware
app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1],
    };
    next();
});

// les routes de root pour test
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

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
    if (eraseDatabaseOnSync) {
        await Promise.all([
            models.User.deleteMany({}),
            models.Message.deleteMany({}),
        ]);

    }
    // notre app ecoute sur le port 3000
    app.listen(process.env.PORT, () =>
        console.log(`Example app listening on port ${process.env.PORT}!`),
    );
});


// acces a la variable d'environnement MY_SECRET
console.log(process.env.MY_SECRET);