import pathToRegexp from 'path-to-regexp';
import RULES from './config/rules.json';

export const findByDomain = (url = '') => {
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

export const finder = (key = '') => ({ id = '' }) => id === key;

export const creatorError = (remove, text) => {
  const newError = new Error(text);
  newError.remove = remove;

  return newError;
};

export const handleWebRequest = (details) => {
  // only remove the header if this extension's background page made the request
  if (details.documentUrl === window.location.href) {
    const responseHeaders = details.responseHeaders.filter(
      (header) => !header.name.toLowerCase().includes('x-frame-options'),
    );
    return { responseHeaders };
  }
  return { responseHeaders: details.responseHeaders };
};

export const handleNotificationClicked = (notificationId) => ({ url: btoa(notificationId) });

export const creatorNotification = (getMessage = ($) => $, item = {}) => {
  const listTimes = listTime(item.prices);
  const vendorName = new URL(item.url).hostname;

  return ({
    type: 'basic',
    image: item.image,
    title: getMessage('notificationTitle', item.title),
    message: getMessage('notificationContent', {
      vendorName,
      original: item.prices[listTimes[0]].toLocaleString(navigator.language, {
        style: 'currency',
        currency: item.symbol,
      }),
      now: item.prices[listTimes[listTimes.length - 1]].toLocaleString(navigator.language, {
        style: 'currency',
        currency: item.symbol,
      }),
    }),
  });
};

export const showNotification = {
  0: () => false,
  1: (item, price) => !item.isNew && item.price[lastTime(item)] > price,
  2: (item) => !item.isNew,
};
