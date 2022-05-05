<template>
    <f7-app v-bind="f7params" dark>

        <f7-panel id="panel-nested" theme-dark left cover container-el="#panel-page">
            <f7-page>
                <f7-list>
                    <f7-list-item :title="$t('message.panelList.home')" link="/home/" panel-close v-if="isLogged == true"></f7-list-item>
                    <f7-list-item :title="$t('message.panelList.login')" link="/login/" panel-close v-if="isLogged == false"></f7-list-item>
                    
                    <f7-list-item :title="$t('message.panelList.settings')" link="/settings/" panel-close></f7-list-item>
                    <f7-list-item :title="$t('message.panelList.logout')" link="/logout/" panel-close v-if="isLogged == true"></f7-list-item>
                </f7-list>
            </f7-page>
        </f7-panel>

        <!-- Your main view, should have "view-main" class -->
        <f7-view main class="safe-areas" url="/"></f7-view>

    </f7-app>
</template>
<script>
    import { ref, onMounted } from 'vue';
    import { f7, f7ready } from 'framework7-vue';

    import { getDevice }  from 'framework7/lite-bundle';
    import capacitorApp from '../js/capacitor-app.js';
    import routes from '../js/routes.js';
    import auth from '../js/auth.js';


    export default {
        data() {
            return {
                isLogged: true
            }
        },
        async mounted(){
            this.isLogged = await auth.isLogged()

            f7.on('login', async() => {
                this.isLogged = await auth.isLogged()
            })

            f7.on('logout', async() => {
                this.isLogged = await auth.isLogged()
            })
        },
        setup() {
            

            const device = getDevice();
            // Framework7 Parameters
            const f7params = {
                name: 'My Movies', // App name
                theme: 'auto', // Automatic theme detection
                id: 'it.webenterprises.mymovies', // App bundle ID
                // App routes
                routes: routes,

                // Input settings
                input: {
                    scrollIntoViewOnFocus: device.capacitor,
                    scrollIntoViewCentered: device.capacitor,
                },
                // Capacitor Statusbar settings
                statusbar: {
                    iosOverlaysWebView: true,
                    androidOverlaysWebView: false,
                    androidTextColor: "white", 
                    androidBackgroundColor: "#063261"
                }
            };

            onMounted(() => {
                f7ready(() => {
                    // Init capacitor APIs (see capacitor-app.js)
                    if (device.capacitor) {
                        capacitorApp.init(f7);
                    }
                // Call F7 APIs here
                });
            });

            return {
                f7params
            }
        }
    }
</script>