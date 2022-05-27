<template>
  <div class="perdu d-flex flex-column align-items-center p-5">
      <input type="text" :placeholder="`${placeholder}`" :class="{'small': small }" />
  </div>
</template>

<script>
import Vue from "vue";

export default{
    name:"Input", 
    props:{
        placeholder:String, 
        small: Boolean
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
  size: 4rem;

    &:hover {
      border-color: #354156;
    }

    &:focus{
        border-color: #354156;
        background-color: white;
        color:#354156; 
    }

    &.small{
      size: 3rem;
    }

  }
</style>