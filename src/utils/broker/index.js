const amqplib = require('amqplib');
const config = require('../../config');

const { MESSAGE_BROKER_URL, EXCHANGE_NAME, QUEUE_NAME } =
  config.get('rabittMQ');

// create channel
module.exports.createChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    // distribute messages to other services
    await channel.assertExchange(EXCHANGE_NAME, 'direct', false);

    return channel;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// publish message (send message)
module.exports.publishMessage = async (channel, bindingKey, data) => {
  try {
    await channel.publish(
      EXCHANGE_NAME,
      bindingKey,
      Buffer.from(JSON.stringify(data)),
    );
    console.log('Event has been sent', data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// subscribe message (listen and reveive message)
module.exports.subscribeMessage = async (channel, service, bindingKey) => {
  const appQueue = await channel.assertQueue(QUEUE_NAME);

  channel.bindQueue(appQueue.queue, EXCHANGE_NAME, bindingKey);
  channel.consume(appQueue.queue, (data) => {
    console.log('receive data');
    console.log(data.content.toString());
    channel.ack(data);
  });
};
