<template>
  <div>
    <!-- Notification button -->
    <q-btn v-if="$store.getters.isLogged" flat @click="onNotificationClick">

      <span v-if="!notifEmpty" class="bg-red unread-tag" style="z-index:3">{{notifications.length}}</span>
      <q-icon :name="notifEmpty ? 'notifications none' : 'notifications active'" :class="{shake : !notifEmpty}" />
      <q-tooltip>{{$t('general.notifications')}}</q-tooltip>

      <q-popover ref="popover-notif">
        <q-list class="q-list-link p-0" style="min-width: 333px; max-width: 333px;" hightlight insert-separator>
          <h6 class="caption text-center text-white bg-teal p-5 m-0">Notifications </h6>

          <q-item v-if="notifEmpty">
            <q-item-main>{{$t('notification.empty')}}</q-item-main>
          </q-item>

          <!-- Loops through all notifications. -->
          <q-item v-else v-for="notification in notifications" :key="notification.id" @click="onNotificationClick(notification)">

            <q-item-main>
              <q-item-tile label>{{notification.title}}</q-item-tile>
              <q-item-tile sublabel lines="1">{{notification.message}}</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <span class="new-notif bg-red text-white">new</span>
              <q-item-tile stamp>{{moment(notification.date).fromNow()}}</q-item-tile>
            </q-item-side>
          </q-item>
        </q-list>
      </q-popover>
    </q-btn>
  </div>
</template>

<script>
export default {
  sockets: {
    connect: function() {
      console.log('socket connected')
    },
    notification(val) {
      console.log('Notification from server: ' + JSON.stringify(val))
      this.notifications.push(val)

      // Plays a notification sound when there is a new notification.
      new Audio(require('../../../static/notification.ogg')).play()
    }
  },
  data() {
    return {
      notifications: [],
      moment: require('moment')
    }
  },
  computed: {
    // A shortcut for checking if there are notifications.
    notifEmpty() {
      return this.notifications.length === 0
    }
  },
  methods: {
    /**
     * Example of how to send data to server via socket.
     */
    clickButton(val) {
      // $socket is socket.io-client instance
      this.$socket.emit('emit_method', val)
    },
    onNotificationClick() {}
  }
}
</script>

<style>
.unread-tag {
  position: absolute;
  padding: 3px;
  line-height: 1em;
  font-size: 10px;
  top: -3px;
  right: 15px;
  border-radius: 2px;
}

.new-notif {
  padding: 3px;
  line-height: 1em;
  font-size: 10px;
  border-radius: 2px;
}

@keyframes shake {
  0% {
    transform: rotate(0deg);
  }
  80% {
    transform: rotate(2deg);
  }
  85% {
    transform: rotate(10deg);
  }
  95% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.shake {
  display: inline-block;
  animation: shake 2.5s infinite;
}

.shake:hover {
  animation: none;
}
</style>
