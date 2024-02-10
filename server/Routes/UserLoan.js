import express from 'express';
import {getAllUserLoans,getUserLoans, createUserLoan, updateUserLoan, deleteUserLoan} from '../Controllers/UserLoan.js';

const router = express.Router();

router.get('/', getAllUserLoans);
router.get('/:id', getUserLoans);
router.post('/', createUserLoan);
router.patch('/:id', updateUserLoan);
router.delete('/:id', deleteUserLoan);

export default router;
