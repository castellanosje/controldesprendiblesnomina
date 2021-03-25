<template>
  <div class="login">
      <h1>Iniciar sesión</h1>
      <form class="ui form" @submit.prevent="onLogin">
        <div class="field">
          <input 
            type="text" 
            placeholder="Correo electrónico" 
            v-model="formData.email" 
            :class="{error:formError.email}"/>
        </div>
        <div class="field">
          <input 
            type="password" 
            placeholder="Contraseña" 
            v-model="formData.password" 
            :class="{error:formError.email}"/>
        </div>
        <button type="submit" class="ui button positive fluid">Entrar</button>
      </form>
      <p @click="changeForm">Crear nueva cuenta</p>
    </div>
</template>

<script>
import { ref } from 'vue';
import * as Yup from "yup";
import { auth } from "../../utils/firebase";
export default {
    name:"Login",
    props:{
      changeForm: Function
    },
    setup(props){
      const formData = {};
      const formError = ref({});
      const loading = ref(false);
      const {changeForm} = props;
      const schemaForm = Yup.object().shape({
        email:Yup.string().email(true).required(true),
        password:Yup.string().required(true),
      });

      const onLogin = async () =>{
        loading.value = true;
        formError.value = {};
        try {
          await schemaForm.validate(formData,{abortEarly:false});
          try {
            const {email, password} = formData;
            await auth.signInWithEmailAndPassword(email,password);
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
          //error de validación
          error.inner.forEach((er)=>{
            formError.value[er.path] = er.message;
          });
        }
        loading.value = false;
      };
      return{
        changeForm,
        onLogin,
        formData,
        formError
      }
    }
}
</script>

<style lang="scss" scoped>
.login{
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
  border-top:1px dotted #ddd;
  text-align: center;
  margin-top:10px;
  padding-top:10px;
  &:hover{
    cursor: pointer;
    opacity: 0.3;
  }
}


</style>