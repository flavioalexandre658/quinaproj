<template>
    <div class="bg-slate-200">
        <div class="text-left pl-3 pt-5 pb-5 bg-success-500 text-white content-pix-payment" v-if="!collaborator">
            <svg style="display: inline-block;margin-top:-5px;" viewBox="0 0 24 24" width="25px" fill="none"
                xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path opacity="0.1"
                        d="M13.8179 4.54512L13.6275 4.27845C12.8298 3.16176 11.1702 3.16176 10.3725 4.27845L10.1821 4.54512C9.76092 5.13471 9.05384 5.45043 8.33373 5.37041L7.48471 5.27608C6.21088 5.13454 5.13454 6.21088 5.27608 7.48471L5.37041 8.33373C5.45043 9.05384 5.13471 9.76092 4.54512 10.1821L4.27845 10.3725C3.16176 11.1702 3.16176 12.8298 4.27845 13.6275L4.54512 13.8179C5.13471 14.2391 5.45043 14.9462 5.37041 15.6663L5.27608 16.5153C5.13454 17.7891 6.21088 18.8655 7.48471 18.7239L8.33373 18.6296C9.05384 18.5496 9.76092 18.8653 10.1821 19.4549L10.3725 19.7215C11.1702 20.8382 12.8298 20.8382 13.6275 19.7215L13.8179 19.4549C14.2391 18.8653 14.9462 18.5496 15.6663 18.6296L16.5153 18.7239C17.7891 18.8655 18.8655 17.7891 18.7239 16.5153L18.6296 15.6663C18.5496 14.9462 18.8653 14.2391 19.4549 13.8179L19.7215 13.6275C20.8382 12.8298 20.8382 11.1702 19.7215 10.3725L19.4549 10.1821C18.8653 9.76092 18.5496 9.05384 18.6296 8.33373L18.7239 7.48471C18.8655 6.21088 17.7891 5.13454 16.5153 5.27608L15.6663 5.37041C14.9462 5.45043 14.2391 5.13471 13.8179 4.54512Z"
                        fill="#ffffff"></path>
                    <path
                        d="M13.8179 4.54512L13.6275 4.27845C12.8298 3.16176 11.1702 3.16176 10.3725 4.27845L10.1821 4.54512C9.76092 5.13471 9.05384 5.45043 8.33373 5.37041L7.48471 5.27608C6.21088 5.13454 5.13454 6.21088 5.27608 7.48471L5.37041 8.33373C5.45043 9.05384 5.13471 9.76092 4.54512 10.1821L4.27845 10.3725C3.16176 11.1702 3.16176 12.8298 4.27845 13.6275L4.54512 13.8179C5.13471 14.2391 5.45043 14.9462 5.37041 15.6663L5.27608 16.5153C5.13454 17.7891 6.21088 18.8655 7.48471 18.7239L8.33373 18.6296C9.05384 18.5496 9.76092 18.8653 10.1821 19.4549L10.3725 19.7215C11.1702 20.8382 12.8298 20.8382 13.6275 19.7215L13.8179 19.4549C14.2391 18.8653 14.9462 18.5496 15.6663 18.6296L16.5153 18.7239C17.7891 18.8655 18.8655 17.7891 18.7239 16.5153L18.6296 15.6663C18.5496 14.9462 18.8653 14.2391 19.4549 13.8179L19.7215 13.6275C20.8382 12.8298 20.8382 11.1702 19.7215 10.3725L19.4549 10.1821C18.8653 9.76092 18.5496 9.05384 18.6296 8.33373L18.7239 7.48471C18.8655 6.21088 17.7891 5.13454 16.5153 5.27608L15.6663 5.37041C14.9462 5.45043 14.2391 5.13471 13.8179 4.54512Z"
                        stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M9 12L10.8189 13.8189V13.8189C10.9189 13.9189 11.0811 13.9189 11.1811 13.8189V13.8189L15 10"
                        stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </g>
            </svg><span class="text-sm pl-2" style="display: inline-block;font-weight: bolder;">Ação será liberada na hora,
                pague o PIX! 😁🤝</span>
        </div>
        <Timer :expireDate="collaborator.expire_date" v-if="collaborator && payment_bd.id" @expired="expired" />
        <PixPayment v-if="qrCode" :phoneNumber="phoneNumber" :pixGenerated="pixGenerated" :qrCode="qrCode"
            :qrCodeBase64="qrCodeBase64" :price="price" :collaborator="collaborator ? true : false" />
        <PixPayment v-else :phoneNumber="phoneNumber" :pixGenerated="pixGenerated" :pixKey="pixKey" :pixTypeKey="pixTypeKey"
            :pixName="pixName" :price="price" />
        <Alert v-if="collaborator && payment_bd.id"
            className="m-auto mt-2 bg-info-600 bg-opacity-[14%] text-info-800 dark:bg-info-600 dark:bg-opacity-[14%] mb-2 max-w-[380px]"
            type="info-light">
            <Icon icon="heroicons:information-circle" class="mt-1 inline-flex" /> Após o pagamento <b>atualize a página</b>, pode levar
            até 5 minutos para a confirmação.
        </Alert>
        <!-- SOBRE CAMPANHA-->
        <div class="p-[10px] pt-[5px] bg-white rounded-md shadow border border-Black-10 mx-wid content-pix-payment"
            v-if="campaign.id && payment_bd.id">
            <div class="flex gap-3 items-center">
                <div class="max-w-[90px] max-h-[110px]">
                    <img :src="campaign.image" style="width: 100%; height: 100%;" class="rounded-md" />
                </div>
                <div class="flex flex-col">
                    <p class="font-semiBold text-slate-900">{{ campaign.name.toUpperCase() }}</p>
                    <small v-html="truncateText(campaign.description, 100)"
                        class="text-slate-500 number-container w-[240px] block"></small>
                    <!-- Botão que pisca -->
                    <Badge label="Corre que esta acabando!" v-if="collaborator"
                        badgeClass="bg-gradient-to-r from-info-600 to-success-500 blink text-white max-w-[170px]" />
                    <small class="text-slate-500">Sorteio <b class="text-slate-900">{{ campaign.raffle.name }}</b></small>
                </div>
            </div>
        </div>

        <!-- SOBRE COMPRA -->
        <div class="p-[10px] pt-[5px] bg-white rounded-md shadow border border-Black-10 mx-wid content-pix-payment"
            v-if="payment_bd.id && collaborator">
            <div class="flex gap-3 items-center">
                <div class="flex flex-col">
                    <small class="text-slate-500 flex">
                        <Icon icon="heroicons:information-circle" class="mt-1" /> Detalhes da sua compra
                    </small>
                    <small class="text-slate-400 mb-1">{{ payment_bd.transaction_id }}</small>

                    <div class="flex text-sm">
                        <span class="text-slate-900 font-bold">Comprador:&nbsp;</span>
                        <span class="text-slate-900">{{ collaborator.name }}</span>
                    </div>
                    <hr class="max-w-[350px]" />
                    <div class="flex text-sm">
                        <span class="text-slate-900 font-bold">Telefone:&nbsp;</span>
                        <span class="text-slate-900">{{ collaborator.phone }}</span>
                    </div>
                    <hr class="max-w-[350px]" />
                    <div class="flex text-sm">
                        <span class="text-slate-900 font-bold">Data/Horário:&nbsp;</span>
                        <span class="text-slate-900">{{ collaborator.created_at }}</span>
                    </div>
                    <hr class="max-w-[350px]" />
                    <div class="flex text-sm">
                        <span class="text-slate-900 font-bold">Situação:&nbsp;</span>
                        <span class="text-slate-900" v-if="collaborator.status_payment == 0">Aguardando pagamento</span>
                        <span class="text-slate-900" v-if="collaborator.status_payment == -1">Cancelado</span>
                        <span class="text-slate-900" v-if="collaborator.status_payment == 1">Pago</span>
                    </div>
                    <hr class="max-w-[350px]" />
                    <div class="flex text-sm">
                        <span class="text-slate-900 font-bold">Total:&nbsp;</span>
                        <span class="text-slate-900">{{ 'R$ ' + payment_bd.amount }}</span>
                    </div>
                    <hr class="max-w-[350px]" />
                    <div class="flex text-sm">
                        <span class="text-slate-900 font-bold">Bilhetes:&nbsp;</span>
                        <span class="text-slate-900" v-if="collaborator.numbers == '[]'">Os bilhetes são liberados após o pagamento</span>
                        <span class="text-slate-900" v-else>{{ collaborator.numbers }}</span>
                    </div>

                </div>
            </div>
        </div>
        <div class="p-[10px] pt-[5px] bg-white rounded-md shadow border border-Black-10 mx-wid content-pix-payment"
            v-if="payment_bd.id">
            <div class="flex gap-3 items-center">
                <div class="flex flex-col">
                    <small class="text-slate-500 flex">Problema com sua compra ?&nbsp;
                        <a @click="openWhatsApp" style="cursor: pointer;text-decoration: underline;">Falar com
                            suporte</a></small>

                </div>
            </div>
        </div>


        <noscript><img height="1" width="1" style="display:none"
                src="https://www.facebook.com/tr?id={{customizationPixelMeta}}&ev=PageView&noscript=1" /></noscript>
    </div>
