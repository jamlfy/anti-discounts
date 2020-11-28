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

const Query = {
  active: true,
  currentWindow: true,
};
// eslint-disable-next-line no-undef
const { tabs } = EXTENSION;

export default {
  name: 'Add',
  data() {
    return {
      url: '',
    };
  },
  mounted() {
    this.getUrl();
    tabs.onActivated.addListener(this.getUrl);
  },
  beforeDestroy() {
    tabs.onActivated.removeListener(this.getUrl);
  },
  computed: {
    cleanUrl() {
      const urlObj = new URL(this.url);
      urlObj.search = '';
      return urlObj.toString();
    },
    isActive() {
      return !!this.url
        && !!findByDomain(this.cleanUrl)
        && this.items.every(({ id }) => id !== btoa(this.cleanUrl));
    },
    icon() {
      return faPlus;
    },
    ...mapState({
      items: (state) => state.items,
    }),
  },
  methods: {
    query() {
      // eslint-disable-next-line no-undef
      if (IS_CHROME) {
        return new Promise((resolve) => tabs.query(Query, resolve));
      }

      return tabs.query(Query);
    },
    async getUrl() {
      try {
        const [tab] = await this.query();
        this.url = tab.url;
      } catch (e) {
        this.url = '';
      }
    },

  },
};
</script>
