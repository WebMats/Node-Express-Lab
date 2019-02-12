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
        if (!result) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(200).json(result);
        }
    }).catch((err) => {
        console.log(err)
        throw err
    });
})







module.exports = router;