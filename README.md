This is something like **nuxt routing by pages directory**

Use it like this:

```js
const routes = [
  ...otherRoutes,
  ...buildPages(
    require.context('./pages', true, /.*/, 'weak'),
    require.context('./pages', true, /.*/, 'lazy' /* or any other except weak */)
  ),
]
```

It should work exactly the same way as nuxt `pages` directory does.
See `test/1` for examples.
