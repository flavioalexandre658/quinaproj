<template>
    <div class="container mx-auto p-5">
        <div class="grid grid-cols-12" @click="toggleAccordionInfos">
            <div :class="[
                'col-span-12 w-full flex justify-between items-center px-4 py-2 rounded-md focus:outline-none mb-4',
                collaborator.position == 1 ? 'bg-yellow-100 hover:bg-yellow-200' : collaborator.position == 2 ? 'bg-slate-300 hover:bg-slate-400' : collaborator.position == 3 ? 'bg-yellow-500 hover:bg-yellow-600' :
                    'bg-success-200 hover:bg-success-300'
            ]">
                <span class="text-1xl font-semibold">
                    <span v-if="collaborator.position == 1">🥇</span>
                    <span v-if="collaborator.position == 2">🥈</span>
                    <span v-if="collaborator.position == 3">🥉</span>
                    <span v-if="collaborator.position > 3">🏅</span>
                    {{ collaborator.position }}º prêmio</span>
                <svg class="w-4 h-4 transition-transform duration-300 transform"
                    :class="{ 'rotate-180': isAccordionInfosOpen }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="black" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
        <div class="bg-white shadow rounded-lg p-6 text-slate-600" v-show="isAccordionInfosOpen">

            <div class="mb-4" v-if="!collaborator.award">
                <h3 class="text-lg font-semibold ">Campanha:</h3>
                <p>{{ campaignName }}</p>
            </div>

            <div class="mb-4" v-else>
                <h3 class="text-lg font-semibold ">Prêmio:</h3>
                <p>{{ collaborator.award }}</p>
            </div>

            <div class="mb-4">
                <h3 class="text-lg font-semibold ">Nome:</h3>
                <p>{{ collaborator.name }}</p>
            </div>

            <div class="mb-4" v-if="collaborator.show_infos">
                <h3 class="text-lg font-semibold">Telefone:</h3>
                <p>{{ collaborator.phone }} <Icon class="tooltip" icon="heroicons-outline:information-circle" style="display:inline-flex;font-size:15px"/></p>
            </div>

            <div class="mb-4" v-if="collaborator.show_infos && collaborator.email">
                <h3 class="text-lg font-semibold ">Email:</h3>
                <p>{{ collaborator.email }} <Icon class="tooltip" icon="heroicons-outline:information-circle" style="display:inline-flex;font-size:15px"/></p>
            </div>

            <div class="mb-4">
                <h3 class="text-lg font-semibold ">Quantidade de Bilhetes:</h3>
                <p>{{ collaborator.amount_of_tickets }}</p>
            </div>


            <div class="mb-4">
                <h3 class="text-lg font-semibold ">Preço cada Bilhete:</h3>
                <p>{{ collaborator.price_each_ticket }}</p>
            </div>

            <div class="mb-4 bg-success-100 p-2">
                <h3 class="text-lg font-semibold ">Bilhete Sorteado:</h3>
                <p>{{ collaborator.sorted_number }}</p>
            </div>

            <div v-if="ticketsData.length">
                <h3 class="text-lg font-semibold ">Bilhetes:</h3>
                <div class="mt-2">
                    <div class="mt-2">
                        <div class="content-tickets form-div">
                            {{ this.ticketsData }}
                        </div>
                        <br />
                    </div>
                </div>
            </div>
            <div class="col-span-12 w-full text-center mt-5" v-if="collaborator.show_infos">
                <Button class="bg-success-500 px-8  " @click.prevent="openWhatsApp(collaborator.phone)">
                    Entrar em Contato <Icon class="tooltip" icon="heroicons-outline:information-circle" style="display:inline-flex;font-size:15px"/>
                </Button>
            </div>


        </div>
    </div>
</template>
  
<script>
import Tickets from "@/views/campaigns/tickets.vue";
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import InputGroup from '@/components/InputGroup';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // Importe os estilos base do Tippy.js
import 'tippy.js/themes/translucent.css'; // Importe um tema de estilo (opcional)

export default {
    components: {
        Button,
        Tickets,
        InputGroup,
        Icon
    },
    props: {
        collaborator: Object,
        campaignName: String
    },
    data() {
        return {
            isAccordionOpen: false,
            isAccordionInfosOpen: false,
            ticketsData: [],
            current: 1,
            perpage: 11,
            pageRange: 2,
            totalData: 0,
            currentPage: 1,
        }
    },
    created() {
        // Configuração global do Tippy (opcional)
        tippy.setDefaultProps({
            theme: 'translucent', // Escolha um tema de estilo
            placement: 'right', // Posição do tooltip (top, bottom, left, right, etc.)
        });

        // Ativa os tooltips em elementos com a classe "tooltip"
        tippy('.tooltip', {
            content: 'Somente você pode ver essa informação.', // Conteúdo do tooltip
        });

        this.ticketsData = this.collaborator.numbers;


        if (this.collaborator.position == 1) {
            this.isAccordionInfosOpen = !this.isAccordionInfosOpen
        }
    },
    methods: {
        toggleAccordionInfos() {
            this.isAccordionInfosOpen = !this.isAccordionInfosOpen;
        },
        clearPhone(telefone) {
        // Use uma expressão regular para remover todos os caracteres não numéricos, exceto o '+'
        return telefone.replace(/[^\d+]/g, '');
        },
        openWhatsApp(phoneNumber) {
            const url = `https://wa.me/${this.clearPhone(phoneNumber)}`; // URL do WhatsApp com o número de telefone
            window.open(url, '_blank'); // Abrir em uma nova aba
        },
        toggleAccordion() {
            this.isAccordionOpen = !this.isAccordionOpen;
        },
    },
};
</script>
  
<style scoped>
button[aria-expanded="false"] .rotate-180 {
    transform: rotate(180deg);
}

.content-tickets {
    margin-bottom: 50px;
}

.content-pix-payment {
    max-width: 600px;
    margin: auto;
    margin-top: 15px;
}
</style>
  