<template>
  <div class="hello">
    <h1 v-if="!isAuthenticated">{{ msg }}</h1>
    <h1 v-if="isAuthenticated">Bonjour {{user.name}} !</h1>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg : "Bienvenue sur le résaux social de groupomania ! 🎉"
    }
  },
  computed:{
    ...mapGetters(["isAuthenticated","isAdmin"]),
    ...mapState(["user","token"])
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1{
  font-size: 1.5rem;
  text-align: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
