<template>
  <nav>
    <Add @is="add" />
    <template v-for="(text, id ) in $options.Links">
      <a
        href="#"
        :key="id"
        :class="{ 'active': id === active }"
        @click.prevent="$emit('update:active', id)"
        v-text="text"
      />
    </template>
  </nav>
</template>

<script>
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
  methods: mapActions({
    add: Action.ADD_ITEM,
  }),
};
</script>
