import Localbase from 'localbase';

import HomePage from '../pages/Home.vue';
import Movies from '../pages/Movies.vue';
import Login from '../pages/Login.vue';
import Settings from '../pages/Settings.vue';
import auth from './auth';
import { f7, f7ready } from 'framework7-vue';

var routes = [
    {
        name: 'redirect',
        path: '/',
        redirect: async function ({to, resolve, reject}) {
            
            if(await auth.isLogged()){
                resolve('/home/', {reloadAll: true })
            }
            else{
                resolve('/login/', {reloadAll: true })
            }
            
        }
    },
    {
        name: 'home',
        path: '/home/',
        component: HomePage
    },
    {
        name: 'movies',
        path: '/movies/',
        component: Movies
    },
    {
        name: 'login',
        path: '/login/',
        component: Login
    },
    {
        name: 'settings',
        path: '/settings/',
        component: Settings
    },
    {
        name: 'logout',
        path: '/logout/',
        redirect: async function ({to, resolve, reject}) {
            await auth.logout()
            f7.emit('logout')
            resolve('/login/', {reloadAll: true })
        }
    },
]

export default routes;
