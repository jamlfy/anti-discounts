import Store from './store';
import { handleWebRequest, handleNotificationClicked } from './utils';
import { Action } from './config/types.json';

const {
  tabs, runtime, extension, webRequest, notifications,
// eslint-disable-next-line no-undef
} = EXTENSION;

runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    tabs.create({
      url: extension.getURL('intro.html'),
    });
    tabs.create({
      url: extension.getURL('retirement.html'),
    });
  } else if (reason === 'update') {
    tabs.create({
      url: extension.getURL('retirement.html'),
    });
  }
});

webRequest.onHeadersReceived.addListener(
  handleWebRequest,
  {
    urls: ['https://*/*', 'http://*/*'],
    types: ['sub_frame'],
    tabId: tabs.TAB_ID_NONE,
  },
  ['blocking', 'responseHeaders'],
);

// Todo: Crear function para tomar las notificaciones
notifications.onClicked.addListener(handleNotificationClicked);

Store.dispatch(Action.RUNNER);
