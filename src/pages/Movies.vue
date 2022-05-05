<template>
    
    <f7-page name="movies" :page-content="false">

        <Navbar :showSearchButton="false" :backLink="true" />

        <f7-page-content>
            <img :data-src="this.constants.themoviedb.endpoints.images_w500 + this.film.backdrop_path" class="lazy lazy-fade-in img-fluid" :alt="film.title"/>

            <f7-block-title>
                <h1>{{film.title}}</h1> <br> 
                <h3>{{$t('message.movies.releaseDate')}}: {{film.release_date.split("-").reverse().join("-")}}</h3>
            </f7-block-title>
            
            <f7-block-title>{{$t('message.movies.info')}}:</f7-block-title>
            <f7-list>
                <f7-list-item checkbox title="Blu-Ray 4k" v-model:checked="bluray4k"></f7-list-item>
                <f7-list-item checkbox title="Blu-Ray" v-model:checked="bluray"></f7-list-item>
                <f7-list-item checkbox title="Dvd" v-model:checked="dvd"></f7-list-item>
                <f7-list-item checkbox title="Vhs" v-model:checked="vhs"></f7-list-item>
                <f7-list-item checkbox title="Visto" v-model:checked="seen"></f7-list-item>
            </f7-list>

            <f7-block>
                <f7-button fill @click="saveMovie" preloader :loading="this.isLoading" :disabled="this.isLoading"> 
                    {{$t('message.movies.saveButton')}} 
                </f7-button>
            </f7-block>
        </f7-page-content>
    </f7-page>
</template>

<style scoped>
    img{
        width: 100%;
    }
    h1 {
        margin-top: 0px;
        margin-bottom: 0;
    }
    h3{
        margin-top: 0;
    }
</style>
<script>
    import Navbar from '../components/Navbar.vue';
    import constants from '../js/constants';
    import { f7, f7ready } from 'framework7-vue';
    import axios from 'axios';
    import Localbase from 'localbase';

    export default {
        name: 'Movies',
        components: {
            Navbar
        },
        props: {
            film: Object,
            owning: Object
        },
        data() {
            return {
                constants: constants,
                bluray4k: false,
                bluray: false,
                dvd: false,
                vhs: false,
                seen: false,
                apiUrl: constants.backend.url + constants.backend.endpoints.films + "/",
                db: new Localbase('db'),
                isLoading: false,
            }
        },
        methods: {
            async saveMovie() {
                self = this
                this.isLoading = true

                try{
                    await axios.post(this.apiUrl, {
                        "data": {
                            "tmdb_id": this.film.id,
                            "title": this.film.title,
                            "release_date": this.film.release_date,
                            "image": this.film.backdrop_path,
                            "seen": this.seen,
                            "vhs": this.vhs,
                            "dvd": this.dvd,
                            "bluray": this.bluray,
                            "bluray4k": this.bluray4k,
                            "raw_data": this.film
                        }
                    },
                    {
                        headers: {
                            'Authorization': "Bearer " + this.user.jwt
                        }
                    })

                    f7.toast.create({
                        text: self.$t('message.movies.saveOk'),
                        closeTimeout: 2000,
                        destroyOnClose: true,
                        position: 'bottom',
                    }).open()

                    this.isLoading = false
                }
                catch(e){
                    this.isLoading = false
                    console.error(e)

                    f7.toast.create({
                        text: self.$t('message.movies.saveWrong'),
                        closeTimeout: 2000,
                        destroyOnClose: true,
                        position: 'bottom',
                    }).open()
                }
            }
        },
        mounted() {
            f7ready(async () => {
                
                let url = this.apiUrl + this.film.id
                axios.get(url).then(myFilm => {
                    this.bluray4k = myFilm.data.bluray4k
                    this.bluray = myFilm.data.bluray
                    this.dvd = myFilm.data.dvd
                    this.vhs = myFilm.data.vhs
                    this.seen = myFilm.data.seen
                })
                .catch(e => {
                    console.error(e)
                })

                
                
                this.user = (await this.db.collection('users').get())[0]
            })

            this.$watch(
                (vm) => [vm.bluray, vm.bluray4k, vm.dvd, vm.vhs],
                (val) => {
                    if(this.bluray4k || this.bluray || this.dvd || this.vhs)
                        this.seen = true
                },
                {
                    immediate: true,
                    deep: true,
                }
            )
        }
        
    }
</script>