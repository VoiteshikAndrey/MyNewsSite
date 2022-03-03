const express = require('express');
// var fileUpload = require('express-fileupload');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.json({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/post', require('./routes/post.routes'));
app.use('/api/profile', require('./routes/profile.routes'));
app.use('/api', require('./routes/uploadFile.routes'));

const PORT = config.get('port') || 3000;

async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'), {

        });
    app.listen((PORT)
    // , () => console.log(`App has been started on port: ${PORT}...`)
    );

    } catch(e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }

}

start();

module.exports = app