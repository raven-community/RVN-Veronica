'use strict';
let needle = require('needle');
let config = require('config');
let moment = require('moment-timezone');
let hasRvnStatsNetworkChannels = require('../helpers.js')
  .hasRvnStatsNetworkChannels;
let inPrivate = require('../helpers.js').inPrivate;
let channelID = config.get('General').Channels.botspam;
let cmcApiUrl = config.get('General').urls.cmcApiUrl;
let explorerApiUrl = config.get('General').urls.explorerApiUrl;
let coinName = config.get('General').urls.CoinName;
let coinSymbol = config.get('General').urls.CoinSymbol;

exports.commands = ['hashpower'];

exports.hashpower = {
  usage: '<Mh/s> <fiat/coin>',
  description:
    'Displays potential Earnings For Given Hashrate\n     Supported Fiats: *usd*, *eur*, *gbp*, *aud*, *brl*, *cad*, *chf*, *clp*, *cny*, *czk*, *dkk*, *hkd*, *huf*, *idr*, *ils*, *inr*, *jpy*, *krw*, *mxn*, *myr*, *nok*, *nzd*, *php*, *pkr*, *pln*, *rub*, *sek*, *sgd*, *thb*, *try*, *twd*, *zar* (case-insensitive)',
  process: function(bot, msg, suffix) {
    if (!inPrivate(msg) && !hasRvnStatsNetworkChannels(msg)) {
      msg.channel.send(
        'Please use <#' + channelID + '> or DMs to talk to hash bot.'
      );
      return;
    }
    let dt = new Date();
    let timestamp = moment()
      .tz('America/Los_Angeles')
      .format('MM-DD-YYYY hh:mm a');
    var words = suffix
      .trim()
      .split(' ')
      .filter(function(n) {
        return n !== '';
      });
    var offset = 0;
    if (words[0] == 'power') {
      var offset = 1;
    }
    var myhashrate = getValidatedAmount(words[0 + offset]);
    if (!myhashrate) {
      msg.channel.send('Please Specify a hashrate in Mh/s!');
      return;
    }
    var checkFiat = words[1 + offset];
    if (!checkFiat) {
      var fiat = 'USD';
    } else {
      var fiat = words[1 + offset].toUpperCase();
    }
    needle.get(cmcApiUrl + 'listings/', function(error, response) {
      if (response.statusCode !== 200) {
        if (response.statusCode == 122) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request-URI too long'
          );
        }
        if (response.statusCode == 300) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Multiple Choices'
          );
        }
        if (response.statusCode == 301) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Moved Permanently'
          );
        }
        if (response.statusCode == 303) {
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'See Other');
        }
        if (response.statusCode == 304) {
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Modified');
        }
        if (response.statusCode == 305) {
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Use Proxy');
        }
        if (response.statusCode == 306) {
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Switch Proxy');
        }
        if (response.statusCode == 307) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Temporary Redirect'
          );
        }
        if (response.statusCode == 308) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Permanent Redirect'
          );
        }
        if (response.statusCode == 400) {
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bad Request');
        }
        if (response.statusCode == 401) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unauth­orized'
          );
        }
        if (response.statusCode == 402) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Payment Required'
          );
        }
        if (response.statusCode == 403) {
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Forbidden');
        }
        if (response.statusCode == 404) {
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Found');
        }
        if (response.statusCode == 405) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Method Not Allowed'
          );
        }
        if (response.statusCode == 406) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Acceptable'
          );
        }
        if (response.statusCode == 407) {
          msg.channel.send(
            '<' +
              cmcApiUrl +
              '>' +
              ' ERROR: ' +
              'Proxy Authen­tic­ation Required'
          );
        }
        if (response.statusCode == 408) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request Timeout'
          );
        }
        if (response.statusCode == 409) {
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Conflict');
        }
        if (response.statusCode == 410) {
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Gone');
        }
        if (response.statusCode == 411) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Length Required'
          );
        }
        if (response.statusCode == 412) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Precondition Failed'
          );
        }
        if (response.statusCode == 413) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request Entity Too Large'
          );
        }
        if (response.statusCode == 414) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request-URI Too Long'
          );
        }
        if (response.statusCode == 415) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unsupported Media Type'
          );
        }
        if (response.statusCode == 416) {
          msg.channel.send(
            '<' +
              cmcApiUrl +
              '>' +
              ' ERROR: ' +
              'Requested Range Not Satisf­iable'
          );
        }
        if (response.statusCode == 417) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Expectation Failed'
          );
        }
        if (response.statusCode == 418) {
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + "I'm a teapot");
        }
        if (response.statusCode == 422) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unprocessable Entity'
          );
        }
        if (response.statusCode == 423) {
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Locked');
        }
        if (response.statusCode == 424) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Failed Dependency'
          );
        }
        if (response.statusCode == 425) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unordered Collection'
          );
        }
        if (response.statusCode == 426) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Upgrade Required'
          );
        }
        if (response.statusCode == 428) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Precondition Required '
          );
        }
        if (response.statusCode == 429) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Too Many Requests '
          );
        }
        if (response.statusCode == 431) {
          msg.channel.send(
            '<' +
              cmcApiUrl +
              '>' +
              ' ERROR: ' +
              'Request Header Fields Too Large '
          );
        }
        if (response.statusCode == 444) {
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'No Response ');
        }
        if (response.statusCode == 449) {
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Retry With ');
        }
        if (response.statusCode == 450) {
          msg.channel.send(
            '<' +
              cmcApiUrl +
              '>' +
              ' ERROR: ' +
              'Blocked By Windows Parental Controls '
          );
        }
        if (response.statusCode == 451) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unavailable For Legal Reasons'
          );
        }
        if (response.statusCode == 499) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Client Closed Request'
          );
        }
        if (response.statusCode == 500) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Internal Server Error'
          );
        }
        if (response.statusCode == 501) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Implemented'
          );
        }
        if (response.statusCode == 502) {
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bad Gateway');
        }
        if (response.statusCode == 503) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Service Unavailable'
          );
        }
        if (response.statusCode == 504) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Gateway Timeout'
          );
        }
        if (response.statusCode == 505) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'HTTP Version Not Supported'
          );
        }
        if (response.statusCode == 506) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Variant Also Negotiates'
          );
        }
        if (response.statusCode == 507) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Insufficient Storage'
          );
        }
        if (response.statusCode == 508) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Loop Detected'
          );
        }
        if (response.statusCode == 509) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bandwidth Limit Exceeded'
          );
        }
        if (response.statusCode == 510) {
          msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Extended');
        }
        if (response.statusCode == 511) {
          msg.channel.send(
            '<' +
              cmcApiUrl +
              '>' +
              ' ERROR: ' +
              'Network Authentication Required'
          );
        }
        if (response.statusCode == 598) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Network read timeout error'
          );
        }
        if (response.statusCode == 599) {
          msg.channel.send(
            '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Network connect timeout error'
          );
        }
      } else {
        var JSON1 = response.body.data;
        if (
          Number(JSON1.findIndex(symbols => symbols.symbol == coinSymbol)) != -1
        ) {
          var hasMatch1 = true;
          var index = Number(
            JSON1.findIndex(symbols => symbols.symbol == coinSymbol)
          );
        } else {
          var hasMatch1 = false;
        }
        if (!hasMatch1) {
          msg.channel.send(coinSymbol + ' Not Found!');
          return;
        } else {
          var coinJson = JSON1[index];
          var coinID = coinJson.id;
        }
        if (Number(JSON1.findIndex(symbols => symbols.symbol == fiat)) != -1) {
          var hasMatch2 = true;
        } else {
          var hasMatch2 = false;
        }
        if (
          fiat == 'USD' ||
          fiat == 'AUD' ||
          fiat == 'BRL' ||
          fiat == 'CAD' ||
          fiat == 'CHF' ||
          fiat == 'CLP' ||
          fiat == 'CNY' ||
          fiat == 'CZK' ||
          fiat == 'DKK' ||
          fiat == 'EUR' ||
          fiat == 'GBP' ||
          fiat == 'HKD' ||
          fiat == 'HUF' ||
          fiat == 'IDR' ||
          fiat == 'ILS' ||
          fiat == 'INR' ||
          fiat == 'JPY' ||
          fiat == 'KRW' ||
          fiat == 'MXN' ||
          fiat == 'MYR' ||
          fiat == 'NOK' ||
          fiat == 'NZD' ||
          fiat == 'PHP' ||
          fiat == 'PKR' ||
          fiat == 'PLN' ||
          fiat == 'RUB' ||
          fiat == 'SEK' ||
          fiat == 'SGD' ||
          fiat == 'THB' ||
          fiat == 'TRY' ||
          fiat == 'TWD' ||
          fiat == 'ZAR'
        ) {
          var hasMatch2 = true;
        }
        if (!hasMatch2) {
          msg.channel.send('Invalid Fiat/Alt!');
          return;
        }
        needle.get(
          cmcApiUrl + 'ticker/' + coinID + '/?convert=' + fiat,
          function(error, response) {
            if (response.statusCode !== 200) {
              if (response.statusCode == 122) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request-URI too long'
                );
              }
              if (response.statusCode == 300) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Multiple Choices'
                );
              }
              if (response.statusCode == 301) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Moved Permanently'
                );
              }
              if (response.statusCode == 303) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'See Other'
                );
              }
              if (response.statusCode == 304) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Modified'
                );
              }
              if (response.statusCode == 305) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Use Proxy'
                );
              }
              if (response.statusCode == 306) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Switch Proxy'
                );
              }
              if (response.statusCode == 307) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Temporary Redirect'
                );
              }
              if (response.statusCode == 308) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Permanent Redirect'
                );
              }
              if (response.statusCode == 400) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bad Request'
                );
              }
              if (response.statusCode == 401) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unauth­orized'
                );
              }
              if (response.statusCode == 402) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Payment Required'
                );
              }
              if (response.statusCode == 403) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Forbidden'
                );
              }
              if (response.statusCode == 404) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Found'
                );
              }
              if (response.statusCode == 405) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Method Not Allowed'
                );
              }
              if (response.statusCode == 406) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Acceptable'
                );
              }
              if (response.statusCode == 407) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Proxy Authen­tic­ation Required'
                );
              }
              if (response.statusCode == 408) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request Timeout'
                );
              }
              if (response.statusCode == 409) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Conflict'
                );
              }
              if (response.statusCode == 410) {
                msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Gone');
              }
              if (response.statusCode == 411) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Length Required'
                );
              }
              if (response.statusCode == 412) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Precondition Failed'
                );
              }
              if (response.statusCode == 413) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Request Entity Too Large'
                );
              }
              if (response.statusCode == 414) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Request-URI Too Long'
                );
              }
              if (response.statusCode == 415) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unsupported Media Type'
                );
              }
              if (response.statusCode == 416) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Requested Range Not Satisf­iable'
                );
              }
              if (response.statusCode == 417) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Expectation Failed'
                );
              }
              if (response.statusCode == 418) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + "I'm a teapot"
                );
              }
              if (response.statusCode == 422) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unprocessable Entity'
                );
              }
              if (response.statusCode == 423) {
                msg.channel.send('<' + cmcApiUrl + '>' + ' ERROR: ' + 'Locked');
              }
              if (response.statusCode == 424) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Failed Dependency'
                );
              }
              if (response.statusCode == 425) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Unordered Collection'
                );
              }
              if (response.statusCode == 426) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Upgrade Required'
                );
              }
              if (response.statusCode == 428) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Precondition Required '
                );
              }
              if (response.statusCode == 429) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Too Many Requests '
                );
              }
              if (response.statusCode == 431) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Request Header Fields Too Large '
                );
              }
              if (response.statusCode == 444) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'No Response '
                );
              }
              if (response.statusCode == 449) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Retry With '
                );
              }
              if (response.statusCode == 450) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Blocked By Windows Parental Controls '
                );
              }
              if (response.statusCode == 451) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Unavailable For Legal Reasons'
                );
              }
              if (response.statusCode == 499) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Client Closed Request'
                );
              }
              if (response.statusCode == 500) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Internal Server Error'
                );
              }
              if (response.statusCode == 501) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Implemented'
                );
              }
              if (response.statusCode == 502) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Bad Gateway'
                );
              }
              if (response.statusCode == 503) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Service Unavailable'
                );
              }
              if (response.statusCode == 504) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Gateway Timeout'
                );
              }
              if (response.statusCode == 505) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'HTTP Version Not Supported'
                );
              }
              if (response.statusCode == 506) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Variant Also Negotiates'
                );
              }
              if (response.statusCode == 507) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Insufficient Storage'
                );
              }
              if (response.statusCode == 508) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Loop Detected'
                );
              }
              if (response.statusCode == 509) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Bandwidth Limit Exceeded'
                );
              }
              if (response.statusCode == 510) {
                msg.channel.send(
                  '<' + cmcApiUrl + '>' + ' ERROR: ' + 'Not Extended'
                );
              }
              if (response.statusCode == 511) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Network Authentication Required'
                );
              }
              if (response.statusCode == 598) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Network read timeout error'
                );
              }
              if (response.statusCode == 599) {
                msg.channel.send(
                  '<' +
                    cmcApiUrl +
                    '>' +
                    ' ERROR: ' +
                    'Network connect timeout error'
                );
              }
            } else {
              var Otherprice = Number(response.body.data.quotes[fiat].price);
              var sign = fiat;
              var fixamount = 8;
              if (fiat == 'USD') {
                var sign = '$';
                var fixamount = 4;
              }
              if (fiat == 'AUD') {
                var sign = 'AU$';
                var fixamount = 4;
              }
              if (fiat == 'BRL') {
                var sign = 'R$';
                var fixamount = 4;
              }
              if (fiat == 'CAD') {
                var sign = 'Can$';
                var fixamount = 4;
              }
              if (fiat == 'CHF') {
                var sign = 'Fr';
                var fixamount = 4;
              }
              if (fiat == 'CLP') {
                var sign = 'CLP$';
              }
              if (fiat == 'CNY') {
                var sign = '¥';
                var fixamount = 4;
              }
              if (fiat == 'CZK') {
                var sign = 'Kč';
                var fixamount = 4;
              }
              if (fiat == 'DKK') {
                var sign = 'kr';
                var fixamount = 4;
              }
              if (fiat == 'EUR') {
                var sign = '€';
                var fixamount = 4;
              }
              if (fiat == 'GBP') {
                var sign = '£';
                var fixamount = 4;
              }
              if (fiat == 'HKD') {
                var sign = 'HKD$';
                var fixamount = 4;
              }
              if (fiat == 'HUF') {
                var sign = 'Ft';
                var fixamount = 4;
              }
              if (fiat == 'IDR') {
                var sign = 'Rp';
                var fixamount = 4;
              }
              if (fiat == 'ILS') {
                var sign = '₪';
                var fixamount = 4;
              }
              if (fiat == 'INR') {
                var sign = '₹';
                var fixamount = 4;
              }
              if (fiat == 'JPY') {
                var sign = '¥';
                var fixamount = 4;
              }
              if (fiat == 'KRW') {
                var sign = '‎₩';
                var fixamount = 4;
              }
              if (fiat == 'MXN') {
                var sign = 'MXN$';
                var fixamount = 4;
              }
              if (fiat == 'MYR') {
                var sign = 'RM';
                var fixamount = 4;
              }
              if (fiat == 'NOK') {
                var sign = 'kr';
                var fixamount = 4;
              }
              if (fiat == 'NZD') {
                var sign = 'NZD$';
                var fixamount = 4;
              }
              if (fiat == 'PHP') {
                var sign = '₱';
                var fixamount = 4;
              }
              if (fiat == 'PKR') {
                var sign = '₨';
                var fixamount = 4;
              }
              if (fiat == 'PLN') {
                var sign = 'zł';
                var fixamount = 4;
              }
              if (fiat == 'RUB') {
                var sign = '₽';
                var fixamount = 4;
              }
              if (fiat == 'SEK') {
                var sign = 'kr';
                var fixamount = 4;
              }
              if (fiat == 'SGD') {
                var sign = 'S$';
                var fixamount = 4;
              }
              if (fiat == 'THB') {
                var sign = '฿';
                var fixamount = 4;
              }
              if (fiat == 'TRY') {
                var sign = '₺';
                var fixamount = 4;
              }
              if (fiat == 'TWD') {
                var sign = 'NT$';
                var fixamount = 4;
              }
              if (fiat == 'ZAR') {
                var sign = 'R';
                var fixamount = 4;
              }
              var myRate = Number(Otherprice);
              needle.get(explorerApiUrl + 'api/status', function(
                error,
                response
              ) {
                if (response.statusCode !== 200) {
                  if (response.statusCode == 122) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Request-URI too long'
                    );
                  }
                  if (response.statusCode == 300) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Multiple Choices'
                    );
                  }
                  if (response.statusCode == 301) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Moved Permanently'
                    );
                  }
                  if (response.statusCode == 303) {
                    msg.channel.send(
                      '<' + explorerApiUrl + '>' + ' ERROR: ' + 'See Other'
                    );
                  }
                  if (response.statusCode == 304) {
                    msg.channel.send(
                      '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Modified'
                    );
                  }
                  if (response.statusCode == 305) {
                    msg.channel.send(
                      '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Use Proxy'
                    );
                  }
                  if (response.statusCode == 306) {
                    msg.channel.send(
                      '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Switch Proxy'
                    );
                  }
                  if (response.statusCode == 307) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Temporary Redirect'
                    );
                  }
                  if (response.statusCode == 308) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Permanent Redirect'
                    );
                  }
                  if (response.statusCode == 400) {
                    msg.channel.send(
                      '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Bad Request'
                    );
                  }
                  if (response.statusCode == 401) {
                    msg.channel.send(
                      '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Unauth­orized'
                    );
                  }
                  if (response.statusCode == 402) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Payment Required'
                    );
                  }
                  if (response.statusCode == 403) {
                    msg.channel.send(
                      '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Forbidden'
                    );
                  }
                  if (response.statusCode == 404) {
                    msg.channel.send(
                      '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Found'
                    );
                  }
                  if (response.statusCode == 405) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Method Not Allowed'
                    );
                  }
                  if (response.statusCode == 406) {
                    msg.channel.send(
                      '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Acceptable'
                    );
                  }
                  if (response.statusCode == 407) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Proxy Authen­tic­ation Required'
                    );
                  }
                  if (response.statusCode == 408) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Request Timeout'
                    );
                  }
                  if (response.statusCode == 409) {
                    msg.channel.send(
                      '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Conflict'
                    );
                  }
                  if (response.statusCode == 410) {
                    msg.channel.send(
                      '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Gone'
                    );
                  }
                  if (response.statusCode == 411) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Length Required'
                    );
                  }
                  if (response.statusCode == 412) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Precondition Failed'
                    );
                  }
                  if (response.statusCode == 413) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Request Entity Too Large'
                    );
                  }
                  if (response.statusCode == 414) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Request-URI Too Long'
                    );
                  }
                  if (response.statusCode == 415) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Unsupported Media Type'
                    );
                  }
                  if (response.statusCode == 416) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Requested Range Not Satisf­iable'
                    );
                  }
                  if (response.statusCode == 417) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Expectation Failed'
                    );
                  }
                  if (response.statusCode == 418) {
                    msg.channel.send(
                      '<' + explorerApiUrl + '>' + ' ERROR: ' + "I'm a teapot"
                    );
                  }
                  if (response.statusCode == 422) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Unprocessable Entity'
                    );
                  }
                  if (response.statusCode == 423) {
                    msg.channel.send(
                      '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Locked'
                    );
                  }
                  if (response.statusCode == 424) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Failed Dependency'
                    );
                  }
                  if (response.statusCode == 425) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Unordered Collection'
                    );
                  }
                  if (response.statusCode == 426) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Upgrade Required'
                    );
                  }
                  if (response.statusCode == 428) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Precondition Required '
                    );
                  }
                  if (response.statusCode == 429) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Too Many Requests '
                    );
                  }
                  if (response.statusCode == 431) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Request Header Fields Too Large '
                    );
                  }
                  if (response.statusCode == 444) {
                    msg.channel.send(
                      '<' + explorerApiUrl + '>' + ' ERROR: ' + 'No Response '
                    );
                  }
                  if (response.statusCode == 449) {
                    msg.channel.send(
                      '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Retry With '
                    );
                  }
                  if (response.statusCode == 450) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Blocked By Windows Parental Controls '
                    );
                  }
                  if (response.statusCode == 451) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Unavailable For Legal Reasons'
                    );
                  }
                  if (response.statusCode == 499) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Client Closed Request'
                    );
                  }
                  if (response.statusCode == 500) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Internal Server Error'
                    );
                  }
                  if (response.statusCode == 501) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Not Implemented'
                    );
                  }
                  if (response.statusCode == 502) {
                    msg.channel.send(
                      '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Bad Gateway'
                    );
                  }
                  if (response.statusCode == 503) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Service Unavailable'
                    );
                  }
                  if (response.statusCode == 504) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Gateway Timeout'
                    );
                  }
                  if (response.statusCode == 505) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'HTTP Version Not Supported'
                    );
                  }
                  if (response.statusCode == 506) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Variant Also Negotiates'
                    );
                  }
                  if (response.statusCode == 507) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Insufficient Storage'
                    );
                  }
                  if (response.statusCode == 508) {
                    msg.channel.send(
                      '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Loop Detected'
                    );
                  }
                  if (response.statusCode == 509) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Bandwidth Limit Exceeded'
                    );
                  }
                  if (response.statusCode == 510) {
                    msg.channel.send(
                      '<' + explorerApiUrl + '>' + ' ERROR: ' + 'Not Extended'
                    );
                  }
                  if (response.statusCode == 511) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Network Authentication Required'
                    );
                  }
                  if (response.statusCode == 598) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Network read timeout error'
                    );
                  }
                  if (response.statusCode == 599) {
                    msg.channel.send(
                      '<' +
                        explorerApiUrl +
                        '>' +
                        ' ERROR: ' +
                        'Network connect timeout error'
                    );
                  }
                } else {
                  var Diff = Number(response.body.info.difficulty);
                  var myHash = Number(myhashrate);
                  var RVN =
                    Number(myHash) *
                    10 ** 6 *
                    5000 *
                    60 /
                    (Number(Diff) * 2 ** 32);
                  var RVN1 = RVN * 60;
                  var RVN24 = RVN * 1440;
                  var Other = myRate * RVN;
                  var Other1 = myRate * RVN1;
                  var Other24 = myRate * RVN24;
                  var message =
                    'With **' +
                    myHash +
                    ' Mh/s** and Difficulty: **' +
                    Diff.toFixed(0) +
                    '**\nYou can potentially earn the following: \n';
                  var rvnrates =
                    '1 Minute = **' +
                    RVN.toFixed(4) +
                    '** \n' +
                    '1 Hour = **' +
                    RVN1.toFixed(4) +
                    '** \n' +
                    '1 Day = **' +
                    RVN24.toFixed(4) +
                    '** \n';
                  var otherrates =
                    '1 Minute = **' +
                    sign +
                    ' ' +
                    Other.toFixed(fixamount) +
                    '** \n' +
                    '1 Hour = **' +
                    sign +
                    ' ' +
                    Other1.toFixed(fixamount) +
                    '** \n' +
                    '1 Day = **' +
                    sign +
                    ' ' +
                    Other24.toFixed(fixamount) +
                    '** \n';
                  const embed = {
                    description: message,
                    color: 7976557,
                    footer: {
                      text: 'Last Updated | ' + timestamp + ' PST'
                    },
                    author: {
                      name: 'Hashing Power Calculator!',
                      icon_url: 'https://i.imgur.com/nKHVQgq.png'
                    },
                    fields: [
                      {
                        name: coinSymbol + ' Rates',
                        value: rvnrates,
                        inline: true
                      },
                      {
                        name: fiat.toUpperCase() + ' (' + sign + ') Rates',
                        value: otherrates,
                        inline: true
                      }
                    ]
                  };
                  msg.channel.send({ embed });
                  return;
                }
              });
            }
          }
        );
      }
    });
    function getValidatedAmount(amount) {
      amount = amount.trim();
      return amount.match(/^[.0-9]+(\.[0-9]+)?$/) ? amount : null;
    }
  }
};
