import { Router } from 'express';
import { isAuth } from '../middlewares';
import { reviewController } from '../controllers';

const router = Router();

// Review API endpoints
router.put('/:id', isAuth, reviewController.updateReview);
router.delete('/:id', isAuth, reviewController.deleteReview);



export default router