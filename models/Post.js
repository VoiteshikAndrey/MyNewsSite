const {Schema, model} =  require('mongoose');
const moment= require('moment');

const schema = new Schema({
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    text: {type: String, required: true},
    image: {type: String, required: true},
    date: {type: String, default: moment().format('MMMM Do YYYY, h:mm a')},
    posted: {type: Boolean, default: true},
    comment: {type: [{
        userName: {type: String, required: true},
        userAvatar: {type: String, required: true},
        text: {type: String, required: true},
        date: {type: Date, required: true}
    }]}
})

module.exports = model('Post', schema); 