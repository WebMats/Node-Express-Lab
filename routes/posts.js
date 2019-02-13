const express = require('express');
const db = require('../data/db');

const router = express.Router();


router.get('', (req, res, next) => {
    db.find().then((result) => {
        if (!result) {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        } else {
            res.status(200).json(result);
        }
    }).catch((err) => {
        console.log(err)
        throw err
    });
})

router.get('/:id', (req, res, next) => {
    db.findById(req.params.id).then((result) => {
        if (!result.length > 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(200).json(result);
        }
    }).catch((err) => {
        console.log(err)
        throw err
    });
})

router.post('', (req, res, next) => {
    const { title, contents } = req.body
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db.insert({title, contents}).then((result) => {
            if (!result) {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            } else {
                db.findById(result.id).then((post) => {
                    res.status(201).json(post)
                }).catch((err) => {
                    console.log(err)
                    throw err
                });
            }
        }).catch((err) => {
            console.log(err)
            throw err
        });
    }
})

router.delete('/:id', (req, res, next) => {
    db.findById(req.params.id).then((result) => {
        if (!result.length > 0 ) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            db.remove(req.params.id).then((num) => {
                if (num < 1) {
                    res.status(500).json({ error: "The post could not be removed" })
                } else{
                    res.status(201).json(num)
                }
            }).catch((err) => {
                console.log(err)
                throw err
            });
        }
    }).catch((err) => {
        console.log(err)
        throw err
    });
})

router.put('/:id', (req, res, next) => {
    const { title, contents } = req.body
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db.findById(req.params.id).then((result) => {
            if (!result.length > 0 ) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                db.update(req.params.id, {title, contents}).then((num) => {
                    if (num < 1) {
                        res.status(500).json({ error: "The post information could not be modified." })
                    } else{
                        db.findById(req.params.id).then((updatedPost) => {
                            res.status(200).json(updatedPost)
                        }).catch((err) => {
                            console.log(err)
                            throw err
                        });
                    }
                }).catch((err) => {
                    console.log(err)
                    throw err
                });
            }
        })
    }

})







module.exports = router;