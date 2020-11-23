<template>
  <button
    @click="$emit('is', cleanUrl)"
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
      url: '',
    };
  },
  mounted() {
    this.getUrl();
  },
  computed: {
    cleanUrl() {
      const urlObj = new URL(this.url);
      urlObj.search = '';
      return urlObj.toString();
    },
    isActive() {
      return !!this.url
        && findByDomain(this.url)
        && this.items.every(({ url }) => url !== this.cleanUrl);
    },
    icon() {
      return faPlus;
    },
    ...mapState({
      items: (state) => state.items,
    }),
  },
  methods: {
    getUrl() {
      /*eslint-disable */
      browser.tabs.query({ active: true, currentWindow: true })
        .then((tabs) => this.url = tabs[0].url);
    },
  },
};
</script>
