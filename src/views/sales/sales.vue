<template>
    <div>
        <div class="lg:col-span-12 col-span-12 xl:col-span-6 sm:col-span-6  py-3 px-2">
            <Alert type="danger-light" style="padding:9px 12px;margin-bottom:8px" icon="akar-icons:info">
                <span class="font-semibold">Saiba como criar promoções, <a href="https://youtu.be/X5kAIaygu3o"
                        target="_blank"><b>clique
                            aqui</b></a>.</span>
            </Alert>
        </div>
        <Card noborder>
            <div class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center">
                <h5>Promoções</h5>
                <div class="grid grid-cols-12">
                    <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 text-end p-3">
                        <Button icon="heroicons-outline:plus" text="Nova promoção" btnClass="btn-dark "
                            @click="openModalSales(false)" />
                    </div>
                    <!--<div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 text-end p-3">
                        <InputGroup v-model="searchTerm" placeholder="Buscar" type="text"
                            prependIcon="heroicons-outline:search" merged />
                    </div>-->
                </div>

            </div>

            <vue-good-table :columns="columns" styleClass="vgt-table bordered centered" :rows="salesTable"
                :pagination-options="{
                    enabled: true,
                    perPage: perpage,
                }" :search-options="{
    enabled: true,

}" :select-options="{
    enabled: false,
    selectOnCheckboxOnly: true,
    selectioninfoClass: 'custom-class',
    selectionText: 'rows selected',
    clearSelectionText: 'clear',
    disableSelectinfo: true,
    selectAllByGroup: true,
}" compactMode :line-numbers="true">
                <template v-slot:table-row="props">
                    <span v-if="props.column.field == 'id'">
                        {{ '#' + props.row.id }}
                    </span>
                    <span v-if="props.column.field == 'created_at'" class="text-slate-500 dark:text-slate-300">
                        {{ props.row.created_at }}
                    </span>
                    <span v-if="props.column.field == 'action'">
                        <Dropdown classMenuItems=" w-[140px]">
                            <span class="text-xl">
                                <Icon icon="heroicons-outline:dots-vertical" />
                            </span>
                            <template v-slot:menus>
                                <MenuItem v-for="(item, i) in actions" :key="i"
                                    @click="item.name === 'editar' ? openModalSales(true, props.row.id) : deleteSale(props.row.id)">
                                <div
                                    :class="`
                    
                      ${item.name === 'deletar'
                                            ? 'bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white'
                                            : 'hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50'
                                        }
                       w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center `">
                                    <span class="text-base">
                                        <Icon :icon="item.icon" />
                                    </span>
                                    <span>{{ item.name }}</span>
                                </div>
                                </MenuItem>
                            </template>
                        </Dropdown>
                    </span>
                </template>
                <template #pagination-bottom="">
                    <div class="py-4 px-3">
                        <Pagination :total="totalData" :current="current" :per-page="perpage" :pageRange="pageRange"
                            @page-changed="handlePageChange" enableSearch enableSelect :options="options"
                            :perPageChanged="handlePerPageChange">
                        </Pagination>
                    </div>
                </template>
            </vue-good-table>
        </Card>
        <Modal title="Gerenciar Promoções" ref="modalSales" centered themeClass="bg-slate-900"
            @close-modal="closeModalSale">
            <div class="form-div">
                <form @submit.prevent="submitForm">
                    <div class="grid grid-cols-8">
                        <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2">
                            <InputGroup type="number" id="amount_tickets" v-model="form.amount_tickets" label="Início:"
                                placeholder="Quantidade de bilhetes" />
                        </div>

                        <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2">
                            <InputGroup type="number" id="amount_tickets_end" v-model="form.amount_tickets_end"
                                label="Final:" placeholder="Quantidade de bilhetes" />
                        </div>

                        <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2">
                            <Textinput v-model="form.price_amount" label="Preço de cada Bilhete:" placeholder="R$ 0,01"
                                :options="optionsSales.number" isMask />
                        </div>

                        <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 p-3">
                            <Button id="submitButton" text="Salvar" btnClass="btn-dark " />
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    </div>
</template>
<script>
import Cookie from 'js-cookie'
import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import Card from '@/components/Card';
import Icon from '@/components/Icon';
import InputGroup from '@/components/InputGroup';
import Pagination from '@/components/Pagination';
import { MenuItem } from '@headlessui/vue';
import { useToast } from "vue-toastification";
import Modal from "@/components/Modal/ModalCustom";
import Textinput from '@/components/Textinput';
import Alert from "@/components/Alert";
import { VueGoodTable } from "vue-good-table-next";
import "vue-good-table-next/dist/vue-good-table-next.css";
export default {
    components: {
        VueGoodTable: VueGoodTable,
        Alert,
        Pagination,
        InputGroup,
        Dropdown,
        Icon,
        Card,
        MenuItem,
        Button,
        Modal,
        Textinput
    },

    data() {
        return {
            form: {
                amount_tickets: '',
                amount_tickets_end: '',
                price_amount: '',
                user_id: ''
            },
            salesTable: [],
            current: 1,
            perpage: 10,
            pageRange: 2,
            totalData: 0,
            currentPage: 1,
            searchTerm: '',
            actions: [
                {
                    name: 'editar',
                    icon: 'heroicons:pencil-square',
                },
                {
                    name: 'deletar',
                    icon: 'heroicons-outline:trash',
                },
            ],
            options: [
            ],
            columns: [
                {
                    label: 'Criado em',
                    field: 'created_at',
                },
                {
                    label: 'Lote',
                    field: 'amount_tickets',
                },
                {
                    label: 'Lote Final',
                    field: 'amount_tickets_end',
                },
                {
                    label: 'Preço',
                    field: 'price_amount',
                },
                {
                    label: 'Ação',
                    field: 'action',
                },
            ],
            previousPageUrl: null,
            optionsSales: {
                number: {
                    numeral: true,
                    numeralDecimalMark: ',',
                    delimiter: '.',
                    prefix: 'R$',
                    noImmediatePrefix: true
                },
            },
            modalSalesOpen: false,
            updateSale: false,
            saleToUpdate: '',
            token: ''
        };
    },
    mounted() {
        if (this.$store.state.user.id) {
            this.user = this.$store.state.user;
            this.token = this.$store.state.token;
            this.loadData()
        }

    },
    watch: {
        /* searchTerm: function (newSearchTerm) {
             // Verifique se o campo de busca foi preenchido
             if (newSearchTerm) {
                 // Faça a request usando fetch
                 this.getAwardsByUserIdAndSearch();
             }
         },*/
        '$store.state.user'(newValue, oldValue) {
            // Este trecho será executado sempre que o estado 'user' for atualizado
            this.user = newValue;
            this.token = this.$store.state.token;
            this.loadData()
        }
    },
    methods: {
        closeModalSale(status) {
            this.modalSalesOpen = status
            this.updateSale = false
        },
        openModalSales(updateSale, sale_id = null) {
            if (!this.modalSalesOpen) {

                if (updateSale) {
                    this.updateSale = true
                    this.saleToUpdate = sale_id
                }

                this.$refs.modalSales.openModal();
                this.modalSalesOpen = true;
            }
        },
        loadData(value) {
            this.getsalesByUserId();
        },
        /*getsalesByUserIdAndSearch() {

            let user_id = Cookie.get('_user_id')
            

            const url = `${process.env.VUE_APP_API_BASE_URL}/sales/user/uuid/${user_id}/?limit=${this.perpage}&page=${this.current}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Atualize os dados da tabela com os dados recebidos da API
                    this.salesTable = data;
                    // Atualizar os itens por página e o número total de páginas
                    this.perPage = data.per_page;
                    this.totalPages = data.total_pages;
                })
                .catch(error => {
                    console.error(error);
                });
        },*/
        getsalesByUserId(value) {

            this.form.user_id = this.user.id;

            if (value) {
                this.current = value.currentPage;
            }

            const url = `${process.env.VUE_APP_API_BASE_URL}/sales/user/uuid/${this.user.uuid}?limit=${this.perpage}&page=${this.current}`;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.token, // Substitua 'seu-token-jwt' pelo seu token real
                    'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
                    // outros cabeçalhos, se necessário
                },
            })
                .then(response => response.json())
                .then(res => {
                    if (!res.message) {
                        this.perpage = res.per_page;
                        this.pageRange = res.last_page;
                        this.totalData = res.total;
                        this.previousPageUrl = this.getPreviousPageUrl(res.links);

                        this.salesTable = res.data.map(item => {
                            this.form.user_id = item.user_id;
                            const created_at = new Date(item.created_at).toISOString().split('T')[0];

                            const amount = item.price_amount

                            return {
                                id: item.id,
                                amount_tickets: item.amount_tickets,
                                amount_tickets_end: item.amount_tickets_end,
                                price_amount: amount,
                                created_at: created_at,
                                action: null,
                            };
                        });

                        // Atualizar as opções do filtro com base na quantidade de dados
                        const dataOptions = [5, 10, 20];
                        if (this.totalData > 20) {
                            for (let i = 30; i <= this.totalData; i += 10) {
                                dataOptions.push(i);
                            }
                        }
                        this.options = dataOptions.map(option => ({ value: option.toString(), label: option.toString() }));
                    } else {
                        toast.error(res.message, {
                            timeout: 2000,
                        });
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        },
        handlePageChange(newPage) {
            this.current = newPage;
            this.getsalesByUserId()
        },
        handlePerPageChange(newPerPage) {
            this.perpage = newPerPage;
            this.getsalesByUserId()
        },
        getPreviousPageUrl(links) {
            const previousLink = links.find(link => link.label === '&laquo; Previous');
            return previousLink ? previousLink.url : null;
        },
        submitForm() {
            let form = this.form;

            if (this.updateSale) {
                this.updateSales(form);
            } else {
                this.createSale(form);
            }

        },
        createSale(form) {
            const toast = useToast();

            const url = `${process.env.VUE_APP_API_BASE_URL}/create/sale`;

            const submitButton = document.getElementById("submitButton");

            // Desabilite o botão e mostre o spinner
            submitButton.disabled = true;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.token, // Substitua 'seu-token-jwt' pelo seu token real
                    'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
                    // outros cabeçalhos, se necessário
                },
                body: JSON.stringify(form)
            })
                .then(response => response.json())
                .then(res => {
                    // Verifique se os dados retornados estão no formato esperado
                    if (res.sale) {
                        toast.success("Promoção criada com sucesso!", {
                            timeout: 2000,
                        });
                        // Limpe os campos do formulário
                        this.form = {
                            price_amount: "",
                            amount_tickets: '',
                            amount_tickets_end: ''
                        }

                        this.loadData()
                        this.$refs.modalSales.closeModal();
                    } else {
                        toast.error(res.message, {
                            timeout: 2000,
                        });
                    }
                })
                .finally(() => {
                    // Reabilite o botão e esconda o spinner quando a requisição for concluída
                    submitButton.disabled = false;
                })
                .catch(error => {
                    // Trate o erro aqui, exiba uma mensagem de erro ou faça outra ação necessária
                    console.error(error);
                });
        },
        updateSales(form) {
            const toast = useToast();

            const url = `${process.env.VUE_APP_API_BASE_URL}/update/sale/${this.saleToUpdate}`;

            const submitButton = document.getElementById("submitButton");

            // Desabilite o botão e mostre o spinner
            submitButton.disabled = true;

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.token, // Substitua 'seu-token-jwt' pelo seu token real
                    'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
                    // outros cabeçalhos, se necessário
                },
                body: JSON.stringify(form)
            })
                .then(response => response.json())
                .then(res => {
                    // Verifique se os dados retornados estão no formato esperado
                    if (res.sale) {
                        toast.success("Promoção atualizada com sucesso!", {
                            timeout: 2000,
                        });
                        // Limpe os campos do formulário
                        this.form = {
                            price_amount: "",
                            amount_tickets: '',
                            amount_tickets_end: ''
                        }
                        this.updateSale = false
                        this.loadData()
                        this.$refs.modalSales.closeModal();
                    } else {
                        toast.error(res.message, {
                            timeout: 2000,
                        });
                    }
                })
                .finally(() => {
                    // Reabilite o botão e esconda o spinner quando a requisição for concluída
                    submitButton.disabled = false;
                })
                .catch(error => {
                    // Trate o erro aqui, exiba uma mensagem de erro ou faça outra ação necessária
                    console.error(error);
                });
        },
        deleteSale(sale_id) {
            const toast = useToast();

            const url = `${process.env.VUE_APP_API_BASE_URL}/delete/sale/${sale_id}`;

            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.token, // Substitua 'seu-token-jwt' pelo seu token real
                    'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
                    // outros cabeçalhos, se necessário
                },
            })
                .then(response => response.json())
                .then(res => {
                    // Verifique se os dados retornados estão no formato esperado
                    if (res.message == 'Deleted Sale successfully') {
                        toast.success("Promoção deletada com sucesso!", {
                            timeout: 2000,
                        });
                        this.loadData()
                    } else {
                        toast.error(res.message, {
                            timeout: 2000,
                        });
                    }
                })
                .catch(error => {
                    // Trate o erro aqui, exiba uma mensagem de erro ou faça outra ação necessária
                    console.error(error);
                });
        }

    }
};
</script>
<style lang="scss"></style>
    