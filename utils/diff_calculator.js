const ctrl = {};

ctrl.calculateDiffInMinutes = (amount, units) => {
  if (units === 'm') {
    return amount;
  }
  else if (units === 'h') {
    return amount * 60;
  }
  else if (units === 'd') {
    return amount * 60 * 24;
  }
  else if (units === 'w') {
    return amount * 60 * 24 * 7;
  }
  else if (units === 'mm') {
    return amount * 60 * 24 * 30; // Not every month is a 30 days month, but I didn't implement it to simplify
  }
  else if (units === 'y') {
    return amount * 60 * 24 * 365;
  }
};

module.exports = ctrl;
