<template>
  <div class="register">
    <h1>Crear cuenta</h1>
    <form class="ui form"  @submit.prevent="onRegister">
        <div class="field">
          <input 
            type="text" 
            placeholder="Correo electrónico" 
            v-model="formData.email"
            :class="{error:formError.email}" />
        </div>
        <div class="field">
          <input 
            type="password" 
            placeholder="Contraseña"
            v-model="formData.password"
            :class="{error:formError.password}" />
        </div>
        <div class="field">
          <input 
            type="password" 
              placeholder="Confirmar contraseña"
              v-model="formData.repeatPassword"
              :class="{error:formError.repeatPassword}" />
        </div>
        <button type="submit" class="ui button primary fluid" :class="{loading}" >Registrar</button>
    </form>
    <p @click="changeForm">Ya tengo una cuenta</p>
  </div>
</template>

<script>

import { ref } from "vue";
import * as Yup from "yup";
import { auth } from "../../utils/firebase";
export default {
  name:"Register",
  props:{
      changeForm: Function
    },
    setup(){
      const formError = ref({});
      const loading = ref(false);
      const formData = { };
      const schemaForm = Yup.object().shape({
        email:Yup.string().email(true).required(true),
        password:Yup.string().required(true),
        repeatPassword:Yup.string().required(true).oneOf([Yup.ref("password")], true),
      });
      const onRegister = async () =>{
        formError.value = {} 
        console.log(formData);
        try {
          await schemaForm.validate(formData, { abortEarly:false });
          console.log("todo ok...");
          try {
            loading.value=true;
            const {email, password} = formData;
            await auth.createUserWithEmailAndPassword(email,password);
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          error.inner.forEach((er)=>{
            formError.value[er.path] = er.message;
          })
        }
        loading.value=false;
      }
      return{
        onRegister,
        formData,
        formError,
        loading
      }
    }
}
</script>

<style lang="scss" scoped>
.register{
  background-color:#fff;
  padding:30px;
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.25);
  border-radius: 4px;
  width:400px;
    h1{
      text-align: center;
      margin-bottom: 20px;
    }
}

form{
  input.error{
    border-color: #faa!important;
    background-color:#ffdede!important;
  }
}

p{
  text-align: center;
  margin-top:30px;
  &:hover{
    cursor: pointer;
    opacity: 0.3;
  }
}

/* Change the white to any color */
.ui.form .field.field input:-webkit-autofill,
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active
{
 -webkit-box-shadow: 0 0 0 30px white inset !important;
}
</style>