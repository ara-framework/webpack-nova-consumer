const url = require('url');
const qs = require('querystring');

class NovaConsumerPlugin {
  constructor(opts = {}) {
    this.opts = opts;
  }

  apply(compiler) {
    if (compiler.options.mode === 'development') {
      compiler.hooks.entryOption.tap('NovaConsumerPlugin', (context, entry) => {
        if (!entry['nova-consumer']) {
          entry['nova-consumer'] = []; // eslint-disable-line no-param-reassign
        }

        const { novas = [] } = this.opts;

        novas.forEach((nova) => {
          if (nova.entry) {
            const { port } = new url.URL(nova.entry);
            entry['nova-consumer'].push(`@ara/webpack-nova-consumer/client?port=${port}`);
          }
        });
      });
    } else {
      compiler.hooks.entryOption.tap('NovaConsumerPlugin', (context, entry) => {
        const { novas = [] } = this.opts;

        const viewsMap = novas.reduce((acc, { views = [], entry: novaEntry }) => {
          return views.reduce((acc2, view) => {
            acc2[view] = novaEntry; // eslint-disable-line no-param-reassign
            return acc2;
          }, acc);
        }, {});

        entry['nova-lazy-load'] = `@ara/webpack-nova-consumer/lazy?${qs.encode(viewsMap)}`; // eslint-disable-line no-param-reassign
      });
    }

    if (compiler.options.mode === 'development') {
      compiler.hooks.compilation.tap('NovaConsumerPlugin', (context) => {
        context.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('NovaConsumerPlugin', (data, cb) => {
          const { assets } = data;
          const { novas = [] } = this.opts;

          novas.forEach((nova) => {
            const { entry } = nova;

            if (entry) {
              assets.js.push(entry);
            }
          });
          cb();
        });
      });
    }
  }
}

export default NovaConsumerPlugin;
