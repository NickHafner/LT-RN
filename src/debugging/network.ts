// https://github.com/rainbow-me/rainbow/blob/0ae3218255baef535b1e15fb218614b9a75f1477/src/debugging/network.js

import { HOSTNAME } from '@env';
// @ts-ignore
import XHRInterceptor from 'react-native/Libraries/Network/XHRInterceptor';
import { logger } from './logger';

let internalCounter = 0;

const PREFIX = `[NETWORKING]:`;
const EXCLUDED_URLS = [
  'http://localhost:8081/symbolicate', // RN packager
  `http://${HOSTNAME}:19000/logs`, // RN packager
];

export default function xmonitorNetwork(showNetworkRequests: any, showNetworkResponses: any) {
  const requestCache = {};

  const getEmojiForStatusCode = (status: number) => {
    if (status >= 200 && status < 400) {
      return '✅';
    } else {
      return '❌';
    }
  };

  const emptyLine = () => {
    logger.debug('');
  };
  const separator = () => {
    logger.debug(`----------------------------------------`);
  };

  if (showNetworkRequests) {
    XHRInterceptor.setSendCallback(
      (data: string, xhr: { _url: string; _trackingName: number; _method: any }) => {
        if (EXCLUDED_URLS.indexOf(xhr._url) === -1) {
          internalCounter++;
          xhr._trackingName = internalCounter;

          separator();
          emptyLine();
          logger.debug(`${PREFIX} ➡️  REQUEST #${xhr._trackingName} -  ${xhr._method} ${xhr._url}`);
          emptyLine();
          if (data) {
            emptyLine();
            logger.debug(' PARAMETERS: ');
            emptyLine();
            try {
              const dataObj = JSON.parse(data);
              logger.debug(' {');
              Object.keys(dataObj).forEach((key) => {
                logger.debug(`   ${key} : `);
              });
              logger.debug(' }');
            } catch (e) {
              logger.debug(data);
            }
          }
          emptyLine();

          // @ts-ignore
          requestCache[internalCounter] = {
            startTime: Date.now(),
          };
        }
      }
    );
  }

  if (showNetworkResponses) {
    XHRInterceptor.setResponseCallback(
      (
        status: number,
        timeout: any,
        response: string,
        url: string,
        type: any,
        xhr: { _trackingName: any; _method: any }
      ) => {
        if (EXCLUDED_URLS.indexOf(url) === -1) {
          // fetch and clear the request data from the cache
          const rid = xhr._trackingName;
          // @ts-ignore
          const cachedRequest = requestCache[rid] || {};
          // @ts-ignore
          requestCache[rid] = null;
          const time = (cachedRequest.startTime && Date.now() - cachedRequest.startTime) || null;

          separator();
          emptyLine();
          logger.debug(
            `${PREFIX} ${getEmojiForStatusCode(status)}  RESPONSE #${rid} -  ${xhr._method} ${url}`
          );
          emptyLine();
          if (timeout && status > 400) {
            logger.debug(` ⚠️ ⚠️  TIMEOUT!  ⚠️ ⚠️ `);
          }

          if (status) {
            logger.debug(` Status:  ${status}`);
          }

          if (time) {
            logger.debug(` Completed in:  ${time / 1000} s`);
          }

          if (response) {
            emptyLine();
            logger.debug(' RESPONSE: ');
            emptyLine();
            try {
              logger.debug(JSON.stringify(response));
              const responseObj = JSON.parse(response);
              logger.debug(' {');
              Object.keys(responseObj).forEach((key) => {
                logger.debug(`   ${key} : `);
              });
              logger.debug(' }');
            } catch (e) {
              logger.debug('Error printing response obj:' + e);
              logger.debug(response);
            }
          }
          emptyLine();
        }
      }
    );
  }
  XHRInterceptor.enableInterception();
}
