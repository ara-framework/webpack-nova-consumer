# webpack-nova-consumer

This webpack plugin enables to add external links from Nova bundles inside the consumer pages using the `html-webpack-plugin` hooks.


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
          entry: 'http://localhost:8080/client.js',
          views: [
            'ExampleView'
          ]
        }
      ]
    })
  ]
}
```

### Live Reload

The plugin creates a socket connection for each Nova that is running with `webpack-dev-server` in development mode. Then the page is reload everytime that the Nova code is compiled with webpack. 


### Lazy Load

Lazy load is enabled by default when webpack runs in production mode. It generates a script file that loads the Nova `entry` when a view listed in the `views` field is placed in the page using the [Nova Bridge](https://ara-framework.github.io/website/docs/nova-bridge)

Example using [nova-vue-bridge](https://www.npmjs.com/package/nova-vue-bridge):

```vue
<template>
  <div class="container">
    <nova name="ExampleView" :data="{ title: 'Ara Framework' }" />
  </div>
</template>
```

The entry point `http://localhost:8080/client.js` is loaded when Vue.js mounts the example component above.
