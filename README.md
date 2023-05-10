# VuePagesBuilder

> Transform file system directory into vue-router routes using [webpack](https://webpack.js.org)

Only works with webpack. Resulting route structure and file naming rules should be similar to [Nuxt Pages](https://nuxtjs.org/docs/directory-structure/pages).

Turns out you don't need Vite or compile-time plugins.

# Getting started

```
npm i Heniker/vue-route-builder
```

# Usage

```js
import * as Router from 'vue-router'
import { buildPages } from 'vue-pages-builder'

const routes = [
  ...otherRoutes,
  ...buildPages(
    require.context('./pages', true, /.*\.vue/, 'weak'),
    require.context('./pages', true, /.*\.vue/, 'lazy' /* or any other except weak */)
  ),
]

Router.createRouter({ routes})
```

It should work exactly the same way as [Nuxt Pages](https://nuxtjs.org/docs/directory-structure/pages) directory does.

# Notes

In order to get TS types for `require.context` it is possible to `npm i @types/webpack-env -D`<br/>
You may also need to specify
```json
{
  "compilerOptions": {
    "types": ["webpack", "webpack-env"],
  }
}
```
in `tsconfig.json`

# Questions

### For which `vue-router` version this code works?
I tested it with `"vue-router": "^4.0.11"`, but version 4 did not introduce route structure changes. It should probably work with `vue-router 3`, although there might be TS erros.

### What's that `require.context`?
It's a webpack thing one can use to explicitly create a chunk. More info here - [webpack requirecontext](https://webpack.js.org/api/module-methods/#requirecontext) and here - [webpack dynamic expressions](https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import). I'd even suggest reading full webpack documentation, it's pretty rad.

### Why function accepts 2 *same* arguments?
First argument - `weak context` is required to list files in way that doesn't pull them into the bundle.

The second argument is what does the actual components import and I decided to expose it for easier control. You can choose how you want your pages to be loaded (lazy-loading, include into the main bundle, or use seperate bundle and load altogether). More info in that rad webpack documentation - [possible options other than 'lazy'](https://webpack.js.org/api/module-methods/#magic-comments), [more about context](https://webpack.js.org/guides/dependency-management/#requirecontext)

# Similar projects
[Nuxt Pages](https://nuxtjs.org/docs/directory-structure/pages/)

[vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages)