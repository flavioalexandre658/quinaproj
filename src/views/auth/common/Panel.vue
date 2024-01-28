<template>
    <div class="m-auto justify-center">
        <h2 class="text-[25px]">Bem-vindo(a)!</h2>
        <span class="text-[22px] mt-3">Escolha o dashboard abaixo:</span>
        <div class="panel my-5 w-[100%]" v-for="item in panels" :key="item.id" @click="item.id == 1 ? crmDashboard() : raffleDashboard()">
            <div :class="[
                'price-table',
                'rounded-[6px]',
                'shadow-base',
                'p-2',
                'dark:text-white',
                'text-slate-900',
                'relative',
                'overflow-hidden',
                'z-[0]',
                hoverClass
            ]" @mouseover="setHover(item.id)" @mouseout="setHover(0)">
                <header class="py-3">
                    <div class="flex items-center">
                        <span class="text-[22px] leading-10 font-medium">{{ item.name }}</span>
                        <!-- Botão totalmente à direita -->
                        <button class="px-5 py-1 rounded-md ml-auto"
                            :class="isHovered == item.id ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'">
                            acessar
                        </button>
                    </div>
                </header>
            </div>
        </div>
        
        <button class="text-start bg-transparent text-slate-900 mt-5" @click="backSignin">voltar</button>
    </div>
</template>
  
<script>
import Cookie from 'js-cookie';
import Textinput from "@/components/Textinput";
import * as yup from "yup";
import jwt_decode from 'jwt-decode'
export default {
    components: {
        Textinput,
    },
    data() {
        return {
            checkbox: false,
            email: "",
            emailError: "",
            password: "",
            passwordError: "",
            panels: [
                {
                    id: 1,
                    name: 'CRM Dashboard'
                },
                {
                    id: 2,
                    name: 'Rifa Dashboard'
                }
            ],
            isHovered: 0,
            hoverClass: '',
        };
    },
    methods: {
        setHover(value) {
            this.isHovered = value;
            this.hoverClass = value == 1 ? 'hover:bg-warning-500 hover:text-white' : 'hover:bg-success-500 hover:text-white';
        },
        backSignin(){
            this.$emit('hasPermissions', false);
            Cookie.remove('_role')
            Cookie.remove('_access_token')
        },
        raffleDashboard(){
            window.location.href = window.location.origin + "/app/home";
        },
        crmDashboard(){
            window.location.href = window.location.origin + "/admin/crm";
        }
    },
};
</script>
  
<style lang="css">
.panel {
    cursor: pointer;
}
</style>
  