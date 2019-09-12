const url = require('url');

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
            entry['nova-consumer'].push(`webpack-nova-consumer/client?port=${port}`);
          }
        });
      });
    }

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

export default NovaConsumerPlugin;
