<template>
    
    <f7-page name="settings" :page-content="false">

        <Navbar :showSearchButton="false" :backLink="false" />
        <f7-page-content>
            <f7-block>{{ $t('message.settings.title') }}</f7-block>
            <f7-list>
                <f7-list-item :title="$t('message.settings.listTitle')" smart-select :smart-select-params="{openIn: 'popover'}">
                    <select name="language" v-model="language">
                        <option v-for="(item, key) in supportedLanguages" :key="key" :value="item.lang" :selected="item.lang == this.language">{{item.name}}</option>
                    </select>
                </f7-list-item>
            </f7-list>
        </f7-page-content>
    </f7-page>
</template>

<script>
    import constants from '../js/constants.js'
    import Navbar from '../components/Navbar.vue'

    export default {
        name: 'Settings',
        components: {
            Navbar
        },
        data() {
            return {
                event: "navbarSearchuser",
                language: this.$i18n.locale, 
                supportedLanguages: constants.app.supportedLanguages
            }
        },
        methods: {
            
        },
        mounted() {
            this.$watch(
                (vm) => [vm.language],
                (val) => {
                    this.$i18n.locale = val[0]
                },
                {
                    immediate: true,
                    deep: true,
                }
            )

        }
        
    }
</script>