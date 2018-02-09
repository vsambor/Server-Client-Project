<template>
  <!-- Notification button -->
  <q-btn v-if="$store.getters.isLogged" flat @click="onNotificationClick">
    <q-icon name="notifications none" />
    <q-tooltip>{{$t('general.notifications')}}</q-tooltip>
  </q-btn>
</template>

<script>
export default {
  sockets: {
    connect: function() {
      console.log('socket connected')
    },
    notification: function(val) {
      console.log('Notification from server: ' + JSON.stringify(val))
    }
  },
  methods: {
    /**
     * Example of how to send data to server via socket.
     */
    clickButton: function(val) {
      // $socket is socket.io-client instance
      this.$socket.emit('emit_method', val)
    },
    onNotificationClick() {}
  }
}
</script>

<style>

</style>
