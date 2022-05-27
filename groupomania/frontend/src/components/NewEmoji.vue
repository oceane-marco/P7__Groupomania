<template>
    <div class="emoji">
        <div class="emoji__choice">
            <button  v-for="emoji in EmojisPost" :key="emoji.id" v-on:click="reaction(this.postId ,emoji.id)" >
                {{emoji.emoji}}
            </button>
        </div>   
        <div class="emoji__listUser">
            <div v-for="react in ReactsPost" :key="react.user_id">
                <router-link :to="{ name: 'Profil-Page', params: { id: react.user_id }}">
                <strong> {{react.name}} </strong>{{react.emoji}}
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapState} from 'vuex';
import axios from 'axios';
export default {
    name: 'NewEmoji',
    computed:{
        ...mapGetters(["isAuthenticated","isAdmin"]),
        ...mapState(["user","token"]),  
    },
    props: {
        EmojisPost: [Object],
        ReactsPost: Object,
        userId :Number,
        postId: Number,
        userReact: Boolean,
    },
    data() {
        return {
            mode:"",
        }
    },
    methods: {
        reaction(post_id, emoji_id){
            if (this.mode == "add") {
                this.mode = "update"
                const React = {
                    user_id: this.user.id,
                    post_id: post_id,
                    emoji_id: emoji_id,
                }
                axios.post(`http://localhost:3000/api/posts/react/emoji`, React, {
                    headers: { Authorization: "Bearer " + this.token },
                })
                .then(() => {
                    this.mode = "update"
                    this.$emit("loadEmoji")
                })
                .catch((error) => {
                    console.log(error);
                });
                return
            }
            if (this.mode == "update") {
                const React = {
                    emoji_id: emoji_id,
                }
                 axios.put(`http://localhost:3000/api/posts/react/${this.user.id}/${post_id}`,React, {
                    headers: { Authorization: "Bearer " + this.token },
                })
                .then(() => {
                    this.$emit("loadEmoji")
                })
                .catch((error) => {
                    console.log(error);
                });
                return
            }
        },
        delete(){

        },
        switchMode(){
            this.$emit("loadEmoji")
            if(this.userReact){
                this.mode="update"
            } else{
                this.mode="add"
            }
        },
    }, 
    mounted() {
        this.$emit("loadEmoji")
        this.switchMode()
    },
}
</script>

<style lang="scss" scoped>
    .emoji{
        display: flex;
        flex-direction: column;
        &__choice{
            display: flex;
            width: 100%;
            justify-content: space-between;
            flex-flow: wrap;
            padding: 1rem 0;
            button{  
                font-size: 30px;
                padding: 0;
                background: none;
                &:hover{
                    animation:scale-up-center .4s cubic-bezier(.39,.575,.565,1.000) both
                }
            }
        }
        &__listUser{
            max-height: 100px;
            font-size: 20px;
            overflow-y: scroll;
            display: flex;
            flex-wrap: wrap;
        }
        
    }
   
</style>