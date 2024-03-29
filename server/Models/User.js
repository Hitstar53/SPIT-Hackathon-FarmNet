import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    aadhar:{
        type: String,
        required: true,
        unique: true
    },
    phoneno:{   
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
    aadharimg:{
        type: String,
        required: true
    },
    profileimg:{
        type: String,
        required: true
    },
})

const User = mongoose.model('users', userSchema);

export default User;