<template>
  <div>
    <!-- Notification button -->
    <q-btn flat>

      <span v-if="hasNewNotif" class="bg-red unread-tag" style="z-index:3">{{activeNotifications}}</span>
      <q-icon :name="hasNewNotif ? 'notifications active' : 'notifications none'" :class="{shake : hasNewNotif}" />
      <q-tooltip>{{$t('general.notifications')}}</q-tooltip>

      <q-popover ref="popoverNotification">
        <q-list class="q-list-link p-0" style="min-width: 333px; max-width: 333px;" hightlight insert-separator>
          <h6 class="caption text-center text-white bg-teal p-5 m-0">{{$t('notification.title')}}</h6>

          <q-item v-if="notifEmpty">
            <q-item-main>{{$t('notification.empty')}}</q-item-main>
          </q-item>

          <!-- Loops through all notifications. -->
          <q-item v-else v-for="notification in notifications" :key="notification._id" @click="onNotificationClick(notification)">
            <q-item-main>
              <q-item-tile label>{{notification.title}}</q-item-tile>
              <q-item-tile sublabel lines="1">{{notification.body}}</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <span v-if="!notification.isRead" class="new-notif bg-red text-white">{{$t('general.new')}}</span>
              <q-item-tile stamp>{{moment(notification.date).fromNow()}}</q-item-tile>
            </q-item-side>
          </q-item>
        </q-list>
      </q-popover>
    </q-btn>
  </div>
</template>

<script>
import UserService from 'services/UserService'
import { Bus, BusEvent } from 'helpers/Bus'

export default {
  sockets: {
    /**
     * Connects to the server on the socket port provided in the main.js.
     */
    connect() {
      console.log('socket connected')
    },

    /**
     * Listens on the <notification> socket message and handles the new arrived notification.
     *
     * @param {Object} serverNotification - the notification object provided from the server via socket.emit.
     */
    notification(serverNotification) {
      this.notifications.unshift(serverNotification)

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
    /**
     * A shortcut which checks if there are any available notifications.
     */
    notifEmpty() {
      return this.notifications.length === 0
    },

    /**
     * Returns true if there is at least 1 unread notification.
     */
    hasNewNotif() {
      return this.activeNotifications > 0
    },

    /**
     * Counts the number of notifications which are not read.
     */
    activeNotifications() {
      return this.notifications.reduce((prev, curr) => {
        if (!curr.isRead) {
          ++prev
        }
        return prev
      }, 0)
    }
  },
  created() {
    this.updateNotifications()

    // Listens to notifications updated event and updates the view accordingly.
    Bus.$on(BusEvent.NOTIFICATIONS_UPDATED, this.updateNotifications)
  },
  methods: {
    /**
     * Handles the notification item click.
     *
     * @param {Object} not - the clicked notification.
     */
    onNotificationClick(not) {
      if (!not.isRead) {
        UserService.updateNotification(this.$store.getters.currentUser._id, not._id, { isRead: true }).then(result => {
          this.notifications = result.data.notifications
        })
      }
      // Redirect to the notification details.
      this.$router.replace({ name: 'notification', params: { id: not._id } })

      // Closes the popover by ref name.
      this.$refs.popoverNotification.close()
    },

    updateNotifications() {
      UserService.getAllUserNotifications(this.$store.getters.currentUser._id).then(response => (this.notifications = response.data.notifications))
    }
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

.q-item-main {
  max-width: 200px;
}
</style>
