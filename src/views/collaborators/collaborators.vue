<template>
  <div>
    <Card noborder>
      <div class="md:flex justify-between pb-6 md:space-y-2 space-y-3 items-center">
        <h5>Colaboradores</h5>
        <div class="grid grid-cols-12">

          <div
            class="xl:col-span-3  md:col-span-3  lg:col-span-3 sm:col-span-12 col-span-12 mb-2 lg:mr-2 lg:mt-[-0.5rem]">
            <div>
              <VueSelect>
                <vSelect v-model="statusSelected" placeholder="Selecione um status" label="title"
                  class="bg-white dark:bg-slate-800 text-gray-500 mt-2" :options="selectStatus"
                  @update:modelValue="getCollaboratorsByCampaignIdAndSearch" />
              </VueSelect>
            </div>
          </div>
          <div
            class="xl:col-span-3  md:col-span-3  lg:col-span-3 sm:col-span-12 col-span-12 mb-4 lg:mr-2 lg:mt-[-0.5rem]">
            <div>
              <VueSelect>
                <vSelect v-model="filterSelected" placeholder="Selecione um filtro" label="title"
                  class="bg-white dark:bg-slate-800 text-gray-500 mt-2" :options="selectFilters" />
              </VueSelect>
            </div>
          </div>
          <div class="xl:col-span-3  md:col-span-3  lg:col-span-3 sm:col-span-12 col-span-12 mb-2">
            <div>
              <InputGroup v-model="searchTerm" placeholder="Buscar" type="text" prependIcon="heroicons-outline:search"
                merged />
            </div>
          </div>
          <div class="xl:col-span-3  md:col-span-3  lg:col-span-3 sm:col-span-12 col-span-12 mb-2">
            <div>
              <Button text="Pesquisar" type="text" class="btn py-2 px-5 lg:ml-2" @click="searchTermTyped" />
            </div>
          </div>
          <div
            class="xl:col-span-3  md:col-span-3  lg:col-span-3 sm:col-span-12 col-span-12 mb-2 lg:mr-2 lg:mt-[-0.5rem]">
            <div>
              <InputGroup class="mt-2" type="date" id="date_of_raffle" label="Data inicial" v-model="filter_start_date" />
            </div>
          </div>
          <div
            class="xl:col-span-3  md:col-span-3  lg:col-span-3 sm:col-span-12 col-span-12 mb-2 lg:mr-2 lg:mt-[-0.5rem]">
            <div>
              <InputGroup class="mt-2" type="date" id="date_of_raffle" label="Data final" v-model="filter_end_date" />
            </div>
          </div>
        </div>


      </div>
      <div>
        <div class="grid grid-cols-12">
          <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12">
            <div class="grid grid-cols-2">
              <div class="lg:col-span-12 col-span-12 mb-2">
                <div>
                  <smal>Campanha</smal>
                  <VueSelect>
                    <vSelect v-model="selected2" placeholder="Selecione uma campanha" label="name"
                      class="bg-white dark:bg-slate-800 text-gray-500 mt-2" :options="selectCampaigns"
                      @update:modelValue="loadData" />
                  </VueSelect>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      <vue-good-table :key="reRender" :columns="columns" styleClass="vgt-table striped centered"
        :rows="collaboratorsTable" :pagination-options="{
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
}" :compactMode="{ enabled: true, breakpoint: '960px' }" :line-numbers="true" :row-style-class="rowStyleClassFn"
        @on-column-sort="onColumnSort">
        <template v-slot:table-actions="">
          <Button @click="exportCollaboratorsButton" btnClass="btn bg-success-500 text-white py-1"
            text="Exportar para Excel" type="button" />
        </template>
        <template v-slot:table-row="props">
          <span v-if="props.column.field == 'link'">
            <Button text="" icon="heroicons:link" :btnClass="`${props.row.status === 'pago'
              ? 'btn-outline-success border-none py-2 px-4 '
              : ''
              } 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ${props.row.status === 'pendente'
                ? 'btn-outline-warning border-none py-2 px-4 '
                : ''
              }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ${props.row.status === 'cancelado'
                ? 'btn-outline-danger border-none py-2 px-4 '
                : ''
              }
              
               `" @click="copyLink(props.row)" />
          </span>

          <div class="grid grid-cols-12 text-left table-cell" v-if="props.column.field == 'amount'">

            <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 pb-[5px]">
              <span>
                <p class="text-[14px] font-semibold">{{ props.row.amount }}</p>
              </span>
            </div>

            <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 pb-[5px]">
              <span>
                <p class="text-[14px]"><b>{{ props.row.amount_of_tickets }}</b> <span
                    class="text-sm normal-case">bilhetes</span></p>
              </span>
            </div>
          </div>

          <div class="grid grid-cols-12 text-left table-cell" v-if="props.column.field == 'expire_date'">

            <div class="lg:col-span-2 col-span-3 xl:col-span-2 sm:col-span-2 pb-[5px]">
              <svg fill="#606266" width="20px" viewBox="0 0 24 24" id="date-check" data-name="Line Color"
                xmlns="http://www.w3.org/2000/svg" class="icon line-color">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path id="primary"
                    d="M20,21H4a1,1,0,0,1-1-1V9H21V20A1,1,0,0,1,20,21ZM21,5a1,1,0,0,0-1-1H4A1,1,0,0,0,3,5V9H21Z"
                    style="fill: none; stroke: #606266; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
                  </path>
                  <path id="secondary" d="M16,3V6M8,3V6"
                    style="fill: none; stroke: #68d391; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
                  </path>
                  <polyline id="secondary-2" data-name="secondary" points="9 15 11 17 15 13"
                    style="fill: none; stroke: #68d391; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
                  </polyline>
                </g>
              </svg>
            </div>
            <div class="lg:col-span-10 col-span-9 xl:col-span-10 sm:col-span-10 pb-[5px]">
              <span>
                <p class="xl:text-[14px] text-[12px]">{{ showDataFriendly(props.row.created_at) }}</p>
              </span>
            </div>
            <div class="lg:col-span-2 col-span-3 xl:col-span-2 sm:col-span-2 pb-[5px]">
              <svg fill="#606266" width="20px" viewBox="0 0 24 24" id="date-alert" data-name="Line Color"
                xmlns="http://www.w3.org/2000/svg" class="icon line-color">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path id="primary"
                    d="M20,21H4a1,1,0,0,1-1-1V9H21V20A1,1,0,0,1,20,21ZM21,5a1,1,0,0,0-1-1H4A1,1,0,0,0,3,5V9H21Z"
                    style="fill: none; stroke: #606266; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
                  </path>
                  <path id="secondary" d="M16,3V6M8,3V6m4,9V12"
                    style="fill: none; stroke: #dc5050; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
                  </path>
                  <line id="secondary-upstroke" x1="11.95" y1="18" x2="12.05" y2="18"
                    style="fill: none; stroke: #dc5050; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
                  </line>
                </g>
              </svg>
            </div>
            <div class="lg:col-span-10 col-span-9 xl:col-span-10 sm:col-span-10 pb-[5px]">
              <span>
                <p class="xl:text-[14px] text-[12px]">{{ showDataFriendly(props.row.expire_date) }}</p>
              </span>
            </div>
          </div>

          <div class="grid grid-cols-12 text-left table-cell" v-if="props.column.field == 'phone'">

            <div class="lg:col-span-2 col-span-3 xl:col-span-2 sm:col-span-2 pb-[5px]">
              <a target="_blank" href="#" @click="contactCollaborator(props.row)" class="sc-55c8fa14-22 cepCQm"><svg
                  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z">
                  </path>
                </svg></a>
            </div>
            <div class="lg:col-span-10 col-span-9 xl:col-span-10 sm:col-span-10 pb-[5px]">
              <span>
                <p class="xl:text-[14px] text-[12px]">{{ props.row.phone }}</p>
              </span>
            </div>
            <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 pb-[5px]">
              <span>
                <p class="text-[12px]">{{ props.row.email ? props.row.email : '--' }}</p>
              </span>
            </div>
          </div>

          <div class="grid grid-cols-12 text-left table-cell" v-if="props.column.field == 'name'">
            <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 pb-[5px]">
              <span>
                <p class="text-[14px] font-semibold">{{ props.row.name }}</p>
              </span>
            </div>
            <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12" v-if="props.row.status === 'pago'">
              <div id="raffle-numbers" class="text-white rounded-md border-none w-[260px] flex flex-wrap justify-center">
                <Button v-for="ticket in props.row.numbers.slice(0, 3)" :key="ticket.id" :id="'btn-' + ticket.number"
                  class="raffle-number-btn" :class="{
                    'cart': ticket.status === '1',
                    'paid py-1 px-1': ticket.status === '-1',
                  }" @click="handleModalTickets(props.row)">
                  {{ ticket.number }}
                </Button>

                <Button class="raffle-number-btn ml-[2px]" @click="handleModalTickets(props.row)"
                  v-if="props.row.amount_of_tickets > 3">
                  + {{ props.row.amount_of_tickets - 3 }}
                </Button>

              </div>
            </div>
          </div>
          <span v-if="props.column.field == 'id'">
            {{ '#' + props.row.id }}
          </span>
          <span v-if="props.column.field == 'created_at'" class="text-slate-500 dark:text-slate-300">

            <span
              class=" cursor-pointer inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
              :class="`${props.row.status === 'pago'
                ? 'text-success-500 bg-success-500'
                : ''
                } 
                                                                                                                                                                                                                                    ${props.row.status === 'pendente'
                  ? 'text-warning-500 bg-warning-500'
                  : ''
                }
                                                                                                                                                                                                                                    ${props.row.status === 'cancelado'
                  ? 'text-danger-500 bg-danger-500'
                  : ''
                }
              
               `" @click="handleModalDatas(props.row)">
              <span v-if="props.row.expire_time > 0 && props.row.status != 'pago'">
                <Icon icon="heroicons-outline:clock" style="display:inline-flex;font-size:11px" /> <span
                  class="normal-case">expira em {{
                    props.row.expire_time }} minutos</span>
              </span>
              <span v-else>
                <span v-if="props.row.status === 'pago'">
                  <span class="normal-case">antecipado</span>
                </span>
                <span
                  v-if="props.row.status === 'cancelado' || (props.row.expire_time <= 0 && props.row.status != 'pago')">
                  <span class="normal-case">expirado</span>
                </span>
              </span>
            </span>
          </span>
          <span v-if="props.column.field == 'amount_of_tickets'" class="text-slate-500 dark:text-slate-300">
            <span
              class=" cursor-pointer inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
              :class="`${props.row.status === 'pago'
                ? 'text-success-500 bg-success-500'
                : ''
                } 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ${props.row.status === 'pendente'
                  ? 'text-warning-500 bg-warning-500'
                  : ''
                }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ${props.row.status === 'cancelado'
                  ? 'text-danger-500 bg-danger-500'
                  : ''
                }
              
               `" @click="handleModalTickets(props.row)">{{ props.row.amount_of_tickets }}</span>
          </span>
          <span v-if="props.column.field == 'status'" class="block w-full">
            <span
              class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25  normal-case"
              :class="`${props.row.status === 'pago'
                ? 'text-success-500 bg-success-500'
                : ''
                } 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ${props.row.status === 'pendente'
                  ? 'text-warning-500 bg-warning-500'
                  : ''
                }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ${props.row.status === 'cancelado'
                  ? 'text-danger-500 bg-danger-500'
                  : ''
                }
              
               `">
              {{ props.row.status }}
            </span>
          </span>
          <span v-if="props.column.field == 'action'">
            <Dropdown classMenuItems=" w-[200px]">
              <span class="text-xl">
                <Icon icon="heroicons-outline:dots-vertical" />
              </span>
              <template v-slot:menus>
                <!--<MenuItem @click="editCollaborator(props.row.id)">
                <div
                  :class="'bg-white-500 text-slate-500 bg-opacity-30 hover:bg-slate-400 hover:text-white w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center'">
                  <span class="text-base">
                    <Icon icon="heroicons:pencil" />
                  </span>
                  <span>editar</span>
                </div>
                </MenuItem>-->

                <!--<MenuItem @click="contactCollaborator(props.row)">
                <div
                  :class="'bg-white-500 text-slate-500 bg-opacity-30 hover:bg-slate-400 hover:text-white w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center'">
                  <span class="text-base">
                    <Icon icon="heroicons-outline:phone" />
                  </span>
                  <span>entrar em contato</span>
                </div>
                </MenuItem>-->

                <MenuItem @click="changeStatusPayment(props.row.id, 1)"
                  v-if="props.row.status == 'pendente' || props.row.status == 'cancelado'">
                <div
                  :class="'bg-white-500 text-success-500 bg-opacity-30 hover:bg-success-500 hover:text-white w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center'">
                  <span class="text-base">
                    <Icon icon="heroicons:check" />
                  </span>
                  <span>marcar como pago</span>
                </div>
                </MenuItem>

                <MenuItem @click="changeStatusPayment(props.row.id, -1)"
                  v-if="props.row.status == 'pendente' || props.row.status == 'pago'">
                <div
                  :class="'bg-white-500 text-danger-500 bg-opacity-30 hover:bg-danger-500 hover:text-white w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center'">
                  <span class="text-base">
                    <Icon icon="heroicons-outline:ban" />
                  </span>
                  <span>cancelar reserva</span>
                </div>
                </MenuItem>

                <MenuItem @click="deleteCollaborator(props.row.id)" v-if="props.row.status == 'cancelado'">
                <div
                  :class="'bg-white-500 text-danger-500 bg-opacity-30 hover:bg-danger-500 hover:text-white w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center'">
                  <span class="text-base">
                    <Icon icon="heroicons-outline:trash" />
                  </span>
                  <span>deletar</span>
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
    <Modal title="Bilhetes do Colaborador" ref="modalTickets" centered themeClass="bg-slate-900"
      @close-modal="closeModalTicket">
      <div class="content-tickets form-div">
        <div> <!-- Adicione este elemento div -->
          <Tickets :tickets="ticketsData" />
        </div>
      </div>
    </Modal>
    <Modal title="Datas" ref="modalDatas" centered themeClass="bg-slate-900" @close-modal="closeModalDatas">
      <div class="content-datas form-div">
        <div class="grid grid-cols-12 text-left">
          <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 p-2">
            <span>
              <p class="text-[14px] font-semibold">Criado em:</p>
              <p>{{ collaborator.created_at }}</p>
            </span>
          </div>
          <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 p-2">
            <span>
              <p class="text-[14px] font-semibold">Atualizado em:</p>
              <p>{{ collaborator.updated_at }}</p>
            </span>
          </div>
          <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 p-2">
            <span>
              <p class="text-[14px] font-semibold">Expira em:</p>
              <p>{{ collaborator.expire_date }}</p>
            </span>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>


<script>
import * as XLSX from 'xlsx/xlsx.mjs';
import moment from 'moment';
import Button from '@/components/Button';
import Modal from "@/components/Modal/ModalCustom";
import VueSelect from "@/components/Select/VueSelect";
import vSelect from "vue-select";
import Dropdown from '@/components/Dropdown';
import Card from '@/components/Card';
import Tickets from "../campaigns/tickets.vue";
import Icon from '@/components/Icon';
import InputGroup from '@/components/InputGroup';
import Pagination from '@/components/Pagination';
import { MenuItem } from '@headlessui/vue';
import { useToast } from "vue-toastification";
import { VueGoodTable } from "vue-good-table-next";
import "vue-good-table-next/dist/vue-good-table-next.css";
export default {
  components: {
    VueGoodTable: VueGoodTable,
    Pagination,
    InputGroup,
    Dropdown,
    Icon,
    Card,
    MenuItem,
    VueSelect,
    vSelect,
    Tickets,
    Modal,
    Button
  },

  data() {
    return {
      collaborator: '',
      user: [],
      filter_start_date: '',
      filter_end_date: '',
      options: {
        responsive: true,
      },
      isMobile: true,
      selected2: [],
      selectCampaigns: [],
      modalDatasOpen: false,
      filterSelected: {
        title: 'Sem Filtro',
        id: 0,
        value: '',
      },
      selectFilters: [
        {
          title: 'Sem Filtro',
          id: 0,
          value: '',
        },
        {
          title: 'Bilhete',
          id: 1,
          value: 'tickets_number',
        },
        {
          title: 'Nome do Comprador',
          id: 2,
          value: 'name',
        },
        {
          title: 'Email do Comprador',
          id: 3,
          value: 'email',
        },
        {
          title: 'Telefone do Comprador',
          id: 4,
          value: 'phone',
        },
      ],
      statusSelected: {
        title: 'Todos',
        id: 0,
        value: '',
      },
      selectStatus: [
        {
          title: 'Todos',
          id: 0,
          value: '',
        },
        {
          title: 'Pendente',
          id: 1,
          value: '0',
        },
        {
          title: 'Cancelado',
          id: 2,
          value: '-1',
        },
        {
          title: 'Pago',
          id: 3,
          value: '1',
        },
      ],
      collaboratorsTable: [],
      collaborators: [],
      current: 1,
      perpage: 10,
      pageRange: 2,
      totalData: 0,
      currentPage: 1,
      searchTerm: '',
      statusPaymentOptions: [
        { value: 1, label: "Pago" },
        { value: 0, label: "Pendente" },
        { value: -1, label: "Cancelado" },
      ],
      form: {},
      columns: [
        {
          label: 'Link',
          field: 'link',
          width: '50px',
          sortable: false,
        },
        {
          label: 'Data',
          field: 'expire_date',
          width: '200px',
          sortable: false,
        },
        {
          label: 'Comprador',
          field: 'name',
          width: '300px',
          sortable: false,
        },
        {
          label: 'Contato',
          field: 'phone',
          width: '200px',
          sortable: false,
        },

        {
          label: 'Total',
          field: 'amount',
          sortable: false,
        },

        {
          label: 'Status',
          field: 'status',
          sortable: false,
        },
        {
          label: 'Estado de Exp.',
          field: 'created_at',
          sortable: false,
        },
        {
          label: '',
          field: 'action',
          width: '50px',
          sortable: false,
        },
      ],
      previousPageUrl: null,
      ticketsData: [],
      currentTicket: 1,
      perpageTicket: 50,
      pageRangeTicket: 2,
      totalDataTicket: 0,
      currentPageTicket: 1,
      collaboratorId: '',
      modalTicketsOpen: false,
      customizations: {},
      options: [],
      newName: '',
      newPhone: '',
      newEmail: '',
      updateKey: 0,
      reRender: 0,
      token: ''
    };
  },
  watch: {
    updateKey: function () {
      // Atualize a chave para forçar o componente a re-renderizar
      this.reRender++;
    },
    '$store.state.user'(newValue, oldValue) {
      // Este trecho será executado sempre que o estado 'user' for atualizado
      this.user = newValue;
      this.token = this.$store.state.token;
      this.getCampaignsByUserId()
    }
  },
  mounted() {
    if (this.$store.state.user.id) {
      this.user = this.$store.state.user;
      this.token = this.$store.state.token;
      this.getCampaignsByUserId()
    }
  },
  /* watch: {
     searchTerm: function (newSearchTerm) {
       // Verifique se o campo de busca foi preenchido
       if (newSearchTerm && this.filterSelected.value) {
         // Faça a request usando fetch
         this.getCollaboratorsByCampaignIdAndSearch();
       } else {
         const toast = useToast();
         toast.info('Selecione algum filtro!', {
           timeout: 2000,
         });
       }
     },
   },*/
  methods: {
    onColumnSort(sortInfo) {
      // Este método é chamado quando o usuário clica para ordenar uma coluna
      // Aqui você pode manipular a lógica para exibir os indicadores de ordenação conforme necessário
      const { column, order } = sortInfo;
      this.columns.forEach((col) => {
        col.isSorted = col === column; // Define a propriedade isSorted na coluna clicada
        col.sortOrder = col === column ? order : null; // Define a ordem de classificação na coluna clicada
      });
    },
    calculateTimeMinutes(start_date = null, end_date) {
      // Use moment.js para calcular a diferença em minutos
      let startDate = moment();
      let endDate = moment(end_date);

      if (start_date) {
        startDate = moment(start_date);
      }

      const differenceInMinutes = endDate.diff(startDate, 'minutes');

      return differenceInMinutes;
    },
    copyLink(collaborator_) {
      let collaborator = this.collaborators.find(collab => collab.id === collaborator_.id);
      let link = '';
      let textNotification = 'Link copiado';

      if (!this.customizations) {
        this.customizations = {}
        this.customizations.custom_domain = null
      }

      if (collaborator.status_payment == 1) {
        link = `${this.customizations.custom_domain ? 'https://' + this.customizations.custom_domain : window.location.origin}/voucher/${collaborator.uuid}`;
        textNotification = 'Link do comprovante copiado'
      } else if (collaborator.status_payment == 0) {
        link = `${this.customizations.custom_domain ? 'https://' + this.customizations.custom_domain : window.location.origin}/payment/${collaborator.payments[0].transaction_id}`;
        textNotification = 'Link de pagamento copiado'
      } else if (collaborator.status_payment == -1) {
        link = `${this.customizations.custom_domain ? 'https://' + this.customizations.custom_domain : window.location.origin}/acao/${collaborator.campaign.slug}`;
        textNotification = 'Link da campanha copiado'
      }


      // Crie um elemento de entrada temporário em Vue
      const tempInput = document.createElement('input');
      tempInput.style.opacity = '0';
      tempInput.style.position = 'absolute';
      document.body.appendChild(tempInput);

      // Defina o valor do elemento de entrada e selecione o texto
      tempInput.value = link;
      tempInput.select();
      tempInput.setSelectionRange(0, tempInput.value.length);

      // Copie o texto para a área de transferência
      document.execCommand('copy');

      // Remova o elemento temporário da árvore DOM
      document.body.removeChild(tempInput);
      const toast = useToast();
      toast.success(textNotification, {
        timeout: 2000,
      });
    },
    exportCollaboratorsButton() {
      const collab_export = this.collaboratorsTable.reduce((ac, collab) => {
        ac.push({
          created_at: collab.created_at,
          expire_date: collab.expire_date,
          name: collab.name,
          email: collab.email,
          phone: collab.phone,
          amount: collab.amount,
          status: collab.status,
        });
        return ac;
      }, [])

      var collabWS = XLSX.utils.json_to_sheet(collab_export)

      // A workbook is the name given to an Excel file
      var wb = XLSX.utils.book_new() // make Workbook of Excel

      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, collabWS, 'Lista de Colaboradores') // invoices list is name of Worksheet


      // export Excel file
      XLSX.writeFile(wb, 'Colaboradores.xlsx')

    },
    searchTermTyped() {
      // Verifique se o campo de busca foi preenchido
      if (this.filterSelected.value) {
        // Faça a request usando fetch
        this.getCollaboratorsByCampaignIdAndSearch();
      } else {
        if (!this.searchTerm) {
          // Faça a request usando fetch
          this.getCollaboratorsByCampaignIdAndSearch();
        } else {
          const toast = useToast();
          toast.info('Selecione algum filtro!', {
            timeout: 2000,
          });
        }
      }
    },
    rowStyleClassFn(row) {
      let bg = 'bg-danger-100';
      if (row.status == 'pago') {
        bg = 'bg-success-100'
      } else if (row.status == 'pendente') {
        bg = 'bg-warning-100'
      }
      return bg;
    },
    clearPhone(telefone) {
      // Use uma expressão regular para remover todos os caracteres não numéricos, exceto o '+'
      return telefone.replace(/[^\d+]/g, '');
    },
    contactCollaborator(collaborator_) {
      let collaborator = this.collaborators.find(collab => collab.id === collaborator_.id);

      let phoneclear = this.clearPhone(collaborator.phone);

      if (!phoneclear.includes('+55') && !phoneclear.includes('+')) {
        phoneclear = '+55' + phoneclear.replace(/^55/, "XX")
      }


      if (collaborator.status_payment == 1) {
        window.open(`https://wa.me/${phoneclear}?text=Olá *${collaborator.name}*,%0a%0aSeu pagamento dos bilhetes na minha campanha *[${collaborator.campaign.name}]* foi efetuado com sucesso!%0a%0aConfira o seu comprovante no link: ${this.customizations.custom_domain ? 'https://' + this.customizations.custom_domain : window.location.origin}/voucher/${collaborator.uuid}.%0a%0aMuito obrigado e boa sorte!`, '_blank');
      } else if (collaborator.status_payment == 0) {
        window.open(`https://wa.me/${phoneclear}?text=Olá *${collaborator.name}*,%0a%0aNão deixe a oportunidade passar, faça o pagamento da sua reserva na minha campanha *[${collaborator.campaign.name}]*!%0a%0aPara retornar ao checkout acesse o link:%0a%0a ${this.customizations.custom_domain ? 'https://' + this.customizations.custom_domain : window.location.origin}/payment/${collaborator.payments[0].transaction_id}.%0a%0aMuito obrigado e boa sorte!`, '_blank');
      } else if (collaborator.status_payment == -1) {
        window.open(`https://wa.me/${phoneclear}?text=Olá *${collaborator.name}*,%0a%0aSua reserva na minha campanha *[${collaborator.campaign.name}]* já expirou!%0a%0a Mas ainda temos bilhetes disponíveis, acesse o link:%0a%0a ${this.customizations.custom_domain ? 'https://' + this.customizations.custom_domain : window.location.origin}/acao/${collaborator.campaign.slug}.%0a%0aMuito obrigado e boa sorte!`, '_blank');
      }
    },
    closeModalDatas() {
      this.modalDatasOpen = false;
    },
    handleModalDatas(collab) {
      if (!this.modalDatasOpen) {
        this.$refs.modalDatas.openModal();
        moment.locale('pt-br');
        collab.created_at = moment(collab.created_at).format('dddd, D [de] MMMM [de] YYYY [às] HH:mm:ss');
        collab.updated_at = moment(collab.updated_at).format('dddd, D [de] MMMM [de] YYYY [às] HH:mm:ss');
        collab.expire_date = moment(collab.expire_date).format('dddd, D [de] MMMM [de] YYYY [às] HH:mm:ss');
        this.collaborator = collab;
        this.modalDatasOpen = true;
      }
    },
    showDataFriendly(date) {
      moment.locale('pt-br');
      return moment(date).format('ddd. D MMM [às] HH:mm');
    },
    closeModalTicket(status) {
      this.modalTicketsOpen = status;
      this.currentTicket = 1;
      this.currentPageTicket = 1;
    },
    handleModalTickets(collaborator) {
      if (!this.modalTicketsOpen) {
        this.ticketsData = collaborator.numbers;
        if (this.ticketsData.length) {
          this.$refs.modalTickets.openModal();
          this.modalTicketsOpen = true;
        } else {
          const toast = useToast();
          toast.info('Não possui bilhetes pagos', {
            timeout: 2000,
          });
        }
      }
    },
    editCollaborator(collaboratorId) {
      const toast = useToast();

      const url = `${process.env.VUE_APP_API_BASE_URL}/update/collaborator/${collaboratorId}`;

      let form = {
        name: this.newName,
        phone: this.newPhone,
        email: this.newEmail
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
          if (res.collaborator) {
            toast.success("Colaborador atualizado!", {
              timeout: 2000,
            });
            this.getCampaignsByUserId()
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
    },
    deleteCollaborator(collaboratorId) {
      const toast = useToast();

      const url = `${process.env.VUE_APP_API_BASE_URL}/delete/collaborator/${collaboratorId}`;

      let backdrop = this.showBackDrop('Deletando pedido, aguarde ...');

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
          if (res.message) {
            toast.success("Pedido deletado!", {
              timeout: 2000,
            });
            this.getCollaboratorsByCampaignId()
            this.updateKey++;
            //this.getCampaignsByUserId()
          }
        })
        .finally(() => {
          backdrop.remove()
        })
        .catch(error => {
          // Trate o erro aqui, exiba uma mensagem de erro ou faça outra ação necessária
          console.error(error);
        });
    },
    changeStatusPayment(collaboratorId, status) {
      const toast = useToast();

      const url = `${process.env.VUE_APP_API_BASE_URL}/update/collaborator/${collaboratorId}`;

      let form = {
        status_payment: status,
        allow_terms: true
      }

      let backdrop = this.showBackDrop('Atualizando pedido, aguarde ...');

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
          if (res.collaborator) {
            toast.success("Pedido atualizado!", {
              timeout: 2000,
            });
            this.getCollaboratorsByCampaignId()
            this.updateKey++;
            //this.getCampaignsByUserId()
          } else {
            toast.error(res.message, {
              timeout: 2000,
            });
          }
        })
        .finally(() => {
          backdrop.remove()
        })
        .catch(error => {
          // Trate o erro aqui, exiba uma mensagem de erro ou faça outra ação necessária
          console.error(error);
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
    loadData(value) {

      if (this.filterSelected.value || this.statusSelected.value) {
        this.getCollaboratorsByCampaignIdAndSearch();
      } else {
        this.getCollaboratorsByCampaignId();
      }
    },
    getCollaboratorsByCampaignIdAndSearch() {
      let selected = this.selected2[0] ? this.selected2[0] : this.selected2;

      const url = `${process.env.VUE_APP_API_BASE_URL}/collaborators/campaigns/${selected.id}?${this.filter_start_date && this.filter_end_date ? 'start_date=' + this.filter_start_date + '&end_date=' + this.filter_end_date + '&' : ''}limit=${this.perpage}&page=${1}${this.filterSelected.value ? '&keywords[' + this.filterSelected.value + ']=' + this.searchTerm : ''}${this.statusSelected.value ? '&keywords[status_payment]=' + this.statusSelected.value : ''}`;

      fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.token, // Substitua 'seu-token-jwt' pelo seu token real
          'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
          // outros cabeçalhos, se necessário
        },
      })
        .then(response => response.json())
        .then(res => {

          this.perpage = res.per_page;
          this.pageRange = res.last_page;
          this.totalData = res.total;
          this.previousPageUrl = this.getPreviousPageUrl(res.links);
          this.collaborators = res.data;
          this.collaboratorsTable = res.data.map(item => {
            const created_at = moment(item.created_at).format('YYYY-MM-DD HH:mm:ss');
            const updated_at = moment(item.updated_at).format('YYYY-MM-DD HH:mm:ss');
            const expire_date = item.expire_date;
            let status_payment = '';

            if (item.status_payment === 0) {
              status_payment = 'pendente';
            } else if (item.status_payment === 1) {
              status_payment = 'pago';
            } else if (item.status_payment === -1) {
              status_payment = 'cancelado';
            }

            const floatValue = parseFloat(item.price_each_ticket.replace("R$", "").replace(",", "."));
            const amount = "R$" + (floatValue * item.amount_of_tickets).toFixed(2);
            return {
              id: item.id,
              link: true,
              name: item.name,
              phone: item.phone,
              email: item.email,
              created_at: created_at,
              updated_at: updated_at,
              expire_date: expire_date,
              expire_time: this.calculateTimeMinutes(null, expire_date),
              amount_of_tickets: item.amount_of_tickets,
              numbers: item.numbers,
              amount: amount,
              status: status_payment,
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
        })
        .catch(error => {
          console.error(error);
        });
    },
    getCampaignsByUserId() {
      this.customizations = this.user.customizations[0]
      this.selectCampaigns = this.user.campaigns;

      // Verifica se existem campanhas disponíveis
      if (this.selectCampaigns.length > 0) {
        // Define a primeira opção como pré-selecionada
        this.selected2 = [this.selectCampaigns[this.selectCampaigns.length - 1]];
        //this.loadData(this.selected2)

        let campaign = this.user.campaigns.find(campaign => campaign.id === this.selected2[0].id);

        if (campaign) {
          this.getCollaboratorsByCampaignId(null)
        }
      } else {
        this.selected2 = ''
      }
    },
    getCollaboratorsByCampaignId(value) {

      if (value) {
        this.current = value.currentPage;
      }
      let selected = this.selected2[0] ? this.selected2[0] : this.selected2;

      const url = `${process.env.VUE_APP_API_BASE_URL}/collaborators/campaigns/${selected.id}?${this.filter_start_date && this.filter_end_date ? 'start_date=' + this.filter_start_date + '&end_date=' + this.filter_end_date + '&' : ''}limit=${this.perpage}&page=${this.current}${this.filterSelected.value ? '&keywords[' + this.filterSelected.value + ']=' + this.searchTerm : ''}${this.statusSelected.value ? '&keywords[status_payment]=' + this.statusSelected.value : ''}`;

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
            this.collaborators = res.data;
            this.collaboratorsTable = res.data.map(item => {
              const created_at = moment(item.created_at).format('YYYY-MM-DD HH:mm:ss');
              const updated_at = moment(item.updated_at).format('YYYY-MM-DD HH:mm:ss');
              const expire_date = item.expire_date;
              let status_payment = '';

              if (item.status_payment === 0) {
                status_payment = 'pendente';
              } else if (item.status_payment === 1) {
                status_payment = 'pago';
              } else if (item.status_payment === -1) {
                status_payment = 'cancelado';
              }

              const floatValue = parseFloat(item.price_each_ticket.replace("R$", "").replace(",", "."));
              const amount = "R$" + (floatValue * item.amount_of_tickets).toFixed(2);

              return {
                id: item.id,
                link: true,
                name: item.name,
                phone: item.phone,
                email: item.email,
                created_at: created_at,
                updated_at: updated_at,

                expire_date: expire_date,
                expire_time: this.calculateTimeMinutes(null, expire_date),
                amount_of_tickets: item.amount_of_tickets,
                numbers: item.numbers,
                amount: amount,
                status: status_payment,
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
      this.getCollaboratorsByCampaignId()
      this.updateKey += 1;
    },
    handlePerPageChange(newPerPage) {
      this.perpage = newPerPage;
      this.getCollaboratorsByCampaignId()
      this.updateKey += 1;
    },
    getPreviousPageUrl(links) {
      const previousLink = links.find(link => link.label === '&laquo; Previous');
      return previousLink ? previousLink.url : null;
    },
    goToPreviousPage() {
      if (this.previousPageUrl) {
        fetch(this.previousPageUrl, {
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
            this.current = res.current_page;
            this.perpage = res.per_page;
            this.pageRange = res.last_page;
            this.totalData = res.total;
            this.previousPageUrl = this.getPreviousPageUrl(res.links);

            this.collaboratorsTable = res.data.map(item => {
              const created_at = moment(item.created_at).format('YYYY-MM-DD HH:mm:ss');
              const updated_at = moment(item.updated_at).format('YYYY-MM-DD HH:mm:ss');
              const expire_date = item.expire_date;
              let status_payment = '';

              if (item.status_payment === 0) {
                status_payment = 'pendente';
              } else if (item.status_payment === 1) {
                status_payment = 'pago';
              }

              const floatValue = parseFloat(item.price_each_ticket.replace("R$", "").replace(",", "."));
              const amount = "R$" + (floatValue * item.amount_of_tickets).toFixed(2);

              return {
                id: item.id,
                link: true,
                name: item.name,
                phone: item.phone,
                created_at: created_at,
                updated_at: updated_at,

                expire_date: expire_date,
                expire_time: this.calculateTimeMinutes(null, expire_date),
                amount_of_tickets: item.amount_of_tickets,
                numbers: item.numbers,
                amount: amount,
                status: status_payment,
                action: null,
              };
            });
          })
          .catch(error => {
            console.error(error);
          });
      }
    },

  }
};
</script>
<style scoped>
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

/* Estilo para limitar a largura da célula */
.table-cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cepCQm {
  position: relative;
  width: 26px;
  height: 26px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #5dfa79;
  color: rgb(255, 255, 255);
  transition: opacity 180ms ease-in-out 0s;
}</style>
  