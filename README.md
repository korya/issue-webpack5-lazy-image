# issue-webpack5-lazy-image

Repo demonstrating a problem with webpack@5 and v-lazy-image used in Vue2 app

Checkout Github Action in this repository to see the actual error.

### Problem

When trying to use `v-lazy-image` with Vue2 as follows:

```vue
<template>
  <VLazyImage :src="src" />
</template>

<script>
import VLazyImage from 'v-lazy-image/v2';

export default {
  components: {
    VLazyImage,
  },

  props: {
    src: { type: String, required: true },
  },
};
</script>
```

Webpack fails to build the project with the following error:

> Module not found: Error: Package path ./v2 is not exported from package /Users/korya/dev/issue-webpack5-lazy-image/node_modules/v-lazy-image (see exports field in /Users/korya/dev/issue-webpack5-lazy-image/node_modules/v-lazy-image/package.json)

The full output is:


```sh
 $ npm run build

> issue-webpack5-lazy-image@1.0.0 build
> webpack

asset main.js 245 KiB [emitted] (name: main)
runtime modules 891 bytes 4 modules
cacheable modules 228 KiB
  modules by path ./src/ 2.13 KiB
    ./src/index.js 239 bytes [built] [code generated]
    ./src/Lazy.vue 1.05 KiB [built] [code generated]
    ./src/Lazy.vue?vue&type=template&id=1491c226& 196 bytes [built] [code generated]
    ./src/Lazy.vue?vue&type=script&lang=js& 250 bytes [built] [code generated]
    ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Lazy.vue?vue&type=template&id=1491c226& 249 bytes [built] [code generated]
    ./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Lazy.vue?vue&type=script&lang=js& 173 bytes [built] [code generated]
  modules by path ./node_modules/ 226 KiB
    ./node_modules/vue/dist/vue.runtime.esm.js 223 KiB [built] [code generated]
    ./node_modules/vue-loader/lib/runtime/componentNormalizer.js 2.63 KiB [built] [code generated]

ERROR in ./src/Lazy.vue?vue&type=script&lang=js& (./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Lazy.vue?vue&type=script&lang=js&) 6:0-41
Module not found: Error: Package path ./v2 is not exported from package /Users/korya/dev/issue-webpack5-lazy-image/node_modules/v-lazy-image (see exports field in /Users/korya/dev/issue-webpack5-lazy-image/node_modules/v-lazy-image/package.json)
 @ ./src/Lazy.vue?vue&type=script&lang=js& 1:0-116 1:132-135 1:137-250 1:137-250
 @ ./src/Lazy.vue 2:0-56 3:0-51 3:0-51 9:2-8
 @ ./src/index.js 2:0-30 6:16-20

webpack 5.72.1 compiled with 1 error in 379 ms
```

### Workaround

A workaround that I've found is to add `v2/` to the `exports` field of
`v-lazy-image`'s `package.json`:

```json
  ...
  "exports": {
    ".": {
      "import": "./dist/v-lazy-image.mjs",
      "require": "./dist/v-lazy-image.js"
    },
    "./v2": {
      "import": "./v2/v-lazy-image.mjs",
      "require": "./v2/v-lazy-image.js"
    }
  },
  ...
```

The fix is available at [`fix.diff`](./fix.diff).
