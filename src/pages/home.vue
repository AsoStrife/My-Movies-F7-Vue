<template>
    
    <f7-page name="home" :page-content="false">
    
        <Navbar :showSearchButton="true" :triggerEvent="this.event" :backLink="false" />

        <f7-toolbar class="my-tabbar" tabbar bottom>
            <f7-link tab-link="#tab-my-movies" tab-link-active>
                <f7-icon ios="f7:person" aurora="f7:person" md="material:account_circle"></f7-icon>
                {{ $t("message.home.myMovies") }}
            </f7-link>
            <f7-link tab-link="#tab-tmbd">
                <f7-icon ios="f7:film" aurora="f7:film" md="material:movie"></f7-icon>
                {{ $t("message.home.tmbdMovies") }}
            </f7-link>
        </f7-toolbar>

        <f7-tabs swipeable>
            <f7-tab id="tab-my-movies" class="page-content" tab-active @tab:show="changeTriggerEvent('searchNavbarUser')">
                <SearchMyMoviesVue />
            </f7-tab>
            <f7-tab id="tab-tmbd" class="page-content" @tab:show="changeTriggerEvent('searchNavbarTMDB')">
                <SearchTMBDVue />
            </f7-tab>
        </f7-tabs>

    </f7-page>
</template>

<script>

    import Navbar from '../components/Navbar.vue';
    import SearchMyMoviesVue from '../components/SearchMyMovies.vue';
    import SearchTMBDVue from '../components/SearchTMBD.vue';

    import { f7ready, f7 } from 'framework7-vue';
    import LampTabbar from '../components/LampTabbar/LampTabbar.js';
    import '../components/LampTabbar/LampTabbar.css';
    
    export default {
        name: 'Home',
        components: {
            Navbar,
            SearchMyMoviesVue,
            SearchTMBDVue
        },
        data() {
            return {
                event: "navbarSearchuser"
            }
        },
        methods: {
            changeTriggerEvent(triggerEvent) {
                this.event = triggerEvent
            }
        },
        async mounted() {
            this.changeTriggerEvent('searchNavbarUser')
                        
            f7ready(() => {
                LampTabbar(f7, '.my-tabbar')
            })

        }
        
    }
</script>