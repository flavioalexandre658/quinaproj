<template>
    <div class="p-[32px] pt-[5px] bg-white rounded-md shadow border border-Black-10 mt-[5px] mx-wid content-pix-payment"
        v-if="pixGenerated && qrCode">
        <div class="my-4 text-sm">Veja o passo a passo como pagar:</div>
        <div class="flex gap-2 flex-col">
            <p class="flex gap-2 items-center text-sm sm:text-base"><span
                    class="shadow text-sm bg-[#19CE83] w-8 flex-none h-8 flex justify-center items-center rounded-full items-center justify-center text-white">1</span>
                Copie a chave PIX abaixo: </p>
            <div class="mt-[2px] relative flex items-center justify-center">
                <input
                    class="text-xs cursor-pointer border bg-white rounded-lg border-Black-100 mt-[8px] w-full pl-[16px] px-[64px] py-[16px]"
                    type="text" v-model="qrCode" v-on:focus="$event.target.select()" readonly ref="clone">
                <button class="absolute top-[4px] translate-y-[90%] right-0 text-sm text-[#19CE83] font-bold pr-[16px]"
                    @click="copyPixCodeClick">
                    Copiar
                </button>
            </div>
            <p class="flex gap-2 items-center text-sm sm:text-base"><span
                    class="shadow text-sm bg-[#19CE83] w-8 flex-none h-8 flex justify-center items-center rounded-full items-center justify-center text-white">2</span><span>Abra
                    o aplicativo do seu banco e escolha a opção <span class="font-bold">PIX Copia e Cola.</span></span></p>
            <p class="flex items-center text-sm sm:text-base gap-2"><span
                    class="shadow text-sm bg-[#19CE83] w-8 flex-none h-8 flex justify-center items-center rounded-full items-center justify-center text-white">3</span><span>
                    Faça o pagamento e aguarde até que a compra seja atualizada para pago automaticamente. </span></p>
        </div>
        <div>
            <div class="text-xl text-center mt-4">Ou escaneie este código para pagar</div>
            <div class="text-sm text-center mt-4 text-danger-500">(Atualize a página após pagamento)</div>
            <div><img class="w-52 mx-auto mt-[16px]" alt="qrcode" :src="'data:image/jpeg;base64,' + qrCodeBase64">
            </div>
        </div>
        <div class="text-center my-6"><span class="text-xl">Valor total </span><span
                class="font-semibold text-xl text-success-500">{{ price }}</span></div>
        <Alert v-if="collaborator"
            className="mt-4 bg-warning-500 bg-opacity-[14%] text-warning-500 dark:bg-warning-500 dark:bg-opacity-[14%] mb-2"
            type="warning-light">
            Este pagamento só pode ser realizado dentro do tempo, após este período, caso o pagamento não for confirmado os
            números voltam a ficar disponíveis.
        </Alert>
        <hr class="m-3">
        <div class="flex flex-col items-center justify-center">
            <p class="text-xs text-gray-400">Processado por</p><img class="w-20 mt-[16px]" alt="qrcode"
                src="../../assets/images/checkout/mercado-pago.png"><!---->
        </div>
    </div>

    <div class="p-[32px] pt-[5px] bg-white rounded-md shadow border border-Black-10 mt-[16px] mx-wid content-pix-payment"
        v-if="pixGenerated && pixKey">
        <div class="my-4 text-sm">Veja o passo a passo como pagar:</div>
        <div class="flex gap-2 flex-col">
            <p class="flex gap-2 items-center text-sm sm:text-base"><span
                    class="shadow text-sm bg-[#19CE83] w-8 flex-none h-8 flex justify-center items-center rounded-full items-center justify-center text-white">1</span>
                Copie a chave PIX. </p>
            <p class="flex gap-2 items-center text-sm sm:text-base"><span
                    class="shadow text-sm bg-[#19CE83] w-8 flex-none h-8 flex justify-center items-center rounded-full items-center justify-center text-white">2</span><span>Abra
                    o aplicativo do seu banco e escolha a opção <span class="font-bold">Transferência PIX.</span></span></p>
            <p class="flex items-center text-sm sm:text-base gap-2"><span
                    class="shadow text-sm bg-[#19CE83] w-8 flex-none h-8 flex justify-center items-center rounded-full items-center justify-center text-white">3</span><span>
                    Faça o pagamento e envie o comprovante no nosso whatsapp. </span></p>
        </div>
        <div>
            <div class="text-xl text-center mt-4">Dados do PIX</div>
        </div>
        <hr class="m-3">
        <div class="text-left my-6">
            <p class="text-sm">Nome</p><span class="font-semibold text-xl text-success-500">{{ pixName }}</span>
        </div>
        <div class="text-left my-6">
            <p class="text-sm">Tipo de Chave</p><span class="font-semibold text-xl text-success-500">{{ pixTypeKey }}</span>
        </div>
        <div class="mt-[16px] relative flex items-center justify-center">
            <input
                class="text-xs cursor-pointer border bg-white rounded-lg border-Black-100 mt-[8px] w-full pl-[16px] px-[64px] py-[16px]"
                type="text" label="Chave PIX" v-model="pixKey" v-on:focus="$event.target.select()" readonly ref="clone" />
            <button class="absolute top-[4px] translate-y-[90%] right-0 text-sm text-[#19CE83]  bg-[#fff] pl-[5px] font-bold pr-[16px]"
                @click="copyPixCodeClick">
                Copiar Chave PIX
            </button>
        </div>
        <div class="text-center my-6"><span class="text-xl">Valor total </span><span
                class="font-semibold text-xl text-success-500">{{ price }}</span></div>

        <Alert v-if="collaborator"
            className="mt-4 bg-warning-500 bg-opacity-[14%] text-warning-500 dark:bg-warning-500 dark:bg-opacity-[14%] mb-2"
            type="warning-light">
            Este pagamento só pode ser realizado dentro do tempo, após este período, caso o pagamento não for confirmado os
            números voltam a ficar disponíveis.
        </Alert>
        <hr class="m-3">
        <Button text="Whatsapp" btnClass="btn-success rounded-full text-sm px-2 py-1" @click="openWhatsApp" />
    </div>
</template>
  
<script>
import Button from '@/components/Button';
import Alert from '@/components/Alert';
import { useToast } from "vue-toastification";
export default {
    components: {
        Button,
        Alert
    },
    props: {
        pixGenerated: Boolean,
        collaborator: {
            type: Boolean,
            default: false,
            required: false
        },
        qrCode: {
            type: String,
            default: '',
            required: false
        },
        qrCodeBase64: {
            type: String,
            default: '',
            required: false
        },
        pixKey: {
            type: String,
            default: '',
            required: false
        },
        pixTypeKey: {
            type: String,
            default: '',
            required: false
        },
        pixName: {
            type: String,
            default: '',
            required: false
        },
        phoneNumber: {
            type: String,
            default: '',
            required: false
        },
        price: String
    },
    methods: {
        reloadPage() {
            window.location.reload();
        },
        copyPixCodeClick() {
            this.$refs.clone.focus();
            document.execCommand('copy');
            const toast = useToast();
            toast.success("Código copiado", {
                timeout: 2000,
            });
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
</style>