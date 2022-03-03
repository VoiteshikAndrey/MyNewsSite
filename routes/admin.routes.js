const {Router} = require('express');
const config = require('config');
const Post = require('../models/Post');
const auth = require('../middleware/auth.middleware');
const router = Router();

//TODO: добавить троеточие к разрешённым символам!


router.post('/post', async (req, res) => {

    const {title, image, text, shortDescription} = req.body;

    errors = checkPostValidData(title, text, shortDescription);

    if(errors.length) {
        return res.status(400).json({
            message: errors
        })

    }

    const post = new Post({ title: title, image: image, text: text, shortDescription: shortDescription});

    await post.save();

    return res.status(201).json(post);
     
});

router.post('/edit', async (req, res) => {

    const {title, image, text, shortDescription, postId} = req.body;

    errors = checkPostValidData(title, text, shortDescription);

    if(errors.length) {
        return res.status(400).json({
            //Добавить вывод списка ошибок
            message: errors
        })

    }

    await Post.updateOne({_id: postId}, {$set: {"title": title, "image": image, "text": text,
     "shortDescription": shortDescription}});

    res.status(201).json(postId);
});

router.post('/delete', async (req, res) => {
    const postId = req.body._id;
    
    await Post.deleteOne({_id : postId})
    res.status(201).json(postId);
});


router.get('/', auth, async () => {
    try {
        const posts = await Post.find({ posted: true});
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'});
    }
});

router.get('/:id', auth, async () => {  
    try {

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'});
    }
});

function checkTitle(title){
    message = '';
    if(!/[a-zA-Z0-9|\s|[.*+?:,;@="'`~№#<>%+\-!&^${}()]$/.test(title)){
        message = "Title can contain only Latin letters and numbers";
    }
    else if(title.length < 4 || title.length > 50){
        message = "Title length must be from 4 to 50 characters";
    }
    return message
}

function checkText(text){
    message = '';
    if(!/[a-zA-Z0-9|\s|[.*+?:,;@="'`~№#<>%+\-!&^${}()]$/.test(text)){
        message = "Text can contain only Latin letters and numbers";
    }
    else if(text.length < 15 || text.length > 10000){
        message = "Text length must be from 15 to 10000 characters";
    }
    return message
}

function checkShortDescription(shortDescription){
    message = '';
    if(!/[a-zA-Z0-9|\s|[.*+?:,;@="'`~№#<>%+\-!&^${}()]$/.test(shortDescription)){
        message = "Short description can contain only Latin letters and numbers";
    }
    else if(shortDescription.length < 15 || shortDescription.length > 10000){
        message = "Short description length must be from 10 to 40 characters";
    }
    return message
}

function checkPostValidData(title, text, shortDescription){
    errors = [];
    message = checkTitle(title);
    if(message){
        errors.push(message);
    }
    message = checkText(text);
    if(message){
        errors.push(message);
    }
    message = checkShortDescription(shortDescription);
    if(message){
        errors.push(message);
    }
    return errors;
}


module.exports = router;