<template>
    <div>
        <div class="container mx-auto p-2">
            <div class="grid grid-cols-12" @click="toggleAccordionInfos">
                <div :class="[
                    'col-span-12 w-full flex justify-between items-center px-4 py-2 rounded-md focus:outline-none mb-2 text-white',
                    collaborator.status_payment == '1' ? 'bg-success-600 hover:bg-success-800' : 'bg-warning-600 hover:bg-warning-800'
                ]">
                    <span class="text-1xl font-semibold" v-if="isAccordionInfosOpen">Informações da Reserva</span>
                    <span class="text-1xl font-semibold" v-if="!isAccordionInfosOpen">#{{ collaborator.id }} - {{
                        collaborator.name }}</span>
                    <svg class="w-4 h-4 transition-transform duration-300 transform"
                        :class="{ 'rotate-180': isAccordionInfosOpen }" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24" fill="black" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            <div :class="collaborator.status_payment == '1'? 'bg-gradient-to-r from-success-200 to-success-300 shadow rounded-lg p-6 text-slate-800' : 'bg-gradient-to-r from-warning-200 to-warning-300 shadow rounded-lg p-6 text-slate-800'"
                v-show="isAccordionInfosOpen">

                <div class="mb-4">
                    <h3 class="text-sm font-semibold dark:text-slate-500">Nome:</h3>
                    <p>{{ collaborator.name }}</p>
                </div>

                <div class="mb-4">
                    <h3 class="text-sm font-semibold dark:text-slate-500">Quantidade de Bilhetes:</h3>
                    <p>{{ collaborator.amount_of_tickets }}</p>
                </div>

                <div class="mb-4">
                    <h3 class="text-sm font-semibold dark:text-slate-500">Preço do Bilhete:</h3>
                    <p>{{ collaborator.price_each_ticket }}</p>
                </div>

                <div class="mb-4">
                    <h3 class="text-sm font-semibold dark:text-slate-500">Status:</h3>
                    <p v-if="collaborator.status_payment == '1'">Pago</p>
                    <p v-if="collaborator.status_payment == '0'">Pendente</p>
                    <p v-if="collaborator.status_payment == '-1'">Cancelado</p>
                </div>

                <div v-if="ticketsData.length">
                    <h3 class="text-sm font-semibold dark:text-slate-500">Bilhetes:</h3>
                    <div class="mt-2">
                        <button
                            class="w-full flex justify-between items-center bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md focus:outline-none"
                            @click="toggleAccordion">
                            <span class="font-semibold text-slate-900" v-if="!isAccordionOpen">Mostrar Bilhetes</span>
                            <span class="font-semibold text-slate-900" v-else>Ocultar Bilhetes</span>
                            <svg class="w-4 h-4 transition-transform duration-300 transform"
                                :class="{ 'rotate-180': isAccordionOpen }" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24" fill="black" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div v-show="isAccordionOpen" class="mt-2">
                            <div class="content-tickets form-div">

                                <Tickets :tickets="ticketsData" />
                            </div>
                            <br />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
  
<script>
import Tickets from "@/views/campaigns/tickets.vue";
import Button from '@/components/Button';
import Alert from '@/components/Alert';
export default {
    components: {
        Tickets,
        Button,
        Alert
    },
    data() {
        return {
            ticketsData: [],
            currentTicket: 1,
            perpageTicket: 1000,
            pageRangeTicket: 2,
            totalDataTicket: 0,
            currentPageTicket: 1,
            isAccordionOpen: true,
            isAccordionInfosOpen: true,
        }
    },
    props: {
        collaborator: Object,
    },
    created() {
        this.ticketsData = this.collaborator.numbers;
    },
    methods: {
        toggleAccordion() {
            this.isAccordionOpen = !this.isAccordionOpen;
        },
        toggleAccordionInfos() {
            this.isAccordionInfosOpen = !this.isAccordionInfosOpen;
        },
    }
};
</script>