<template>
  <div class="profil">
    <div class="profil__user">
      <img v-if="this.User.img" :src="this.User.img" alt="image du profil" class="imgProfil">
      <img v-else src="../assets/iconAvatar.svg" alt="image du profil" class="imgProfil">
      <h1>{{this.User.name}}</h1>
      <div class="profil__user__btn">
        <button v-if="user.id == User.id" v-on:click.prevent="switchToUpdate(User.id);name=User.name;image=User.image" title="modifier mon profil"><i class="fa-solid fa-pen-to-square icon"></i></button>
        <button v-if="user.id == User.id" v-on:click="confirmDeleteUser(user.id)" title="suprimer mon compte" ><i class="fa-solid fa-trash-can icon"></i> Suprimer Mon Compte</button>
        <button v-if="user.id !== User.id && isAdmin" v-on:click="confirmDeleteUser(User.id)" title="suprimer le compte"><i class="fa-solid fa-trash-can icon"></i> Suprimer ce Compte</button>
      </div>
    </div>
    <div v-if="UpdateId == user.id" class="profil__fromuser">
      <div class="formLogin">
        <div class="imgcontainer">
          <img v-if="this.User.img" :src="this.User.img" alt="image du profil" class="imgProfil">
          <img v-else src="../assets/iconAvatar.svg" alt="image du profil" class="imgProfil">
        </div>
        <form v-on:submit.prevent=" upatateUser(user.id)">
          <div class="container">
            <label for="name"><b>Nom</b></label>
            <input type="text" name="name" v-model="name" placeholder="exemple@groupomania.com"  />
            <label for="password"><b>Mot de passe</b></label>
            <input type="password" name="password" v-model="password" placeholder="Exemple_Mots_De_Passe00@" />
            <label for="fileInput" class="newPostCard__form__actionButton ">Ajouter une image</label>
              <em v-if="urlImage">Votre nouvelle image: {{ this.urlImage }}</em>
              <input class= "newPostCard__form__addFile" id="fileInput" name="image" type="file" @change="addImg" ref="file" />
            <button type="submit" >Modifier</button>
            <button type="button" class="cancelbtn" v-on:click.prevent="switchToUpdate(-1)">Cancel</button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="user.id == User.id">
      <NewPost  @loadPosts="loadPosts" />
    </div>
    <div class="profil__userPost">
      <div class="postCard" v-for="post in Posts" :key="post.id">
        <div class="postCard__contenaire">
          <div class="postCard__contenaire__profile">
            <div class="postCard__contenaire__profile__info">
              <router-link :to="{ name: 'Profil-Page', params: { id: post.user_id }}">
              <img v-if="post.img" :src="post.img" alt="avatar" class="avatar imgAv">
              <img v-else src="../assets/iconAvatar.svg" alt="avatar" class="avatar imgAv">
              </router-link>
              <div>
                <router-link :to="{ name: 'Profil-Page', params: { id: post.user_id }}">
                <h3> {{post.name}} </h3>
                </router-link>
                <p>{{moment(post.created_date).format("DD-MM-YYYY HH:MM")}}</p>
              </div>
            </div>
            <div class="postCard__contenaire__profile__btn">
            <button v-if="user.id == post.user_id" v-on:click.prevent="switchToUpdate(post.id)" title="modifier"><i class="fa-solid fa-pen-to-square"></i></button>
            <button v-if="isAdmin === true || this.user.id == post.user_id" @click.prevent="confirmDelete(post.id)" v-on:click="DeletePost(post.id)" title="supprimer"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </div>  
          <div v-if="UpdateId == post.id" >  
            <EditPost :post="post" @switch="switchToUpdate(-1) " @load="load()" />                                  
          </div>
          <div v-else class="postCard__contenaire__content">
              <h2 v-if="post.title" class="postCard__contenaire__content__title">{{ post.title }}</h2>
              <p v-if="post.content" class="postCard__contenaire__content__text" style="word-wrap: break-word;">{{ post.content }}</p>
              <img v-if="post.file" class="postCard__contenaire__content__image" :src="post.file" alt="image dans un post">
          </div>
        </div>
        <div class="postCard__contenaire__button" >
          <button v-on:click="SwitchToReaction(post.id)"><i class="fa-solid fa-thumbs-up"></i> emoji</button>
          <button v-on:click="SwitchToComment(post.id)"><i class="fa-solid fa-comments"></i> Commentaire</button>
        </div>
        <div class="View">
          <div v-if="view == `emoji${post.id}`">
            <NewEmoji  @loadEmoji="loadReact(post.id)" :ReactsPost="this.React" :EmojisPost="this.Emojis" :userId="user.id"  :postId="post.id" />
          </div>
          <div v-if="mode == `CommentsViews${post.id}`" >
            <NewComment @loadComments="loadComments(post.id)" :CommentsPost="this.Comments" :postId="post.id" />
          </div>
        </div>
      </div>   
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState} from 'vuex';
import axios from 'axios';
import moment from 'moment';
import NewComment from '../components/NewComment.vue';
import NewPost from "../components/NewPost";
import EditPost from '../components/EditPost';
import NewEmoji from '../components/NewEmoji.vue';

