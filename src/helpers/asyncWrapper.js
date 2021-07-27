module.exports.asyncWrapper = callback => (req, res, next) =>
  callback(req, res, next).catch(err => next(err));
