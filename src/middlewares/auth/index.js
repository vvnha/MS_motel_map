/* eslint-disable consistent-return */

// const jwt = require('jsonwebtoken');
// const config = require('../../config/index');
const Constants = require('../../libs/constants');
const ReturnResult = require('../../libs/return-result');

exports.authenMidlleware = async (req, res, next) => {
  const accessToken = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : null;

  if (!accessToken) {
    return res
      .status(401)
      .send(
        new ReturnResult(
          null,
          null,
          null,
          Constants.authenMessages.NO_TOKEN_FOUND,
          null,
        ),
      );
  }

  try {
    // const decodedToken = jwt.verify(accessToken, config.get('jwt.TOKEN_KEY'));

    // req.user = decodedToken;
    next();
  } catch (error) {
    return res
      .status(400)
      .send(new ReturnResult(null, null, null, error.message, null));
  }
};
