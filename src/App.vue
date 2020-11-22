<template>
  <div id="app">
    <div class="content">
      <List
        v-if="isList"
      />
      <Setting
        v-if="isSetting"
      />
    </div>
    <Menu
      class="menu"
      :active.sync="route"
    />
  </div>
</template>

<script>
import Setting from './components/Setting.vue';
import List from './components/List.vue';
import Menu from './components/Menu.vue';

export default {
  name: 'App',
  components: {
    Setting,
    List,
    Menu,
  },
  data() {
    return {
      route: 'list',
    };
  },
  computed: {
    isSetting() {
      return this.route === 'settings';
    },
    isList() {
      return this.route === 'list';
    },
  },
};
</script>

<style lang="scss">
  @import "../style/Reset.scss";
  @import "../style/App.scss";
</style>
