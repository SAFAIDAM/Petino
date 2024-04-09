import express from 'express';
import * as serviceController from '../controllers/serviceController.js';

const router = express.Router();

router.get('/', serviceController.getAllServices);
router.post('/', serviceController.createService);
router.delete('/:id', serviceController.deleteService);
router.put('/:id', serviceController.updateService);
router.put('/:serviceId/rating', serviceController.rateService); // Route for rating a service
router.get('/:serviceId/averageRating', serviceController.getAverageRating); // Route for fetching average rating

export default router;
