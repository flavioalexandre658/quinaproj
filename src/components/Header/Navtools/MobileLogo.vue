<template>
  <router-link :to="{ name: 'home' }" aria-label="Ir para inicio do site 123Rifas">
    <img
      src="@/assets/images/logo/logo-c.svg"
      alt="123Rifas"
      width="80"
      height="20"
      v-if="!this.$store.state.isDark"
    />

    <img
      src="@/assets/images/logo/logo-c-white.svg"
      alt="123Rifas"
      width="80"
      height="20"
      v-if="this.$store.state.isDark"
    />
  </router-link>
</template>
<script></script>
