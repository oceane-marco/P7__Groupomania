<template>
    <div class="newPostCard">
        <form class="newPostCard__form" v-if="mode == 'addPost'" v-on:submit.prevent="AddPost">
            <h2>Exprimez-vous!</h2>
            <input class="newPostCard__form__title styleInput" type="text" placeholder="Titre (facultatif)" v-model="title">
            <textarea class="newPostCard__form__text styleInput" type="textarea" placeholder="Votre texte" v-model="content"></textarea>
            <label for="fileInput" class="newPostCard__form__actionButton ">Ajouter une image</label>
            <em v-if="urlImage">Votre nouvelle image: {{ this.urlImage }}</em>
            <input class= "newPostCard__form__addFile" id="fileInput" name="image" type="file" @change="addImg" ref="file" />
            <button class="newPostCard__form__actionButton " type="submit">Publier <i class="sendComment__button__icon fas fa-paper-plane"></i></button>
            <button class="newPostCard__form__actionButton " @click.prevent="SwitchToNormalView">Annuler</button>
        </form>
        <div v-else class="newPostCard__toAddPost">
            <img v-if="user.img" :src="user.img" alt="" class="newPostCard__toAddPost__image avatar">
            <img v-else src="../assets/iconAvatar.svg" alt="avatar" class="newPostCard__toAddPost__image avatar">
            <p class="newPostCard__toAddPost__btnAddPost" @click.prevent="SwitchToAddPost">Exprimez-vous!</p>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import {mapGetters, mapState} from 'vuex';
import moment from 'moment';
export default {
    name: 'NewPost',
    data() {
        return {
            moment: moment,
            mode: 'normalView',
            title: '',
            content: '',
            file: null,
            errorAlert: "",
            urlImage: "",
        }
    },
     computed:{
    ...mapGetters(["isAuthenticated","isAdmin"]),
    ...mapState(["user","token"])
  },
    methods: {
        SwitchToAddPost() {
            this.mode = 'addPost';
        },
        SwitchToNormalView() {
            this.mode = 'normalView';
            this.content = '';
            document.getElementById("fileInput").value='';
            this.file = null;
            this.urlImage = "";
        },
        LoadPosts() {
            this.$emit("loadPosts");
            this.title = "";
            this.content = "";
        },
        addImg() {
            this.file = this.$refs.file.files[0];
            this.urlImage = document.getElementById("fileInput").value;
        },
        AddPost() {          
          let data = new FormData();
         // if (this.file !== null && document.getElementById("fileInput").value !='') {
            if (this.file) {
            console.log(this.file);   
            data.append("title", this.title);
            data.append("content", this.content);
            data.append("user_id", this.user.id);
            data.append("image", this.file, this.file.name);
            data.append("created_date", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
          } else {             
            data.append("title", this.title);
            data.append("content", this.content);
            data.append("user_id", this.user.id);
            data.append("created_date", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
          }
          console.log(data);
          axios.post("http://localhost:3000/api/posts/", data, {
              headers: { 
                Authorization: "Bearer " + this.token,
                //"Content-Type": "multipart/form-data"
              },
            })
            .then((res) => {
              document.getElementById("fileInput").value='';          
              console.log(res);
              this.$emit("loadPosts");
              this.title = "";
              this.content = "";
              this.SwitchToNormalView();   
            })
            .catch((error) => {
              console.log(error);
              alert(this.errorAlert = error.response.data.error);
            });
        },
        
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/_variable.scss';
.newPostCard{
    border-radius: 10px;
    background: $primarycolor;
    color: $background;
    padding: 1rem;
    margin: 1rem 0;
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
    max-width: 100%; 

    &__form{
        width: 100%;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &__title{
            width: 80%;
            padding: 1rem;
            margin-bottom: 25px;
            border-radius: 10px;
        }
        &__text{
            width: 80%;
            padding: 1rem;
            margin-bottom: 25px;
            border-radius: 10px;
        }
        &__addFile{
            display: none;
            border-radius: 10px;
        }
        &__actionButton{
            width: 50%;
            height: 40px;
            margin-bottom: 25px;
            display: flex;
            background-color: $secondarycolor;
            color: $primarycolor;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            border-radius: 10px;
            i{
                margin-left: 10px;
            }
        }
        h2 {
            margin: 0;
            margin-bottom: 1rem;
        }
        label{
            width: 30%;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 25px;
        }
        em{
      
            font-size: 11px;
            font-weight: 700;
            margin-bottom: 15px;
        } 
    }
    &__toAddPost{
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
       
        &__btnAddPost{
            width: 100%;
            border-radius: 5px;
            border: none;
            margin: 0;
            padding: 0.5rem;
            background: $background;
            color: $primarycolor;
            text-align: start;
          
        }
    }
}
</style>
