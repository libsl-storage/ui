<template>
    <div id="libsl-storage">
        <div id="header">
            <div id="title">
                <div style="display: flex; align-items: center; cursor: pointer" @click="$router.push({path: '/'})">
                    LibSL Storage
                </div>
            </div>
            <div id="user">
                <div v-if="isAuthenticated" style="display: flex; align-items: center; cursor: pointer" 
                    @click="account_pop_up_menu_toggle">
                    <Button icon="pi pi-user" rounded outlined style="color: white" />
                    <i class="pi pi-angle-down" />
                </div>
                <div v-else>
                    <Button icon="pi pi-user" label="Sign in" rounded outlined style="color: white"
                        @click="sign_in" />
                </div>
                <Menu ref="menu" :model="items" :popup="true" />
            </div>
        </div>
        <div id="main">
            <router-view />
        </div>
    </div>

    <PopUp :visible="newSpecPopUpVisible" header="New specification" :modal="true" :closable="false" :draggable="false"
        style="width: 90%; height: 90%">
        <SpecContentForm @response="newSpecPopUpVisible = false; search()" />
    </PopUp>

    <PopUp :visible="signOutPopUpVisible" @keydown.esc="signOutPopUpVisible = false"
		:modal="true" :closable="false" :draggable="false">
		Are you sure you want to sign out?
		<template #footer>
			<Button label="No" icon="pi pi-times" class="p-button-text"
				@click="signOutPopUpVisible = false" />
			<Button label="Yes" icon="pi pi-check" autofocus 
                @click="sign_out" />
		</template>
	</PopUp>
</template>

<script>
import Menu from "primevue/menu"
import SpecContentForm from "@/components/SpecContentForm.vue"
import { mapGetters, mapActions } from "vuex"
export default {
    name: "v-libsl-storage",
    components: {
        Menu,
        SpecContentForm
    },
    mounted() {
        this.init()
    },
    data() {
        return {
            items: [
                {
                    icon: "pi pi-plus",
                    label: "New specification",
                    command: () => {
                        this.newSpecPopUpVisible = true
                    }
                },
                {
                    icon: "pi pi-cog",
                    label: "Settings",
                    command: () => {
                        this.$router.push({"path": "/settings"})
                    }
                },
                {
                    separator: true 
                },
                {
                    icon: "pi pi-sign-out",
                    label: "Sign Out",
                    command: () => {
                        this.signOutPopUpVisible = true
                    }
                }
            ],
            newSpecPopUpVisible: false,
            signOutPopUpVisible: false
        }
    },
    methods: {
        async init() {
            await this.fetchSearchFilters()
            await this.search()
        },
        sign_in() {
            this.$router.push({path: "/sign-in"})
        },
        account_pop_up_menu_toggle(event) {
            this.$refs.menu.toggle(event)
        },
        sign_out() {
            this.makeRequest("/auth/logout", "POST")
            this.signOutPopUpVisible = false
            this.setAuth(false)
            this.$router.replace({path: "/"})
        },
        ...mapActions([
            "fetchSearchFilters",
            "search",
            "setAuth"
        ])
    },
    computed: {
        ...mapGetters([
            "isAuthenticated"
        ])
    }
}
</script>

<style scoped>
#libsl-storage {
    display: flex;
    flex-flow: column;
    flex: 1;
}

#header {
    z-index: 1;
    display: flex;
    padding: 0.5em;
    background-color: rgb(50, 56, 62);
    box-shadow: 0px 1px 5px grey;
    color: white;
}

#title {
    display: flex;
    flex: 1;
}

#user {
    display: flex;
}

#main {
    display: flex;
    flex: 1;
    background-color: rgb(245, 245, 245); /* #eff3f8; */
    overflow: auto;
}
</style>