const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Template = require('../models/ami_template');
const Event = require('../models/ami_event');

router.post('/', async function(req, res, next) {
  const date = req.body.date;
  const name = req.body.name;
  const template = req.body.template;

  const temp = await Template.find({where: {_id: mongoose.Types.ObjectId(template)}});

  await Event.create({name, date, type: 'KEY_EVENT'});

  temp.followupEvents.forEach(async event => {
    //Adding interval
    const d = new Date(date);
    d.setMinutes(date.getMinutes() + event.interval);

    await Event.create({name: event.name, date: d, type: 'REGULAR_EVENT'});
  });

  return res.status(200).send({message: 'Submitted'});
});

module.exports = router;
