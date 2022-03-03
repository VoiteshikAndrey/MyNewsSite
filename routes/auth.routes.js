//Добавить вывод списка ошибок строка 23

//Перенести проверку на повтор логина в checkValidData строка 34


const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator')
const User = require('../models/User');
const router = Router();


// /api/auth/register
router.post('/register', async (req, res) => {
    try {

        //console.log('Body auth:', req.body);

        errors = checkValidData(req.body.login, req.body.password, req.body.confirmPassword);

        if(errors.length) {
            return res.status(400).json({
                //Добавить вывод списка ошибок
                message: errors
            })
        }
        
        const {login, password} = req.body;

        //Перенести в checkValidData
        const candidate = await User.findOne({login: login});

        if(candidate) {
            return res.status(400).json({message: "Login already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ login: login, password: hashedPassword, userName: login })

        await user.save();

        console.log(user);

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )
        // res.status(201).json({ message: 'Создано'});
        res.status(202).json({ token: token, userId: user.id, role: user.role, userName: user.userName, userAvatar: user.avatar});
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'});
    }

});

        
// /api/auth/login
router.post('/login', async (req, res) => {
    try {
                
        const {login, password} = req.body;

        const user = await User.findOne({ login: login});

        if(!user) {
            return res.status(400).json({ message: 'User is not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ message: 'Wrong password' })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )
        
        //console.log("Role:", user.role, "Token:", token, "User:", user.id, "UserName:", user.userName) 
        
        // res.status(200).json({ message: "Зашли в аккаунт"});
        res.json({ token: token, userId: user.id, role: user.role, userName: user.userName, userAvatar: user.avatar});

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
    }

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
        message = "Login can contain only Latin letters and numbers";
    }
    else if(login.length < 8 || login.length > 30){
        message = "Login length must be from 8 to 30 characters";
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
// module.exports = {
//     checkPassword: checkPassword,
//     checkValidData: checkValidData,
// }
