<template>
    <f7-app v-bind="f7params" dark>

        <f7-panel id="panel-nested" theme-dark left cover container-el="#panel-page">
            <f7-page>
                <f7-list>
                    <f7-list-item :title="$t('message.panelList.home')" link="/" panel-close></f7-list-item>
                    <f7-list-item :title="$t('message.panelList.settings')" link="/settings/" panel-close></f7-list-item>
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

import { getDevice } from 'framework7/lite-bundle';
import capacitorApp from '../js/capacitor-app.js';
import routes from '../js/routes.js';

export default {
    setup() {
        const device = getDevice();
        // Framework7 Parameters
        const f7params = {
            name: 'My Movies', // App name
            theme: 'auto', // Automatic theme detection
            colors: {
                primary: '#0f4783',
            },
            // App routes
            routes: routes,

            // Register service worker (only on production build)
            serviceWorker: process.env.NODE_ENV === 'production' ? {
                path: '/service-worker.js',
            } : {},
            // Input settings
            input: {
                scrollIntoViewOnFocus: device.capacitor,
                scrollIntoViewCentered: device.capacitor,
            },
            // Capacitor Statusbar settings
            statusbar: {
                iosOverlaysWebView: true,
                androidOverlaysWebView: false,
            },
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
            f7params,

        }
    }
}
</script>