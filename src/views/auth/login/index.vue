<template>
  <div class="loginwrapper ">
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
        <div class="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
          <Panel class="auth-box h-full flex flex-col justify-center" @hasPermissions="hasPermissions" v-if="permissions"/>
          <div class="auth-box h-full flex flex-col justify-center" v-if="!permissions">
            <div class="mobile-logo text-center mb-18 lg:hidden block max-w-[230px] m-auto">
              <router-link to="/">
                <img src="@/assets/images/logo/logo-white.svg" alt="" class="mx-auto" height="50" />
              </router-link>
            </div>
            <div class="text-center 2xl:mb-10 mb-4">
              <h4 class="font-medium">Fazer login</h4>
              <div class="text-slate-500 text-base">
                Entre na sua conta e comece a usar o
                <img src="@/assets/images/logo/logo-white.svg" alt="" class="inline-block mx-auto" height="60"
                  width="60" />
              </div>
            </div>
            <Signin @hasPermissions="hasPermissions"/>
            <!--<div
              class="relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6"
            >
              <div
                class="absolute inline-block bg-white dark:bg-slate-800 dark:text-slate-400 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm text-slate-500 font-normal"
              >
                Or continue with
              </div>
            </div>
            <div class="max-w-[242px] mx-auto mt-8 w-full">
              <Social />
            </div>-->
            <div class="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase text-sm">
              Ainda não tem conta?
              <router-link to="/register" class="text-slate-900 dark:text-white font-medium hover:underline">
                Cadastre-se
              </router-link>
            </div>
          </div>
          <div class="auth-footer text-center">
            Copyright 2023, 123Rifas Todos os direitos reservados.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Signin from "../common/Signin";
import Panel from "../common/Panel";
import Social from "../common/Social";

export default {
  components: {
    Social,
    Signin,
    Panel
  },
  data() {
      return {
        permissions: false
      }
  },
  methods: {
    hasPermissions(value){
      this.permissions = value
    }
  }
};
</script>
<style lang="scss"></style>
