import { Router } from 'express';
import Geocode from '../models/geocode';

const router = Router();


// router.get('/:routeId', (req, res) => {
//   Geocode.find({routeId: req.params.routeId == 'home' ? 'office' : req.params.routeId}, (error, result) => {
//     res.send(result);
//   })
// });

router.get('/office', (req, res) => {
  Geocode.find({routeId: 'office'}, (error, result) => {
    res.send(result);
  })
});

router.get('/lunch', (req, res) => {
  Geocode.find({routeId: 'lunch'}, (error, result) => {
    res.send(result);
  })
});

router.get('/home', (req, res) => {
  Geocode.find({routeId:'home'}, (error, result) => {
    res.send(result);
  })
});

export default router;
