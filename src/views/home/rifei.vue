<template>
    <div class="grid grid-cols-12 p-20 m-auto max-w-[600px]">
        <!--<div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2">
            <InputGroup type="text" id="id_campaign" v-model="id_campaign" label="ID Ação:" placeholder="ID da Ação" />
        </div>-->
        <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2">
            <InputGroup type="text" id="tel_buyer" v-model="tel_buyer" label="Telefone Comprador:"
                placeholder="Telefone do comprador" />
        </div>
        <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2">
            <InputGroup type="text" id="qtd_tickets" v-model="qtd_tickets" label="Quantidade de Bilhetes:"
                placeholder="Quantidade a comprar" />
        </div>
        <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2">
            <InputGroup type="text" id="link_rifas" v-model="link_rifas" label="Link das Rifas:"
                placeholder="Link da Rifa" />
        </div>
        <div class="lg:col-span-4 xl:col-span-4 sm:col-span-8 col-span-12">
            <div class="mt-4 lg:ml-2">
                <span>Deseja criar o pedido ?</span>
                <Switch :activeClass="toggle_visible.value" :active="createOrder" v-model="create_order" badge icon
                    :prevIcon="toggle_visible.prevIcon" :nextIcon="toggle_visible.nextIcon" @click="toggleCreateOrder" />
                    
            </div>
        </div>
        <!--<div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2">
            <InputGroup type="text" id="numbers" v-model="numbers"
                label="Números Sorteados:" placeholder="000000,111111,222222"/>
        </div>-->
        <div class="p-3 m-auto text-center">
            <Button icon="heroicons-outline:plus" text="Adicionar" btnClass="btn-success mb-2 ml-2" @click="addRifa" />
        </div>
    </div>
    <div v-for="(item, index) in winners" :key="index" class="pt-20 m-auto text-center max-w-[600px]">
        <Alert type="success-light" style="padding:9px 12px;margin-bottom:8px;" icon="akar-icons:check">
            <span class="">🎉 Bilhetes Sorteado - ENCONTRADO <b>({{ numeroEncontrado }})</b></span>
        </Alert>
        <p>{{ item.buyer_name }}</p>
        <p>{{ '/checkout/' + item.id }}</p>
        <hr />
    </div>

    <div v-if="canceled" class="pt-20 m-auto text-center max-w-[600px]">
        <Alert type="danger-light" style="padding:9px 12px;margin-bottom:8px;" icon="akar-icons:block">
            <span class="">Não encontrou Bilhetes Sorteado - PEDIDO CANCELADO ({{ count }})</span>
        </Alert>
        <p>{{ orderCanceled.id }}</p>
        <p>{{ orderCanceled.buyer_name }}</p>
        <p>{{ orderCanceled.buyer_email }}</p>
        <p>{{ orderCanceled.buyer_phone }}</p>
        <hr />
    </div>

    <div class="p-3 m-auto text-center">
        <Button icon="heroicons-outline:plus" text="Gerar" btnClass="btn-dark mb-2 ml-2" @click="generateData" />
    </div>
    <!-- Meta tag para impedir a indexação -->
    <meta name="robots" content="noindex, nofollow">
