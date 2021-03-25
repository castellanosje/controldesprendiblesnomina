<template>
    <form class="ui form change-mail" @submit.prevent="onChangeEmail">
        <div class="two fields">
             <div class="field"><input type="text" v-model="formData.email" :class="{error:formError.email}" placeholder="Email"/></div>
            <div class="field"><input type="password" v-model="formData.password" :class="{error:formError.password}"/></div>
        </div>
        <p v-if="messageError">{{messageError}}</p>
        <button type="submit" class="ui button primary" :class="{loading}">Actualizar</button>
    </form>
</template>

<script>
import { ref } from 'vue';
import * as Yup from 'yup';
import {auth} from '../../utils/firebase';
import {useStore} from 'vuex';
import { reauthenticate } from '../../utils/firebaseFunctions.js'
export default {
    name:"ChangeMail",
    setup() {
        const store = useStore();
        const loading = ref(false);
        const email = ref("");
        const password = ref("");
        const formError=ref({});
        const messageError = ref("");
        const formData = {};
        const schemaForm = Yup.object().shape({
            email:Yup.string().email(true).required(true),
            password: Yup.string(true),
        });
        
        const onChangeEmail = async() => {
            loading.value = true;
            formError.value={};
            messageError.value = "";
            try {
                await schemaForm.validate(formData, { abortEarly:false });
                try {
                    const {email, password} = formData;
                    await reauthenticate(password);
                    await auth.currentUser.updateEmail(email);
                    auth.signOut();
                } catch (error) {
                    messageError.value = error.message;
                }
            } catch (error) {
                error.inner.forEach((error)=>{
                    formError.value[error.path]=error.message;
                });
            }
            loading.value = false;
        }
        
        return{
            onChangeEmail,
            email,
            password,
            formError,
            loading,
            messageError,
            formData
        }
    }
}

</script>

<style lang="scss" scoped>
    .ui.form.change-mail{
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