<template>
    <BasicLayout>
        <div class="desprendibles">
            <h1>Mis desprendibles</h1>
            <CargarDesprendible :listarDesprendibles ="listarDesprendibles"/>
            <ListaDesprendibles :desprendibles = "desprendibles" :listarDesprendibles ="listarDesprendibles" />
        </div>
    </BasicLayout>
</template>

<script>
import { onMounted, ref } from 'vue';
import {db, storage, auth} from '../utils/firebase';
import CargarDesprendible from '../components/Desprendibles/CargarDesprendible';
import BasicLayout from "../layouts/BasicLayout";
import ListaDesprendibles from '../components/Desprendibles/ListaDesprendibles';
export default {
    name:"Nominas",
    components:{
        BasicLayout,
        CargarDesprendible,
        ListaDesprendibles
    },
    setup() {
        const desprendibles = ref(null);

        onMounted(()=>{
            listarDesprendibles();
        });

        const listarDesprendibles = async () =>{
            const response = await db
                            .collection(auth.currentUser.uid)
                            .orderBy("date", "desc")
                            .get();
            
            const result = [];
            response.docs.forEach((doc)=>{
                const data = doc.data();
                data.id = doc.id;
                result.push(data);
            });
            desprendibles.value = result;    
        }
        return{
            desprendibles,
            listarDesprendibles 
        }
    }
    
}
</script>

<style lang="scss" scoped>
    .desprendibles{
        h1{
            margin:50px 0;
            text-align: center;
        }
    }
</style>