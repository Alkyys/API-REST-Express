import mongoose from 'mongoose';
import User from '../routes/user';
import Message from '../routes/message';

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL,{
        useCreateIndex: true,
        useNewUrlParser: true
    });
};

const models = { User, Message };

export { connectDb };

export default models;
