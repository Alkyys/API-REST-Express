import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.get('/', async (req, res) => {
    const messages = await req.context.models.Message.find();
    return res.send(messages);
});

router.get('/:messageId', async (req, res) => {
    const message = await req.context.models.Message.findById(
        req.params.messageId,
    );
    return res.send(message);
});

router.post('/', async (req, res) => {
    const message = await req.context.models.Message.create({
        text: req.body.text,
        user: req.context.me.id,
    });

    return res.send(message);
});


router.delete('/:messageId', async (req, res) => {
    const message = await req.context.models.Message.findById(
        req.params.messageId,
    );

    let result = null;
    if (message) {
        result = await message.remove();
    }

    return res.send(result);
});

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User' },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
//export default router;