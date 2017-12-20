import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import event from './app/routes/event';

import models from './app/models';

const app = express();

app.set('port', 3000);

app.use(cors());
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//models on middleware
app.use((req, res, next) => {
  req.$models = models
  next()
})

app.get('/', (req, res) => {
  res.render('pages/index', {
    routes: app._router.stack
  })
})

//routes
app.route(event(app))

app.use((req, res) => {
  res.status(404).send('404: Page not Found');
})

export default app;