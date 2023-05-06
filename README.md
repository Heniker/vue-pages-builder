### VueRouteBuilder

> A tool to transform directory into vue-router routes

Only works with webpack. Resulting route structure and file naming rules should be similar to [Nuxt Pages](https://nuxtjs.org/docs/directory-structure/pages).

Use it like this:

```js
const routes = [
  ...otherRoutes,
  ...buildPages(
    require.context('./pages', true, /.*\.vue/, 'weak'),
    require.context('./pages', true, /.*\.vue/, 'lazy' /* or any other except weak */)
  ),
]
```

It should work exactly the same way as nuxt `pages` directory does.
See `test/1` for examples.

### Installation
Code is not published to npm ATM, but it is possible to specify

```js
"vue-route-builder": "Heniker/vue-route-builder"
```

in your `package.json` and it should just work (at lest it worked last time I tried).

Although I would suggest forking this repo instead and using your own URL as I can't promise I won't break anything here in the future.

In order to get TS types for require.context it is possible to install `@types/webpack-env`

### Questions you probably already know the answer to

#### For which `vue-router` version this code works?
I tested it with `"vue-router": "^4.0.11"`, but version 4 did not introduce route structure changes. It should probably work with `vue-router 3`, although there might be TS erros.

#### What's that `require.context`?
It's a webpack thing one can use to explicitly create a chunk. More info here - [webpack requirecontext](https://webpack.js.org/api/module-methods/#requirecontext) and here - [webpack dynamic expressions](https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import). I'd even suggest reading full webpack documentation, it's pretty rad.

#### Why function accepts 2 *same* arguments?
First argument - `weak context` is required to list files in way that doesn't pull them into the bundle.

The second argument is what does the actual components import and I decided to expose it for easier control. You can choose how you want your pages to be loaded (lazy-loading, include into the main bundle, or use seperate bundle and load altogether). More info in that rad webpack documentation - [possible options other than 'lazy'](https://webpack.js.org/api/module-methods/#magic-comments), [more about context](https://webpack.js.org/guides/dependency-management/#requirecontext)
