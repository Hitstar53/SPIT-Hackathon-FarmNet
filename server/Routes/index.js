import express from "express";
import userRouter from "./User.js"
import profileRouter from "./Profile.js"
import userLoanRouter from "./UserLoan.js"
import loansRouter from "./Loans.js"
import lenderRouter from "./Lender.js"
import lenderloanRouter from "./LenderLoan.js"
import givenLoanRouter from "./GivenLoans.js"
import marketRouter from "./Market.js"
import authRouter from "./auth.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/profile", profileRouter);
router.use("/userLoan", userLoanRouter);
router.use("/loans", loansRouter);
router.use("/lender", lenderRouter);
router.use("/lenderLoan", lenderloanRouter);
router.use("/givenLoan", givenLoanRouter);
router.use("/market", marketRouter);
router.use("/auth", authRouter);

export default router;
