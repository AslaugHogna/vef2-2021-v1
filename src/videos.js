import util from 'util';
import fs from 'fs';
import express from 'express';

export const router = express.Router();     //eslint-disable-line
const readFileAsync = util.promisify(fs.readFile);

/**
 * Les gögn async úr JSON skrá
 *
 * @returns { object } Gögn úr JSON skrá
 */
async function readVid() {
  const file = await readFileAsync('videos.json');
  const json = JSON.parse(file);
  return json;
}

/**
 * Route handler sem birtir lista af myndböndum
 *
 * @param { object } req  Request hlutur
 * @param { object } res   Response hlutur
 */
async function listVid(req, res) {
  const json = await readVid();
  const { videos } = json;
  const { categories } = json;
  res.render('videos', { categories, videos });
}

/**
 * Fall sem umlykur async middleware með villumeðhöndlun.
 *
 * @param { function } fn Middleware sem grípa á villur fyrir
 * @returns { function } Middleware með villumeðhöndlun
 */
function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

/**
 * Route handler sem birtir myndband og ef það finnst ekki er
 * kallað í next, sem endar á 404 handler.
 *
 * @param { object } req  Request hlutur
 * @param { object } res  Response hlutur
 * @param { function } next  Næsta middleware
 */
async function video(req, res, next) {
  const json = await readVid();
  const { id } = req.params;
  const { videos } = json;
  const foundVideo = videos.find((a) => a.id == id);    //eslint-disable-line
  // type-casting þarf að geta átt sér stað í þessum samanburði því id er int, ekki string
  if (!foundVideo) {
    return next();
  }

  const { title } = foundVideo;
  return res.render('video', { title, video: foundVideo });
}

router.get('/', catchErrors(listVid));
router.get('/:id', catchErrors(video));
