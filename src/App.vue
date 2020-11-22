<template>
  <div id="app">
    <List v-if="isList" />
    <Setting v-if="isSetting" />
    <Menu :active.sync="route" />
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
