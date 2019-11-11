const express = require('express');
const router = express.Router();
const Friend = require("../models/friend");

//update friends list 
router.post("/addfriend", (req, res, next) => {
    const friend = mongoose.Types.ObjectId(req.body.friendId)
    const user = req.body.userId
    User.findByIdAndUpdate(
        user,
        { $push: { friendlist: friend } },
        { new: true }
    )
        .then((friend) => {
            debugger
            console.log(friend);
        })
        .catch((err) => {
            console.log(err);
        })
})