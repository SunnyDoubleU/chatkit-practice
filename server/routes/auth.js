const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require("bcrypt");


router.post("/signup", (req, res, next) => {
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
                            email: email,
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
                                        debugger
                                        return user
                                    })
                            })
                            .then((user) => {
                                let { email, firstname, lastname, id } = user;
                                let sessionData = { email, firstname, lastname, id }
                                debugger
                                res.json(sessionData)
                                console.log("user successfully created in MongoDB and Chatkit")
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


router.post("/login", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email })
        .then((user) => {
            debugger
            if (user) {
                bcrypt.compare(password, user.password,
                    (error, equal) => {
                        if (equal) {
                            let { email, firstname, lastname, id } = user;
                            let sessionData = { email, firstname, lastname, id }
                            debugger
                            console.log("user logged in ")
                            res.json(sessionData)
                        } else if (!equal) {
                            console.log("email or password incorrect!")
                        } else {
                            console.log(error)
                        }
                    })
            }
        })
        .catch((error) => {
            console.log(error);
        })
})

router.get("/logout", (req, res) => {
    res.send("log out successful")
})

module.exports = router;