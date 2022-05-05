<template>
    <f7-page infinite :infinite-distance="50" :infinite-preloader="showPreloader" @infinite="loadMore" ptr @ptr:refresh="refresh">
        <div class="ptr-preloader">
            <div class="preloader"></div>
            <div class="ptr-arrow"></div>
        </div>

        <f7-col class="preloader-row" v-if="awaitingSearch">
            <f7-preloader ></f7-preloader>
        </f7-col>

        <f7-block-title>{{$t('message.myMoviesTab.title')}}</f7-block-title>
        
        <f7-block>
            <f7-row>
                <f7-col><f7-card :title="$t('message.myMoviesTab.moviesSeen')" :content="moviesSeen"></f7-card></f7-col>
                <f7-col><f7-card :title="$t('message.myMoviesTab.moviesOwned')" :content="moviesOwned"></f7-card></f7-col>
            </f7-row>
        </f7-block>

        <f7-block v-if="films.length == 0">
            <div class="alert bg-warning">
                <span v-if="searchQuery === '' ">{{ $t('message.myMoviesTab.emptyCollection') }}</span>
                <span v-if="searchQuery !== ''">{{ $t('message.myMoviesTab.emptySearch') }}</span>
            </div>
        </f7-block>

        <f7-list v-if="films.length > 0">
            <f7-list-item v-for="film in films" :key="film.id" :title="film.attributes.title" link="/movies/" :route-props="{film: film.attributes.raw_data}"></f7-list-item>
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
    import qs from 'qs';
    import axios from 'axios';

    export default {
        name: "SearchMyMovies", 
        props: {
            navbarSearch: Event
        },
        data() {
            return {
                films: Object,
                page: 1, 
                pageCount: 1,
                searchQuery: "", 
                allowInfinite: true,
                showPreloader: false,
                awaitingSearch: false,
                moviesSeen: 0,
                moviesOwned: 0
            }
        },
        methods: {
            async populate(push = false) {
                this.awaitingSearch = true
                let url = constants.backend.url + constants.backend.endpoints.films + '?'
                
                let query = qs.stringify(
                {
                    filters: {
                        title: {
                            $containsi: this.searchQuery,
                        },
                    },
                    pagination: {
                        page: this.page,
                        pageSize: 20
                    },
                    sort: ['title']
                }, {
                    encodeValuesOnly: true,
                })

                axios.get(url + query).then(response => {
                    response = response.data

                    this.films = push ? this.films.concat(response.data) : response.data
                    this.pageCount = response.meta.pagination.pageCount
                    this.page = response.meta.pagination.page

                    this.showPreloader = (this.pageCount > 1) && this.page < this.pageCount
                    this.allowInfinite = (this.pageCount > 1) && this.page < this.pageCount
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
            async refresh(done){
                this.reset(true)
                await this.populate()
                done()
            },
            reset(resetSearchQuery = false) {
                this.page = 1
                this.pageCount = 1
                this.searchQuery = resetSearchQuery ? "" : this.searchQuery
                this.allowInfinite = true
                this.showPreloader = false
                this.awaitingSearch = false
            },
            async countOwnedMovies(){
                let url = constants.backend.url + constants.backend.endpoints.films + '?'
                
                let query = qs.stringify(
                {
                    filters: {
                        $or: [
                            {
                                bluray4k: {
                                    $eq: true,
                                },
                            },
                            {
                                bluray: {
                                    $eq: true,
                                },
                            },
                            {
                             dvd: {
                                    $eq: true,
                                },
                            },
                            {
                                vhs: {
                                    $eq: true,
                                }
                            }
                        ]
                    },
                    pagination: {
                        page: this.page,
                        pageSize: 1
                    },
                    sort: ['title']
                }, {
                    encodeValuesOnly: true,
                })
                axios.get(url + query).then(response => {
                    response = response.data

                    this.moviesOwned = String(response.meta.pagination.total)
                })
                .catch((error) => {
                    console.error('Error:', error)
                    this.awaitingSearch = false
                })
            },
            async countSeenMovies(){
                let url = constants.backend.url + constants.backend.endpoints.films + '?'
                
                let query = qs.stringify(
                {
                    filters: {
                        seen: {
                            $eq: 1,
                        },
                    },
                    pagination: {
                        page: this.page,
                        pageSize: 20
                    },
                    sort: ['title']
                }, {
                    encodeValuesOnly: true,
                })


                axios.get(url + query).then(response => {
                    response = response.data

                    this.moviesSeen = String(response.meta.pagination.total)
                })
                .catch((error) => {
                    console.error('Error:', error)
                    this.awaitingSearch = false
                })
            }
        },
        mounted() {
            this.populate(false)
            
            this.countOwnedMovies()
            this.countSeenMovies()

            f7.on('searchNavbarUser', (searchQuery) => {
                this.searchQuery = searchQuery
                this.reset(false) 
                this.populate()
            })

            f7.on('searchNavbarUserClear', () => {
                this.reset(true)
                this.populate()
            })
            
        }
        
    }
</script>
