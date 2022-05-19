<template>
  <div class="perdu d-flex flex-column align-items-center p-5">
      <input type="text" :placeholder="placeholder" :style="`font-size: ${fontsize}`" />
  </div>
</template>

<script>
import Vue from "vue";

export default{
    name:"Input", 
    props:{
        placeholder:String, 
        fontsize: String
    }
}
</script>

<style lang="scss" scoped>
input {
  width: 20rem;
  border: #6D7889 3px solid;
  border-radius: 50px;
  padding-left: 2vh;
  color:#BBBAB9;

    &:hover {
      border-color: #354156;
    }

    &:focus{
        border-color: #354156;
        background-color: white;
        color:#354156; 
    }
  }
</style>