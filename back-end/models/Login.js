const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    f_sno: { 
        type: String, 
    },
    f_userName: { 
        type: String, 
        required: true,
        unique: true 
    },
    f_Pwd: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('Login', loginSchema);