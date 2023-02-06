const amqplib = require('amqplib');

const eventType = require('../../../../constants');

let rabittMQconnection;
let channel;

const connectToRabittServer = async () => {
  try {
    rabittMQconnection = await amqplib.connect('amqp://localhost');
    channel = await rabittMQconnection.createChannel();
    await channel.assertQueue(eventType.motelMessages.motelInfo);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectToRabittServer,
  rabittMQconnection,
  channel,
};
