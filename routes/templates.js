const express = require('express');
const router = express.Router();
const diffCalc = require('../utils/diff_calculator');
const Template = require('../models/ami_template');


router.get('/', async function(req, res, next) {
  const temps = await Template.find({});
  return res.status(200).send(JSON.stringify(temps));
});

router.post('/', async function(req, res, next) {
  console.log('got body: ' + JSON.stringify(req.body));
  const keyEventName = req.body.name;

  const followupNames = [].concat(req.body.followupNames);
  const followupDates = [].concat(req.body.followupDates);
  const followupUnits = [].concat(req.body.followupUnits);

  let followupEvents = [];
  console.log('size = ' + followupDates.length);
  for (let i = 0; i < followupDates.length; i++) {
    console.log('pushing');
    followupEvents.push({name: followupNames[i], amount: followupDates[i], units: followupUnits[i]})
  }

  console.log(JSON.stringify(followupEvents));

  const newEvents = [];
  for (let i = 0; i < followupEvents.length; i++) {
    const event = followupEvents[i];
    console.log('event = ' + JSON.stringify(event));
    const amount = event.amount;
    const units = event.units;
    const name = event.name;

    const newEvent = {
      name: name,
      interval: diffCalc.calculateDiffInMinutes(amount, units)
    };
    newEvents.push(newEvent);
  }

  await Template.create({
    name: keyEventName,
    followupEvents: newEvents
  });
  return res.status(200).send({message: 'Submitted'});
});

module.exports = router;
