const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{type: String, required:true },
    description: String,
    completeed:{type: Boolean, default: false},
    owner:{ type : mongoose.Schema.Types.ObjectId, ref: "user", required: true }
});

module.export = mongoose.model("Task", taskSchema);