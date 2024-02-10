import express from "express";
import userRouter from "./User.js"
import profileRouter from "./Profile.js"
import userLoanRouter from "./UserLoan.js"
import lenderRouter from "./Lenders.js"
import lenderloanRouter from "./LenderLoan.js"
import givenLoanRouter from "./GivenLoans.js"

const router = express.Router();

router.use("/user", userRouter);
router.use("/profile", profileRouter);
router.use("/userLoan", userLoanRouter);
router.use("/lender", lenderRouter);
router.use("/lenderLoan", lenderloanRouter);
router.use("/givenLoan", givenLoanRouter);


export default router;
