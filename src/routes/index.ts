// routes/index.ts
import { Router } from 'express';
import userRoute from './userRoute';
import booksRoute from './bookRoute';
import reviewRoute from "./reviewRoute"

const router = Router();

// Register routes
router.use('/users', userRoute);
router.use('/books', booksRoute);
router.use('/review', reviewRoute);


export default router;