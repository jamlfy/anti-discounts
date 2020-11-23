<template>
  <nav>
    <Add
      class="big"
      @is="add"
    />
    <template v-for="(text, id ) in $options.Links">
      <button
        :class="['nav-button', id]"
        :key="id"
        v-if="id !== active"
        @click.prevent="$emit('update:active', id)"
      >
        <span v-text="text" />
        <FontIcon :icon="icon" />
      </button>
    </template>
  </nav>
</template>

<script>
import { faCog, faList } from '@fortawesome/free-solid-svg-icons';
import { mapActions } from 'vuex';
import { Action } from '../config/types.json';
import Add from './Add.vue';

export const Links = {
  settings: 'Settings',
  list: 'List',
};

export default {
  name: 'Menu',
  Links,
  components: {
    Add,
  },
  props: {
    active: {
      type: String,
      validation: (val) => !!Links[val],
    },
  },
  computed: {
    icon() {
      return {
        list: faCog,
        settings: faList,
      }[this.active];
    },
  },
  methods: mapActions({
    add: Action.ADD_ITEM,
  }),
};
</script>

<style lang="scss">
  @import "../style/Menu.scss";
</style>
