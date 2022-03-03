const {Router} = require('express');
const config = require('config');
const Post = require('../models/Post');
const auth = require('../middleware/auth.middleware');
const router = Router();

// /api/post/
router.get('/', async (req, res) => {
  try {
    const post = await Post.find()
    res.status(200).json(post)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/post', auth, async () => {
  try {
      const posts = await Post.find({ posted: true});
  } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'});
  }
});

router.get('/:id', async (req, res) => {  
  try {
    const post = await Post.findById(req.params.id)
    console.log(post)
    res.status(200).json(post)
  } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'});
  }
});

router.post('/comment', async (req, res) => {
  try{
    const {postId, userName, userAvatar, text} = req.body;
    if(text) {
      await Post.findOneAndUpdate({_id: postId}, {$push: {comment:{userAvatar: userAvatar, userName: userName, text: text}}})
      res.status(201).json({ message: 'Комментарий добавлен!'});
    }
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'});
  }
});

router.get('/getcomments/:id', async (req, res) => {  
  try {
    const post = await Post.findById(req.params.id);
    console.log("COMMENTS:",post.comment)
    res.json(post.comment)
  } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'});
  }
});

module.exports = router;