const express = require("express");
const authRouter = express.Router();
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

let OTP, user, signinUser;
authRouter.post("/signin", async (req, res) => {
    const { number } = req.body;
    try {
        const signinuser = await User.findOne({ number });
        if (!signinUser) {
            return res.status(400).json({ message: "User not found" });
        }
        
        let digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }

        await client.messages.create({
            body: `Your OTP is ${OTP}`,
            messagingServiceSid: "MGf6e6f5f6d6d6d6d6d6d6d6d6d6d6d6d6",
            to: `+91${number}`
        })
        .then(message => res.status(200).json({ message: "OTP sent successfully" })).done();        ;
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

authRouter.post("/verify", async (req, res) => {
    const { otp } = req.body;
    if (otp == OTP) {
        const token = jwt.sign({ number: signinUser.number }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ message: "OTP verified successfully", token });
    }
    else {
        res.status(400).json({ message: "Invalid OTP" });
    }
}
);

export default authRouter;