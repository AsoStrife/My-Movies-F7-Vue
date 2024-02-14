<template>
    
    <f7-page name="home" :page-content="false">
    
        <Navbar :showSearchButton="true" triggerEvent="searchNavbarTMDB" :backLink="false" classSearchbar="searchbarTMDB"/>

        <SearchTMBDVue />

    </f7-page>
</template>

<script>

    import Navbar from '../components/Navbar.vue'
    import SearchTMBDVue from '../components/SearchTMBD.vue'

    import { f7ready, f7 } from 'framework7-vue'
    
    export default {
        name: 'Home',
        components: {
            Navbar,
            SearchTMBDVue
        },
        data() {
            return {
            }
        },
        methods: {
        },
        async mounted() {
        }
        
    }
</script>