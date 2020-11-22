<template>
  <ul>

  </ul>
</template>

<script>
import { Mutation } from '../config/types.json';

export default {
  name: 'Settings',
  computed: {
    message: {
      get() {
        return this.$store.state.settings.message;
      },
      set(val) {
        this.update('message', val);
      },
    },
  },
  methods: {
    update(where, value) {
      this.$store.commit(Mutation.UPDATE_SETTING, {
        [where]: value,
      });
    },
  },
};
</script>
