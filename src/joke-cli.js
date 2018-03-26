#!/usr/bin/env node
import jokebot from './jokebot';

const options = {};
if (process.env.JOKEBOT_TRIGGERS) {
  options.triggerOnWords = process.env.JOKEBOT_TRIGGERS.split(',');
}

const bot = jokebot(process.env.JOKEBOT_TOKEN, options);
bot.start();
