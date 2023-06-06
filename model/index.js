const mongoose = require('mongoose');
module.exports = {
    User:mongoose.model('User', require('./user/usersModel')),
    Video: mongoose.model('Video', require('./video/videosModel')),
}