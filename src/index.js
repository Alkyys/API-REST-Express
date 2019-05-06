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

//boolen pour remettre a zero la db
const eraseDatabaseOnSync = true;

connectDb().then(async () => {
    if (eraseDatabaseOnSync) {
        await Promise.all([
            models.User.deleteMany({}),
            models.Message.deleteMany({}),
        ]);
        createUsersWithMessages();
    }
    // notre app ecoute sur le port 3000
    app.listen(process.env.PORT, () =>
        console.log(`Example app listening on port ${process.env.PORT}!`),
    );
});

const createUsersWithMessages = async () => {
    const user1 = new models.User({
        username: 'rwieruch',
    });

    const user2 = new models.User({
        username: 'ddavids',
    });

    const message1 = new models.Message({
        text: 'Published the Road to learn React',
        user: user1.id,
    });

    const message2 = new models.Message({
        text: 'Happy to release ...',
        user: user2.id,
    });

    const message3 = new models.Message({
        text: 'Published a complete ...',
        user: user2.id,
    });

    await message1.save();
    await message2.save();
    await message3.save();

    await user1.save();
    await user2.save();
};

// acces a la variable d'environnement MY_SECRET
console.log(process.env.MY_SECRET);