import { Router } from 'express';

const router = Router();


router.get('/:routeId', (req, res) => {
  return res.send(req.context.models.geocode[req.params.routeId]);
});

router.post('/', (req, res) => {
  console.log(req);
  const geocode = {
    geocode: req.body.cordinates,
    route: req.body.route
  };

  req.context.models.geocode[req.body.route] = geocode;

  return res.send(geocode);
});

export default router;
