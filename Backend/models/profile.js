const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
    Gender: {
        type: String,
        required: false, // Make this optional
    },
    DOB: {
        type: String,
        required: false, // Make this optional
    },
    About: {
        type: String,
        required: false, // Make this optional
        trim: true
    }
    
});

module.exports = mongoose.model("Profile", ProfileSchema);
  