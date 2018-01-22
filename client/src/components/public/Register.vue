<template>
  <div class="row justify-center">
    <div class="col-12 col-sm-8 col-md-5">
      <q-card>
        <q-card-title>{{$t('registration.title')}}</q-card-title>
        <q-card-separator />
        <q-card-main>
          <form>
            <!-- Email -->
            <q-field icon="mail" :error="errors.has('email')" :error-label="errors.first('email')">
              <q-input type="email" v-model="user.email" v-validate="'required|email'" name="email" :float-label="star($t('attributes.email'))" />
            </q-field>

            <!-- Password -->
            <q-field icon="lock" :error="errors.has('password')" :error-label="errors.first('password')">
              <q-input type="password" v-model="user.password" v-validate="'required|min:5'" name="password" :float-label="star($t('attributes.password'))"></q-input>
            </q-field>

            <!-- Confirmation Password -->
            <q-field icon="lock" :error="errors.has('confirm_password')" :error-label="errors.first('confirm_password')">
              <q-input type="password" v-model="user.confirmPassword" v-validate="'confirmed:password|required'" name="confirm_password" :float-label="star($t('attributes.confirm_password'))"></q-input>
            </q-field>
          </form>
        </q-card-main>

        <q-card-separator/>

        <!-- Buttons -->
        <q-card-actions>
          <q-btn @click="validateAndSubmit" :disabled="errors.any()" icon-right="forward" :color="$store.getters.currentTheme" type="submit" class="full-width">{{$t('general.register')}}</q-btn>
          <div class="row full-width justify-center mt-10">
            <q-btn flat color="primary" @click="resetAndClearErrors">{{$t('general.reset')}}</q-btn>
            <q-btn flat color="primary" @click="$router.push('/login')">{{$t('general.login')}}</q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import UserService from 'services/UserService'
import FormMixin from 'mixin/FormMixin'
import { Alert, Toast } from 'quasar-framework'
import 'quasar-extras/animate/bounceInRight.css'
import 'quasar-extras/animate/bounceOutRight.css'

export default {
  mixins: [FormMixin],
  data() {
    return {
      user: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    submitForm() {
      const vm = this
      UserService.register(this.user)
        .then(response => {
          Toast.create.positive(vm.$t('registration.registration_ok'))
          this.$router.push('/login')
        })
        .catch(err => {
          Alert.create({
            enter: 'bounceInRight',
            leave: 'bounceOutRight',
            color: 'negative',
            icon: 'error',
            html: vm.$t('registration.registration_failed') + err,
            position: 'top-center'
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
