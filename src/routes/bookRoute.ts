import { Router } from 'express';
import { bookController, reviewController } from '../controllers/index';
import { isAuth } from '../middlewares';

const router = Router();

// Book API endpoints
router.post('/', isAuth, bookController.add);
router.get('', bookController.get);
router.get('/search', bookController.searchBook);
router.get('/:id', bookController.getBookById);
router.post('/:id/reviews', isAuth, reviewController.submitReview);



export default router