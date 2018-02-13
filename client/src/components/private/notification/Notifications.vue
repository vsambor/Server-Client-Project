<template>
  <q-data-table :data="notifications" :config="config" :columns="columns" @selection="onSelectionChanged" @rowclick="onRowClicked">
    <template slot="selection" slot-scope="selection">
      <!-- Delete -->
      <q-btn flat :color="$store.getters.currentTheme" @click="onDeleteNotifications">
        <q-icon name="delete" />
        <q-tooltip>{{$t('general.delete')}}</q-tooltip>
      </q-btn>
    </template>
  </q-data-table>
</template>

<script>
import UserService from 'services/UserService'
import moment from 'moment'
import { Bus, BusEvent } from 'helpers/Bus'
import { Dialog } from 'quasar-framework'

export default {
  data() {
    return {
      notifications: [],
      selectedIds: [],
      config: {
        rowHeight: '50px',
        title: this.$t('general.notifications'),
        selection: 'multiple',
        pagination: {
          rowsPerPage: 5,
          options: [5, 10, 15, 30, 50]
        }
      },
      columns: [
        { label: 'title', field: 'title' },
        { label: 'body', field: 'body' },
        {
          label: 'date',
          field: 'date',
          format(value) {
            return moment(value).format('MM/DD/YYYY')
          }
        },
        { label: 'isRead', field: 'isRead' }
      ]
    }
  },
  created() {
    this.refreshTable()
  },
  methods: {
    /**
     * Handles the table event of selecting rows and provides information about the selected rows.
     *
     * @param {Number} selectedNumber - the number of selected rows.
     * @param {Number} selectedArray - all data of selected as an array.
     */
    onSelectionChanged(selectedNumber, selectedArray) {
      if (selectedArray.length > 0) {
        this.selectedIds = selectedArray.map(item => item.data._id)
      }
    },

    /**
     * Handles the table delete button. Basicaly it sends a delete event to the backend with selected notifications ids.
     */
    onDeleteNotifications() {
      Dialog.create({
        title: this.$t('confirm.title'),
        message: this.$t('confirm.remove_notifications'),
        buttons: [
          this.$t('general.cancel'),
          {
            label: this.$t('general.yes'),
            handler: () => {
              UserService.deleteNotifications(this.$store.getters.currentUser._id, this.selectedIds).then(response => {
                this.notifications = response.data.notifications

                // Emits an event which is listened in the <NotificationIcon> component.
                Bus.$emit(BusEvent.NOTIFICATIONS_UPDATED)
              })
            }
          }
        ]
      })
    },

    /**
     * Gets the fresh table data from the server.
     */
    refreshTable() {
      UserService.getAllUserNotifications(this.$store.getters.currentUser._id).then(response => (this.notifications = response.data.notifications))
    },

    /**
     * Handles the row click event; redirects to the clicked notification details page.
     *
     * @param {Object} row - the clicked row data.
     */
    onRowClicked(row) {
      this.$router.push({ name: 'notification', params: { id: row._id } })
    }
  }
}
</script>
