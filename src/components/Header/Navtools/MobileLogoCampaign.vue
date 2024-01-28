<template>
    <router-link :to="{ name: 'home' }">
      <img :src="customizationImage"       alt="123Rifas"
      width="80"
      height="20"/>
    </router-link>
  </template>
  
  <script>
  export default {
    props: {
      customizationImage: {
        type: String,
        default: "",
      }
    }
  }
  </script>
  