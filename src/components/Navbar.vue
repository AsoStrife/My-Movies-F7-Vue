<template>

    <f7-navbar :sliding="false">

        <f7-nav-left :back-link="this.backLink">
            <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
        </f7-nav-left>
    
        <f7-searchbar
            class="searchbar-demo"
            expandable
            search-container=".search-list"
            search-in=".item-title"
            v-model:value="searchQuery"
            :clear-button="true"
            @keypress="search"
            @searchbar:clear="resetQuery"
            :placeholder="$t('message.navbar.search')"
            :custom-search="true"
            :backdrop="false"
            :disable-button-text="$t('message.navbar.cancel')"
            @searchbar:disable="resetQuery"
        ></f7-searchbar>

        <f7-nav-right>
            <f7-link 
            
                class="searchbar-enable" 
                data-searchbar=".searchbar-demo" 
                icon-ios="f7:search" 
                icon-aurora="f7:search" 
                icon-md="material:search" 
                v-if="showSearchButton"></f7-link>
        </f7-nav-right>
        
    </f7-navbar>

</template>

<script>
    import { f7ready, f7 } from 'framework7-vue';
    export default {
        name: "Navbar", 
        props: {
            showSearchButton: Boolean,
            triggerEvent: String,
            backLink: Boolean
        },
        data() {
            return {
                searchQuery: "",
                awaitingSearch: false,
            }
        },
        methods: {
            search() {
                if (!this.awaitingSearch) {
                    setTimeout(() => {
                        f7.emit(this.triggerEvent, this.searchQuery)
                        this.awaitingSearch = false;
                    }, 1000)
                }
                this.awaitingSearch = true;
            },
            resetQuery() {
                f7.emit(this.triggerEvent + 'Clear', this.searchQuery)
            }
        },
        mounted() {
            f7ready(() => {
                
            })
        }
    }
</script>
