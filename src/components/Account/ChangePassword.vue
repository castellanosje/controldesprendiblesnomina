<template>
    <form class="ui form change-password" @submit.prevent="changePassword">
        <div class="three fields">
            <div class="field">
                <input type="password" v-model="formData.password" :class="{error:formError.password}" placeholder="Contraseña actual" />
            </div>
            <div class="field">
                <input type="password" v-model="formData.newPassword" :class="{error:formError.newPassword}" placeholder="Nueva contraseña" />
            </div>
            <div class="field">
                <input type="password" v-model="formData.confPassword" :class="{error:formError.confPassword}" placeholder="Confirmar nueva contraseña" />
            </div>
        </div>
        <button type="submit" class="ui button primary" :class="{loading}">Actualizar</button>
    </form>
    <p v-if="errorMessage">{{errorMessage}}</p>

</template>

<script>
import * as Yup from 'yup';
import { ref } from 'vue';
import { auth } from '../../utils/firebase';
import { reauthenticate } from '../../utils/firebaseFunctions'


export default {
    name:"ChangePassword",
    setup(){
        const formData = {};
        const errorMessage = ref("");
        const formError = ref({});
        const loading = ref(false);

        const formSchema = Yup.object().shape({
            password:Yup.string().required('El campo contraseña es requerido'),
            newPassword:Yup.string().required('El campo nueva contraseña es requerido'),
            confPassword:Yup.string().required('El campo confirmar contraseña es requerido').oneOf([Yup.ref('newPassword')],'la nueva contraseña y su confirmación no coinciden').notOneOf([Yup.ref('password')],'la contraseña antigua y la nueva no deben coincidir')
        })

        const changePassword = async () => {
            loading.value=true;
            errorMessage.value = "";
            formError.value = {};
            try {
                await formSchema.validate(formData,{abortEarly:false});
                //cambiar contraseña en firebase  
                try {
                    const { password, newPassword } = formData;
                    await reauthenticate(password);
                    await auth.currentUser.updatePassword(newPassword);
                    auth.signOut();
                } catch (error) {
                    console.log(error);
                    errorMessage.value = error.message;
                }
            } catch (error) {
                error.inner.forEach((error)=>{
                    formError.value[error.path]=error.message;
                });
            }
            loading.value=false;
           
        }


        return{
            formData,
            changePassword,
            errorMessage,
            formError, 
            loading
        }
    }
}
</script>

<style lang="scss" scoped>
.ui.form.change-password{
    text-align: center;
    input.error{
        border-color:#faa;
        background-color:#ffeded;
    }

    .ui.button{
        margin:20px 0 0 0;
    }
}

</style>