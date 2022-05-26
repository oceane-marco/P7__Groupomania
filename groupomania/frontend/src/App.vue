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
body {
  max-width: 1200px;
  padding: 1rem;
  margin: auto;
  background-color: #d4d4d4;
  @media (max-width: 700px) {
    width:100%;
    margin: 0;
  }
}
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #521111;
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
        background: #521111;
        &.router-link-exact-active {
          background: #791111;
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
    color: #521111;
  }
  
  button{
    border: none;
    background-color: #521111;
    color: #FFF;
    padding: 0.5rem ;
    margin: 0.8px;
    border-radius: 5px;
    transition: transform ease-in 0.1s;
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    &:hover{
      background-color: #890000;
    }
    &:active{
      background-color: #890000;
       transform: scale(0.9);
    }
  }
  h1{
    max-width: 100%;
    margin: 0.5rem 0;
    font-size: 1.2rem;
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
    margin-right:1rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    border-radius: 100%;
  }
  @media (max-width: 700px) {
    h1{
      margin: 0.5rem 0;
      font-size: 0.5rem;
    }
    h2{
      margin: 0.5rem 0;
      font-size: 0.9rem;
    }
    h3{
      margin: 0.5rem 0;
      font-size: 0.8rem;
    }
    p{
      margin: 0.5rem 0  ;
      font-size: 0.9rem;
      color: #575656;
    } 
  }


</style>
