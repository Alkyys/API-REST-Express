// let users = {
//     1: {
//         id: '1',
//         username: 'Robin Wieruch',
//     },
//     2: {
//         id: '2',
//         username: 'Dave Davids',
//     },
// };
//
// let messages = {
//     1: {
//         id: '1',
//         text: 'Hello World',
//         userId: '1',
//     },
//     2: {
//         id: '2',
//         text: 'By World',
//         userId: '2',
//     },
// };

import mongoose from 'mongoose';
import User from '../routes/user';
import Message from '../routes/message';

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true });
};

const models = { User, Message };

export { connectDb };

export default models;

// export default {
//     users,
//     messages,
// };