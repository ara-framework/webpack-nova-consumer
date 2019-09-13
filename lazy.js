/* eslint-disable no-undef */

const querystring = require('querystring');

const loadScript = (src) => new Promise((resolve) => {
  if (document.querySelector(`script[src="${src}"]`)) {
    return resolve();
  }

  const el = document.createElement('script');

  el.type = 'text/javascript';
  el.async = true;
  el.src = src;

  document.head.appendChild(el);
  return resolve();
});

if (__resourceQuery) {
  const viewsMap = querystring.parse(__resourceQuery.slice(1));

  document.addEventListener('NovaMount', ({ detail }) => {
    const { name } = detail;

    const src = viewsMap[name];

    if (src) {
      loadScript(src);
    }
  });
}
