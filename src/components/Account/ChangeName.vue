<template>
    <form class="ui form change-name" @submit.prevent="onChangeName">
        <div class="field">
            <input type="text" v-model="name" :class="{error:formError}" placeholder="Nombre y apellidos"/>
        </div>
        <button type="submit" class="ui button primary" :class="{loading}">Actualizar</button>
    </form>
</template>

<script>
import { ref } from 'vue';
import * as Yup from 'yup';
import {auth} from '../../utils/firebase';
import {useStore} from 'vuex';
export default {
    name:"ChangeName",
    setup() {
        const store = useStore();
        const loading = ref(false);
        const name = ref("");
        const formError=ref(false);
        const schemaForm = Yup.object().shape({
            name:Yup.string().min(3,true).required(true),
        });
        const onChangeName = async() =>{
            
            formError.value=false;
            try{
                await schemaForm.validate({name:name.value}, {abortEarly:false}); 
                try {
                    loading.value = true;
                    await auth.currentUser.updateProfile({
                        displayName: name.value,
                    });
                    store.dispatch('updateUser');
                    console.log("wipiti");
                } catch (error) {
                    console.log(error);
                }
            }catch (error){
                error.inner.forEach((error)=>{
                    formError.value = error.message;
                });
                console.log(formError.value);
            }
            loading.value = false;
        }
        return{
            onChangeName,
            name,
            formError,
            loading
        }
    }
}

</script>

<style lang="scss" scoped>
    .ui.form.change-name{
        text-align: center;
        input.error{
            border-color: #faa;
            background-color:#ffeded;
        }
    
        .ui.button{
            margin:20px 0 0 0;
        }
    }
</style>