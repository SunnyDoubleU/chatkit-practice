var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    password: {
        type: String
    },
    friendlist: [
        {
            type: mongoose.Types.ObjectId,
            ref: "user"
        }
    ]
});

const User = mongoose.model("user", userSchema);

module.exports = User;