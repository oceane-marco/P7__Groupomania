<template>
  <div class="app">
    <header>
      <router-link to="/">
        <img alt="Vue logo" id="logo" src="./assets/logo.svg">
      </router-link>
      <NavBar />
    </header>
    <div id="View">
     <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  components: {
    NavBar,
  },
}
</script>

<style lang="scss">
@import './assets/_variable.scss';
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
body {
  font-family: 'Lato', Helvetica, Arial, sans-serif;
  max-width: 1200px;
  padding: 1rem;
  margin: auto;
  background-color: $secondarycolor;
  @media (max-width: 700px) {
    width:100%;
    margin: 0;
  }
}
.app {
  color: $primarycolor;
  max-width: 100%;
  header{
    display: flex;
    justify-content: center;
    padding: 1rem  0;

    #logo{
      max-width: 100%;
      @media (max-width: 700px) {
       justify-content: center;
       max-width: 100%;
      }
    }
    nav {
      display: flex;
      justify-content: left;
      align-items: flex-end;
      margin: 0;
      margin-top: 1rem;
      a {
        text-decoration: none;
        font-weight: bold;
        padding: 1rem;
        color: #FFF;
        background: $primarycolor;
        &.router-link-exact-active {
          opacity: 0.5;
        }
      }
      @media (max-width: 700px) {
        margin-top: 2rem;
        justify-content: center;
      }
    }
    @media (max-width: 700px) {
      flex-direction: column;
    }
  }
  @keyframes scale-up-center {
      0% {
          -webkit-transform: scale(1);
                  transform: scale(1);
      }
      100% {
          -webkit-transform: scale(1.5);
                  transform: scale(1.5);
      }
  }
 
}
 #View{
   max-width: 100%;
  }
  a {
    height: 50px;
    text-decoration: none;
    color: $primarycolor;
  }
  
  button{
    border: none;
    background-color: $primarycolor;
    color: $background;
    padding: 0.5rem ;
    margin: 0.8px;
    border-radius: 5px;
    transition: transform ease-in 0.1s;
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    &:hover{
      opacity: 0.8;
    }
    &:active{
      opacity: 0.5;
      transform: scale(0.9);
    }
  }
  h1{
    max-width: 100%;
    margin: 1rem 0;
    font-size: 2rem;
  }
  h2{
    margin: 0.5rem 0;
    font-size: 1.1rem;
  }
  h3{
    margin: 0.5rem 0;
    font-size: 1rem;
  }
  p{
    margin: 0.5rem 0  ;
    font-size: 0.9rem;
    color: #575656;
  } 
  .avatar {
    width: 50px;
    height: 50px;
    padding: 0.5rem;
    border-radius: 50%;
    object-fit: cover;
    border-radius: 100%;
  }
  img{
    object-fit: cover;
  }
  @media (max-width: 700px) {
    h1{
      margin: 0.5rem 0;
      font-size: 1.5rem;
    }
    h2{
      margin: 0.5rem 0;
      font-size: 1rem;
    }
    h3{
      margin: 0.5rem 0;
      font-size: 0.9rem;
    }
    p{
      margin: 0.5rem 0  ;
      font-size: 0.8rem;
      color: #575656;
    } 
  }


</style>
