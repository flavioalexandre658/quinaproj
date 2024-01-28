<template>
  <div class="loginwrapper bg-slate-100 flex items-center justify-center">
    <div class="lg-inner-column">
      <div class="w-full h-full flex flex-col items-center justify-center">
        <div class="bg-white dark:bg-slate-800 relative my-[64px] mx-auto p-10 rounded-md max-w-[520px]">
          <img src="@/assets/images/icon/success.svg" alt="" class="block mx-auto w-[80px]" v-if="accountActive" />
          <img src="@/assets/images/icon/error.svg" alt="" class="block mx-auto w-[80px]" v-if="!accountActive" />
          <div class="text-center text-slate-800 dark:text-white font-medium text-base mt-4 mb-8">
            <span v-if="accountActive" class="text-success-500 bg-success-200 p-2 rounded">Conta Ativada com Sucesso!</span>
            <span v-if="!accountActive" class="text-danger-500 bg-danger-200 p-2 rounded">Falha ao Ativar sua Conta!</span>
          </div>
          <div class="text-slate-600 dark:text-slate-300 font-normal text-base mb-10 text-center">
            {{ text }}
          </div>
          <router-link to="/app/home" class="btn btn-dark block text-center">
            Ir para Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: '',
      accountActive: false,
      text: ''
    }
  },
  created() {
    // Recupere os parâmetros da rota para obter o nome e o ID da campanha
    this.token = this.$route.params.token;
    this.activeAccount()
  },
  methods: {
    activeAccount() {

      fetch(process.env.VUE_APP_API_BASE_URL + '/active/account/' + this.token, {
        method: 'GET'
      }).then(response => response.json())
        .then(res => {

          if (!res.original.error) {
            this.accountActive = true
            this.text = res.original.message
          }else{
            this.accountActive = false
            this.text = res.original.error
          }
        })
    },
  }
};
</script>
<style lang=""></style>
