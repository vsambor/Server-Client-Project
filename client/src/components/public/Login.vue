<template>
  <div class="row justify-center">
    <div class="col-12 col-sm-8 col-md-5">
      <q-card>
        <q-card-title>{{$t('login.title')}}</q-card-title>
        <q-card-separator />
        <q-card-main>
          <form>
            <q-field icon="mail" :error="errors.has('email')" :error-label="errors.first('email')">
              <q-input type="email" v-model="email" v-validate="'required|email'" name="email" :float-label="star($t('attributes.email'))" @keyup.enter="validateAndSubmit" />
            </q-field>

            <q-field icon="lock" :error="errors.has('password')" :error-label="errors.first('password')">
              <q-input type="password" v-model="password" v-validate="'required'" name="password" :float-label="star($t('attributes.password'))" @keyup.enter="validateAndSubmit"></q-input>
            </q-field>
          </form>
        </q-card-main>

        <q-card-separator/>

        <q-card-actions>
          <q-btn @click="validateAndSubmit" :disabled="errors.any()" icon-right="forward" :color="$store.getters.currentTheme" type="submit" class="full-width">{{$t('general.login')}}</q-btn>
          <div class="row full-width justify-center mt-10">
            <q-btn flat color="primary" @click="resetAndClearErrors">{{$t('general.reset')}}</q-btn>
            <q-btn flat color="primary" @click="$router.push('/register')">{{$t('general.register')}}</q-btn>
            <q-btn flat color="primary">{{$t('general.forgot_password')}}</q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import FormMixin from 'mixin/FormMixin'
import AuthService from 'services/AuthService'
import { Alert, Toast } from 'quasar-framework'
import 'quasar-extras/animate/bounceInRight.css'
import 'quasar-extras/animate/bounceOutRight.css'

export default {
  mixins: [FormMixin],
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      const vm = this
      AuthService.login({ email: this.email, password: this.password })
        .then(res => {
          this.$store.commit('setAuthToken', res.data.token)
          this.$store.commit('setCurrentUser', res.data.user)
          Toast.create.positive(vm.$t('login.login_ok'))
          this.$router.push('/dashboard')
        })
        .catch(err => {
          Alert.create({
            enter: 'bounceInRight',
            leave: 'bounceOutRight',
            color: 'negative',
            icon: 'error',
            html: vm.$t('login.login_failed') + err,
            position: 'top-center'
          })
        })
    }
  }
}
</script>


<style scoped>

</style>
