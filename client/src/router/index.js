import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/Home'
import Login from 'public/Login'
import Register from 'public/Register'
import Profile from 'private/Profile'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home, meta: { title: 'SCP | Home' } },
    { path: '/login', name: 'login', component: Login, meta: { title: 'SCP | Login' } },
    { path: '/register', name: 'register', component: Register, meta: { title: 'SCP | Register' } },
    { path: '/profile', name: 'profile', component: Profile, meta: { title: 'SCP | Profile' }, beforeEnter: requireAuth }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

/**
 * Checks if user is logged in.
 *
 * @function requireAuth
 * @param {Object} to - the target Route Object being navigated to.
 * @param {Object} from - the current route being navigated away from.
 * @param {Function} next - this function must be called to resolve the hook. The action depends on the arguments provided
 */
function requireAuth(to, from, next) {
  /*
  // TODO
  if (!store.authentication) {
    // Call backend to check if user is still logged.
    AuthService.login(null).then((response) => {
      next();
    }).catch(() => {
      var redirectTo = to.fullPath;
      if (to.query.lang) {
        redirectTo = to.fullPath.replace(/lang=\w\w/, "");
      }
      next({
        path: '/login',
        query: { redirect: redirectTo, lang: to.query.lang }
      });
    });
  } else {
    next()
  }
  */
  // At the moment just sends to the destination.
  next()
}

export default router
