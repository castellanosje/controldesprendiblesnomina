<template>
  <template v-if="user">
    <router-view/>
  </template>
  <Auth v-if="!user && user !== undefined"/>
</template>


<script>
import Auth from "./views/Auth"
import { onMounted, computed } from "vue";
import { useStore } from "vuex"
import {auth} from "./utils/firebase";
export default {
  
  name: "App",
  components:{
    Auth
  },
  setup(){
    const store = useStore();
    const user = computed(()=> store.state.user);
    
    onMounted(()=>{
      auth.onAuthStateChanged((user)=>{
        store.commit("setUser", user);
      });
    });

    return{
      user
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
