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
