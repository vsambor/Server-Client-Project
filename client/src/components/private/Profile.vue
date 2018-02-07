<template>
  <div class="row justify-center">
    <div class="col-12 col-md-5">
      <q-card class="text-center">

        <!-- Picture -->
        <img :src="$store.getters.currentUser.profile.picture" class="picture p-20">

        <q-card-separator />

        <!-- Last Name and First Name -->
        <h4>{{$store.getters.currentUser.profile.lastName}} {{$store.getters.currentUser.profile.firstName}}</h4>

        <!-- Role -->
        <q-item>
          <q-item-side>
            <q-item-tile icon="perm identity" />
          </q-item-side>
          <q-item-main>
            <q-item-tile label>{{$t('general.role')}}</q-item-tile>
            <q-item-tile sublabel>{{$store.getters.currentUser.role}}</q-item-tile>
          </q-item-main>
        </q-item>

        <!-- Email -->
        <q-item>
          <q-item-side>
            <q-item-tile icon="mail" />
          </q-item-side>
          <q-item-main>
            <q-item-tile label>{{$t('attributes.email')}}</q-item-tile>
            <q-item-tile sublabel>{{$store.getters.currentUser.email}}</q-item-tile>
          </q-item-main>
        </q-item>

        <!-- Age -->
        <q-item>
          <q-item-side>
            <q-item-tile icon="history" />
          </q-item-side>
          <q-item-main>
            <q-item-tile label>{{$t('attributes.age')}}</q-item-tile>
            <q-item-tile sublabel>{{$store.getters.currentUser.profile.age}}</q-item-tile>
          </q-item-main>
        </q-item>

        <!-- Nationality -->
        <q-item>
          <q-item-side>
            <q-item-tile icon="flag" />
          </q-item-side>
          <q-item-main>
            <q-item-tile label>{{$t('attributes.nationality')}}</q-item-tile>
            <q-item-tile sublabel>{{$store.getters.currentUser.profile.nationality}}</q-item-tile>
          </q-item-main>
        </q-item>

        <!-- Vehicles -->
        <q-item>
          <q-item-side>
            <q-item-tile icon="motorcycle" />
          </q-item-side>
          <q-item-main>
            <q-item-tile label>{{$t('profile.vehicles_number')}}</q-item-tile>
            <q-item-tile sublabel>{{$store.getters.currentUser.vehicles.length}}</q-item-tile>
          </q-item-main>
        </q-item>

        <q-card-separator />

        <!-- Edit button -->
        <q-card-actions>
          <q-btn @click="$router.push('profile/edit')" icon-right="mode edit" :color="$store.getters.currentTheme" class="full-width">{{$t('general.edit')}}</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
.picture {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
