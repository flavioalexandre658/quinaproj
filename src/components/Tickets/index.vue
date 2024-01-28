<template>
    <div class="bg-white shadow rounded-lg p-6 text-slate-600">

        <div>
            <h3 class="text-lg font-semibold ">Bilhetes:</h3>
            <div class="mt-2">
                <button
                    class="w-full flex justify-between items-center bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md focus:outline-none"
                    @click="toggleAccordion">
                    <span class="font-semibold text-slate-900" v-if="!isAccordionOpen">Mostrar Bilhetes</span>
                    <span class="font-semibold text-slate-900" v-else>Ocultar Bilhetes</span>
                    <svg class="w-4 h-4 transition-transform duration-300 transform"
                        :class="{ 'rotate-180': isAccordionOpen }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="black" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div v-show="isAccordionOpen" class="mt-2">
                    <div class="content-tickets form-div">

                        <Tickets :tickets="ticketsData" :ticket_highlight="collaborator.sorted_number" />
                        <!-- Paginação -->
                        <div class="flex items-center justify-center">
                            <Button @click="goToPreviousPage" :disabled="current === 1" v-if="totalData > perpage"
                                btnClass="btn bg-slate-500 text-white mr-2" text="Anterior" type="button" />

                            <Button @click="goToNextPage" :disabled="current === pageRange" v-if="totalData > perpage"
                                btnClass="btn bg-slate-500 text-white ml-2" text="Próxima" type="button" />
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import Tickets from "@/views/campaigns/tickets.vue";
import Button from '@/components/Button';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // Importe os estilos base do Tippy.js
import 'tippy.js/themes/translucent.css'; // Importe um tema de estilo (opcional)

export default {
    components: {
        Button,
        Tickets,
    },
    props: {
        collaborator: Object
    },
    data() {
        return {
            isAccordionOpen: false,
            ticketsData: [],
            current: 1,
            perpage: 1000,
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
        


        if (this.collaborator.position == 1) {
            this.isAccordionInfosOpen = !this.isAccordionInfosOpen
        }
    },
    methods: {
        clearPhone(telefone) {
            // Use uma expressão regular para remover todos os caracteres não numéricos, exceto o '+'
            return telefone.replace(/[^\d+]/g, '');
        },
        openWhatsApp(phoneNumber) {
            const url = `https://wa.me/${this.clearPhone(phoneNumber)}`; // URL do WhatsApp com o número de telefone
            window.open(url, '_blank'); // Abrir em uma nova aba
        },
        toggleAccordion() {
            if(!this.ticketsData.length){
                this.ticketsData = this.collaborator.numbers;
            }
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
    margin-bottom: 0px;
}

.content-pix-payment {
    max-width: 600px;
    margin: auto;
    margin-top: 15px;
}
</style>
  