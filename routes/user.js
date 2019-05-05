import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.users));
});

router.get('/:userId', (req, res) => {
    return res.send(req.context.models.users[req.params.userId]);
});

router.put("/users/:userId", (req, res) => {
    return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

router.delete('/users/:userId', (req, res) => {
    return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
});

userSchema.statics.findByLogin = async function (login) {
    let user = await this.findOne({
        username: login,
    });

    if (!user) {
        user = await this.findOne({ email: login });
    }

    return user;
};

userSchema.pre('remove', function(next) {
    this.model('Message').deleteMany({ user: this._id }, next);
});

const User = mongoose.model('User', userSchema);

export default User;
// export default router;