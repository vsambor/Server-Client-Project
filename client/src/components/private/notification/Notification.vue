<template>
  <div>
    <h3>{{notification.title}}</h3>

    <h5>{{notification.body}}</h5>

    <p>{{notification.date}}</p>

    <q-btn @click="onRemove" color="negative">{{$t('general.delete')}}</q-btn>
  </div>
</template>

<script>
import { NotificationEntity } from 'helpers/EntityHelper'
import UserService from 'services/UserService'
import { Bus, BusEvent } from 'helpers/Bus'
import { Dialog } from 'quasar-framework'
import moment from 'moment'

export default {
  data() {
    return {
      notification: NotificationEntity
    }
  },
  watch: {
    '$route.params.id'() {
      this.getCurrentNotification()
    }
  },
  created() {
    this.getCurrentNotification()
  },
  methods: {
    onRemove() {
      Dialog.create({
        title: this.$t('confirm.title'),
        message: this.$t('confirm.generic_question'),
        buttons: [
          this.$t('general.cancel'),
          {
            label: this.$t('general.yes'),
            handler: () => {
              UserService.deleteNotifications(this.$store.getters.currentUser._id, this.notification._id).then(response => {
                // Emits an event which is listened in the <NotificationIcon> component.
                Bus.$emit(BusEvent.NOTIFICATIONS_UPDATED)

                // Redirects to notifications page.
                this.$router.push({ name: 'notifications' })
              })
            }
          }
        ]
      })
    },
    getCurrentNotification() {
      UserService.getUserNotification(this.$store.getters.currentUser._id, this.$route.params.id).then(response => {
        this.notification = response.data.notification
        this.notification.date = moment(this.notification.date).format('MM/DD/YYYY')
      })
    }
  }
}
</script>

<style>

</style>
