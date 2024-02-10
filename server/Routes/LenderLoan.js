import express from "express";
import {getLoansbyLender, createLenderLoan, updateLenderLoan, deleteLenderLoan} from "../Controllers/LenderLoan.js";

const router = express.Router();

router.get('/:id', getLoansbyLender);
router.post('/', createLenderLoan);
router.patch('/:id', updateLenderLoan);
router.delete('/:id', deleteLenderLoan);

export default router;

