const RabbitEventType = require('../../../constants');

exports.createNewMotel = (data) => {
  // const { email } = data;
  // if (typeof email !== 'string') throw Error('Loi');
  console.log(data);
  return {
    name: 'ABC',
    address: 'Hoa Vang District',
  };
};

exports.subscribeEvents = async (payload) => {
  const { event, data } = payload;

  switch (event) {
    case RabbitEventType.motelMessages.motelInfo:
      return this.createNewMotel(data);

    default:
      throw Error('Event does not match!');
  }
};
