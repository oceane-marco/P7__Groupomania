<template>
  <div class="laodposts">
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
          <button v-if="isAdmin === true || this.user.id == post.user_id" @click.prevent="confirmDelete(post.id)" title="supprimer"><i class="fa-solid fa-trash-can"></i></button>
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
          <NewEmoji  @loadEmoji="loadReact(post.id)" :ReactsPost="this.React" :EmojisPost="this.Emojis" :userId="user.id" :postId="post.id" :userReact="userHaveReact" />
        </div>
        <div v-if="mode == `CommentsViews${post.id}`" >
          <NewComment @loadComments="loadComments(post.id)" :CommentsPost="this.Comments" :postId="post.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import {mapGetters, mapState} from 'vuex';
import EditPost from './EditPost';
import NewComment from './NewComment.vue';
import NewEmoji from './NewEmoji.vue';
export default {
  name: 'LoadPosts',
  components: {EditPost, NewComment, NewEmoji },
   computed:{
    ...mapGetters(["isAuthenticated","isAdmin"]),
    ...mapState(["user","token"]),
      
  },
  data() {
    return {
      moment: moment,
      mode:'',
      view:'',
      title: "",
      content: "",
      UpdateId:-1,
      file: "",
      urlImage: "",
      urlImageComment: "",
      Posts:[],
      Comments: [],
      React:[],
      userHaveReact:"",
      Emojis:[],
    }
  },
  methods: {
    load() {
        axios.get("http://localhost:3000/api/posts" , {
          headers: { 
            Authorization: "Bearer " + this.token,
          },
        })
          .then((res) => {
            res.data.reverse()
            this.Posts = res.data;
            this.file = null;
            this.urlImage = "";
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
      this.UpdateId = Id;
    
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
          for(var i = 0; i < this.React.length; i++) {
            if (this.React[i].user_id == this.user.id && this.React[i].post_id == idPost  ) {
              this.userHaveReact = "add";
            }else {
              this.userHaveReact = "update"
            }
          }
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
    this.load();
  },
}

</script>

<style lang="scss">
@import '../assets/_variable.scss';
 .laodposts{
  width: 100%;
 }
 .imgAv{
  margin: 0.5rem;
 }
 .postCard {
  display: flex ;
  justify-content: flex-end;
  flex-direction: column;
  background-color: $background;
  border-radius: 10px;
  margin: 1rem 0 ;
  padding: 1rem;
  max-width: 100%;
  &__contenaire{
    display: flex;
    flex-direction: column;
    max-width: 100%;
    &__profile{
      display: flex ;
      flex-direction: row;
      max-width: 100%;
      text-align: left;
      justify-content: space-between;
      &__info{
        display: flex ;
        p{
          color: $tertiarycolor;
          font-size: 0.8rem;
          margin: 0.5rem 0;
          text-align: start;
        } 
      }
      &__btn{
        margin-left: auto;
      }
    }
    &__content{
      display: flex;
      flex-direction: column;
      justify-content:flex-start;
      white-space: break-spaces;
      text-align: justify;
      max-width: 100%;
      @media (max-width: 700px) {
       max-width: 100%;
       margin-left:0;
      }
      &__image{
        object-fit: cover;
        border-radius: 10px;
        max-width: 100%;
      }
    }
    &__button{
     display: flex;
     justify-content: space-between;
     max-width: 100%;
     button{
      margin-top: 0.5rem;
      width: 49%;
     }
    }
    
  }
 
 

  #FunctionBTN{
    width: 50%;
    display: flex;
    justify-content:flex-end;
    width: 100%;
  }
 
}


</style>
