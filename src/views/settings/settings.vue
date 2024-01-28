<template>
  <div class="grid grid-cols-12 gap-6">
    <!-- Menu Lateral Esquerdo -->
    <div class="col-span-12 lg:col-span-3 xl:col-span-3 sm:col-span-12">
      <div class="bg-white p-5 rounded-md shadow-sm dark:bg-slate-500">
        <h2 class="font-semibold text-xl mb-5">Configurações</h2>

        <div class="space-y-2">
          <router-link
            to="/app/settings/account"
            class="flex items-center space-x-2 menu-link p-1 rounded-md"
            :class="{ 'router-link-active': selectedOption === 'minhaconta' }"
            @click="selectedOption = 'minhaconta'"
          >
            <div class="flex space-x-3 rtl:space-x-reverse items-center">
              <div
                class="flex-none h-8 w-8 rounded-full bg-success-500 text-white flex flex-col items-center justify-center text-lg"
              >
                <Icon icon="heroicons:users" />
              </div>
              <div class="flex-1 text-base text-slate-900 dark:text-white font-medium text-link">
                Minha Conta
              </div>
            </div>
          </router-link>

          <router-link
            to="/app/settings/methods"
            class="flex items-center space-x-2 menu-link p-1 rounded-md"
            :class="{ 'router-link-active': selectedOption === 'meiosdepagamentos' }"
            @click="selectedOption = 'meiosdepagamentos'"
          >
            <div class="flex space-x-3 items-center rtl:space-x-reverse">
              <div
                class="flex-none h-8 w-8 rounded-full bg-primary-500 text-slate-300 flex flex-col items-center justify-center text-lg"
              >
                <Icon icon="heroicons:credit-card" />
              </div>
              <div class="flex-1 text-base text-slate-900 dark:text-white font-medium text-link">
                Meios de Pagamentos
              </div>
            </div>
          </router-link>

          <router-link
            to="/app/settings/customizations"
            class="flex items-center space-x-2 menu-link p-1 rounded-md"
            :class="{ 'router-link-active': selectedOption === 'personalizacao' }"
            @click="selectedOption = 'personalizacao'"
          >
            <div class="flex space-x-3 items-center rtl:space-x-reverse">
              <div
                class="flex-none h-8 w-8 rounded-full bg-yellow-600 text-slate-300 flex flex-col items-center justify-center text-lg"
              >
                <Icon icon="heroicons:pencil" />
              </div>
              <div class="flex-1 text-base text-slate-900 dark:text-white font-medium text-link">
                Personalização
              </div>
            </div>
          </router-link>

          <router-link
            to="/app/settings/social-medias"
            class="flex items-center space-x-2 menu-link p-1 rounded-md"
            :class="{ 'router-link-active': selectedOption === 'redesSociais' }"
            @click="selectedOption = 'redesSociais'"
          >
            <div class="flex space-x-3 items-center rtl:space-x-reverse">
              <div
                class="flex-none h-8 w-8 rounded-full bg-pink-600 text-slate-300 flex flex-col items-center justify-center text-lg"
              >
                <Icon icon="heroicons:megaphone" />
              </div>
              <div class="flex-1 text-base text-slate-900 dark:text-white font-medium text-link">
                Redes Sociais
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Conteúdo da Página -->
    <div class="col-span-12 lg:col-span-9 xl:col-span-9 sm:col-span-12">
      <div class="bg-white p-5 rounded-md shadow-sm dark:bg-slate-500">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";

export default {
  components: {
    Icon,
  },
  data() {
    return {
      selectedOption: "",
    };
  },
};
</script>

<style lang="scss">
.menu-link.router-link-active {

    @apply bg-slate-800 dark:bg-slate-700;
    .text-link {
      @apply text-white dark:text-slate-300;
    }
}
</style>
