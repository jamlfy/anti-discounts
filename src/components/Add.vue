<template>
  <button
    @click="click"
    :disabled="!isActive">
    <span v-text="'agregar'" />
    <FontIcon :icon="icon" />
  </button>
</template>

<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { mapState } from 'vuex';
import { findByDomain } from '../utils';

export default {
  name: 'Add',
  data() {
    return {
      url: 'https://www.linio.com.co/p/samsung-galaxy-a01-core-16gb-rojo-oq6vec',
    };
  },
  mounted() {
    // browser.tabs.query({active: true, currentWindow: true})
    //  .then(([tab]) => this.url = tab.url );
  },
  computed: {
    isActive() {
      return !!this.url
        && findByDomain(this.url)
        && this.items.every(({ url }) => url !== this.url);
    },
    icon() {
      return faPlus;
    },
    ...mapState({
      items: (state) => state.items,
    }),
  },
  methods: {
    click() {
      this.num += 1;
      this.$emit('is', this.url);
    },
  },
};
</script>
