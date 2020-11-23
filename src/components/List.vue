<template>
  <ul v-if="items"
    :class="{ center: !items.length }">
    <Item
      v-for="(item, index) in items"
      :key="index"
      v-bind="item"
      @open="open"
      @remove="remove"
      @update="update"
    />
    <h2 v-if="!items.length">Agrega un item</h2>
  </ul>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Action } from '../config/types.json';

import Item from './Item.vue';

export default {
  name: 'List',
  components: {
    Item,
  },
  computed: mapState({
    items: (state) => state.items,
  }),
  methods: mapActions({
    update: Action.UPDATE_BY_ID,
    remove: Action.REMOVE_ITEM,
    open: Action.OPEN_TAB,
  }),
};
</script>
