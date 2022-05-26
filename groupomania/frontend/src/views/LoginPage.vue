<template>
  <div class="formLogin">
      <div class="imgcontainer">
        <img src="../assets/iconAvatar.svg" />
      </div>
    <form v-on:submit.prevent="submit">
      <div class="container">
        <label for="email"><b>Email</b></label>
        <input type="text" name="email" v-model="email" placeholder="exemple@groupomania.com"  />
        <label for="password"><b>Mot de passe</b></label>
        <input type="password" name="password" v-model="password" placeholder="Exemple_Mots_De_Passe00@" />
        <button type="submit" >Login</button>
        <button type="button" class="cancelbtn">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapState} from 'vuex';

export default {
  name: "LoginPage",
  components: {},
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed:{
    ...mapState(["user","token"])
  },
  methods: {
    ...mapMutations(["setToken", "setUser"]),
    submit() {
      axios.post("http://localhost:3000/api/users/login",{  
        email: this.email,
        password: this.password, 
      })
        .then((res) => {
          this.setToken(res.data.token)
          this.setUser(res.data.user)
          
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error);
          alert("une erreur est survenue")
        })
    },
  },
};
</script>

<style lang="scss" >
  @import '../assets/_variable.scss';

/* Bordered form */
.formLogin {
  margin: 1rem auto;
  padding: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  background-color: $background;
  max-width: 30%;
  color: $background;
  @media (max-width: 700px) {
    max-width:100%;
  }
  label{
    color: $tertiarycolor;
    padding: 1rem;
  }
  /* Full-max-width inputs */
    input[type=text], input[type=password] {
      padding: 1rem;
      border-radius: 10px;
      background-color: $secondarycolor;
      color: $tertiarycolor;
      margin: 8px 0;
      display: inline-block;
      border: none;
      box-sizing: border-box;
      max-width: 100%;
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

  /* Center the image inside this container */
    .imgcontainer {
      text-align: center;
      margin: auto;
      img {
        width: 40%;
        border-radius: 50%;
      }
    }

  /* Add padding to containers */
    .container {
      display: flex;
      flex-direction: column;
      margin: auto;
      max-width: 100%;
      text-align: center;
    }
}


</style>