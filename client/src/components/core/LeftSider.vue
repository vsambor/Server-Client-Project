<template>
  <q-list no-border link inset-separator>
    <q-list-header>User menu</q-list-header>
    <q-side-link v-if="$store.getters.isLogged" item to="/profile">
      <q-item-side icon="account circle" />
      <q-item-main :label="$t('general.profile')" :sublabel="$t('side_menu.user_profile')" />
    </q-side-link>

    <q-side-link v-if="$store.getters.isLogged" item to="/vehicles">
      <q-item-side icon="directions car" />
      <q-item-main :label="$t('general.vehicles')" :sublabel="$t('side_menu.about_vehicles')" />
    </q-side-link>

    <q-side-link v-if="$store.getters.isLogged" item to="/notifications">
      <q-item-side icon="event available" />
      <q-item-main :label="$t('general.notifications')" :sublabel="$t('side_menu.notifications_check')" />
    </q-side-link>

    <q-side-link v-if="$store.getters.isLogged" item to="/settings">
      <q-item-side icon="settings" />
      <q-item-main :label="$t('general.settings')" :sublabel="$t('side_menu.user_settings')" />
    </q-side-link>

    <q-side-link v-if="$store.getters.isLogged && $store.getters.isAdmin" item to="/users">
      <q-item-side icon="fa-users" />
      <q-item-main :label="$t('general.users')" :sublabel="$t('side_menu.users_management')" />
    </q-side-link>

    <q-side-link v-if="$store.getters.isLogged && $store.getters.isAdmin" item to="/search-engine">
      <q-item-side icon="search" />
      <q-item-main :label="$t('general.search_engine')" :sublabel="$t('side_menu.search_engine')" />
    </q-side-link>

    <q-side-link item to="/about">
      <q-item-side icon="info" />
      <q-item-main :label="$t('general.about')" :sublabel="$t('side_menu.about_app')" />
    </q-side-link>
  </q-list>
</template>
