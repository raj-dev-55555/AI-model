const mongoose = require("mongoose");

const BlacklistSchema = new mongoose.Schema({
        token:{
            type:String,
        },
})

const BlackList = mongoose.model("BlackList",BlacklistSchema)

module.exports = BlackList