const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require("bcrypt");

router.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    User.findOne({ email })
        .then((user) => {
            if (user) {
                res.status(400).send("email already taken");
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        res.send(err.message);
                    } else {
                        User.create({
                            username: username,
                            password: hash,
                            firstname: firstname,
                            lastname: lastname
                        })
                            .then((user) => {
                                var user = user
                                return chatkit.createUser({
                                    id: user.id,
                                    name: user.firstname
                                })
                                    .then(() => {
                                        return user
                                    })
                            })
                            .then((user) => {
                                let { email, username, firstname, lastname, id } = user;
                                console.log("customer successfully created in MongoDB and Chatkit")
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                            .catch((err) => {
                                res.send(err);
                            })
                    }
                })
            }
        })
        .catch((err) => {
            res.send(err)
        });
});



module.exports = router;