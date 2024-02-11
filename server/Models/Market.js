import mongoose from 'mongoose';

const marketSchema = new mongoose.Schema({
    userid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    cropname: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },

});

const Market = mongoose.model('Market', marketSchema);

export default Market;