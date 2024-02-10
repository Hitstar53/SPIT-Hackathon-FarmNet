import mongoose from "mongoose";

const GivenLoansSchema = new mongoose.Schema({
    lender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lender",
    },
    borrower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
});

const GivenLoans = mongoose.model("GivenLoans", GivenLoansSchema);

export default GivenLoans;