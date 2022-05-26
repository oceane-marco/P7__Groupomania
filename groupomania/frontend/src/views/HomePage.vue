<template>
  <div class="homePage">
    <div>
      <HelloWorld/>
    </div>
     
    <div class="componnents" v-if="isAuthenticated">
      <div >
        <SearchUsers  />
      </div>
      <div>
        <NewPost @loadPosts="loadPosts"/>
      </div>
      
      <div>
        <LoadPosts ref="load"/>
      </div>
      <div>
        
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';
import LoadPosts from "../components/LoadPosts";
import NewPost from "../components/NewPost";
import SearchUsers from "../components/SearchUsers";
import {mapGetters, mapState} from 'vuex';
export default {
  name: 'HomePage',
   components: {
    HelloWorld,
    LoadPosts,
    NewPost,
    SearchUsers
  },
    computed:{
    ...mapGetters(["isAuthenticated","isAdmin"]),
    ...mapState(["user","token"])
  },
  data () {
    return {

      Posts: [],
      mode: 'home',
    }
  },
 
  methods: {
    loadPosts() {
      this.$refs.load.load();
    },
  }
}
</script>
