<template>
  <div class="cargar-desprendible">
    <button class="ui button primary" @click="showHideForm"> Cargar desprendible </button>
        <form class="ui form cargar-desprendible__form" :class="{open:showForm}" @submit.prevent="handleSubmit">
            <div class="field">
            <label for="file" class="ui icon button">
                <i class="file icon"/>
                Seleccionar desprendible
                <span v-if="file">{{file.name}}</span>
            </label>
            <input type="file" id="file" style="display:none" @change="uploadFile"/>
            </div >
            <div class="field">
                <div class="ui calendar">
                    <div class="ui input left icon">
                        <input type="date" @change="changeDate" :value="date" />
                    </div>
                </div>
            </div>
            <button class="ui button positive" :class="{loading}">Guardar desprendible</button>
            <p v-if="error" class="error">({{error}})</p>
        </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import {v4 as uuidv4 } from 'uuid';
import { auth, storage, db } from '../../utils/firebase';
export default {
    name: "CargarDesprendible",
    props:{
        listarDesprendibles: Function,
    },
    setup(props){
        const { listarDesprendibles } = props;
        const showForm = ref(false);
        const loading = ref(false);
        const file = ref(null);
        const date = ref(null);
        const error = ref(null);
        
        const showHideForm = () => {
            showForm.value = !showForm.value;
        };

        const uploadFile = (e) =>{    
            const fileTemp = e.target.files[0];
            error.value = null;
            if(fileTemp.type === 'application/pdf'){
                file.value = fileTemp;
            }else{
                error.value ="Fichero no válido";
            }
        };

        const changeDate = (e) =>{
            date.value = e.target.value;
        }

        const handleSubmit = async () =>{
            if(file.value && date.value){
                loading.value = true;
                try {
                    //id
                    const nameFile = uuidv4();
                    //almacenamiento
                    await storage.ref(auth.currentUser.uid).child(`${nameFile}.pdf`).put(file.value);
                    const desprendibleUrl = await storage.ref(`${auth.currentUser.uid}/${nameFile}.pdf`).getDownloadURL();
                    
                    //base de datos
                    await db.collection(auth.currentUser.uid).add({
                        desprendibleUrl,
                        date: new Date(date.value),
                        dateString: date.value,
                        nameFile
                    });
                } catch (error) {
                    console.log(error);
                }
                loading.value = false;
                showForm.value=false;
                file.value = null;
                date.value=null;
                error.value=null;
                document.getElementById("file").value = "";
                listarDesprendibles();
            }else{
                console.log("error");
            }
            
        }
        

        return{
            showHideForm,
            uploadFile,
            handleSubmit,
            changeDate,
            showForm,
            loading,
            file,
            date,
            error,
        }

    }
}
</script>

<style lang="scss" scoped>
.cargar-desprendible{
    >.ui.button.primary{
        margin-bottom: 20px;
    }
    &__form{
        display:flex;
        align-items: center;
        flex-direction: column;
        height: 0px;
        overflow: hidden;
        transition: height 0.3s ease;
        

        &.open{
            height: 200px;
            border:1px solid #ddd;
            border-radius: 3px;
            padding:20px;
        }
    }
    .error{
        margin:0px;
    }
}

</style>