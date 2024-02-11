import express from "express";
import User from "../Models/User.js";
import jwt from "jsonwebtoken";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import twilio from "twilio";

const client = new twilio(accountSid, authToken);

const authRouter = express.Router();
let OP;
authRouter.post("/signin", async (req, res) => {
    const { number } = req.body;
    try {
        const signinUser = await User.findOne({ phoneno: number });
        console.log(signinUser);
        if (!signinUser) {
            return res.status(400).json({ message: "User not found" });
        }
        
        let digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        console.log(OTP);
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