<template>
<div class="comments">
    <form class="sendComment" v-on:submit.prevent="addComment">
        <img v-if="user.img" class="sendComment__image avatar" :src="user.img" alt="" />
        <img v-else class="sendComment__image avatar" src="../assets/iconAvatar.svg" alt="" />
        <input class="sendComment__input  styleInput" type="text" v-model="content" placeholder="Votre commentaire" />
        <button class="sendComment__button" type="submit" title="Envoyer commentaire"><i class="sendComment__button__icon fas fa-paper-plane"></i></button>
    </form>
    <div class="conteneurComments" v-for=" comment in CommentsPost " :key="comment.id" >
        <div class="profile__info">
            <img v-if="comment.img" :src="comment.img" alt="avatar" class="avatar">
            <img v-else src="../assets/iconAvatar.svg" alt="avatar" class="avatar">
            <div>
                <h3> {{comment.name}} </h3>
                <p>{{moment(comment.created_date).format("DD-MM-YYYY HH:MM")}}</p>
            </div>
        </div>
        <p> {{comment.comment}} </p>
        <button v-if="isAdmin === true || user.id == comment.user_id" type="submit" @click.prevent="confirmDelete(comment.id)" title="Supprimer commentaire"><i class="fas fa-trash-alt"></i></button>
    </div>
</div>
</template>

<script>
import axios from "axios";
var moment = require('moment');
import {mapGetters, mapState} from 'vuex';
export default {
    name: 'NewComment',
     computed:{
        ...mapGetters(["isAuthenticated","isAdmin"]),
        ...mapState(["user","token"]),  
    },
    props: {
       CommentsPost: [Object],
       postId: Number,
    },
    propsData:{},
    data() {
        return {
            moment: moment,
            mode: 'normalView',
            content: '',
            UpdateId:-1,
            errorAlert: "",
            dataUser: [],
        }
    },
    methods: {
        addComment() {
            let data = {
                comment:this.content,
                post_id:this.postId,
                user_id:this.user.id,
                created_date:moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            }
            console.log(data);
            axios.post("http://localhost:3000/api/posts/comments" , data, {
                    headers: { Authorization: "Bearer " + this.token },
                })
                .then(() => {
                    this.content = "";
                    this.$emit("loadComments")
                })
                .catch((error) => {
                    console.log(error);
                    alert(this.errorAlert = error.response.data.error);
                })
        },
        deleteComment(id) {
            axios.delete(`http://localhost:3000/api/posts/comments/${id}`, {
                headers: { Authorization: "Bearer " + this.token },
            })
            .then(() => {
                this.$emit("loadComments")
            })
            .catch((error) => {
                console.log(error);
                alert(this.errorAlert = error.response.data.error);
            });
        },
        confirmDelete(id) {
            if (confirm("Voulez-vous vraiment supprimer ce commentaire ?")) {
                this.deleteComment(id);
            }
        },
        updateComment() {
            let data = new FormData();
                data.append('content', this.content);
                data.append('idPost', this.idPost);
                data.append('iduser', this.userId);
            axios.put("http://localhost:3000/api/posts/comments/" + this.UpdateId, data, {
                headers: { Authorization: "Bearer " + this.token },
            })
                .then((res) => {
                    console.log(res);
                    this.$emit("loadComments")
                    this.content = "";
                    this.UpdateId = -1;
                })
                .catch((error) => {
                    console.log(error);
                    alert(this.errorAlert = error.response.data.error);
                })
        },
      
        switchToUpdate(Id) {
            this.UpdateId = Id;
        },
     
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/_variable.scss';
    .comments{
        width: 85%;
        margin-left:3.5rem;
        @media (max-width: 700px) {
            width: 100%;
            margin:0;
        }
    }
    
    .sendComment {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 0;
        width: 100%;
        border-radius: 10px;
        &__image {
            height: 100%;
            padding: 1rem;
            margin: 0;
        }
        &__input {
            width: 70%;
            height: 40px;
            padding: 0.2rem;
            flex-grow: 4;
            border: $secondarycolor solid 3px ;
            border-radius: 10px;
        }
        &__button {
            border-radius: 50%;
            border: none;
            padding: 1rem;
            background-color: #fff;
            display: flex;
            justify-content: left;
            align-items: left;
            cursor: pointer;
            &:focus {
                outline: none;
            }
            &__icon {
                color: $primarycolor;
            }
        }
        &__addFileInput {
            display: none;
        }
    }
    .conteneurComments{
        border: 3px solid $primarycolor;
        padding: 1rem;
        margin: 0.5rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        text-align: center;
        color: $tertiarycolor;
        .profile__info{
            display: flex;
            align-items: center;
        }
        p{
            flex-grow: 4;
            color: $tertiarycolor;
        }
    }
</style>