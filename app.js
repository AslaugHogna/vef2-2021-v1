import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { router } from './src/videos.js';   //eslint-disable-line
import { formatDate, formatTime } from './src/utils.js';    //eslint-disable-line

const app = express();

const { url } = import.meta;
const path = dirname(fileURLToPath(url));

app.set('views', './views');
app.set('view engine', 'ejs');

app.locals.formatDate = formatDate;
app.locals.formatTime = formatTime;

app.use(express.static(join(path, './public')));
app.use('/', router);

/**
 * Fall sem sér um 404 villur (middleware)
 * 
 * @param { object } req Request hlutur
 * @param { object } res  Response hlutur
 * @param { function } next  Næsta middleware
 */
function fannstEkkiHandler(req, res, next) {    //eslint-disable-line
  const title = 'Efni fannst ekki';
  const message = '404 Villa - þetta efni fannst ekki';
  res.status(404).render('error', { title, message });
}
/**
 * Fall sem sér um 500 villur (middleware)
 * 
 * @param { object } err  Villa sem kom upp
 * @param { object } req  Request hlutur
 * @param { object } res  Response hlutur
 * @param { function } next   Næsta middleware
 */
function villaHandler(err, req, res, next) {    //eslint-disable-line
  console.error(err);               //eslint-disable-line
  const title = 'Villa kom upp';
  const message = 'Því miður kom upp villa';
  res.status(500).render('error', { title, message });
}

app.use(fannstEkkiHandler);
app.use(villaHandler);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);    //eslint-disable-line
});
