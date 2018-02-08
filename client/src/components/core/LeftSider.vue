<template>
  <q-list no-border link inset-separator>
    <q-list-header>User menu</q-list-header>
    <q-side-link v-if="$store.getters.isLogged" item to="/profile">
      <q-item-side icon="account circle" />
      <q-item-main :label="$t('general.profile')" sublabel="User profile" />
    </q-side-link>
    <q-side-link v-if="$store.getters.isLogged" item to="/notifications">
      <q-item-side icon="event available" />
      <q-item-main :label="$t('general.notifications')" sublabel="Check all notifications" />
    </q-side-link>

    <q-side-link v-if="$store.getters.isLogged" item to="/settings">
      <q-item-side icon="settings" />
      <q-item-main :label="$t('general.settings')" sublabel="User settings" />
    </q-side-link>

    <q-side-link item to="/users">
      <q-item-side icon="view list" />
      <q-item-main :label="$t('general.users')" sublabel="Users management" />
    </q-side-link>

    <q-side-link item to="/about">
      <q-item-side icon="info" />
      <q-item-main :label="$t('general.about')" sublabel="About app" />
    </q-side-link>
  </q-list>
</template>
