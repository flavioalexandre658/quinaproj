<template>
  <Dropdown classMenuItems=" w-[180px] top-[58px]">
    <div class="flex items-center">
      <div class="flex-1 mr-[10px]">
        <div class="lg:h-8 lg:w-8 h-7 w-7 rounded-full">
          <img src="https://api.123rifas.com/storage/user-files/profile-user-4.svg" :alt="this.$store.state.user.name" class="block w-full h-full object-cover rounded-full" v-if="!this.$store.state.user.image"/>
          <img :src="this.$store.state.user.image" :alt="this.$store.state.user.name" class="block w-full h-full object-cover rounded-full" v-if="this.$store.state.user.image"/>
        </div>
      </div>
      <div
        class="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
        <span class="overflow-hidden text-ellipsis whitespace-nowrap w-[85px] block">{{ this.$store.state.user.name }}</span>
        <span class="text-base inline-block ml-[10px]">
          <Icon icon="heroicons-outline:chevron-down"></Icon>
        </span>
      </div>
    </div>
    <template #menus>
      <MenuItem v-slot="{ active }" v-for="(item, i) in ProfileMenu" :key="i">
      <div type="button" :class="`${active
        ? 'bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-900 dark:text-slate-300'
        : 'text-slate-600 dark:text-slate-300'
        } `"
        class="inline-flex items-center space-x-2 w-full px-4 py-2 first:rounded-t last:rounded-b font-normal cursor-pointer"
        @click="item.link()">
        <div class="flex-none text-lg">
          <Icon :icon="item.icon" />
        </div>
        <div class="flex-1 text-sm">
          {{ item.label }}
        </div>
      </div>
      </MenuItem>
    </template>
  </Dropdown>
</template>
<script>
import { MenuItem } from "@headlessui/vue";
import Dropdown from "@/components/Dropdown";
import Icon from "@/components/Icon";
import Cookie from 'js-cookie'
export default {
  components: {
    Icon,
    Dropdown,
    MenuItem,
  },
  data() {
    return {
      ProfileMenu: [
        {
          label: "Configurações",
          icon: "heroicons-outline:cog",
          link: () => {
            this.$router.push("settings");
          },
        },
        {
          label: "Sair",
          icon: "heroicons-outline:login",
          link: () => {
            window.location.href = window.location.origin + "/";
            Cookie.remove('_access_token');
            Cookie.remove('_user_id')
          },
        },
      ],

    };
  },
};
</script>
<style lang="">
</style>
