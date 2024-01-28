<template>
    <div>
        <div id="raffle-numbers"
            class="my-5 bg-slate-900 text-white rounded-md border-none py-4 w-full flex flex-wrap gap-1 px-4 justify-center">
            <Button v-for="ticket in displayedTickets" :key="ticket.id" :id="'btn-' + ticket.number"
                class="raffle-number-btn" :class="{
                    'cart': ticket.status === '1',
                    'paid': ticket.status === '-1',
                    'selected': isSelected(ticket),
                    'selected2': parseInt(ticket_highlight) === parseInt(ticket.number)
                }" @click="selectTicket(ticket)" :disabled="ticket.status !== '1'">
                {{ ticket.number }}
            </Button>

        </div>
        <div class="bg-slate-900 fixed bottom-0 left-0 w-full p-2 flex justify-between z-[3]"
            v-if="selectedTickets.length > 0">
            <div>
                <span class="text-[16px] leading-10 font-medium line-through text-danger-500">
                    {{ "R$" + (selectedTickets.length * compare_price_ticket).toFixed(2) }} </span>
                <span class="text-[26px] leading-10 font-medium text-white pl-2">
                    {{ "R$" + getTotalPrice(price_ticket) }} </span>
            </div>
            <div>
                <Button class="bg-warning-500 px-8 text-white" @click.prevent="reserveTickets"
                    :disabled="selectedTickets.length === 0">
                    Reservar agora
                </Button>
            </div>
        </div>
    </div>
</template>
  
<script>
import Button from '@/components/Button';
export default {
    props: {
        tickets: {
            type: Array,
            required: true,
        },
        price_ticket: {
            type: Number,
            required: false,
        },
        sales_campaign: {
            type: Array,
            required: false,
        },
        compare_price_ticket: {
            type: Number,
            required: false,
        },
        ticket_highlight: {
            type: Number,
            required: false
        }
    },
    components: {
        Button
    },
    data() {
        return {
            selectedTickets: [],
            promotionActive: false
        };
    },
    computed: {
        displayedTickets() {
            return this.tickets || [];
        },
    },
    methods: {
        getTotalPrice(price) {
            this.promotionActive = false
            if (this.sales_campaign.length) {
                this.sales_campaign.forEach((item) => {

                    if ((!item.sale.amount_tickets_end && item.sale.amount_tickets == this.selectedTickets.length) ||
                        (item.sale.amount_tickets <= this.selectedTickets.length && this.selectedTickets.length <= item.sale.amount_tickets_end)) {
                        price = this.extractNumberFromString(item.sale.price_amount);
                        this.promotionActive = true;
                    }
                })
            }
            return (this.selectedTickets.length * price).toFixed(2);
        },
        selectTicket(ticket) {

            if (ticket.status !== -1 && this.price_ticket) {
                if (this.isSelected(ticket)) {
                    this.selectedTickets = this.selectedTickets.filter(
                        (selectedTicket) => selectedTicket.id !== ticket.id
                    );
                } else {
                    this.selectedTickets.push(ticket);
                }
            }
        },
        isSelected(ticket) {
            return this.selectedTickets.some(
                (selectedTicket) => selectedTicket.id === ticket.id
            );
        },
        reserveTickets() {
            // Logic to reserve the selected tickets
            let ticket_ids = []

            this.selectedTickets.forEach(ticket => {
                ticket_ids.push(ticket.id)
            });

            this.$emit("selectedTickets", ticket_ids);
        },
        extractNumberFromString(str) {
            // Remover os caracteres não numéricos da string
            var numberStr = str.replace(/[^\d.,]/g, '');

            // Substituir a vírgula por ponto decimal
            numberStr = numberStr.replace(',', '.');
            numberStr = numberStr.replace('R$', '');

            // Converter a string para float
            var number = parseFloat(numberStr);

            return number;
        }
    },
};
</script>
  
<style>
.raffle-number-btn {
    font-size: 12px;
    background-color: #fff;
    border: 1px solid #e2e8f0;
    color: #1a202c;
    padding: .02rem .50rem;
    border-radius: 6px;
    cursor: pointer;
}

.raffle-number-btn.cart {
    background-color: transparent;
    color: #fff;
}

.raffle-number-btn.paid {
    background-color: #68d391;
    color: #fff;
}

.raffle-number-btn.selected {
    background-color: #4299e1;
    color: #fff;
}

.raffle-number-btn.selected2 {
    background-color: #4299e1;
    color: #fff;
}
</style>
  