</template>
<script>
import SearchTerm from "@/components/SearchTerm";
import VueSelect from "@/components/Select/VueSelect";
import Alert from "@/components/Alert";
import vSelect from "vue-select";
import Card from '@/components/Card';
import Checkbox from '@/components/Checkbox';
import Icon from '@/components/Icon';
import Button from '@/components/Button';
import Modal from "@/components/Modal/ModalCustom";
import { useToast } from "vue-toastification";
import {
    basicArea,
    basicAreaDark,
    donutTwo,
    donutTwoDark
} from './Analytics-Component/data';
import DropEvent from './Analytics-Component/DropEvent';
import SelectMonth from './Analytics-Component/SelectMonth';
import Teamtable from './Analytics-Component/Teamtable';
import Switch from '@/components/Switch';
// Importe o componente apexchart
import VueApexCharts from "vue3-apexcharts";
import InputGroup from '@/components/InputGroup';
import jwt_decode from 'jwt-decode'
export default {
    components: {
        apexchart: VueApexCharts,
        Switch,
        SearchTerm,
        Modal,
        Alert,
        Card,
        Icon,
        Checkbox,
        Teamtable,
        DropEvent,
        SelectMonth,
        VueSelect,
        vSelect,
        Button,
        InputGroup,
    },
    data() {
        return {
            winners: [],
            canceled: false,
            orderCanceled: {},
            numeroEncontrado: null,
            numerosParaVerificar: [],
            count: 0,
            rifas: [],
            id_campaign: null,
            qtd_tickets: null,
            link_rifas: null,
            numbers: null,
            create_order: true,
            toggle_visible: {
                label: 'Criar pedido ?',
                value: 'bg-success-500',
                prevIcon: 'akar-icons:check',
                nextIcon: 'akar-icons:block',
            },
        };
    },
    mounted() {
    },
    methods: {
        addRifa() {
            const toast = useToast();
            this.rifas.push({ 'id_campaign': this.id_campaign, 'qtd_tickets': this.qtd_tickets, 'link_rifas': this.link_rifas, 'tel_buyer': this.tel_buyer, 'create_order': this.create_order })
            this.qtd_tickets = null
            this.link_rifas = null
            this.tel_buyer = null
            this.create_order = true
            toast.success("Rifa Adicionada.", {
                timeout: 2000,
            });
            const token = "Y2xyYjl2Mzl4MzYzZmg3anBjam14OHpxcg.p9Uea0yYIKuNc8aSqMGorOC39yr8L3TMjKgKNMnCykrdMKRrd4Vm8mU6sDM2";
            //const payload = window.atob(token);
            //console.log(payload)

        },
        getInfosRifa(rifa) {
            // Montar a URL correta
            const url = 'https://api.rifei.co/raffles/' + rifa.link_rifas.replace(/^https:\/\/rifei\.com\.br\//, '');

            // Exibir o backdrop
            let backdrop = this.showBackDrop('Obtendo Informações da Rifa [' + rifa.link_rifas.replace(/^https:\/\/rifei\.com\.br\//, '') + '] ...');

            // Definir os dados do cabeçalho
            const headers = new Headers();
            headers.append('Authorization', 'Bearer Y2xyOWZreXRvMWIycHY1anA3cTF2Yzdtdw.CB07HuTSVk646WpA95O6czVkk9ByNP_rqvTEZUuL3RjTg0ZUTNYTCYxhQ9Yt');
            headers.append('authority', 'api.rifei.co');
            headers.append('method', 'GET');
            headers.append('path', '/raffles/' + rifa.link_rifas.replace(/^https:\/\/rifei\.com\.br\//, ''));
            headers.append('scheme', 'https');

            // Realizar a solicitação com os dados do cabeçalho
            fetch(url, {
                method: 'GET',
                headers: headers
            })
                .then(response => response.json())
                .then(res => {
                    if (res) {
                        let luckyNumbers = res.additional_info.lucky_numbers.numbers;
                        rifa.id_campaign = res.id;
                        rifa.numerosParaVerificar = [];
                        luckyNumbers.forEach((item) => {
                            rifa.numerosParaVerificar.push(item.number);
                        });
                        this.getBuyer(rifa);
                    }
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    // Remover o backdrop
                    backdrop.remove();
                });
        },

        getBuyer(rifa) {
            const url = 'https://api.rifei.co/buyers/' + rifa.tel_buyer;
            let backdrop = this.showBackDrop('Obtendo Informações do Comprador [' + rifa.tel_buyer + '] ...');

            fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer Y2xyOWZreXRvMWIycHY1anA3cTF2Yzdtdw.CB07HuTSVk646WpA95O6czVkk9ByNP_rqvTEZUuL3RjTg0ZUTNYTCYxhQ9Yt'
                }
            })
                .then(response => response.json())
                .then(res => {
                    if (res) {

                        if(rifa.create_order){
                            this.createOrder(res, rifa)
                        }else{
                            this.verifyNumber(null, rifa);
                        }
                    }
                })
                .catch(error => {
                    console.error(error);
                }).finally(() => {
                    backdrop.remove()
                });
        },
        verifyNumber(order = null, rifa) {
            const url = 'https://api.rifei.co/raffles/' + rifa.id_campaign + '/orders?visualization=list&offset=0&limit=20';

            let backdrop = this.showBackDrop('Verificando se saiu bilhete premiado ...');

            // Definir os dados do cabeçalho
            const headers = new Headers();
            headers.append('Authorization', 'Bearer Y2xyOWZreXRvMWIycHY1anA3cTF2Yzdtdw.CB07HuTSVk646WpA95O6czVkk9ByNP_rqvTEZUuL3RjTg0ZUTNYTCYxhQ9Yt');
            headers.append('authority', 'api.rifei.co');
            headers.append('method', 'GET');
            headers.append('path', '/raffles/' + rifa.id_campaign + '/orders?visualization=list&offset=0&limit=10');
            headers.append('scheme', 'https');
            headers.append('Referer', 'https://app.rifei.com.br/');
            headers.append('Origin', 'https://app.rifei.com.br');
            fetch(url, {
                method: 'GET',
                headers: headers
            })
                .then(response => response.json())
                .then(res => {
                    if (res.orders) {
                        const orders = res.orders

                        let numerosParaVerificar = rifa.numerosParaVerificar
                        console.log(numerosParaVerificar)
                        // Inicializa uma variável para armazenar o número encontrado
                        let numeroEncontrado = null;

                        // Função para verificar se algum número está presente no campo 'numbers'
                        function verificaNumeros(order) {
                            const numerosDoOrder = order.numbers.split(',').map(numero => parseInt(numero.trim()));
                            const numerosComuns = numerosParaVerificar.filter(numero => numerosDoOrder.includes(numero));

                            // Se houver números comuns, armazena o primeiro encontrado e retorna true
                            if (numerosComuns.length > 0) {
                                numeroEncontrado = numerosComuns[0];
                                return true;
                            }

                            return false;
                        }

                        // Filtra os pedidos que contêm algum dos números
                        const pedidosComNumeros = orders.filter(verificaNumeros);

                        if (pedidosComNumeros.length) {
                            pedidosComNumeros.forEach((item) => {
                                item.linkRifa = rifa.link_rifas + '/checkout/' + item.id
                            })
                            this.winners = pedidosComNumeros;
                            this.numeroEncontrado = numeroEncontrado;

                        } else {
                            if (order) {
                                this.cancelOrder(order);
                            }
                        }
                    }
                })
                .catch(error => {
                    console.error(error);
                }).finally(() => {
                    backdrop.remove()
                });
        },
        generateData() {
            this.rifas.forEach((item) => {
                this.getInfosRifa(item)
            })
        },
        createOrder(buyer, rifa) {
            const url = 'https://api.rifei.co/raffles/orders';

            let backdrop = this.showBackDrop('Criando o pedido ...');

            let form = {
                numbers_quantity: rifa.qtd_tickets,
                payment_method: "mercado_pago_pix",
                raffle_id: rifa.id_campaign,
                buyer: buyer
            }
            fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer Y2xyOWZreXRvMWIycHY1anA3cTF2Yzdtdw.CB07HuTSVk646WpA95O6czVkk9ByNP_rqvTEZUuL3RjTg0ZUTNYTCYxhQ9Yt',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
                .then(response => response.json())
                .then(res => {
                    if (res) {
                        this.verifyNumber(res, rifa);
                    }
                })
                .catch(error => {
                    console.error(error);
                }).finally(() => {
                    backdrop.remove()
                });
        },
        cancelOrder(order) {
            const url = 'https://api.rifei.co/raffles/orders/cancel/' + order.id;

            let backdrop = this.showBackDrop('Cancelando pedido [' + order.id + '] ...');

            let form = {
                phone: order.buyer_phone,
            }
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer Y2xyOWZreXRvMWIycHY1anA3cTF2Yzdtdw.CB07HuTSVk646WpA95O6czVkk9ByNP_rqvTEZUuL3RjTg0ZUTNYTCYxhQ9Yt',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
                .then(response => response.json())
                .then(res => {
                    if (res) {
                        this.canceled = true;
                        this.orderCanceled = res;
                        this.count = this.count + 1;
                    }
                })
                .catch(error => {
                    console.error(error);
                }).finally(() => {
                    backdrop.remove()
                });
        },
        showBackDrop(text) {
            // Criar o backdrop
            const backdrop = document.createElement('div');
            backdrop.className = 'backdrop';

            // Criar o contêiner
            const container = document.createElement('div');
            container.className = 'container_backdrop';  // Adicione a classe container

            // Criar o spinner
            const spinner = document.createElement('div');
            spinner.className = 'spinner';

            // Criar o span
            const span = document.createElement('span');
            span.innerText = text;

            // Adicionar o spinner e o span ao contêiner
            container.appendChild(spinner);
            container.appendChild(span);

            // Adicionar o contêiner ao backdrop
            backdrop.appendChild(container);
            // Adicionar o backdrop ao body
            document.body.appendChild(backdrop);

            return backdrop;
        },
    },

};
</script>
  
<style lang="scss">
.backdrop {
    z-index: 99999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    /* Fundo branco com opacidade */
    display: flex;
    align-items: center;
    justify-content: center;
}

.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #0f172a;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Estilo para centralizar o contêiner */
.container_backdrop {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    z-index: 1000000;
}
</style>