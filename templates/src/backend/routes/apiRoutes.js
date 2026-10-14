const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/movies', apiController.getMovies);
router.get('/movies/:id', apiController.getMovieById);
router.get('/cinemas', apiController.getCinemas);
router.get('/showtimes', apiController.getShowtimes);
router.get('/snacks', apiController.getSnacks);
router.post('/vouchers/validate', apiController.validateVoucher);
router.post('/bookings/mock-confirm', apiController.mockConfirmBooking);
router.get('/health', apiController.healthCheck);

module.exports = router;