</template>
  
<script>
import moment from 'moment';
import SimpleCrypto from 'simple-crypto-js';
import PixPayment from "./PixPayment.vue";
import Timer from "../timer/timer.vue";
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Alert from '@/components/Alert';
export default {
    components: {
        Timer,
        Badge,
        Button,
        Icon,
        Alert,
        PixPayment
    },
    data() {
        return {
            qrCodeBase64: "",
            qrCode: '',
            pixGenerated: false,
            payment: [],
            price: '',
            paymentId: '',
            pixKey: '',
            pixTypeKey: '',
            pixName: '',
            customizationPixelMeta: '',
            customizationTagGoogle: '',
            phoneNumber: '',
            collaborator: {},
            user: {},
            campaign: {},
            payment_bd: {}
        }
    },
    created() {
        // Recupere os parâmetros da rota para obter o nome e o ID da campanha
        this.paymentId = this.$route.params.id;

        this.getPaymentByTransactionId()
    },
    mounted() {
        /*window.Echo.channel('payment-status.' + this.paymentId).listen('.App\\Events\\PaymentStatusUpdated', (data) => {
            console.log('Payment status updated:', data);
            // Faça o que for necessário com os dados recebidos
        });*/
    },
    methods: {
        truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + "...";
            } else {
                return text;
            }
        },
        expired(value) {
            if (value) {
                if (this.collaborator.uuid) {
                    const expireTime = new Date(this.collaborator.expire_date).getTime();


                    const now = new Date().getTime();
                    const timeDiff = expireTime - now;
                    
                    if (this.payment_bd.status == 'pending' && timeDiff <= 0) {
                        window.location.href = `${window.location.origin}/voucher/${this.collaborator.uuid}`
                    }
                } else {
                    if (this.payment_bd.status == 'pending') {
                        window.location.href = `${window.location.origin}/app/home`;
                    }
                }
            }
        },
        clearPhone(telefone) {
            // Use uma expressão regular para remover todos os caracteres não numéricos, exceto o '+'
            return telefone.replace(/[^\d+]/g, '');
        },
        openWhatsApp() {
            let phoneclear = this.clearPhone(this.phoneNumber);

            if (!phoneclear.includes('+55') && !phoneclear.includes('+')) {
                phoneclear = '+55' + phoneclear.replace(/^55/, "XX")
            }

            const url = `https://wa.me/${phoneclear}?text=Olá, acabei de efetuar o pagamento de uma Reserva de Bilhetes, pode conferir por gentileza?`; // URL do WhatsApp com o número de telefone
            window.open(url, '_blank'); // Abrir em uma nova aba
        },
        getPaymentByTransactionId() {

            const url_payment = `${process.env.VUE_APP_API_BASE_URL}/payment/transaction/${this.paymentId}`;

            // Fazer uma requisição POST para o endpoint do Laravel
            fetch(url_payment, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                verify: false
            })
                .then(response => response.json())
                .then(res => {

                    if (res[0]) {

                        this.payment_bd = res[0];
                        
                        if (res[0].status == 'approved' || res[0].status == 'cancelled') {
                            if (res[0].collaborator) {
                                window.location.href = `${window.location.origin}/voucher/${res[0].collaborator.uuid}`
                            } else {
                               // dataLayer.push({ 'event': 'purchase-123rifas', 'conversionValue': this.price });
                                window.location.href = `${window.location.origin}/voucher/${res[0].campaign.uuid}`
                                // Aguarda 5 segundos antes de redirecionar para app home
                                /*setTimeout(function () {
                                    window.location.href = `${window.location.origin}/app/home`;
                                }, 5000);*/
                            }

                        }
                        this.collaborator = res[0].collaborator;
                        this.campaign = res[0].campaign;
                        this.user = res[0].campaign.user;
                        if (res[0].collaborator_id) {
                            moment.locale('pt-br');
                            this.collaborator.created_at = moment(this.collaborator.created_at).format('dddd, D [de] MMMM [de] YYYY [às] HH:mm:ss');
                            let payMethodPix = res[0].campaign.user.payment_methods.find(method => method.name_method === 'Transferência PIX');
                            let payMethodMercadoPago = res[0].campaign.user.payment_methods.find(method => method.name_method === 'Mercado Pago');

                            if (payMethodPix && payMethodPix.status) {
                                this.pixKey = payMethodPix.key;
                                this.pixTypeKey = payMethodPix.type_key;
                                this.pixName = payMethodPix.name_user;
                                this.pixGenerated = true
                                this.phoneNumber = res[0].campaign.support_number;
                                this.price = 'R$ ' + res[0].amount

                            } else {
                                if (payMethodMercadoPago && payMethodMercadoPago.status) {
                                    this.phoneNumber = res[0].campaign.support_number;
                                    this.getPaymentMercadoPagoById()
                                }
                            }

                            if (res[0].campaign.user.customizations) {
                                this.customizationImage = res[0].campaign.user.customizations[0].image;
                                this.customizationPixelMeta = res[0].campaign.user.customizations[0].pixel_meta;
                                this.customizationTagGoogle = res[0].campaign.user.customizations[0].tag_gooogle;

                                fbq('init', this.customizationPixelMeta);
                            }
                        } else {
                            this.phoneNumber = process.env.VUE_APP_SUPPORT_NUMBER
                            this.getPaymentMercadoPagoById();
                        }
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        },
        getPaymentMercadoPagoById() {

            const url_payment = `${process.env.VUE_APP_API_BASE_URL}/mercadopago/payment/${this.paymentId}`;

            // Fazer uma requisição POST para o endpoint do Laravel
            fetch(url_payment, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                verify: false
            })
                .then(response => response.json())
                .then(response => {
                    this.payment = response.payment
                    this.qrCode = response.payment.point_of_interaction.transaction_data.qr_code
                    this.qrCodeBase64 = response.payment.point_of_interaction.transaction_data.qr_code_base64
                    this.pixGenerated = true
                    this.price = 'R$ ' + response.payment.transaction_amount
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
};
</script>
<style scoped>
.content-pix-payment {
    max-width: 380px;
    margin: auto;
    margin-top: 0.5rem;
}

/* Adicione estas regras de estilo ao seu arquivo CSS ou ao estilo do Vue.js */
@keyframes blink {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.blink {
    animation: blink 3s infinite;
    /* Define a animação "blink" com duração de 1 segundo e repetição infinita */
}
</style>
