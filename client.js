/* eslint-disable no-undef */

const url = require('url');
const querystring = require('querystring');
const SockJS = require('sockjs-client');

if (__resourceQuery) {
  const { port } = querystring.parse(__resourceQuery.slice(1));

  const sock = new SockJS(url.format({
    protocol: window.location.protocol,
    hostname: window.location.hostname,
    port,
    // Hardcoded in WebpackDevServer
    pathname: '/sockjs-node',
  }));

  sock.onmessage = (e) => {
    const message = JSON.parse(e.data);

    if (message.type === 'still-ok') {
      window.location.reload();
    }
  };
}
