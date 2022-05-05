<template>

    <f7-page name="login" :page-content="false">

        <Navbar :showSearchButton="false" :backLink="false" />

        <f7-page-content>
            
            <f7-block-title>{{ $t('message.login.title') }}:</f7-block-title>
            <form>
                <f7-list no-hairlines-md>
                    <f7-list-input
                        outline
                        :label="$t('message.login.emailLabel')"
                        :placeholder="$t('message.login.emailPlaceholder')"
                        floating-label
                        type="text"
                        clear-button
                        :value="email"
                        @input="email = $event.target.value"
                    >
                    </f7-list-input>

                    <f7-list-input
                        outline
                        :label="$t('message.login.passwordLabel')"
                        :placeholder="$t('message.login.passwordPlaceholder')"
                        floating-label
                        type="password"
                        autococomplete="false"
                        clear-button
                        :value="password"
                        @input="password = $event.target.value"
                    >
                    </f7-list-input>

                </f7-list>
            </form>
            <f7-block>
                <f7-button fill preloader :loading="this.isLoading" @click="login" :disabled="this.isLoading || isEmpty(this.email) || isEmpty(this.password)"> {{$t('message.login.loginButton')}} </f7-button>
            </f7-block>
        </f7-page-content>
    </f7-page>
</template>

<script>
    import { f7 } from 'framework7-vue';
    import Navbar from '../components/Navbar.vue';
    import constants from '../js/constants';
    import axios from 'axios';
    import Localbase from 'localbase';
    import auth from '../js/auth';

    export default {
        name: 'Login',
        components: {
            Navbar
        },
        data() {
            return {
                constants: constants,
                isLoading: false,
                email: '',
                password: '',
                db: new Localbase('db')
            }
        },
        async mounted(){
             if(! await auth.isLogged())
               f7.views.main.router.navigate('/')
        },
        methods: {
            login() {
                self = this

                this.isLoading = true;
                
                axios.post(this.constants.backend.url + this.constants.backend.endpoints.login, {
                    "identifier": this.email,
	                "password": this.password
                })
                .then(async function (response) {
                    

                    await self.db.collection('users').add(response.data)
                    self.isLoading = false
                    f7.views.main.router.navigate('/home/')
                    f7.emit('login')
                })
                .catch(function (error) {
                    console.error(error)

                    self.isLoading = false
                    
                    f7.toast.create({
                        text: self.$t('message.login.loginWrong'),
                        closeTimeout: 2000,
                        destroyOnClose: true,
                        position: 'bottom',
                    }).open()
                })
                
            },
            isEmpty(str) {
                return (!str || str.length === 0);
            }
        }
    }
</script>