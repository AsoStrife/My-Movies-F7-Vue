import HomePage from '@/pages/Home.vue'
import Movies from '@/pages/Movies.vue'
import SearchTMBD from '@/pages/SearchTMDB.vue'

import Settings from '@/pages/Settings.vue'

var routes = [
    {
        name: 'home',
        path: '/',
        component: HomePage
    },
    {
        name: 'searchtmdb',
        path: '/searchtmdb/',
        component: SearchTMBD
    },
    {
        name: 'movies',
        path: '/movies/',
        component: Movies
    },
    {
        name: 'settings',
        path: '/settings/',
        component: Settings
    }
]

export default routes;
