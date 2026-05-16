const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const User = new Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Le nom est requis']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Le mail est requis'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Le mot de passe est requis'],
        minlength: [6, 'Le mot de passe doit faire au moins 6 caractères']
    }
}, {
    timestamps: true
});


User.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', User);