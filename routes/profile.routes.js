const {Router} = require('express');
const auth = require('../middleware/auth.middleware');
const router = Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');



// /api/profile/post
router.post('/update', async (req, res) => {
    try {
        const {userId, changedField, newValue} = req.body;
        console.log("Update - userId:", userId,"changedField:", changedField,"newValue:", newValue)
        await User.updateOne({_id: userId}, {$set: {[changedField]: newValue}})
        .then(res.status(201).json({ message: 'Запись успешно обновлена' }))
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/updateAvatar', async(req, res) => {
    try{
        const {name, userId} = req.body;
        await User.updateOne({_id: userId}, {$set: {avatar: name}})

        res.status(201).json({ message: 'Запись успешно обновлена' })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/updatePassword', async(req,res) => {
    const {userId, oldPassword, password, confirmPassword} = req.body;
    const user = await User.findOne({ _id: userId});
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if(!isMatch) {
        return res.status(200).json({ message: 'Wrong password'});
    };

    errors = checkPassword(password, confirmPassword);

    if(errors) {
        return res.status(200).json({
            //Добавить вывод списка ошибок
            message: errors
        });
    };

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.updateOne({_id: user.id}, {$set: {password: hashedPassword}});
    res.status(201).json({ message: ''});
});

router.post('/updateUsername', async (req,res) => {
    const {userId, newUsername} = req.body;
    errors = checkLogin(newUsername);

    if(errors.length) {
        return res.status(201).json({   
            //Добавить вывод списка ошибок
            message: errors
        });
    };

    await User.updateOne({_id: userId}, {$set: {userName: newUsername}})
    .then(res.status(201).json(newUsername));
});

function checkValidData(login, password, confirmPassword){
    errors = [];

    message = checkLogin(login);
    if(message){
        errors.push(message);
    }
    message = checkPassword(password, confirmPassword);
    if(message){
        errors.push(message);
    }
    
    return errors
}

function checkLogin(login){
    message = '';
    if(!/^[a-zA-Z0-9]*$/.test(login)){
        message = "Username can contain only Latin letters and numbers";
    }
    else if(login.length < 8 || login.length > 30){
        message = "Username length must be from 8 to 30 characters";
    }
    
    return message;
}

function checkPassword(password, confirmPassword){
    message = '';
    if(!/^[a-zA-Z0-9]*$/.test(password)){
        message = "Password can contain only Latin letters and numbers";
    }
    else if(password !== confirmPassword){
        message = "Password and confirmed password do not match";
    }
    else if(password.length < 8 || password.length > 20){
        message = "Password length must be from 8 to 20 characters";
    }
    return message
}


module.exports = router;