import express from 'express';

import { getMarket, createMarket, updateMarket, deleteMarket } from '../Controllers/Market.js';

const router = express.Router();

router.get('/', getMarket);
router.post('/', createMarket);
router.patch('/:id', updateMarket);
router.delete('/:id', deleteMarket);

export default router;
