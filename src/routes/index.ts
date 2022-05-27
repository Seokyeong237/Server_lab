//router index file
import { Router } from 'express';
import ReviewRouter from './ReviewRouter';
import UserRouter from './UserRouter';

const router = Router();

// use: 해당 엔드포인트로 들어오는 모든 요청
router.use('/user', UserRouter);
router.use('/review', ReviewRouter);

export default router;
