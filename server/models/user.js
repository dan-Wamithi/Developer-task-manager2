const mongoose = require("mongoose");

const userSchema = new mongoose.userSchema({
    email: {type:String, required: true, unique:true },
    password:{type: String, required: true},
    role:{type: String, enum:['Developer', "admin"], default: "developer"}
});

module.exports= mongoose.model("user", userSchema);