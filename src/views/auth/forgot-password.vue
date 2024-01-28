<template>
  <div class="loginwrapper">
    <div class="lg-inner-column">
      <div class="left-column relative z-[1]">
        <div class="max-w-[520px] pt-20 pl-20">
          <h4>

            <span class="text-success-400 bg-slate-800 px-2 rounded-[4px] dark:text-slate-400 font-bold">Crie e ganhe</span>
            na nossa plataforma de rifas online! 🎉
          </h4>
        </div>
        <div class="absolute left-[160px] 2xl:bottom-[-100px] bottom-[-130px] h-full w-[750px] z-[-1]">
          <img src="@/assets/images/auth/ganhe.png" alt="" class="h-full w-full object-contain" />
        </div>
      </div>
      <div class="right-column relative">
        <div
          class="inner-content h-full flex flex-col bg-white dark:bg-slate-800"
        >
          <div class="auth-box2 flex flex-col justify-center h-full">
            <div class="mobile-logo text-center mb-6 lg:hidden block">
              <router-link to="/"
                ><img
                  src="@/assets/images/logo/logo.svg"
                  alt=""
                  class="mx-auto mb-18 lg:hidden block max-w-[230px]"
              /></router-link>
            </div>
            <div class="text-center 2xl:mb-10 mb-5">
              <h4 class="font-medium mb-4">Esqueceu sua senha?</h4>
              <div class="text-slate-500 dark:text-slate-400 text-base">
                Recupere sua senha do nosso sistema
              </div>
            </div>
            <div
              class="font-normal text-base text-slate-500 dark:text-slate-400 text-center px-2 bg-slate-100 dark:bg-slate-600 rounded py-3 mb-4 mt-10"
            >
              Insira seu email e enviaremos instruções para recuperar a senha.
            </div>

            <ForgotPass />
            <div
              class="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-8 uppercase text-sm"
            >
              Deixa quieto,
              <router-link
                to="/"
                class="text-slate-900 dark:text-white font-medium hover:underline"
              >
                retornar
              </router-link>
              para o Login
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
import ForgotPass from "./common/forgot";

export default {
  components: {
    ForgotPass,
  },
};
</script>
<style lang="scss"></style>
