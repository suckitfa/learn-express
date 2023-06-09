const mongoose = require('mongoose');
module.exports = {
    User:mongoose.model('User', require('./user/usersModel')),
    Video: mongoose.model('Video', require('./video/videosModel')),
    Subscribe: mongoose.model('SubScribe', require('./subscribe/subscribeModel')),
}