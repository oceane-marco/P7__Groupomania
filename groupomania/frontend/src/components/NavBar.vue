<template>
    <nav>
        <div v-if="isAuthenticated">
            <router-link to="/login" @click="logout()"  class="start" title="Se déconnecter"><i  class="fa-solid fa-power-off icone"></i></router-link>
            <router-link to="/" title="Accueil"><i class="fa-solid fa-house"></i></router-link>
            <router-link :to="{ name: 'Profil-Page', params: { id: user.id }}" :class="{ end : !isAdmin }" title="Votre Profil"><i class="far fa-user-circle"></i></router-link>
            <router-link v-if="isAdmin" to="/admin" title="Espace Admin" class="end"><i class="fa-solid fa-screwdriver-wrench icone"></i></router-link>
        </div>
        <div v-else>
            <router-link to="/login" class="start" title=" Connectez-vous !"><i class="fas fa-sign-out-alt"></i></router-link>
            <router-link to="/" class="end" title="Accueil"><i class="fa-solid fa-house"></i></router-link>
        </div>
    </nav>
</template>
<script>
import { mapGetters, mapState, mapMutations} from 'vuex';
export default {
    name:"NavBar",
    computed:{
        ...mapGetters(["isAuthenticated","isAdmin"]),
        ...mapState(["user","token"])
    },
    methods: {
        ...mapMutations(["setToken", "setUser"]),
        logout() {
            let user = {
                name: "",
                id: 0,
                img:"",
                isAdmin: 0,
            };
            let token = ""
            this.setToken(token)
            this.setUser(user)
            this.$router.push('/')
        },
    },
}
</script>

<style lang="scss" scoped>
.start{
    border-radius: 10px 0 0 10px;
}
.end{
    border-radius: 0 10px 10px 0;
}
</style>