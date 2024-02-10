import mongoose from "mongoose";

const LenderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    loans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "LenderLoan"
    }]
});

const Lender = mongoose.model("Lender", LenderSchema);

export default Lender;