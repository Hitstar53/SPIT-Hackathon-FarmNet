import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    aadhar: {
        type: String,
        required: true,
        unique: true,
    },
    landSize: {
        type: Number,
        required: true,
    },
    avgyeild: {
        type: Number,
        required: true,
    },
    crops: {
        type: [String],
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    soiltype: {
        type: String,
        required: true,
    },
    loans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserLoan",
    }],
    address:{
        type: String,
        required: true,
    },

});

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;