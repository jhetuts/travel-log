/* global module require */
const {
  Router
} = require('express');
const LogEntry = require('../model/logEntryModel');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find().sort('-createdAt');
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry)
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }

  console.log(req.body)
})

module.exports = router;