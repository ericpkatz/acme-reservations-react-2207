const router = require('express').Router();
const { User, Reservation, Restaurant } = require('../db');

module.exports = router;


router.get('/users', async(req, res, next)=> {
  try {
    res.send(await User.findAll());
  }
  catch(ex){
    next(ex);
  }
});

router.get('/restaurants', async(req, res, next)=> {
  try {
    res.send(await Restaurant.findAll());
  }
  catch(ex){
    next(ex);
  }
});

router.get('/reservations', async(req, res, next)=> {
  try {
    res.send(await Reservation.findAll());
  }
  catch(ex){
    next(ex);
  }
});
