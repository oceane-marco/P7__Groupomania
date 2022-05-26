<template> 
<div class="admin">
 <h1>bienvenue sur la page d'administration {{this.user.name}} ! </h1>
  <div class="formregitre">
    
      <div class="imgcontainer">
        <img src="../assets/iconAvatar.svg" alt="Avatar" class="avatar">
      </div>
    <form v-on:submit.prevent="submit">
      <div class="container">
        <label for="name"><b>Nom de l'utilisateur</b></label>
        <input type="text" name="name" v-model="data.name" placeholder="Pierre Du Bois"  />
        <label for="email"><b>Email</b></label>
        <input type="text" name="email" v-model="data.email" placeholder="exemple@groupomania.com"  />
        <label for="password"><b>Mot de passe</b></label>
        <input type="password" name="password" v-model="data.password" placeholder="Exemple_Mots_De_Passe00@" />
        <div>
          <input type="checkbox" id="IsAdmin" name="IsAdmin" v-model="data.isAdmin">
          <label for="IsAdmin">Est-ce un admin ?</label>
        </div>
        <button type="submit" >enregitré le nouvelle utilisateur</button>
        <button type="button" v-on:click="cancel" class="cancelbtn">Cancel</button>
      </div>
    </form>
  </div>
</div>
 
</template>

<script>
import axios from 'axios'
import { mapGetters, mapState} from 'vuex';

export default {
  name: "LoginPage",
  components: {},
  data() {
    return {
      data :{
        name:"",
        email: "",
        password: "",
        isAdmin:false
      }
      
    };
  },
  computed:{
    ...mapState(["user","token"]),
    ...mapGetters(["isAuthenticated","isAdmin"]),
  },
  methods: {
    submit() {
      console.log(this.data);
      axios.post("http://localhost:3000/api/users/signup", this.data ,{  
        headers: { 
          Authorization: "Bearer " + this.token ,
        },
      })
        .then((res) => {
          alert (`${res.data.name} à bien était créé`)
        })
        .catch((error) => {
          console.log(error);
          alert(error.message)
        })
    },
    cancel(){
      this.name = ""
      this.email = ""
      this.password = "" 
    },
    AdminOnly(){
      if(!this.isAdmin){
        this.$router.push('/')
      }
    },
  },
  mounted() {
    this.AdminOnly()
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_variable.scss';
.admin{
  text-align: center;
}
/* Bordered form */
.formregitre {
  margin: 1rem auto;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  background-color: $background;
  color: $secondarycolor;
  max-width: 30%;
  @media (max-width: 700px) {
    padding: 1rem;
    max-width: 100%;
  }
}
label{
  color:$tertiarycolor;
}

/* Full-width inputs */
input[type=text], input[type=password] {
  padding: 1rem;
  border-radius: 10px;
  background-color: $background;
  margin: 8px auto;
  border: none;
  box-sizing: border-box;
  width: 100%;
}
/* Set a style for all buttons */
button {
  margin: 0 auto;
  margin-top: 1rem;
  padding: 1rem;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  
}


/* Center the avatar image inside this container */
.imgcontainer {
  text-align: center;
  margin: auto;
}

/* Avatar image */
img.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}

/* Add padding to containers */
.container {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin: auto;
  width: 100%;
  text-align: center;
}
</style>