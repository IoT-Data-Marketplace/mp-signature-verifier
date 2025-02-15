import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { services } from './services';

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Mount REST on /api
app.use('/api', services);

const port = process.env.PORT || 8030;

app.use('/healthcheck', require('express-healthcheck')());

app.listen(port, () =>
  console.log(`Express app listening on localhost:${port}`)
);
