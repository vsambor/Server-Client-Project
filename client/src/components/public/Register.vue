<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Register</h3>
          <p class="subtitle has-text-grey">Please enter your information.</p>
          <div class="box">
            <form>
              <!-- Email -->
              <div class="field">
                <div class="control">
                  <input class="input" type="email" placeholder="Your Email" v-model="user.email">
                </div>
              </div>

              <!-- Password -->
              <div class="field">
                <div class="control">
                  <input class="input" type="password" placeholder="Your Password" v-model="user.password">
                </div>
              </div>

              <!-- Password Confirmation -->
              <div class="field">
                <div class="control">
                  <input class="input" type="password" placeholder="Confirm password" v-model="user.confirmPassword">
                </div>
              </div>

              <!-- Register Button -->
              <a class="button is-block is-info" @click="onRegister">Register</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UserService from 'services/UserService'

export default {
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
    onRegister() {
      UserService.register(this.user).then(response => {
        console.log(response.data)
        this.response = response.data
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body {
  font-family: 'Open Sans', serif;
  font-size: 14px;
  font-weight: 300;
}
.hero.is-success {
  background: #f2f6fa;
}
.hero .nav,
.hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}

.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}
</style>
