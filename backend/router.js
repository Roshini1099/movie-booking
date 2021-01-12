// now we can set the route path & initialize the API

import express from 'express';
import seatsController from './controller/seatsController'
const router = express.Router();


router.get('/api/currentSeats', seatsController.getCurentSeats);
router.post('/api/register', seatsController.usersignup);
router.post('/api/login', seatsController.userlogin)
router.post('/api/bookSeat', seatsController.doSeatbook);
module.exports = router;