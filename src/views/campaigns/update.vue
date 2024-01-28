<template>
    <div id="create-campaign">
        <Card noborder>
            <div class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center">
                <h5>Editar campanha</h5>
            </div>

            <form @submit.prevent="submitForm">
                <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2">
                    <Switch :label="toggle_dark_mode.label" :activeClass="toggle_dark_mode.value" v-if="isMounted"
                        :active="form.dark_mode" v-model="form.dark_mode" class="mb-5" badge icon
                        :prevIcon="toggle_dark_mode.prevIcon" :nextIcon="toggle_dark_mode.nextIcon" />
                </div>
                <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2">
                    <div class="grid grid-cols-12">
                        <div class="lg:col-span-6 col-span-6 xl:col-span-6 sm:col-span-6  py-3 px-2">
                            <Button type="button" text="Adicionar prêmios"
                                btnClass="btn-transparent hover:btn-dark border w-full" icon="heroicons-outline:star"
                                @click="openModalAward" />
                        </div>
                        <div class="lg:col-span-6 col-span-6 xl:col-span-6 sm:col-span-6  py-3 px-2">
                            <Button type="button" text="Adicionar promoções"
                                btnClass="btn-transparent hover:btn-dark border w-full" icon="heroicons-outline:fire"
                                @click="openModalSale" />
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-8">
                    <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 dropz">
                        <Card title="Imagem  (450x480 Px/PNG)">
                            <DropZoneVue @files="getFileDropped" :predefinedUrl="form.image" @replaced="imageReplaced"
                                v-if="form.image" />
                        </Card>
                    </div>
                    <div class="lg:col-span-4 col-span-12 xl:col-span-4 sm:col-span-12  py-3 px-2">
                        <InputGroup type="text" id="name" v-model="form.name" label="Nome:"
                            placeholder="Nome da sua campanha" :error="nameError" />
                    </div>
                    <div class="lg:col-span-4 col-span-12 xl:col-span-4 sm:col-span-12  py-3 px-2">
                        <InputGroup label="Telefone de Suporte:" v-model="form.support_number"
                            v-mask="['(##) ####-####', '(##) #####-####']" placeholder="00 90000 0000"
                            :error="phoneError" />
                    </div>
                    <div class="lg:col-span-4 col-span-12 xl:col-span-4 sm:col-span-12  py-3 px-2">
                        <Select label="Tempo de Espera para Pagamento:" id="time_wait_payment"
                            class="bg-white dark:bg-slate-800 text-gray-500" v-model="form.time_wait_payment"
                            :options="timeWaitOptions" :error="timeWaitPaymentError" />
                    </div>
                    <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2">
                        <!--<Textarea v-model="form.description" label="Descrição/Regulamento:" placeholder="Escreva descrição"
                            :error="descriptionError" />-->
                        <Editor v-model="form.description" label="Descrição/Regulamento:" :error="descriptionError"
                            api-key="0mgk9eolk5cigu77vll319dhjspqsjsordgy3k2k3aji1wpn" :init="{
                                plugins: ''
                            }" />
                    </div>
                    <div class="lg:col-span-4 col-span-12 xl:col-span-4 sm:col-span-12  py-3 px-2">
                        <Select id="raffle_id" v-model="form.raffle_id" :options="raffleOptions"
                            label="Por onde será feito o sorteio?" :error="raffleError"></Select>
                    </div>
                    <div class="lg:col-span-4 col-span-12 xl:col-span-4 sm:col-span-12  py-3 px-2">
                        <Select id="category_id" v-model="form.category_id" :options="categoryOptions" label="Categoria:"
                            :error="categoryError" />
                    </div>
                    <div class="lg:col-span-4 col-span-12 xl:col-span-4 sm:col-span-12  py-3 px-2"
                        v-if="!campaignStatus && !campaignReleasedUntilFee && !campaignComprados">
                        <Select label="Quantidade de Bilhetes:" id="amount_tickets" v-model="form.amount_tickets"
                            :options="amountTicketsOptions" @update:modelValue="calculateFee"
                            :error="amountTicketsError"></Select>
                    </div>
                    <div class="lg:col-span-4 col-span-12 xl:col-span-4 sm:col-span-12  py-3 px-2"
                        v-if="!campaignStatus && !campaignReleasedUntilFee && !campaignComprados">
                        <Textinput v-model="form.price_each_ticket" label="Preço de cada Bilhete:" placeholder="R$ 0,01"
                            :options="options.number" isMask @update:modelValue="calculateFee" :error="priceTicketError" />
                    </div>
                    <div
                        :class="campaignStatus || campaignReleasedUntilFee ? 'lg:col-span-6 col-span-12 xl:col-span-6 sm:col-span-12  py-3 px-2' : 'lg:col-span-4 col-span-12 xl:col-span-4 sm:col-span-12  py-3 px-2'">
                        <InputGroup type="number" id="min_ticket" v-model="form.min_ticket" label="Mínimo Bilhetes:"
                            :error="minTicketError" />
                        <span class="text-danger-500 text-sm">valor mínimo de compra será <b>{{ calculateTicket('min')
                        }}</b></span>
                    </div>
                    <div
                        :class="campaignStatus || campaignReleasedUntilFee ? 'lg:col-span-6 col-span-12 xl:col-span-6 sm:col-span-12  py-3 px-2' : 'lg:col-span-4 col-span-12 xl:col-span-4 sm:col-span-12  py-3 px-2'">
                        <InputGroup type="number" id="max_ticket" v-model="form.max_ticket" label="Máximo Bilhetes:"
                            :error="maxTicketError" />
                        <span class="text-danger-500 text-sm">valor máximo de compra será <b>{{ calculateTicket('max')
                        }}</b></span>
                    </div>
                    <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2">
                        <Switch :label="toggle.label" :activeClass="toggle.value" :active="form.show_date_of_raffle"
                            v-model="form.show_date_of_raffle" v-if="isMounted" class="mb-5" badge icon
                            :prevIcon="toggle.prevIcon" :nextIcon="toggle.nextIcon" />
                    </div>
                    <div class="lg:col-span-4 col-span-12 xl:col-span-4 sm:col-span-12  py-3 px-2"
                        v-if="form.show_date_of_raffle">
                        <InputGroup type="datetime-local" id="date_of_raffle" v-model="form.date_of_raffle"
                            label="Data do Sorteio:" :error="dateOfRaffleError" />
                    </div>
                    <div class="lg:col-span-6 col-span-12 xl:col-span-6 sm:col-span-12  py-3 px-2">
                        <Select id="ticket_filter_id" v-model="form.ticket_filter_id" :options="ticketFilterOptions"
                            label="Filtro bilhete" :error="ticketFilterError"></Select>
                    </div>

                    <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2" v-if="form.ticket_filter_id == 1">
                                <Switch :label="toggle_filters.label" :activeClass="toggle_filters.value"
                                    :active="form.show_filters" v-model="form.show_filters" class="mb-5" badge icon
                                    :prevIcon="toggle_filters.prevIcon" :nextIcon="toggle_filters.nextIcon" v-if="isMounted"/>
                            </div>

                            
                            <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2" v-if="form.ticket_filter_id == 1">
                                <Switch :label="toggle_order.label" :activeClass="toggle_order.value"
                                    :active="form.order_numbers" v-model="form.order_numbers" class="mb-5" badge icon
                                    :prevIcon="toggle_order.prevIcon" :nextIcon="toggle_order.nextIcon" v-if="isMounted"/>
                            </div>

                    <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2">
                        <Switch :label="toggle_email.label" :activeClass="toggle_email.value"
                            :active="form.show_email_input" v-model="form.show_email_input" class="mb-5" badge icon
                            :prevIcon="toggle_email.prevIcon" :nextIcon="toggle_email.nextIcon" v-if="isMounted" />
                        <div class="rounded-md bg-yellow-50 mt-4 p-4" v-if="isMounted">
                            <div class="flex">
                                <div class="flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                        fill="currentColor" aria-hidden="true" class="h-5 w-5 text-yellow-400">
                                        <path fill-rule="evenodd"
                                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                            clip-rule="evenodd"></path>
                                    </svg></div>
                                <div class="ml-3">
                                    <h3 class="font-semibold text-sm text-yellow-800">Atenção!</h3>
                                    <div class="mt-1 text-sm font-medium text-yellow-700">
                                        <p>Ao utilizar o Mercado Pago como meio de pagamento, o campo de email será
                                            obrigatório!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2">
                        <Switch :label="toggle_ranking.label" :activeClass="toggle_ranking.value"
                            :active="form.show_top_ranking" v-model="form.show_top_ranking" v-if="isMounted" class="mb-5"
                            badge icon :prevIcon="toggle_ranking.prevIcon" :nextIcon="toggle_ranking.nextIcon" />
                    </div>

                    <div class="lg:col-span-4 col-span-4 xl:col-span-4 sm:col-span-4  py-3 px-2"
                        v-if="form.show_top_ranking && isMounted">
                        <Select id="ranking_acumulative" v-model="form.ranking_acumulative"
                            :options="rankingAcumulativeOptions"
                            label="A contagem dos bilhetes serão acumulativa?"></Select>
                    </div>

                    <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2"
                        v-if="!campaignStatus && !campaignReleasedUntilFee && !campaignComprados">

                        <div class="bg-no-repeat bg-cover bg-center px-5 py-8 rounded-[6px] relative items-center" :style="{
                            backgroundImage:
                                'url(' + require(`@/assets/images/all-img/widget-bg-6.png`) + ')',
                        }">
                            <div class="grid grid-cols-12">
                                <div class="lg:col-span-4 col-span-12 xl:col-span-4 sm:col-span-4">
                                    <div class="max-w-[350px]">
                                        <h4 class="text-2xl font-medium text-white mb-2">
                                            <span class="block text-sm">Arrecadação estimada</span>
                                            <span class="block text-success-400">{{ arrecadacao }}</span>
                                        </h4>
                                    </div>
                                </div>
                                <div class="lg:col-span-4 col-span-12 xl:col-span-4 sm:col-span-4">
                                    <div class="max-w-[350px]">
                                        <h4 class="text-2xl font-medium text-white mb-2">
                                            <span class="block text-sm">Taxa de publicação</span>
                                            <span class="block"><span class="text-danger-500">-{{ taxa }}</span><small
                                                    v-if="user_discount" class="text-warning-200 text-[10px]"> (desconto de
                                                    cliente)</small></span>

                                        </h4>
                                    </div>
                                </div>
                                <div class="lg:col-span-4 col-span-12 xl:col-span-4 sm:col-span-4">

                                    <Button type="button" icon="heroicons-outline:eye" text="Ver Taxas"
                                        btnClass="btn-light bg-white btn-sm " @click="openModal" />



                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2">
                        <Switch :label="toggle_terms.label" :activeClass="toggle_terms.value" :active="form.allow_terms"
                            v-model="form.allow_terms" class="mb-5" :error="allowTermsError" v-if="isMounted" badge icon
                            :prevIcon="toggle_terms.prevIcon" :nextIcon="toggle_terms.nextIcon" />
                        <small>Ao criar esta campanha, você aceita nossos <a target="_blank"
                                href="https://123rifas.com/termos-de-uso/"><b>Termos de Uso</b></a> e a nossa <a
                                target="_blank" href="https://123rifas.com/politica-de-privacidade/"><b>Políticas de
                                    Privacidade</b></a>.</small>
                    </div>

                    <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 p-3">
                        <Button id="submitButton" text="Atualizar campanha" btnClass="btn-dark " />
                    </div>
                </div>
            </form>

            <Modal title="Adicionar Prêmios" ref="modalAwards" centered themeClass="bg-slate-900">
                <div>
                    <!-- Lista de selects predefinidos -->
                    <div v-for="(select, index) in selectOptionsAward" :key="index" class="mb-4">
                        <Icon @click="deleteSelectAward(index)" icon="heroicons:trash"
                            style="display:flex;justify-content:flex-end;cursor:pointer"></Icon>
                        <Select :id="'select_' + index" v-model="selectedValuesAward[index]" :options="optionsAward"
                            :label="select.label">
                        </Select>
                    </div>
                    <span v-if="!optionsAward.length"><a href="/app/awards" style="font-weight: bolder;">Clique aqui</a>
                        para criar premiações.</span>
                    <!-- Botão para adicionar novo select -->
                    <Button @click="addNewSelectAward" btnClass="btn-info mr-3"
                        v-if="(selectedValuesAward.length == selectOptionsAward.length)">+ Adicionar
                        Novo</Button>
                    <br />
                    <small v-if="(selectedValuesAward.length == selectOptionsAward.length)" class="text-danger-500">Atualize
                        a campanha para alterações entrar em vigor.</small>
                </div>
            </Modal>

            <Modal title="Adicionar Promoções" ref="modalSales" centered themeClass="bg-slate-900">
                <div>
                    <!-- Lista de selects predefinidos -->
                    <div v-for="(select, index) in selectOptionsSale" :key="index" class="mb-4">
                        <Icon @click="deleteSelectSale(index)" icon="heroicons:trash"
                            style="display:flex;justify-content:flex-end;cursor:pointer">
                        </Icon>
                        <Select :id="'select_' + index" v-model="selectedValuesSale[index]" :options="optionsSale"
                            :label="select.label">
                        </Select>
                    </div>
                    <span v-if="!optionsSale.length"><a href="/app/sales" style="font-weight: bolder;">Clique aqui</a> para
                        criar promoções.</span>
                    <!-- Botão para adicionar novo select -->
                    <Button @click="addNewSelectSale" btnClass="btn-info mr-3"
                        v-if="(selectedValuesSale.length == selectOptionsSale.length)">+ Adicionar
                        Novo</Button>
                    <br />
                    <small v-if="(selectedValuesSale.length == selectOptionsSale.length)" class="text-danger-500">Atualize a
                        campanha para alterações entrar em vigor.</small>
                </div>
            </Modal>

            <Modal title="Taxas por Faturamento" ref="modalTaxas" centered themeClass="bg-slate-900">

                <table class="w-full text-left">
                    <thead>
                        <tr>
                            <th class="px-4 py-2">Receita</th>
                            <th class="px-4 py-2">Taxa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in fees" :key="item.id" class="border-t">

                            <td class="px-4 py-2">{{ item.revenue }}</td>
                            <td class="px-4 py-2">{{ applyDiscount(item.fee) }}</td>
                        </tr>
                    </tbody>
                </table>

                <button @click="closeModal" class="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                    Fechar
                </button>

            </Modal>
        </Card>
    </div>
