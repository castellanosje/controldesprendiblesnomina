<template>
    <div class="desprendibles-list">
        <p class="desprendibles-list__not-found" v-if="desprendibles?.length === 0">
            Aun no tienes desprendibles asociados a tu cuenta
        </p>
        <div
            class="desprendibles-list__desprendible"
            v-for="desprendible in desprendibles"
            :key="desprendible.id"
        >
        <p>{{formatDate(desprendible.dateString)}}</p>
        <div class="action">
            <a :href="desprendible.desprendibleUrl" target="_blank" class="ui button positive">Descargar</a>
            <button @click="eliminarDesprendible(desprendible.id, desprendible.nameFile)" class="ui button red">Eliminar</button>
        </div>

        </div>
    </div>
</template>

<script>
import { auth, storage, db} from '../../utils/firebase.js';
import moment from "moment";
import "moment/locale/es";
export default {
    name:'listaDesprendibles',
    props:{
        desprendibles:Array,
        listarDesprendibles:Function,

    },
    setup(props) {
        const {listarDesprendibles} = props;
        const formatDate = (date) =>{
            return moment(date).format("MMMM D [del] YYYY");
        }

        const eliminarDesprendible = async (id, nameFile ) =>{
            const userId = auth.currentUser.uid;
            try {
                await db.collection(userId).doc(id).delete();
                console.log("se eliminó el registro");
                
                // Create a reference to the file to delete
                console.log(userId+'/'+nameFile+'.pdf');
                try {
                    const fileRef = await storage.ref(`${userId}/${nameFile}.pdf`);
                   
                    await fileRef.delete();
                    console.log("se eliminó el archivo");
                    
                } catch (error) {
                        console.log("el registro del archivo se elimino correctamente de la base de datos, pero no se pudo eliminar el archivo físico de la unidad de almacenamiento:" + error);
                }
                
                listarDesprendibles();

            } catch (error) {
                console.error("Error eliminando el registro de la base de datos: ", error);
            }

        }
        return{
            formatDate,
            listarDesprendibles,
            eliminarDesprendible
        }
    }

}

</script>

<style lang="scss" scoped>
    .desprendibles-list{
        &__not-found{
            text-align: center;
            font-size: 20px;;
        }
        &__desprendible{
            display:flex;
            align-items: center;
            justify-content: space-between;
            margin: 15px 0;
        
            p{
                text-transform: uppercase;
                font-weight: bold;
                text-align:left;
            }
        }


    }

</style>