<template>
    <f7-page infinite :infinite-distance="50" :infinite-preloader="showPreloader" @infinite="loadMore">
        
        <f7-col class="preloader-row" v-if="awaitingSearch">
            <f7-preloader ></f7-preloader>
        </f7-col>

        <f7-block-title>{{$t('message.tmdbTab.title')}}</f7-block-title>
        
        <f7-block v-if="films.length == 0">
            <div class="alert bg-warning">
                <span v-if="searchQuery === '' ">{{ $t('message.tmdbTab.startSearch') }}</span>
                <span v-if="searchQuery !== ''">{{ $t('message.tmdbTab.emptySearch') }}</span>
            </div>
        </f7-block>
        
        <f7-list v-if="films.length > 0">
            <f7-list-item v-for="film in films" :key="film.id" :title="film.title" link="/movies/" :route-props="{film: film}"></f7-list-item>
        </f7-list>


    </f7-page>
</template>

<style scoped>
    .preloader-row {
        text-align: center;
        margin: 20px 0px 20px 0;
    }
</style>

<script>
    import { f7 } from 'framework7-vue';
    import constants from '../js/constants.js';
    import axios from 'axios';

    export default {
        name: "SearchTMDB", 
        props: {
            navbarSearch: Event
        },
        data() {
            return {
                films: [],
                page: 1, 
                total_pages: 1,
                searchQuery: "", 
                allowInfinite: true,
                showPreloader: false,
                awaitingSearch: false,
            }
        },
        methods: {
            populate(push = false) {
                this.awaitingSearch = true
                let url = constants.themoviedb.url + constants.themoviedb.endpoints.search_movies
                
                let parameters = {
                    "language": "it",
                    "api_key": constants.themoviedb.api_key, 
                    "query": this.searchQuery,
                    "page": this.page
                }
                let query = "?" + Object.keys(parameters).map(key => key + '=' + parameters[key]).join('&');


                axios.get(url + query)
                .then(response => {
                    response = response.data
                    this.films = push ? this.films.concat(response.results) : response.results
                    
                    this.total_pages = response.total_pages
                    this.page = response.page

                    this.showPreloader = (this.total_pages > 1) && this.page < this.total_pages
                    this.allowInfinite = (this.total_pages > 1) && this.page < this.total_pages
                    this.awaitingSearch = false
                })
                .catch((error) => {
                    console.error('Error:', error)
                    this.awaitingSearch = false
                })
            },
            loadMore() {
                if (!this.allowInfinite) return;
                this.allowInfinite = false;
                this.page = this.page + 1 
                this.populate(true)    
            },
            reset(resetSearchQuery = false) {
                this.page = 1
                this.pageCount = 1
                this.searchQuery = resetSearchQuery ? "" : this.searchQuery
                this.allowInfinite = true
                this.showPreloader = false
                this.awaitingSearch = false
                this.films = []
            }
        },
        mounted() {
            f7.on('searchNavbarTMDB', (searchQuery) => {
                this.searchQuery = searchQuery
                this.reset(false)
                this.populate()
            })

            f7.on('searchNavbarTMDBClear', () => {
                this.reset(true)
            })
            
        }
    }
</script>
