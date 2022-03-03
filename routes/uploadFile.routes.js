const {Router} = require('express');
const router = Router();
const fileMiddleware = require('../middleware/file');
const uploadAvatar = require('../middleware/uploadAvatar');

router.post('/upload', fileMiddleware.single('image'), (req, res) => {
    try {
        if (req.file) {
            res.json(req.file);
        }
    } catch (err) {
        res.status(404).json({ message: "Загрузка не произошла" });
    }
    
});

router.post('/uploadAvatar', uploadAvatar.single('image'), (req, res) => {
    try {
        if (req.file) {
            res.json(req.file);
        }
    } catch (err) {
        res.status(404).json({ message: "Загрузка не произошла" });
    }
    
});


router.post('/image', (req, res) => {
    console.log(req.files);
    req.files.mv('images/');    
});




router.get('/getImg', (req, res) => {
    try {
        const fileName = './images/' + req.body;
        res.sendFile(fileName)
    } catch (err) {
        res.status(404).json({ message: "Изображение не загружено" });
    }
})

module.exports = router;