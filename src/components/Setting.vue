<template>
  <ul>
    
  </ul>
</template>

<script>

export default {
  name: "Settings",
  computed: {
    message: {
      get () {
        return this.$store.state.settings.message
      },
      set (val) {
        this.update('message', val);
      }
    }
  },
  methods: {
    update(where, value){
      this.$store.commit('updateSettings', { 
        [ where ] : value
      });
    }
  }
};
</script>