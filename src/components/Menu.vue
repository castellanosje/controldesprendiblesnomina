<template>
  <div class="ui secondary menu">
      <div class="ui container">
          <div class="menu left">
              <router-link class="item" to="/">Nominas</router-link>
              
          </div>
          <router-link class="menu center hide-on-mobile" to="/">
            <img src="../assets/nomina.png" class="ui small image " />
          </router-link>
          <div class="menu right">
            <router-link class="item" to="/cuenta">
                Hola, {{user.displayName || user.email}}
            </router-link>
              <span class="ui item logout" @click="logOut">
                  <i class="sign-out icon" />
              </span>
          </div>
      </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { auth } from '../utils/firebase.js';

export default {
    name:"Menu",
    setup(){
        const store = useStore();
        const logOut = () => auth.signOut();
        const user = computed(() => store.state.user);
        return{
            user,
            logOut
        };
    }
}
</script>

<style lang="scss" scoped>
    .ui.menu.secondary{
        background-color:#16202b;
        .item{
            color:#fff;
            &:hover{
                color:rgb(174, 201, 0);
            }
        }
        .menu.left{
            width:50%;
        }
        .menu.right{
            width: 50%;
            justify-content: flex-end;
            .logout:hover{
                cursor: pointer;
                i{
                    color:rgb(174, 201, 0);
                }
            }
        }

        .menu.center{
            background-color:#16202b;
            top:15px;
            padding:20px;
            position:relative;
            margin:-20px;
            border-radius: 50%;
            border:3px solid #16202b;
            &:hover{
                box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.2);
                border-bottom-color:rgb(174, 201, 0);;
                
            }
            .ui.image{
                width:40px;
            }
        }
        .container{
            width: 100%;
        }
    }

    @media (min-width: 761px) {
    .show-on-mobile { display: none !important; }
    }
    @media (max-width: 760px) {
    .show-on-desktop { display: none !important; }
    .hide-on-mobile { display: none !important; }
    }
</style>