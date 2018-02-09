<template>
  <q-data-table :data="users" :config="config" :columns="columns">

    <!-- Last name -->
    <template slot="col-lastName" slot-scope="cell">
      <span class="light-paragraph">{{cell.row.profile.lastName}}</span>
    </template>

    <!-- First name -->
    <template slot="col-firstName" slot-scope="cell">
      <span class="light-paragraph">{{cell.row.profile.firstName}}</span>
    </template>

    <!-- Age -->
    <template slot="col-age" slot-scope="cell">
      <span class="light-paragraph">{{cell.row.profile.age}}</span>
    </template>

    <!-- Nationality -->
    <template slot="col-nationality" slot-scope="cell">
      <span class="light-paragraph">{{cell.row.profile.nationality}}</span>
    </template>

    <!-- Vehicles -->
    <template slot="col-vehicles" slot-scope="cell">
      <span class="light-paragraph">{{cell.data.length}}</span>
    </template>
  </q-data-table>
</template>

<script>
import UserService from 'services/UserService'

export default {
  data() {
    return {
      users: [],
      config: {
        rowHeight: '50px',
        title: this.$t('side_menu.users_management')
      },
      columns: [
        { label: 'Email', field: 'email' },
        { label: 'Last name', field: 'lastName' },
        { label: 'First name', field: 'firstName' },
        { label: 'Age', field: 'age' },
        { label: 'Nationality', field: 'nationality' },
        { label: 'Role', field: 'role' },
        { label: 'Number of vehicles', field: 'vehicles' }
      ]
    }
  },
  created() {
    UserService.getAllUsers().then(response => (this.users = response.data.users))
  }
}
</script>
