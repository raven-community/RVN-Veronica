let moment = require('moment-timezone');
let config = require('config');
let BlocksWonChannel = config.get('SocketBots').BlocksWonChannel;
let SocketUrl = config.get('SocketBots').SocketUrl;
let socketClient = require('socket.io-client');

exports.custom = ['socketBlocks'];

exports.socketBlocks = function(bot) {
  let eventToListenTo = 'raven/tx';
  let room = 'raven';
  let socket = socketClient(SocketUrl);
  socket.on('connect', function() {
    socket.emit('subscribe', room);
  });
  socket.on(eventToListenTo, function(data) {
    //console.log(data);
    if (!data.isRBF){
      var vinAddresses = [];
      var voutAddresses = [];
      console.log(data.txid);
      console.log(data.valueOut);
      var vin = data.vin;
      var vout = data.vout;
      for (i=0; i < vin.length; i++) {
        vinAddy = new Object();
        vinAddy['address'] = vin[i].address
        vinAddresses.push(vinAddy);
      }
      console.log(countDuplicates(vinAddresses));
      for (l=0; l < vout.length; l++) {
        voutAddy = new Object();
        voutAddy['address'] = vout[l].address
        voutAddy['amount'] = vout[l].value
        voutAddresses.push(voutAddy);
      }
      if (voutAddresses.length > 4){
        for (m=0; m < 4; m++){
          console.log(voutAddresses.address);
        }
        console.log((voutAddresses.length - 4) + ' More')
      }
      console.log(voutAddresses);
    }
    let dt = new Date();
    let timestamp = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm::ss a');
      // const embed = {
      //   description:
      //     'Won by [' +
      //     poolName +
      //     '](' +
      //     poolUrl +
      //     ')\n[View Block](' +
      //     SocketUrl +
      //     '/block/' +
      //     blockHash +
      //     ')',
      //   color: 7976557,
      //   footer: {
      //     text: 'Last Updated | ' + timestamp + ' PST'
      //   },
      //   author: {
      //     name: 'Block ' + blockHeight,
      //     icon_url: 'https://i.imgur.com/nKHVQgq.png'
      //   }
      // };
      //bot.channels.get(BlocksWonChannel).send({ embed });
  });
  function countDuplicates(names){
    const result = [...names.reduce( (mp, o) => {
      if (!mp.has(o.address)) mp.set(o.address, Object.assign(o, { inputs: 0 }));
      mp.get(o.address).inputs++;
      return mp;
    }, new Map).values()];
    return result;
  }
};
