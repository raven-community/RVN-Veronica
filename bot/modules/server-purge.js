let hasPerms = require('../helpers.js').hasPerms;
let inPrivate = require('../helpers.js').inPrivate;
let config = require('config');
let modLogChannel = config.get('moderation').modLogChannel;
let logChannel = config.get('moderation').logchannel;
let pm2Name = config.get('General').pm2Name;
let moment = require('moment-timezone');

exports.commands = ['purge'];

exports.purge = {
  usage: '<number of messages>',
  description:
    ':desktop: :cop: Deletes message from current channel :cop: :desktop:\n**!purge** <#channel-name/@ username> <number of messages>\n     :desktop: :cop: Deletes Messages from User, Channel :cop: :desktop:',
  process: function(bot, msg, suffix) {
    if (inPrivate(msg)) {
      msg.channel.send('You Cant Purge Message In DMs!');
      return;
    }
    if (hasPerms(msg)) {
      let author = msg.author.username;
      if (msg.mentions.channels.first()) {
        var words = suffix
          .trim()
          .split(' ')
          .filter(function(n) {
            return n !== '';
          });
        if (!words[1]) {
          var number = 2;
        } else {
          var number = parseInt(words[1]);
        }
        if (number > 100) {
          var number = 100;
        }
        msg.mentions.channels
          .first()
          .fetchMessages({ limit: number })
          .then(messages => {
            msg.mentions.channels
              .first()
              .bulkDelete(messages)
              .then(() => {
                var time = moment()
                  .tz('America/Los_Angeles')
                  .format('MM-DD-YYYY hh:mm a');
                bot.channels
                  .get(modLogChannel)
                  .send(
                    '[' +
                      time +
                      ' PST][' +
                      pm2Name +
                      `] ${author} Purged **${
                        messages.size
                      }** messages from <#${msg.mentions.channels.first().id}>.`
                  );
                msg.channel
                  .send(
                    `:ok_hand: Purged **${messages.size}** messages from <#${
                      msg.mentions.channels.first().id
                    }>.`
                  )
                  .then(msg => {
                    msg.delete(10000).catch(err => {
                      var time = moment()
                        .tz('America/Los_Angeles')
                        .format('MM-DD-YYYY hh:mm a');
                      //console.log( '[' + time + ' PST][' + pm2Name + '] ERROR Purging purge message );
                    });
                  });
              })
              .catch(e => {
                var time = moment()
                  .tz('America/Los_Angeles')
                  .format('MM-DD-YYYY hh:mm a');
                bot.channels
                  .get(logChannel)
                  .send(
                    '[' +
                      time +
                      ' PST][' +
                      pm2Name +
                      `] :x: Failed to purge **${
                        messages.size
                      }** messages from <#${
                        msg.mentions.channels.first().id
                      }>.\n${e}`
                  );
                msg.channel.send(
                  `:x: Failed to purge **${messages.size}** messages from <#${
                    msg.mentions.channels.first().id
                  }>.`
                );
              });
          });
      } else if (msg.mentions.users.first()) {
        msg.channel.fetchMessages({ limit: 100 }).then(messages => {
          var words = suffix
            .trim()
            .split(' ')
            .filter(function(n) {
              return n !== '';
            });
          var count = parseInt(words[1]) || 2;
          if (count > 100) {
            var count = 100;
          }
          let found = [];
          messages.array().forEach(m => {
            if (m.author.id == msg.mentions.users.first().id) {
              if (found.length == count) return;
              found.push({ id: m.id });
            }
          });
          msg.channel
            .bulkDelete(found)
            .then(() => {
              var time = moment()
                .tz('America/Los_Angeles')
                .format('MM-DD-YYYY hh:mm a');
              bot.channels
                .get(modLogChannel)
                .send(
                  '[' +
                    time +
                    ' PST][' +
                    pm2Name +
                    `] ${author} Purged **${found.length}** messages from ${
                      msg.mentions.users.first().username
                    }.`
                );
              msg.channel
                .send(
                  `:ok_hand: Purged **${found.length}** messages from ${
                    msg.mentions.users.first().username
                  }.`
                )
                .then(msg => {
                  msg.delete(10000).catch(err => {
                    var time = moment()
                      .tz('America/Los_Angeles')
                      .format('MM-DD-YYYY hh:mm a');
                    //console.log( '[' + time + ' PST][' + pm2Name + '] ERROR Purging purge message );
                  });
                });
            })
            .catch(e => {
              var time = moment()
                .tz('America/Los_Angeles')
                .format('MM-DD-YYYY hh:mm a');
              bot.channels
                .get(logChannel)
                .send(
                  '[' +
                    time +
                    ' PST][' +
                    pm2Name +
                    `] :x: Failed to purge **${found.length}** messages from ${
                      msg.mentions.users.first().username
                    }.\n${e}`
                );
              msg.channel.send(
                `:x: Failed to purge **${found.length}** messages from ${
                  msg.mentions.users.first().username
                }.`
              );
            });
        });
      } else {
        var words = suffix
          .trim()
          .split(' ')
          .filter(function(n) {
            return n !== '';
          });
        if (!words[0]) {
          var number = 2;
        } else {
          var number = parseInt(words[0]);
        }
        if (number > 100) {
          var number = 100;
        }
        msg.channel.fetchMessages({ limit: number }).then(messages => {
          msg.channel
            .bulkDelete(messages)
            .then(() => {
              var time = moment()
                .tz('America/Los_Angeles')
                .format('MM-DD-YYYY hh:mm a');
              bot.channels
                .get(modLogChannel)
                .send(
                  '[' +
                    time +
                    ' PST][' +
                    pm2Name +
                    `] ${author} Purged **${messages.size}** messages from <#${
                      msg.channel.id
                    }>.`
                );
              msg.channel
                .send(
                  `:ok_hand: Purged **${
                    messages.size
                  }** messages from this channel.`
                )
                .then(msg => {
                  msg.delete(10000).catch(err => {
                    var time = moment()
                      .tz('America/Los_Angeles')
                      .format('MM-DD-YYYY hh:mm a');
                    //console.log( '[' + time + ' PST][' + pm2Name + '] ERROR Purging purge message );
                  });
                });
            })
            .catch(e => {
              var time = moment()
                .tz('America/Los_Angeles')
                .format('MM-DD-YYYY hh:mm a');
              bot.channels
                .get(logChannel)
                .send(
                  '[' +
                    time +
                    ' PST][' +
                    pm2Name +
                    `] :x: Failed to purge **${
                      messages.size
                    }** messages from channel <#${msg.channel.id}>.\n${e}`
                );
              msg.channel.send(
                `:x: Failed to purge **${
                  messages.size
                }** messages from this channel.`
              );
            });
        });
      }
    }
  }
};
