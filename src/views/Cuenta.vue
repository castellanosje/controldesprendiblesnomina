<template>
    <BasicLayout>
        <h1>Bienvenido a los ajustes de tu cuenta</h1>
        <div class="account__section">
            <p class="title">Cambiar Nombre<span v-if="user.displayName">({{user.displayName}})</span></p>
            <ChangeName/>
        </div>
        <div class="account__section">
            <p class="title">Cambiar Email<span v-if="user.email"> ({{user.email}})</span></p>
            <ChangeMail/>
        </div>
        <div class="account__section">
            <p class="title">Cambiar Password</p>
            <ChangePassword/>
        </div>
    </BasicLayout>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import BasicLayout from '../layouts/BasicLayout';
import ChangeName from '../components/Account/ChangeName';
import ChangeMail from '../components/Account/ChangeMail';
import ChangePassword from '../components/Account/ChangePassword';

export default {
    name:"Cuenta",
    components:{
        BasicLayout,
        ChangeName,
        ChangeMail,
        ChangePassword
    },
    setup(){
        const store = useStore();
        const user = computed(()=> store.state.user);
        return{
            user,
        }
    }
}
</script>

<style lang="scss" scoped>
.account{
    h1{
        margin:50px 0;
        text-align:center;
    }
    &__section{
            position:relative;
            padding:10px;
            border:1px solid #16212b;
            padding-top:25px;
            margin-top:40px;

            .title{
                position: absolute;
                top:-12px;
                background-color:#16212b;
                color:#fff;
                padding:2px 10px;
            }
        }
    }
</style>