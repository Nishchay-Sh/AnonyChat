const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },

    publicKey: {
        type: String,
        unique: true
    },

    privateKey: {
        type: String,
        unique: true
    },

    passwordHash: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        default: ''
    },

    accountStatus: {
        type: String,
        default: 'Busy'
    },

    isOnline: {
        type: Boolean,
        default: false
    },

    friendsKeys: [],

    blockedUsersKeys: [],

    encryptionKeys: {
        type: Map,
        of: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

userSchema.index({ username: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
