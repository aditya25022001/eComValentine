import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { getProductById, getProducts, addReview, getTopProducts } from '../controllers/productController.js';

const router = express.Router()

router.route('/').get(getProducts)

router.route('/:id').get(getProductById)

router.route('/:id/review').post(protect, addReview)

router.route('/top').get(getTopProducts)

export default router;
