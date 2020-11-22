import pathToRegexp from 'path-to-regexp';
import RULES from './config/rules.json';

export const listDomains = Object.keys(RULES)
  .map((rule) => pathToRegexp(rule));

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

export const load = (url, id) => new Promise((resolve, reject) => {
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.id = id;
  // Desktop viewport dimensions (in px) on which Fathom proximity rules are based
  iframe.width = 1680;
  iframe.height = 950;
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
  iframe.setAttribute('style', 'display:none;');
  iframe.onload = () => resolve(iframe);
  iframe.onerror = (e) => reject(e);

  document.body.appendChild(iframe);
});
