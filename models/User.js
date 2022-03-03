const {Schema, model} =  require('mongoose');

const schema = new Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    userName: {type: String, required: true},
    role: {type: String, default: 'user'},
    avatar: {type: String, required: true, default: 'default_user.png'},
});

module.exports = model('User', schema);