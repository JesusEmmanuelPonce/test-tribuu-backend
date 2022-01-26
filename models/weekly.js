const mongoose = require("mongoose");

const weeklySchema = mongoose.Schema({
    initDay: {
        type: Date,
        default: Date.now
    },
    lastDay: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Weekly", weeklySchema);
