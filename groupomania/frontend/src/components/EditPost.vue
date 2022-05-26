<template>
    <form v-on:submit.prevent="UpdatePost(post.id)" class="form">
        <input class="form__input styleInput" v-model="title">
        <textarea class="form__inputText styleInput" v-model="content"></textarea>
        <label for="fileInput" class="newPostCard__form__actionButton ">Ajouter une image</label>
            <em v-if="urlImage">Votre nouvelle image: {{ this.urlImage }}</em>
            <input class= "newPostCard__form__addFile" id="fileInput" name="image" type="file" @change="addImg" ref="file" />
        <div class="form__buttonContainer">
            <button class="form__buttonContainer__button" type="submit">Modifier</button>
            <button v-on:click.prevent="SwitchUpdate" class="form__buttonContainer__button"><i class="fa-solid fa-circle-xmark"></i> Annuler</button>                     
        </div>   
    </form>   
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import axios from 'axios';
export default {
    name: 'EditPost',   
    computed:{
        ...mapGetters(["isAuthenticated","isAdmin"]),
        ...mapState(["user","token"]),
    },
    props: {
        post: Object,
        postContent: String,
        postTitle: String,
    },
    data() {
        return {
            content: this.post.content,
            title:this.post.title,
            file: "",
            urlImage: "",
        }
    },
    methods:{
        UpdatePost(idPost) {
            let data = new FormData();
            console.log(this.file);
            if (this.file) { 
                console.log("ok");  
                data.append("title", this.title);
                data.append("content", this.content);
                data.append("image", this.file, this.file.name);
            } else {             
                data.append("title", this.title);
                data.append("content", this.content);
            }
            console.log(data);
            axios.put(`http://localhost:3000/api/posts/${idPost}` , data, {headers: { Authorization: "Bearer " + this.token },})
            .then((res) => {
                console.log(res);
                this.$emit("load")
                this.SwitchUpdate()
            })
            .catch((error) => {
                console.log(error);
                alert(this.errorAlert = error.response.data.error);
            })
        },
        addImg() {
            this.file = this.$refs.file.files[0];
            this.urlImage = document.getElementById("fileInput").value;
            console.log(this.urlImage);
        },
        SwitchUpdate(){
            this.$emit("switch")
        }
    },
}

</script>
<style lang="scss" scoped>
@import '../assets/_variable.scss';
form{
    display: flex;
    flex-direction: column;
    button{
        margin-top: 0.5rem;
    }
    .styleInput{
        max-width: 100%;
        padding: 0.5rem ;
        margin: 0.5rem 0;
        border-radius: 10px;
        border: 3px solid $secondarycolor;
    }
}

</style>