<template>
  <div class="basic-layout">
      <Menu/>
      <div class="ui container">
          <slot />
      </div>
  </div>
</template>

<script>
import  Menu  from '../components/Menu'
export default {
    name:"BasicLayout",
    components:{
        Menu
    }
}
</script>

<style lang="scss" scoped>
    .container{
        padding-top:40px;
    }
</style>