import express from 'express';
import { addCustomer, getCustomer } from '../controllers/customerController.js';

const router = express.Router();

router.post('/create_customer', addCustomer);
router.get('/create_customer/:id_customer', getCustomer)

export default router;