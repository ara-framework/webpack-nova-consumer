# webpack-nova-consumer

This webpack plugin enable us to add external links from Nova bundles inside the page using the `html-webpack-plugin` hooks.


## Install

```shell
npm i --save-dev webpack-nova-consumer
```

## Usage

### Plugin
Add the plugin in the webpack configuration passing the Nova entry endpoints.

```js
module.exports = {
  ...
  plugins: [
    new NovaConsumerPlugin({
      novas: [
        {
          entry: 'http://localhost:8080/client.js'
        }
      ]
    })
  ]
}
```

### Live Reload

This plugin create a socket connection for each Nova that is running with `webpack-dev-server` in development mode. Then the page is reload everytime that the Nova code is compiled with webpack. 

