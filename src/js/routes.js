import HomePage from '@/pages/Home.vue';
import Movies from '@/pages/Movies.vue';
import Settings from '@/pages/Settings.vue';

var routes = [
    {
        name: 'home',
        path: '/',
        component: HomePage
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
