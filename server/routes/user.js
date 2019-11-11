const express = require('express');
const router = express.Router();
const User = require("../models/user")

router.get("/getuser", (req, res, next) => {
    User.find({})
        .then((users) => {
            res.status(200).json(users)
        })
        .catcn((err) => {
            next(createError(500))
        })
})

module.exports = router