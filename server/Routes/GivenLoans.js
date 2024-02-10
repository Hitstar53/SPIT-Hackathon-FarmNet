import express from 'express';
import {getLoansbyLender, createGivenLoan, updateGivenLoan, deleteGivenLoan} from "../Controllers/GivenLoans.js";

const router = express.Router();

router.get('/:id', getLoansbyLender);
router.post('/', createGivenLoan);
router.patch('/:id', updateGivenLoan);
router.delete('/:id', deleteGivenLoan);

export default router;
