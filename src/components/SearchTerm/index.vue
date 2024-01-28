<template>
    <div>
        <div class="xl:col-span-3  md:col-span-3  lg:col-span-3 sm:col-span-12 col-span-12 mb-2">
            <div>
                <InputGroup :label="`${position}º premiado`" v-model="searchTerm"
                    :placeholder="`Número sorteado ${position}`" type="text" prependIcon="heroicons-outline:search"
                    merged />
            </div>
        </div>
        <div class="xl:col-span-3  md:col-span-3  lg:col-span-3 sm:col-span-12 col-span-12 mb-2">
            <div>
                <Button :text="`Pesquisar`" type="text" class="btn py-2 px-5 lg:ml-2" @click="searchTermTyped" />
            </div>
        </div>
        <span class="text-red-800" v-if="messageError">{{ messageError }}</span>
        <div class="container mx-auto p-5" v-if="collaborator.name && searchTerm">


            <div class="grid grid-cols-12" @click="toggleAccordionInfos">
                <div :class="[
                    'col-span-12 w-full flex justify-between items-center px-4 py-2 rounded-md focus:outline-none mb-4',
                    isAccordionInfosOpen ? 'bg-gray-200 hover:bg-gray-300' : 'bg-success-200 hover:bg-success-300'
                ]">
                    <span class="text-1xl font-semibold" v-if="isAccordionInfosOpen">Informações da Reserva</span>
                    <span class="text-1xl font-semibold" v-if="!isAccordionInfosOpen">Nome: {{ collaborator.name }} |
                        Bilhete: {{ searchTerm }} |
                        Telefone: {{ collaborator.phone }}</span>
                    <svg class="w-4 h-4 transition-transform duration-300 transform"
                        :class="{ 'rotate-180': !isAccordionInfosOpen }" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24" fill="black" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            <div class="bg-gradient-to-r from-slate-800 to-slate-900 shadow rounded-lg p-6 text-slate-300"
                v-show="isAccordionInfosOpen && searchTerm">

                <div class="mb-4">
                    <h3 class="text-sm font-semibold text-white">Campanha:</h3>
                    <p>{{ campaignName }}</p>
                </div>

                <div class="mb-4">
                    <h3 class="text-sm font-semibold text-white">Nome:</h3>
                    <p>{{ collaborator.name }}</p>
                </div>

                <div class="mb-4">
                    <h3 class="text-sm font-semibold text-white">Telefone:</h3>
                    <p>{{ collaborator.phone }}</p>
                </div>

                <div class="mb-4" v-if="collaborator.email">
                    <h3 class="text-sm font-semibold text-white">Email:</h3>
                    <p>{{ collaborator.email }}</p>
                </div>

                <div class="mb-4">
                    <h3 class="text-sm font-semibold text-white">Quantidade de Bilhetes:</h3>
                    <p>{{ collaborator.amount_of_tickets }}</p>
                </div>

                <div class="mb-4">
                    <h3 class="text-sm font-semibold text-white">Preço do Bilhete:</h3>
                    <p>{{ collaborator.price_each_ticket }}</p>
                </div>

                <div v-if="ticketsData.length">
                    <h3 class="text-sm font-semibold text-white">Bilhetes:</h3>
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
                                <Tickets :tickets="ticketsData" :ticket_highlight="searchTerm" />
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
import InputGroup from '@/components/InputGroup';
import Tickets from "@/views/campaigns/tickets.vue";
import Button from '@/components/Button';
import Alert from '@/components/Alert';
import { useToast } from "vue-toastification";
export default {
    components: {
        InputGroup,
        Tickets,
        Button,
        Alert
    },
    data() {
        return {
            ticketsData: [],
            currentTicket: 1,
            perpageTicket: 11,
            pageRangeTicket: 2,
            totalDataTicket: 0,
            currentPageTicket: 1,
            collaboratorId: '',
            isAccordionOpen: true,
            isAccordionInfosOpen: true,
            collaborator: {},
            messageError: ''
        }
    },
    props: {
        position: Number,
        searchTerm: String,
        campaignName: String,
        campaignId: String
    },
    /* watch: {
         searchTerm: function (newSearchTerm) {
             // Verifique se o campo de busca foi preenchido
             if (newSearchTerm) {
                 // Faça a request usando fetch
                 this.getTicketByCampaignId(newSearchTerm)
             }
         },
     },*/
    methods: {
        searchTermTyped() {

            if (this.searchTerm) {
                // Faça a request usando fetch
                this.getCollaboratorByTicket(this.searchTerm)
            } else {
                const toast = useToast();
                toast.info('Insira algum número.', {
                    timeout: 2000,
                });
            }

        },
        toggleAccordion() {
            this.isAccordionOpen = !this.isAccordionOpen;
        },
        toggleAccordionInfos() {
            this.isAccordionInfosOpen = !this.isAccordionInfosOpen;
        },
        getCollaboratorByTicket(ticket_number) {
            this.messageError = ''
            this.collaborator = {}

            const url = `${process.env.VUE_APP_API_BASE_URL}/collaborators/campaigns/${this.campaignId}?keywords[tickets_number]=${ticket_number}`;

            fetch(url, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(res => {
                    if (!res.message) {
                        this.collaborator = res.data[0]
                        
                        res.data[0].position = this.position;
                        res.data[0].sorted_number = ticket_number;
                        this.$emit('searchedCollaborator', res.data[0], this.position - 1)
                        this.ticketsData = res.data[0].numbers;

                    } else {
                        this.$emit('removePosition', this.position)
                            this.messageError = data.message
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
};
</script>