export default {
  name: 'ProfilPage',
  components: { EditPost, NewComment, NewEmoji, NewPost },
  computed:{
    ...mapState(["user","token"]),
    ...mapGetters(["isAuthenticated","isAdmin"]),
    
  },
  data() {
    return {
      moment: moment,
      User:[],
      UpdateId:-1,
      fromUsers:{
        name:"",
        password:"",
      },
      mode:'',
      view:'',
      title: "",
      content: "",
      file: "",
      urlImage: "",
      urlImageComment: "",
      Posts:[],
      Comments: [],
      React:[],
      userHasReact:false,
      Emojis:[],
    }
  },
  methods: {
    ...mapMutations(["setToken", "setUser"]),
    auth(){
      if (!this.isAuthenticated) {
        this.$router.push('/')
      }
    },
    getuser(){
      let userid = this.$route.params.id; 
      axios.get(`http://localhost:3000/api/users/${userid}` , {
        headers: { 
          Authorization: "Bearer " + this.token,
        },
      })
      .then((res) => {
        this.User = res.data;
        //document.getElementById("fileInput").value='';
        
      })
      .catch((error) => {
        console.log({ error });
      });
    },
    upatateUser(idPost){
      let data = new FormData();
      console.log(this.file);
      if (this.file) { 
          console.log("ok");  
          data.append("name", this.name);
          data.append("password", this.password);
          data.append("image", this.file, this.file.name);
      } else {
        data.append("name", this.name);
        data.append("password", this.password);
      }
      console.log(data);
      axios.put(`http://localhost:3000/api/users/${idPost}` , data, {headers: { Authorization: "Bearer " + this.token },})
      .then((res) => {
          console.log(res);
          this.$emit("load")
          this.SwitchUpdate()
      })
      .catch((error) => {
          console.log(error);
          alert(error.data.message);
      })
    },
    deleteUser(id){
      axios.delete("http://localhost:3000/api/users/" + id,{ headers: { Authorization: "Bearer " + this.token },})
        .then((res) => {
          if (this.isAdmin) {
            alert('ustilisateur suprimer ainsi que tout ses posts, commentaire et réactions')
            this.$router.push('/')
            return;
          }
          console.log(res);
          let user = {
            name: "",
            id: 0,
            img:"",
            isAdmin: 0,
          }
          let token = ""
          this.setToken(token )
          this.setUser(user)
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error); 
        });
    },
    confirmDeleteUser(id){
      if (confirm("Attention! Voulez-vous vraiment supprimer vôtre compte?")) {
        this.deleteUser(id);
      }
    },
    loadPosts() {
      this.getPosts();
    },
    getPosts(){
      let userid = this.$route.params.id; 
      axios.get(`http://localhost:3000/api/posts/author/${userid}` , {
        headers: { 
          Authorization: "Bearer " + this.token,
        },
      })
      .then((res) => {
        res.data.reverse()
        this.Posts = res.data;
      })
      .catch((error) => {
        console.log({ error });
      });
    },
    deletePost(id) {
      axios.delete("http://localhost:3000/api/posts/" + id,{ headers: { Authorization: "Bearer " + this.token },})
        .then((res) => {
          console.log(res);
          this.load();
        })
        .catch((error) => {
          console.log(error); 
        });
    },
    confirmDelete(id) {
      if (confirm("Voulez-vous vraiment supprimer ce post ?")) {
        this.deletePost(id);
      }
    },
    switchToUpdate(Id) {
      if (this.UpdateId == -1) {
        this.UpdateId = Id;
      }
      else{
        this.UpdateId = -1;
      }
    
    },
    addImg() {
      this.file = this.$refs.file.files[0];
      this.urlImage = document.getElementById("fileInput").value;
    },
    loadComments(idPost) {
      axios.get(`http://localhost:3000/api/posts/comments/${idPost}`, {
          headers: { Authorization: "Bearer " + this.token },
      })
      .then((res) => {
        this.Comments = res.data;
      })
      .catch((error) => {
          console.log(error);
      });
    },
    loademoji(){
        axios.get(`http://localhost:3000/api/posts/react/emoji`, {
            headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => {
          this.Emojis = res.data;
        })
        .catch((error) => {
            console.log(error);
      });
    },
    loadReact(idPost) {
      console.log(idPost);
      axios.get(`http://localhost:3000/api/posts/react/${idPost}`, {
          headers: { Authorization: "Bearer " + this.token },
      })
      .then((res) => {
        this.React = res.data;
       
      })
      .catch((error) => {
          console.log(error);
      });
    },
    SwitchToComment(idPost) {
      if (this.mode == `CommentsViews${idPost}`) {
        this.mode = '';
      }else{
        this.mode = `CommentsViews${idPost}`;
      }
      
      this.loadComments(idPost)
    },
    SwitchToReaction(idPost) {
      if (this.view == `emoji${idPost}`) {
        this.view = '';
      }else{
        this.view = `emoji${idPost}`;
      }
      this.loadReact(idPost)
      this.loademoji()
    },
  },
  mounted() {
    this.auth()
    this.getuser()
    this.getPosts()
  },
}
</script>

<style lang="scss" scoped>
.profil{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
  &__user{
    display: flex;
    align-items: center;
    text-align: center;
    &__btn{
      display: flex;
      align-items: center;
      text-align: center;
    }
    .button{
      width: content;
    }
    .icon{
      font-size: 1.1rem;
    }
    @media (max-width: 700px) {
      flex-direction: column;
    }
  }
}
.imgcontainer{
  .imgProfil{
    width: 100px;
    height: 100px;
  }
}
.imgProfil{
  width: 90px;
  height: 90px;
  border-radius: 100%;
  margin:  0 0.5rem;
}
h1{
  font-size: 2rem;
  flex-grow: 4;
  @media (max-width: 700px) {
    font-size: 1rem;
    justify-content: center;
  }
}



</style>