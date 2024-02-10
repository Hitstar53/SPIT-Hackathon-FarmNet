import mongoose from "mongoose";

const UserLoanSchema = new mongoose.Schema({
    user :{
        type:  mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    profile:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"

    },
    amount: {
        type: Number,
        required: true,
    },
    interest: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    emi: {
        type: Number,
        required: true,
    },
    paid: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    givenby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lenders"
    }
});

const UserLoan = mongoose.model("UserLoan", UserLoanSchema);

export default UserLoan;
