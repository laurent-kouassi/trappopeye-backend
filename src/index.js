import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models, { connectDb } from './models';
import routes from './routes';

import websockets from '../src/websockets';

const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware

app.use((req, res, next) => {
  req.context = {
    models
  };
  next();
});

// * Routes * //
app.use('/', routes);

// * Start * //
const eraseDatabaseOnSync = true;
const port = process.env.PORT || 5001;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.Geocode.deleteMany({}),
    ]);

     seedGeocode(); // insert geocode to db
  }

  const server = app.listen(process.env.PORT, () =>
    // console.log(`App listening on port ${process.env.PORT}`),
    process.send(`Server running at http://localhost:${port}\n\n`)
  );

  websockets(server);
});

const seedGeocode = async () => {
  const geo_lunch = JSON.stringify(JSON.parse('../src/data/lunch.geojson'));
  const geo_office = JSON.stringify(JSON.parse('../src/data/popeye-village-balluta.geojson'));

  const lunchRoute = geo_lunch.features[0].geometry;
  const officeRoute = geo_office.features[0].geometry;
  // for (let index = 0; index < lunchRoute.length; index++) {
    // const insertGeo = geo[index];

    const geocode_lunch = new models.Geocode({
      routeId: 'lunch',
      coordinates: lunchRoute.coordinates
    });

    const geocode_office = new models.Geocode({
      routeId: 'office',
      coordinates: officeRoute.coordinates
    });

    const geocode_home = new models.Geocode({
      routeId: 'home',
      coordinates: officeRoute.coordinates.reverse()  // we only need to reverse the office route
    });

    await geocode_lunch.save();
    await geocode_office.save();
    await geocode_home.save();
//  }
};
