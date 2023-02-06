const _get = require('lodash/get');

const motelServices = require('../services/motels-service');
const ReturnResult = require('../libs/return-result');
const Constants = require('../libs/constants');
const config = require('../config');

const { createChannel, publishMessage } = require('../utils/broker');

const { USER_BINDING_KEY } = config.get('rabittMQ');

let channel;

(async () => {
  channel = await createChannel();
})();

exports.createNewMotel = async (req, res) => {
  try {
    const result = await motelServices.createNewMotel('test');
    const payload = _get(req, 'body', {});

    const newData = {
      ...payload,
      motelInfo: { ...result },
    };

    // publish to update user info (owner) from user service with USER_BINDING_KEY
    publishMessage(channel, USER_BINDING_KEY, newData);

    res.send(
      new ReturnResult(
        result,
        null,
        Constants.motelMessages.CREATE_MOTEL,
        null,
        null,
      ),
    );
  } catch (error) {
    res
      .status(400)
      .send(new ReturnResult(null, null, null, error.message, null));
  }
};

exports.subscribeEvents = async (req, res) => {
  const payload = _get(req, 'body', {});

  try {
    const result = await motelServices.subscribeEvents(payload);

    res.send(
      new ReturnResult(
        result,
        null,
        Constants.default.motelMessages.CREATE_MOTEL,
        null,
        null,
      ),
    );
  } catch (error) {
    res
      .status(400)
      .send(new ReturnResult(null, null, null, error.message, null));
  }
};
