const express = require('express');
const router = express.Router();
const posts = require('../db/server.js');
// const notFound = require("./middlewares/notFound");

// Importiamo i dati

// INDEX
router.get('/', (req, res) => {
    res.json(posts); // restituisce tutti i post
});

// SHOW
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (!post) {
        res.status(404);
        return res.json({
            error: 'Not Found',
            message: 'Post non trovato'
        });
    }

    res.json(post);
});


//POST
router.post("/", (req, res) => {
    console.log(req.body);
    const newPostId = posts[posts.length - 1].id + 1;

    const newPost = {
        id: newPostId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    posts.push(newPost);
    console.log(posts);

    res.status(201).json(newPost);

})

//PUT
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (!post) {
        res.status(404);
        return res.json({
            error: 'Not Found',
            message: 'Post non trovato'
        });
    }

    post.title = req.body.name;
    post.image = req.body.image;
    post.content = req.body.ingredients;


    console.log(posts);
    res.json(post);

});


// DESTROY
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (!post) {
        res.status(404);
        return res.json({
            error: 'Not Found',
            message: 'Post non trovato'
        });
    }

    posts.splice(post, 1);
    console.log(posts); // stampiamo la lista aggiornata
    res.sendStatus(204); // nessun contenuto
});


// module.exports = notFound;
module.exports = router;
