<template>
  <div class="row justify-center">
    <div class="col-12 col-md-5">
      <q-card>
        <q-card-title class="text-center">{{$t('profile.edit_title')}}</q-card-title>
        <q-card-separator />
        <q-card-main>

          <!-- Picture upload -->
          <q-uploader :url="url" :color="$store.getters.currentTheme" extensions=".jpg,.jpeg,.png" :after="[ { } ]" />

          <!-- First Name -->
          <q-field :error="errors.has('firstName')" :error-label="errors.first('firstName')">
            <q-input type="text" v-model="firstName" v-validate="'required'" name="firstName" :float-label="star($t('attributes.firstName'))" />
          </q-field>

          <!-- Last Name -->
          <q-field :error="errors.has('lastName')" :error-label="errors.first('lastName')">
            <q-input type="text" v-model="lastName" v-validate="'required'" name="lastName" :float-label="star($t('attributes.lastName'))" />
          </q-field>

          <!-- Age -->
          <q-field :error="errors.has('age')" :error-label="errors.first('age')">
            <q-input type="text" v-model="age" v-validate="'required'" name="age" :float-label="star($t('attributes.age'))" />
          </q-field>

          <!-- Nationality -->
          <q-field :error="errors.has('nationality')" :error-label="errors.first('nationality')">
            <q-input type="text" v-model="nationality" v-validate="'required'" name="nationality" :float-label="star($t('attributes.nationality'))" />
          </q-field>

        </q-card-main>

        <!-- Save button -->
        <q-card-actions>
          <q-btn @click="validateAndSubmit" :disabled="errors.any()" icon-right="forward" :color="$store.getters.currentTheme" type="submit" class="full-width">{{$t('general.save')}}</q-btn>
          <div class="row full-width justify-center mt-10">
            <q-btn flat color="primary" @click="resetAndClearErrors">{{$t('general.reset')}}</q-btn>
            <q-btn flat color="primary">{{$t('general.change_password')}}</q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import FormMixin from 'mixin/FormMixin'
// import { Alert, Toast } from 'quasar-framework'
import 'quasar-extras/animate/bounceInRight.css'
import 'quasar-extras/animate/bounceOutRight.css'

export default {
  mixins: [FormMixin],
  data() {
    return {
      firstName: '',
      lastName: '',
      age: '',
      nationality: ''
    }
  },
  methods: {
    submitForm() {}
  }
}
</script>


<style scoped>
.picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
