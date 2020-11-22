<template>
  <button
    @click="$emit('is', url)"
    :disabled="!isActive">
    agregar
    <i name="plus" />
  </button>
</template>

<script>
import { listDomains } from '../utils';

export default {
  name: 'Add',
  data() {
    return { url: 'https://www.linio.com.co/p/celular-xiaomi-redmi-note-8-64gb-4-ram-azul-n5aio8' };
  },
  mounted() {
    // browser.tabs.query({active: true, currentWindow: true})
    //  .then(([tab]) => this.url = tab.url );
  },
  computed: {
    isActive() {
      return !!this.url
        && listDomains.some((run) => run.exec(this.url));
    },
  },
};
</script>
