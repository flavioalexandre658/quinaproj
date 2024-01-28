<template>
  <div class="loginwrapper">
    <div class="lg-inner-column">
      <div class="left-column relative z-[1]">
        <div class="max-w-[520px] pt-20 pl-20">
          <h4>

            <span class="text-success-400 bg-slate-800 px-2 rounded-[4px] dark:text-slate-400 font-bold">Crie e
              ganhe</span>
            na nossa plataforma de rifas online! 🎉
          </h4>
        </div>
        <div class="absolute left-[160px] 2xl:bottom-[-100px] bottom-[-130px] h-full w-[750px] z-[-1]">
          <img src="@/assets/images/auth/ganhe.png" alt="" class="h-full w-full object-contain" />
        </div>
      </div>
      <div class="right-column relative bg-white dark:bg-slate-800">
        <div class="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
          <div class="auth-box h-full flex flex-col justify-center">
            <div class="mobile-logo text-center mb-6 lg:hidden block">
              <router-link to="/"><img src="@/assets/images/logo/logo.svg" alt=""
                  class="mx-auto mb-18 lg:hidden block max-w-[230px]" /></router-link>
            </div>
            <div class="text-center 2xl:mb-10 mb-5">
              <h4 class="font-medium">Cadastre-se</h4>
              <div class="text-slate-500 dark:text-slate-400 text-base">
                Crie uma conta e comece a vender sua rifa!
              </div>
            </div>
            <Signup />

            <div class="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase text-sm">
              Já tem um cadastro ?
              <router-link to="/" class="text-slate-900 dark:text-white font-medium hover:underline">
                Entrar
              </router-link>
            </div>
          </div>
          <div class="auth-footer text-center">
            Copyright 2023, 123Rifas todos os direitos reservados.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Signup from "../common/Signup";
import Social from "../common/Social";

export default {
  components: {
    Social,
    Signup,
  },
  mounted() {
    this.saveGclidToLocalStorage()
  },
  methods: {
    // Função para obter o valor do parâmetro de consulta "gclid" da URL
    getGclidFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('gclid');
    },

    // Função para salvar o valor do "gclid" no localStorage
    saveGclidToLocalStorage() {
      const gclidValue = this.getGclidFromUrl();

      if (gclidValue) {
        localStorage.setItem('gclid', gclidValue);
      }
    },
  }
};
</script>
<style lang="scss"></style>
