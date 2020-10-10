const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    createdEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event' // the model name you want to let mongoose know which relation
        }
    ]
});

module.exports = mongoose.model('User', userSchema);