import pathToRegexp from 'path-to-regexp';
import RULES from './config/rules.json';

export const findByDomain = (url) => {
  const list = Object.keys(RULES);
  const index = list
    .map((rule) => pathToRegexp(rule))
    .findIndex((e) => e.exec(url));

  return RULES[list[index]];
};

export const listTime = (prices = {}) => Object.keys(prices);

export const lastTime = ({ prices }) => {
  const times = listTime(prices);
  return times[times.length - 1];
};

export const filter = ({ lastRun }) => ({ prices }) => {
  const last = lastTime({ prices });
  return !lastRun || !last || lastRun >= last;
};

export const sort = (a, b) => lastTime(a) > lastTime(b);

export const finder = (key) => ({ id }) => id === key;

export const creatorError = (remove, text) => {
  const newError = new Error(text);
  newError.remove = remove;

  return newError;
};
