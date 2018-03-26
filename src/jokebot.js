import { RtmClient, WebClient, RTM_EVENTS, CLIENT_EVENTS } from '@slack/client';
import {
  isMessage,
  isMessageToChannel,
  isFromUser,
  messageContainsText,
  filterJokesByCategories,
  pickRandom,
} from './utils';
import oneLinerJoke from 'one-liner-joke';

const jokebot = (botToken, options) => {
  let botId;
  const defaultOptions = {};
  const opt = Object.assign({}, defaultOptions, options);
  const rtm = new RtmClient(botToken, options);
  const web = new WebClient(botToken);

  rtm.on(RTM_EVENTS.MESSAGE, (event) => {
    if (
      isMessage(event) &&
      isMessageToChannel(event) &&
      !isFromUser(event, botId) &&
      messageContainsText(event, opt.triggerOnWords)
    ) {
      const getRandomJoke = oneLinerJoke.getRandomJoke();
      const msgOptions = {
        as_user: true,
      };

      web.chat.postMessage(event.channel, getRandomJoke.body, msgOptions);
    }
  });

  return {
    rtm,
    web,
    start() {
      rtm.start();
    },
  };
};

export default jokebot;
