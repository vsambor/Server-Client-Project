<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Login</h3>
          <p class="subtitle has-text-grey">Please login to proceed.</p>
          <div class="box">
            <figure class="avatar">
              <img src="https://s.gravatar.com/avatar/5c71cbf44a48f67501a8a5c43d6c3cb2?s=80">
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input class="input" type="email" placeholder="Your Email" autofocus="">
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input class="input" type="password" placeholder="Your Password">
                </div>
              </div>
              <!-- <div class="field">
                <label class="checkbox">
                  <input type="checkbox"> Remember me
                </label>
              </div> -->
              <a class="button is-block is-info">Login</a>
            </form>
          </div>
          <p class="">
            <router-link to="Register">Sign Up</router-link> <span class="has-text-black"> &nbsp;·&nbsp; </span>
            <a href="../">Forgot Password</a> 
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {}
  },
  methods: {
    onLogin() {}
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
.box {
  margin-top: 5rem;
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
