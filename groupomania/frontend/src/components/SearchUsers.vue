<template>
  <div class="searchView">
    <form id="search" v-on:submit.prevent="searchusers">
      <button class="icone" type="submit"  >
        <i class="fa-solid fa-magnifying-glass icone__i"></i>
      </button>
      <input type="text" name="name" v-model="name"> 
    </form>
    <div class="contener" v-if= "this.mode == 'userView'">
      <div class="conterbtn">  
        <button class="delete" type="submit" @click.prevent="toggleSwitch" v-on:click="DeletePost(post.id)" title="supprimer"><i class="fa-solid fa-circle-xmark"></i></button>
      </div>
      <p v-if="Users.length === 0 "> désolé nous n'avont pas trouver 😓</p>
      <div v-for="user in Users" :key="user.id" class="userCard">
        <router-link :to="{ name: 'Profil-Page', params: { id: user.id }}" class="profil">
          <img v-if="user.img" :src="user.img" alt="Photo de profil" class="avatar">
          <img v-else src="../assets/iconAvatar.svg" alt="Photo de profil" class="avatar">
          <p>{{user.name}}</p>
        </router-link>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters,  mapState} from 'vuex';

export default {
  name: 'SearchUsers',
  data() {
      return {
          name:"",
          mode:"",
          Users:[],
      }
  },
   computed:{
    ...mapGetters(["isAuthenticated","isAdmin"]),
    ...mapState(["user","token"])
  },
  methods: {
    searchusers(){
      axios.get(`http://localhost:3000/api/users/name/${this.name}`,{
        headers: { 
          Authorization: "Bearer " + this.token,
        },
      })
      .then((res) => {
        this.Users = res.data;
        console.log(this.Users);
        this.mode = "userView";
        this.name = "";
      })
      .catch((error) => {
        console.log({ error });
      });
    },
    toggleSwitch(){
      this.mode = "";
      this.name = "";
    }
  },
}

</script>

<style lang="scss" scoped>
.searchView{
  max-width: 100%;
  margin: 0;
   
  #search {
    display: flex;
    margin-bottom: 1rem ;
    width: 100%;
    .icone{
      max-width: 25%;
      display: flex;
      align-items: baseline;
      padding: 1rem;
      margin: 0;
      background-color: #521111;
      color: #fff;
      border-radius:  10px 0 0 10px ;
    }
    input{
      padding: 1rem;
      width: 100%;
      border: none;
      border-radius: 0 10px  10px 0;
    }
  }
  .contener{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: 10px;
    padding: 1rem;
    background-color: #fff;
  }
  .conterbtn{
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
  .profil{
    display: flex ; 
    background-color: #521111;
    color: #fff;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    margin: 0.5rem ;
    margin-left: auto;
    padding: 1rem;
    .avatar{
      margin: auto;
      border-radius: 50%;
      object-fit: cover;
    }
    p{
      max-width: 80%;
      color: #fff;
      font-size: 0.8rem;
      margin: 0;
      margin-left: 10px;
      text-align: center;
    }
  }
}

</style>