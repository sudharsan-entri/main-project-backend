import { Router } from 'express';
import { adminLogin } from '../controllers/adminAuth.js';
const router = Router();
router.post('/login', adminLogin);
export default router;
