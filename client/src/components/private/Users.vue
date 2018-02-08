<template>
  <q-data-table :data="users" :config="config" :columns="columns">
    <!-- Email -->
    <template slot="col-message" scope="users">
      <span class="light-paragraph">{{users.email}}</span>
    </template>

    <!-- Last name -->
    <template slot="col-message" scope="users">
      <span class="light-paragraph">{{users.profile.lastName}}</span>
    </template>

    <!-- First name -->
    <template slot="col-message" scope="users">
      <span class="light-paragraph">{{users.profile.firstName}}</span>
    </template>

    <!-- Age -->
    <template slot="col-message" scope="users">
      <span class="light-paragraph">{{users.profile.age}}</span>
    </template>

    <!-- Nationality -->
    <template slot="col-message" scope="users">
      <span class="light-paragraph">{{users.profile.nationality}}</span>
    </template>

    <!-- Role -->
    <template slot="col-message" scope="users">
      <span class="light-paragraph">{{users.role}}</span>
    </template>

    <!-- Vehicles -->
    <template slot="col-message" scope="users">
      <span class="light-paragraph">{{users.vehicles.lenght}}</span>
    </template>
  </q-data-table>
</template>

<script>
import UserService from 'services/UserService'

export default {
  data() {
    return {
      users: {},
      config: {
        rowHeight: '50px',
        title: 'Users Management'
      },
      columns: [
        {
          label: 'Email',
          field: 'email'
        },
        {
          label: 'Last name',
          field: 'lastName'
        },
        {
          label: 'First name',
          field: 'firstName'
        },
        {
          label: 'Age',
          field: 'age'
        },
        {
          label: 'Nationality',
          field: 'nationality'
        },
        {
          label: 'Role',
          field: 'role'
        },
        {
          label: 'Number of vehicles',
          field: 'vehicles'
        }
      ]
    }
  },
  created() {
    UserService.getUsers().then(response => {
      console.log(response.data.users)
      this.users = response.data.users
    })
  }
}
</script>

<style scoped>

</style>