</template>
<script>
import Modal from "@/components/Modal/ModalCustom";
import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import Card from '@/components/Card';
import Icon from '@/components/Icon';
import InputGroup from '@/components/InputGroup';
import Textarea from '@/components/Textarea';
import Textinput from '@/components/Textinput';
import DropZoneVue from '@/views/forms/file-input/DropZone.vue';
import Select from '@/components/Select';
import Cookie from 'js-cookie';
import Checkbox from '@/components/Checkbox';
import { MenuItem } from '@headlessui/vue';
import Switch from '@/components/Switch';
import { useToast } from "vue-toastification";
import * as yup from "yup";
import moment from 'moment';
import { useField, useForm } from "vee-validate";
import Editor from '@tinymce/tinymce-vue'
import { mask } from 'vue-the-mask';
export default {
    directives: { mask },
    components: {
        Editor,
        Modal,
        Dropdown,
        Icon,
        Card,
        MenuItem,
        Button,
        DropZoneVue,
        Select,
        Textarea,
        Textinput,
        Checkbox,
        InputGroup,
        Switch
    },
    setup() {
        // Define a validation schema
        const schema = yup.object({
            name: yup.string().required(),
            description: yup.string().required(),
            amount_tickets: yup.number().required(),
            support_number: yup.string().required(),
            price_each_ticket: yup.string().required(),
            min_ticket: yup.number().required(),
            max_ticket: yup.number().required(),
            date_of_raffle: yup.date().required(),
            time_wait_payment: yup.string().required(),
            allow_terms: yup.bool().required(),
            category_id: yup.number().required(),
            ticket_filter_id: yup.number().required(),
            raffle_id: yup.number().required(),
        });

        const { handleSubmit } = useForm({
            validationSchema: schema,
        });
        // No need to define rules for fields

        const { value: name, errorMessage: nameError } = useField("name");
        const { value: description, errorMessage: descriptionError } = useField("description");
        const { value: amount_tickets, errorMessage: amountTicketsError } = useField("amount_tickets");
        const { value: price_each_ticket, errorMessage: priceTicketError } = useField("price_each_ticket");
        const { value: support_number, errorMessage: phoneError } = useField("support_number");
        const { value: min_ticket, errorMessage: minTicketError } = useField("min_ticket");
        const { value: max_ticket, errorMessage: maxTicketError } = useField("max_ticket");
        const { value: date_of_raffle, errorMessage: dateOfRaffleError } = useField("date_of_raffle");
        const { value: time_wait_payment, errorMessage: timeWaitPaymentError } = useField("time_wait_payment");
        const { value: allow_terms, errorMessage: allowTermsError } = useField("allow_terms");
        const { value: category_id, errorMessage: categoryError } = useField("category_id");
        const { value: ticket_filter_id, errorMessage: ticketFilterError } = useField("ticket_filter_id");
        const { value: raffle_id, errorMessage: raffleError } = useField("raffle_id");

        const onSubmit = handleSubmit((res) => {
            // Verifique se todos os campos estão preenchidos
            const isFormValid = Object.values(res).every(value => value !== null && value !== '');
            return isFormValid;
        });

        return {
            name,
            nameError,
            description,
            descriptionError,
            amount_tickets,
            amountTicketsError,
            support_number,
            price_each_ticket,
            priceTicketError,
            phoneError,
            min_ticket,
            minTicketError,
            max_ticket,
            maxTicketError,
            date_of_raffle,
            dateOfRaffleError,
            time_wait_payment,
            timeWaitPaymentError,
            allow_terms,
            allowTermsError,
            category_id,
            categoryError,
            ticket_filter_id,
            ticketFilterError,
            raffle_id,
            raffleError,
            onSubmit,
        };
    },
    data() {
        return {
            isMounted: false,
            isModalOpen: false,
            campaign_id: '',
            user_id: '',
            user_uuid: '',
            form: {
                name: "",
                description: "",
                image: null,
                originalFile: null,
                amount_tickets: null,
                price_each_ticket: "R$0,01",
                support_number: "",
                min_ticket: "",
                max_ticket: "",
                show_date_of_raffle: false,
                show_email_input: false,
                show_top_ranking: false,
                show_filters: true,
                order_numbers: true,
                ranking_acumulative: false,
                dark_mode: false,
                visible: true,
                date_of_raffle: null,
                time_wait_payment: null,
                allow_terms: false,
                category_id: null,
                ticket_filter_id: null,
                raffle_id: null,
                fee_id: null,
                user_id: null,
            },
            rankingAcumulativeOptions: [
                { label: 'Sim', value: true },
                { label: 'Não', value: false }
            ],
            positionAwardChange: [],
            selectOptionsAward: [
                // Adicione mais seleções predefinidas aqui
            ],
            awardsCreate: false,
            salesCreate: false,
            optionsAward: [],
            selectedValuesAward: [],
            selectOptionsSale: [
                // Adicione mais seleções predefinidas aqui
            ],
            optionsSale: [],
            selectedValuesSale: [],
            imageReplace: false,
            selectedFiles: [],
            arrecadacao: 'R$0,00',
            taxa: 'R$0,00',
            toggle: {
                label: 'Mostrar Data do Sorteio:',
                value: 'bg-success-500',
                prevIcon: 'heroicons-outline:check',
                nextIcon: 'heroicons-outline:ban',
            },
            toggle_terms: {
                label: 'Aceito todos os termos.',
                value: 'bg-success-500',
                prevIcon: 'heroicons-outline:check',
                nextIcon: 'heroicons-outline:ban',
            },
            toggle_email: {
                label: 'Requerir email para reserva',
                value: 'bg-success-500',
                prevIcon: 'heroicons-outline:check',
                nextIcon: 'heroicons-outline:ban',
            },
            toggle_ranking: {
                label: 'Mostrar top 3 ranking',
                value: 'bg-success-500',
                prevIcon: 'heroicons-outline:check',
                nextIcon: 'heroicons-outline:ban',
            },
            toggle_filters: {
                label: 'Mostrar filtro de bilhetes',
                value: 'bg-success-500',
                prevIcon: 'heroicons-outline:check',
                nextIcon: 'heroicons-outline:ban',
            },
            toggle_order: {
                label: 'Ordenar os números',
                value: 'bg-success-500',
                prevIcon: 'heroicons-outline:check',
                nextIcon: 'heroicons-outline:ban',
            },
            toggle_dark_mode: {
                label: 'Ativar o modo Dark',
                value: 'bg-success-500',
                prevIcon: 'heroicons-outline:check',
                nextIcon: 'heroicons-outline:ban',
            },
            amountTicketsOptions: [
            { value: 25, label: "25 Bilhetes - (00 á 24)" },
                { value: 50, label: "50 Bilhetes - (00 á 49)" },
                { value: 100, label: "100 Bilhetes - (00 á 99)" },
                { value: 250, label: "250 Bilhetes - (000 á 249)" },
                { value: 350, label: "350 Bilhetes - (000 á 349)" },
                { value: 500, label: "500 Bilhetes - (000 á 499)" },
                { value: 1000, label: "1.000 Bilhetes - (000 á 999)" },
                { value: 2000, label: "2.000 Bilhetes - (0000 á 1999)" },
                { value: 3000, label: "3.000 Bilhetes - (0000 á 2999)" },
                { value: 4000, label: "4.000 Bilhetes - (0000 á 3999)" },
                // Adicione mais opções conforme necessário
                { value: 5000, label: "5.000 Bilhetes - (0000 á 4999)" },
                { value: 6000, label: "6.000 Bilhetes - (0000 á 5999)" },
                { value: 7000, label: "7.000 Bilhetes - (0000 á 6999)" },
                { value: 8000, label: "8.000 Bilhetes - (0000 á 7999)" },
                { value: 9000, label: "9.000 Bilhetes - (0000 á 8999)" },
                { value: 10000, label: "10.000 Bilhetes - (0000 á 9999)" },
                { value: 25000, label: "25.000 Bilhetes - (00000 á 24999)" },
                { value: 50000, label: "50.000 Bilhetes - (00000 á 49999)" },
                { value: 100000, label: "100.000 Bilhetes - (00000 á 99999)" },
                { value: 200000, label: "200.000 Bilhetes - (000000 á 199999)" },
                { value: 300000, label: "300.000 Bilhetes - (000000 á 299999)" },
                { value: 400000, label: "400.000 Bilhetes - (000000 á 399999)" },
                { value: 500000, label: "500.000 Bilhetes - (000000 á 499999)" },
                { value: 600000, label: "600.000 Bilhetes - (000000 á 599999)" },
                { value: 700000, label: "700.000 Bilhetes - (000000 á 699999)" },
                { value: 800000, label: "800.000 Bilhetes - (000000 á 799999)" },
                { value: 900000, label: "900.000 Bilhetes - (000000 á 899999)" },
                { value: 1000000, label: "1.000.000 Bilhetes - (000000 á 999999)" },
                //{ value: 10000000, label: "10.000.000 Bilhetes - (0000000 á 9999999)" },
            ],
            timeWaitOptions: [
                { value: "10m", label: "10 minutos" },
                { value: "30m", label: "30 minutos" },
                { value: "60m", label: "1 hora" },
                { value: "180m", label: "3 horas" },
                { value: "1d", label: "1 dia" },
                { value: "3d", label: "3 dias" },
                { value: "15d", label: "15 dias" },
            ],
            categoryOptions: [], // Options for category_id select
            ticketFilterOptions: [], // Options for ticket_filter_id select
            raffleOptions: [], // Options for raffle_id select
            feeOptions: [], // Options for fee_id select
            userOptions: [], // Options for user_id select
            fees: [],
            options: {
                creditCard: {
                    creditCard: true,
                    delimiter: "-",
                },
                phone: {
                    numeral: true,
                    phoneRegionCode: "BR",
                    noImmediatePrefix: false,
                    prefix: '+55 '
                },
                date: {
                    date: true,
                    delimiter: "-",
                    datePattern: ["Y", "m", "d"],
                },
                time: {
                    time: true,
                    timePattern: ["h", "m", "s"],
                },
                number: {
                    numeral: true,
                    numeralDecimalMark: ',',
                    delimiter: '.',
                    prefix: 'R$',
                    noImmediatePrefix: true
                },
                block: {
                    blocks: [4, 3, 3],
                    uppercase: true,
                },
                delimiter: {
                    delimiter: "·",
                    blocks: [3, 3, 3],
                    uppercase: true,
                },
                customDelimiter: {
                    delimiters: [".", ".", "-"],
                    blocks: [3, 3, 3, 2],
                    uppercase: true,
                },
                prefix: {
                    numericOnly: true,
                    prefix: "+55",
                    blocks: [3, 2, 5, 4],
                    uppercase: true,
                    noImmediatePrefix: true,
                },
                price_each_ticket: '',
                campaignStatus: false,
                campaignReleasedUntilFee: false,
                campaignComprados: 0

            },
            token: '',
            user: {}
        };
    },
    watch: {
        '$store.state.user'(newValue, oldValue) {
            // Este trecho será executado sempre que o estado 'user' for atualizado
            this.user = newValue;
            this.token = this.$store.state.token;
            const campaignId = this.$route.params.id;
            this.loadCampaign(campaignId);
        }
    },
    mounted() {
        if (this.$store.state.user.id) {
            this.user = this.$store.state.user;
            this.token = this.$store.state.token;
            const campaignId = this.$route.params.id;
            this.loadCampaign(campaignId);
        }
    },
    methods: {
        applyDiscount(price) {
            let price_float = this.extractNumberFromString(price)

            if (this.user_discount) {
                price_float = price_float - (price_float * (this.user_discount / 100))
            }

            return 'R$' + price_float.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
        addNewSelectAward() {
            const newId = this.selectOptionsAward.length + 1;
            this.selectOptionsAward.push({ new: true, id: newId, label: 'Prêmio ' + newId });
        },
        deleteSelectAward(index) {
            //if (index != 0) {

            if (this.selectOptionsAward[index].award_campaign_id) {
                this.deleteAward(this.selectOptionsAward[index].award_campaign_id)
            }

            this.selectOptionsAward.splice(index, 1);
            this.selectedValuesAward.splice(index, 1);



            // Atualize os IDs dos objetos restantes
            for (let i = index; i < this.selectOptionsAward.length; i++) {
                this.selectOptionsAward[i].id = i + 1;

                if (this.selectOptionsAward[i].position) {
                    this.selectOptionsAward[i].position = this.selectOptionsAward[i].id;
                    this.positionAwardChange[i] = true
                }

                this.selectOptionsAward[i].label = 'Prêmio ' + (i + 1);
            }
            // }
        },
        addNewSelectSale() {
            const newId = this.selectOptionsSale.length + 1;
            this.selectOptionsSale.push({ new: true, id: newId, label: 'Promoção ' + newId });
        },
        deleteSelectSale(index) {
            // if (index != 0) {

            if (this.selectOptionsSale[index].sale_campaign_id) {
                this.deleteSale(this.selectOptionsSale[index].sale_campaign_id)
            }

            this.selectOptionsSale.splice(index, 1);
            this.selectedValuesSale.splice(index, 1);

            // Atualize os IDs dos objetos restantes
            for (let i = index; i < this.selectOptionsSale.length; i++) {
                this.selectOptionsSale[i].id = i + 1;

                this.selectOptionsSale[i].label = 'Promoção ' + (i + 1);
            }
            //}
        },
        imageReplaced(index) {
            this.imageReplace = true;
        },
        openModalAward() {
            this.$refs.modalAwards.openModal()
        },
        closeModalAward() {
            this.$refs.modalAwards.closeModal()
        },
        openModalSale() {
            this.$refs.modalSales.openModal()
        },
        closeModalSale() {
            this.$refs.modalSales.closeModal()
        },
        calculateFee() {

            if (this.form.amount_tickets && this.form.price_each_ticket) {
                let price_each = this.extractNumberFromString(this.form.price_each_ticket)
                let arrecadacao = (this.form.amount_tickets * price_each)

                this.fees.forEach((fee) => {
                    if (arrecadacao >= fee.min_revenue && arrecadacao <= fee.max_revenue) {
                        this.arrecadacao = "R$" + arrecadacao.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        this.taxa = this.applyDiscount(fee.fee)
                        this.form.fee_id = fee.id
                    } else if (arrecadacao > fee.min_revenue && !fee.max_revenue) {
                        this.arrecadacao = "R$" + arrecadacao.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        this.taxa = this.applyDiscount(fee.fee)
                        this.form.fee_id = fee.id
                    }
                })

            }
        },
        calculateTicket(amount) {

            if ((this.form.min_ticket && this.form.price_each_ticket && amount == 'min')) {
                let price_each = this.extractNumberFromString(this.form.price_each_ticket)
                let priceMinTicket = (this.form.min_ticket * price_each)
                return "R$" + priceMinTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            } else if (this.form.max_ticket && this.form.price_each_ticket && amount == 'max') {
                let price_each = this.extractNumberFromString(this.form.price_each_ticket)
                let priceMaxTicket = (this.form.max_ticket * price_each)
                return "R$" + priceMaxTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            }
        },
        loadCampaign(uuid) {
            let campaign = this.user.campaigns.find(campaign => campaign.uuid === uuid);

            if (campaign) {

                 // Atualize os dados da tabela com os dados recebidos da API
                 this.user.raffles.forEach((item) => {
                    let obj = {
                        value: item.id,
                        label: item.name
                    }
                    this.raffleOptions.push(obj);
                })

                this.user.categories.forEach((item) => {
                    let obj = {
                        value: item.id,
                        label: item.name
                    }
                    this.categoryOptions.push(obj);
                })

                this.user.filters.forEach((item) => {
                    let obj = {
                        value: item.id,
                        label: item.name
                    }
                    this.ticketFilterOptions.push(obj);
                })


                // Atualize os dados da tabela com os dados recebidos da API
                this.user.fees.forEach((item) => {
                    this.fees.push(item);
                })

                this.user_id = this.user.id;
                this.user_uuid = this.user.uuid;
                this.campaign_id = campaign.id;
                this.form.price_each_ticket = campaign.price_each_ticket;
                // Preencher o estado do formulário com os dados da campanha
                this.form = campaign;
                this.form.show_date_of_raffle ? this.form.show_date_of_raffle = true : this.form.show_date_of_raffle = false
                this.form.show_filters ? this.form.show_filters = true : this.form.show_filters = false
                this.form.order_numbers ? this.form.order_numbers = true : this.form.order_numbers = false
                this.form.ranking_acumulative ? this.form.ranking_acumulative = true : this.form.ranking_acumulative = false
                this.form.dark_mode ? this.form.dark_mode = true : this.form.dark_mode = false
                this.isMounted = true
                this.campaignStatus = campaign.status
                this.campaignReleasedUntilFee = campaign.released_until_fee
                this.campaignComprados = campaign.unavailable_tickets;
                this.calculateFee()

                if (this.user.awards.length) {
                    this.user.awards.forEach((item) => {
                        this.optionsAward.push({ value: item.id, label: item.name });
                    })
                }

                if (this.user.sales.length) {
                    this.user.sales.forEach((item) => {
                        this.optionsSale.push({ value: item.id, label: 'de ' + item.amount_tickets + ' á ' + `${item.amount_tickets_end ? item.amount_tickets_end : item.amount_tickets}` + ' por ' + item.price_amount + ' cada bilhete' });
                    })
                }

                if (campaign.award_campaigns.length) {
                    // Atualize os dados da tabela com os dados recebidos da API
                    campaign.award_campaigns.forEach((item, index) => {
                        this.selectOptionsAward.push({ position: item.position, award_id: item.award_id, award_campaign_id: item.id, label: 'Prêmio ' + item.position });
                        this.selectedValuesAward[index] = item.award_id;
                    })
                } else {
                    this.awardsCreate = true
                    this.selectOptionsAward = [
                        { label: 'Prêmio 1' }
                    ]
                }

                if (campaign.sale_campaigns.length) {
                    // Atualize os dados da tabela com os dados recebidos da API
                    campaign.sale_campaigns.forEach((item, index) => {
                        this.selectOptionsSale.push({ sale_id: item.sale_id, sale_campaign_id: item.id, label: 'Promoção ' + (index + 1) });
                        this.selectedValuesSale[index] = item.sale_id;
                    })
                } else {
                    this.salesCreate = true
                    this.selectOptionsSale = [
                        { label: 'Promoção 1' },
                    ]
                }

            }

        },
        openModal() {
            this.$refs.modalTaxas.openModal()
        },
        closeModal() {
            this.$refs.modalTaxas.closeModal()
        },
        updateModalState(isOpen) {
            this.isModalOpen = isOpen
        },
        getFileDropped(file) {
            if (!file.length)
                return;
            this.form.originalFile = file[0];
        },
        extractNumberFromString(str) {
            // Remover os caracteres não numéricos da string
            var numberStr = str.replace(/[^\d.,]/g, '');

            // Substituir a vírgula por ponto decimal
            numberStr = numberStr.replace(',', '.');

            // Converter a string para float
            var number = parseFloat(numberStr);

            return number;
        },
        readFileAsBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = () => {
                    const base64Data = reader.result;
                    resolve(base64Data);
                };

                reader.onerror = () => {
                    reject(new Error('Falha ao ler o arquivo'));
                };

                // Verifique se o arquivo é do tipo 'Blob' antes de chamar readAsDataURL
                if (file instanceof Blob) {
                    reader.readAsDataURL(file);
                } else {
                    reject(new Error('O arquivo não é do tipo Blob'));
                }
            });
        },
        submitForm() {
            let form = this.form;
            if (!form.allow_terms) {
                const toast = useToast();
                toast.error("Aceite os termos.", {
                    timeout: 2000,
                });
                return;
            }

            if (form.show_date_of_raffle) {
                form.date_of_raffle = moment(form.date_of_raffle).format('YYYY-MM-DD HH:mm:ss');
            }

            if (!form.image) {
                const toast = useToast();
                if (!form.originalFile) {
                    
                    toast.error("Selecione uma imagem...", {
                        timeout: 2000,
                    });
                    return;
                }

                // Sempre use form.originalFile ao ler o arquivo
                this.readFileAsBase64(form.originalFile)
                    .then((binaryData) => {
                        // Aqui você pode enviar o binário para a API
                        // usando uma solicitação HTTP, por exemplo
                        form.image = binaryData;
                        // Remover todos os espaços em branco
                        form.support_number = form.support_number.replace(/\s/g, '');

                        form.user_id = this.user_id;

                        form.url = window.location.hostname + "/campaign/";

                        if (window.location.hostname == 'localhost') {
                            form.url = window.location.hostname + ":8080/campaign/";
                        }

                        this.updateCampaign(form);
                    })
                    .catch((error) => {
                        toast.error(error, {
                        timeout: 2000,
                    });
                    });
            } else {

                if (this.imageReplace) {
                    if (!form.originalFile) {
                        const toast = useToast();
                        toast.error("Selecione uma imagem...", {
                            timeout: 2000,
                        });
                        return;
                    }

                    // Sempre use form.originalFile ao ler o arquivo
                    this.readFileAsBase64(form.originalFile)
                        .then((binaryData) => {
                            // Aqui você pode enviar o binário para a API
                            // usando uma solicitação HTTP, por exemplo
                            form.image = binaryData;
                            // Remover todos os espaços em branco
                            form.support_number = form.support_number.replace(/\s/g, '');

                            form.user_id = this.user_id;

                            form.url = window.location.hostname + "/campaign/";

                            if (window.location.hostname == 'localhost') {
                                form.url = window.location.hostname + ":8080/campaign/";
                            }

                            this.updateCampaign(form);
                        })
                        .catch((error) => {
                            toast.error(error, {
                        timeout: 2000,
                    });
                        });
                } else {
                    // Remover todos os espaços em branco
                    form.support_number = form.support_number.replace(/\s/g, '');

                    form.user_id = this.user_id;

                    form.url = window.location.hostname + "/campaign/";

                    if (window.location.hostname == 'localhost') {
                        form.url = window.location.hostname + ":8080/campaign/";
                    }

                    this.updateCampaign(form);
                }
            }
        },
        updateCampaign(form) {
            const toast = useToast();

            const url = `${process.env.VUE_APP_API_BASE_URL}/update/campaign/${form.id}`;

            const submitButton = document.getElementById("submitButton");

            let backdrop = this.showBackDrop('Atualizando para obter sucesso ...');

            // Desabilite o botão e mostre o spinner
            submitButton.disabled = true;
            if (typeof form.ranking_acumulative !== "boolean") {
                form.ranking_acumulative = (form.ranking_acumulative === 'true');
            }

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
                    if (res.campaign) {
                        toast.success("Campanha atualizada com sucesso!", {
                            timeout: 2000,
                        });

                        if (this.selectedValuesAward.length) {

                            if (!this.awardsCreate) {
                                this.selectOptionsAward.forEach((item, index) => {
                                    if (!item.new) {
                                        if (this.selectedValuesAward[index] != item.award_id || this.positionAwardChange[index]) {
                                            let form_award = {
                                                'award_campaign_id': item.award_campaign_id,
                                                'award_id': this.selectedValuesAward[index],
                                                'campaign_id': res.campaign.id,
                                                'position': item.position
                                            }
                                            this.updateCampaignAward(form_award)
                                        }
                                    } else {
                                        let form_award = {
                                            'award_id': this.selectedValuesAward[index],
                                            'campaign_id': res.campaign.id,
                                            'position': index + 1
                                        }
                                        this.createCampaignAward(form_award)
                                    }
                                })
                            } else {
                                if (this.selectedValuesAward.length) {
                                    this.selectedValuesAward.forEach((award_id, index) => {
                                        let form_award = {
                                            'award_id': award_id,
                                            'campaign_id': res.campaign.id,
                                            'position': index + 1
                                        }
                                        this.createCampaignAward(form_award)
                                    })
                                }
                            }
                        }

                        if (this.selectedValuesSale.length) {
                            if (!this.salesCreate) {
                                this.selectOptionsSale.forEach((item, index) => {
                                    if (!item.new) {
                                        if (this.selectedValuesSale[index] != item.sale_id) {
                                            let form_sale = {
                                                'sale_campaign_id': item.sale_campaign_id,
                                                'sale_id': this.selectedValuesSale[index],
                                                'campaign_id': res.campaign.id
                                            }
                                            this.updateCampaignSale(form_sale)
                                        }
                                    } else {
                                        let form_sale = {
                                            'sale_id': this.selectedValuesSale[index],
                                            'campaign_id': res.campaign.id
                                        }
                                        this.createCampaignSale(form_sale)
                                    }
                                })
                            } else {
                                if (this.selectedValuesSale.length) {
                                    this.selectedValuesSale.forEach((sale_id) => {
                                        let form_sale = {
                                            'sale_id': sale_id,
                                            'campaign_id': res.campaign.id
                                        }
                                        this.createCampaignSale(form_sale)
                                    })
                                }
                            }
                        }

                        if(!this.selectedValuesSale.length && !this.selectedValuesAward.length){
                            // Limpe os campos do formulário
                            this.form = {
                                name: "",
                                description: "",
                                image: null,
                                amount_tickets: null,
                                price_each_ticket: "",
                                support_number: "",
                                min_ticket: "",
                                max_ticket: "",
                                show_date_of_raffle: false,
                                show_email_input: false,
                                show_top_ranking: false,
                                show_filters: true,
                                order_numbers: true,
                                ranking_acumulative: false,
                                dark_mode: false,
                                visible: true,
                                date_of_raffle: null,
                                time_wait_payment: null,
                                allow_terms: false,
                                category_id: null,
                                ticket_filter_id: null,
                                raffle_id: null,
                                fee_id: null,
                            }

                            window.location.href = window.location.origin + "/app/home";
                        }
                    } else {
                        if(res.message){
                            toast.error(res.message, {
                                timeout: 2000,
                            });
                        }else{
                            toast.error('A imagem deve ser de até 2MB.', {
                                        timeout: 2000,
                                    });
                        }
                        backdrop.remove();
                    submitButton.disabled = false;
                    }
                })
                .finally(() => {
                    backdrop.remove()
                    // Reabilite o botão e esconda o spinner quando a requisição for concluída
                    submitButton.disabled = false;
                })
                .catch(async (error) => {
                    toast.error(error, {
                                    timeout: 2000,
                                });

                    // Restante do código, como remover o backdrop e reabilitar o botão
                    backdrop.remove();
                    submitButton.disabled = false;
                });
        },
        updateCampaignAward(form) {
            const toast = useToast();

            const url = `${process.env.VUE_APP_API_BASE_URL}/update/award/campaign/${form.award_campaign_id}`;

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
                    if (!res.awardCampaign) {
                        toast.error(res.message, {
                            timeout: 2000,
                        });
                    }else{
                                                    // Limpe os campos do formulário
                                                    this.form = {
                                name: "",
                                description: "",
                                image: null,
                                amount_tickets: null,
                                price_each_ticket: "",
                                support_number: "",
                                min_ticket: "",
                                max_ticket: "",
                                show_date_of_raffle: false,
                                show_email_input: false,
                                show_top_ranking: false,
                                show_filters: true,
                                order_numbers: true,
                                ranking_acumulative: false,
                                dark_mode: false,
                                visible: true,
                                date_of_raffle: null,
                                time_wait_payment: null,
                                allow_terms: false,
                                category_id: null,
                                ticket_filter_id: null,
                                raffle_id: null,
                                fee_id: null,
                            }

                            window.location.href = window.location.origin + "/app/home";
                    }
                })
                .catch(error => {
                    // Trate o erro aqui, exiba uma mensagem de erro ou faça outra ação necessária
                    console.error(error);
                });
        },
        updateCampaignSale(form) {
            const toast = useToast();

            const url = `${process.env.VUE_APP_API_BASE_URL}/update/sale/campaign/${form.sale_campaign_id}`;

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
                    if (!res.saleCampaign) {
                        toast.error(res.message, {
                            timeout: 2000,
                        });
                    }else{
                                                    // Limpe os campos do formulário
                                                    this.form = {
                                name: "",
                                description: "",
                                image: null,
                                amount_tickets: null,
                                price_each_ticket: "",
                                support_number: "",
                                min_ticket: "",
                                max_ticket: "",
                                show_date_of_raffle: false,
                                show_email_input: false,
                                show_top_ranking: false,
                                show_filters: true,
                                order_numbers: true,
                                ranking_acumulative: false,
                                dark_mode: false,
                                visible: true,
                                date_of_raffle: null,
                                time_wait_payment: null,
                                allow_terms: false,
                                category_id: null,
                                ticket_filter_id: null,
                                raffle_id: null,
                                fee_id: null,
                            }

                            window.location.href = window.location.origin + "/app/home";
                    }
                })
                .catch(error => {
                    // Trate o erro aqui, exiba uma mensagem de erro ou faça outra ação necessária
                    console.error(error);
                });
        },
        createCampaignAward(form) {
            const toast = useToast();

            const url = `${process.env.VUE_APP_API_BASE_URL}/create/award/campaign`;

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
                    if (!res.awardCampaign) {
                        toast.error(res.message, {
                            timeout: 2000,
                        });
                    }else{
                                                    // Limpe os campos do formulário
                                                    this.form = {
                                name: "",
                                description: "",
                                image: null,
                                amount_tickets: null,
                                price_each_ticket: "",
                                support_number: "",
                                min_ticket: "",
                                max_ticket: "",
                                show_date_of_raffle: false,
                                show_email_input: false,
                                show_top_ranking: false,
                                show_filters: true,
                                order_numbers: true,
                                ranking_acumulative: false,
                                dark_mode: false,
                                visible: true,
                                date_of_raffle: null,
                                time_wait_payment: null,
                                allow_terms: false,
                                category_id: null,
                                ticket_filter_id: null,
                                raffle_id: null,
                                fee_id: null,
                            }

                            window.location.href = window.location.origin + "/app/home";
                    }
                })
                .catch(error => {
                    // Trate o erro aqui, exiba uma mensagem de erro ou faça outra ação necessária
                    console.error(error);
                });
        },
        createCampaignSale(form) {
            const toast = useToast();

            const url = `${process.env.VUE_APP_API_BASE_URL}/create/sale/campaign`;

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
                    if (!res.saleCampaign) {
                        toast.error(res.message, {
                            timeout: 2000,
                        });
                    }else{
                                                    // Limpe os campos do formulário
                                                    this.form = {
                                name: "",
                                description: "",
                                image: null,
                                amount_tickets: null,
                                price_each_ticket: "",
                                support_number: "",
                                min_ticket: "",
                                max_ticket: "",
                                show_date_of_raffle: false,
                                show_email_input: false,
                                show_top_ranking: false,
                                show_filters: true,
                                order_numbers: true,
                                ranking_acumulative: false,
                                dark_mode: false,
                                visible: true,
                                date_of_raffle: null,
                                time_wait_payment: null,
                                allow_terms: false,
                                category_id: null,
                                ticket_filter_id: null,
                                raffle_id: null,
                                fee_id: null,
                            }

                            window.location.href = window.location.origin + "/app/home";
                    }
                })
                .catch(error => {
                    // Trate o erro aqui, exiba uma mensagem de erro ou faça outra ação necessária
                    console.error(error);
                });
        },
        deleteAward(award_campaign_id) {

            const url = `${process.env.VUE_APP_API_BASE_URL}/delete/award/campaign/${award_campaign_id}`;

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
                    console.log(res)
                })
                .catch(error => {
                    console.error(error);
                });
        },
        deleteSale(sale_campaign_id) {

            const url = `${process.env.VUE_APP_API_BASE_URL}/delete/sale/campaign/${sale_campaign_id}`;

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
                    console.log(res)
                })
                .catch(error => {
                    console.error(error);
                });
        },

    }
};
</script>
<style lang="css">
#create-campaign>.card {
    max-width: 1200px;
    margin: 0 auto;
}

.backdrop {
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
}
</style>