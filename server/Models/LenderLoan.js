import mongoose from "mongoose";

const LenderLoanSchema = new mongoose.Schema({
    lender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lender",
    },
    interest: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    emi: {
        type: Number,
        required: true,
    },
});

const LenderLoan = mongoose.model("LenderLoan", LenderLoanSchema);

export default LenderLoan;