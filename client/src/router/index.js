import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Home from 'components/Home'
import About from 'public/About'
import Login from 'public/Login'
import Register from 'public/Register'
import Profile from 'private/Profile'
import EditProfile from 'private/EditProfile'
import Settings from 'private/Settings'
import Dashboard from 'private/Dashboard'
import Map from 'private/Map'
import PageNotFound from 'public/PageNotFound'
import Users from 'private/Users'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home, meta: { title: 'SCP | Home' } },
    { path: '/about', name: 'about', component: About, meta: { title: 'SCP | About' } },
    { path: '/login', name: 'login', component: Login, meta: { title: 'SCP | Login' } },
    { path: '/register', name: 'register', component: Register, meta: { title: 'SCP | Register' } },
    { path: '/profile', name: 'profile', component: Profile, meta: { title: 'SCP | Profile' }, beforeEnter: requireAuth },
    { path: '/profile/edit', name: 'editProfile', component: EditProfile, meta: { title: 'SCP | Edit Profile' }, beforeEnter: requireAuth },
    { path: '/settings', name: 'settings', component: Settings, meta: { title: 'SCP | Settings' }, beforeEnter: requireAuth },
    { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { title: 'SCP | Dashboard' }, beforeEnter: requireAuth },
    { path: '/map', name: 'map', component: Map, meta: { title: 'SCP | Map' }, beforeEnter: requireAuth },
    { path: '/users', name: 'users', component: Users, meta: { title: 'SCP | users' }, beforeEnter: requireAuth },
    { path: '*', component: PageNotFound }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

/**
 * Checks if user is logged in.
 *
 * @param {Object} to - the target Route Object being navigated to.
 * @param {Object} from - the current route being navigated away from.
 * @param {Function} next - this function must be called to resolve the hook. The action depends on the arguments provided
 */
function requireAuth(to, from, next) {
  if (store.getters.isLogged) {
    // Calls backend to check if user is still logged (token not expired) TODO.
    // Handles the redirects as well.
    next()
  } else {
    // Redirects to login.
    next({ path: '/login' })
  }
}

export default router
