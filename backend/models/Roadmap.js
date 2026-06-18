const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema({
    role: String,
    skills: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model("Roadmap", roadmapSchema);