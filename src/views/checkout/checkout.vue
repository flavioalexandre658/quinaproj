<template>
  <Timer :expireDate="collaborator.expire_date" v-if="collaborator.expire_date && !pixGenerated" />

  <div class="container mx-auto p-5 mb-5" style="min-height: 750px;" v-if="!pixGenerated">
    <h2 class="text-2xl font-semibold mb-4">Informações da Reserva</h2>
    <div class="bg-gradient-to-r from-slate-800 to-slate-900 shadow rounded-lg p-6 text-slate-300">

      <div class="mb-4">
        <h3 class="text-lg font-semibold text-white">Campanha:</h3>
        <p>{{ campaignName }}</p>
      </div>

      <div class="mb-4">
        <h3 class="text-lg font-semibold text-white">Nome:</h3>
        <p>{{ collaborator.name }}</p>
      </div>

      <div class="mb-4">
        <h3 class="text-lg font-semibold text-white">Telefone:</h3>
        <p>{{ collaborator.phone }}</p>
      </div>

      <div class="mb-4" v-if="collaborator.email">
        <h3 class="text-lg font-semibold text-white">Email:</h3>
        <p>{{ collaborator.email }}</p>
      </div>

      <div class="mb-4">
        <h3 class="text-lg font-semibold text-white">Quantidade de Bilhetes:</h3>
        <p>{{ collaborator.amount_of_tickets }}</p>
      </div>

      <div v-if="ticketsData.length">
        <h3 class="text-lg font-semibold text-white">Bilhetes:</h3>
        <div class="mt-2">
          <button
            class="w-full flex justify-between items-center bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md focus:outline-none"
            @click="toggleAccordion">
            <span class="font-semibold text-slate-900">Mostrar Bilhetes</span>
            <svg class="w-4 h-4 transition-transform duration-300 transform" :class="{ 'rotate-180': isAccordionOpen }"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-show="isAccordionOpen" class="mt-2">
            <div class="content-tickets form-div">

              <Tickets :tickets="ticketsData" :price_ticket="price" :compare_price_ticket="price_compare" />
              <!-- Paginação -->
              <div class="flex items-center justify-center">
                <Button @click="goToPreviousPage" :disabled="current === 1" btnClass="btn bg-slate-500 text-white mr-2"
                  text="Anterior" type="button" />
                <!-- <div v-for="page in visiblePages" :key="page">
                <template v-if="page !== '...'">
                    <button @click="goToPage(page)" :class="{
                        'px-2 py-1 rounded-md bg-blue-500 text-white mr-2': current !== page,
                        'px-2 py-1 rounded-md bg-blue-700 text-white mr-2': current === page
                    }">
                        {{ page }}
                    </button>
                </template>
                <template v-else>
                    <span>...</span>
                </template>
            </div>-->

                <Button @click="goToNextPage" :disabled="current === pageRange"
                  btnClass="btn bg-slate-500 text-white ml-2" text="Próxima" type="button" />
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>

      <div class="bg-slate-100 fixed bottom-0 left-0 w-full p-2 flex justify-between z-[3] md:hidden">

        <div class="pt-1 d-inline-flex align-items-center">
          <span class="text-[12px] text-danger-500">de </span>
          <span class="text-[16px] font-medium line-through text-danger-500">
            {{ "R$" + (collaborator.amount_of_tickets * price_compare).toFixed(2) }}
          </span>

          <span class="pl-2 text-[12px] text-slate-900">por </span>
          <span class="text-[26px] font-semibold text-slate-900">
            {{ "R$" + (collaborator.amount_of_tickets * price).toFixed(2) }}
          </span>
        </div>

        <div>
          <Button id="submitButton" class="bg-success-500 px-8 text-white " @click.prevent="generatePaymentPix"
            v-if="!expired">
            Pagar
          </Button>
          <Button class="bg-danger-500 px-8 text-white " v-if="expired" disabled>
            Expirado
          </Button>
        </div>
      </div>

    </div>
  </div>
  <div class="mx-auto text-center" v-if="!pixGenerated">
    <Button id="submitButton" class="bg-success-500 px-8 text-white hidden lg:flex xl:flex  md:flex m-auto btn-lg"
      @click.prevent="generatePaymentPix" v-if="!expired">
      Pagar
    </Button>
    <Button class="bg-danger-500 px-8 text-white hidden lg:flex xl:flex md:flex m-auto btn-lg" v-if="expired" disabled>
      Expirado
    </Button>
  </div>

  <noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id={{customizationPixelMeta}}&ev=PageView&noscript=1" /></noscript>
</template>

<script>
import SimpleCrypto from 'simple-crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';
import Tickets from "../campaigns/tickets.vue";
import Timer from "../timer/timer.vue";
import Button from '@/components/Button';
import InputGroup from '@/components/InputGroup';
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
export default {
  components: {
    Button,
    Tickets,
    Timer,
    InputGroup
  },
  data() {
    return {
      reserva: {
        campanha: "Nome da campanha aqui",
        nome: "Nome do cliente aqui",
        telefone: "Telefone do cliente aqui",
        email: "Email do cliente aqui",
        quantidadeBilhetes: 3,
        bilhetes: [
          "Bilhete 1",
          "Bilhete 2",
          "Bilhete 3"
        ]
      },
      collaborator: [],
      isAccordionOpen: false,
      ticketsData: [],
      current: 1,
      perpage: 200,
      pageRange: 2,
      totalData: 0,
      currentPage: 1,
      searchTerm: '',
      collaboratorId: '',
      campaignName: '',
      price: '',
      price_compare: '',
      expired: false,
      qrCodeBase64: "",
      qrCode: '',
      pixGenerated: false,
      payment: [],
      paymentMethods: [],
      phoneNumber: '',
      userId: '',
      pixKey: '',
      pixName: '',
      pixTypeKey: '',
      pixGenerated: false,
      customizationPixelMeta: '',
      customizationTagGoogle: ''
    };
  },
  created() {
    // Recupere os parâmetros da rota para obter o nome e o ID da campanha
    this.collaboratorId = this.$route.params.id;

    this.getCollaboratorById()

  },
  computed: {
    pageRanged() {
      if (this.pageRange <= 10) {
        return Array.from({ length: this.pageRange }, (_, i) => i + 1);
      } else {
        const currentPage = parseInt(this.current);
        let startPage = currentPage - 4;
        let endPage = currentPage + 5;

        if (startPage < 1) {
          startPage = 1;
          endPage = 10;
        } else if (endPage > this.pageRange) {
          startPage = this.pageRange - 9;
          endPage = this.pageRange;
        }

        return [...Array(endPage - startPage + 1)].map((_, i) => startPage + i);
      }
    }
  },
  methods: {
    copyPixCodeClick() {
      this.$refs.clone.focus();
      document.execCommand('copy');
      const toast = useToast();
      toast.success("Chave PIX copiada", {
        timeout: 2000,
      });
    },
    getCollaboratorById() {

      const toast = useToast();
      const router = useRouter();

      fetch(process.env.VUE_APP_API_BASE_URL + '/collaborator/uuid/' + this.collaboratorId, {
        method: 'GET'
      }).then(response => response.json())
        .then(res => {

          if (res[0]) {
            this.collaboratorId = res[0].id
            this.collaborator = res[0]
            this.price = this.extractNumberFromString(res[0].price_each_ticket)
            this.price_compare = this.price * 0.5 + this.price
            this.getTicketsByCollaboratorId()

            if (res[0].campaign) {
              this.campaignName = res[0].campaign.name
              this.userId = res[0].campaign.user_id
              this.phoneNumber = res[0].campaign.support_number

              if (res[0].campaign.user.payment_methods) {
                this.paymentMethods = res[0].campaign.user.payment_methods
              }

              if (res[0].campaign.user.customizations) {
                this.customizationImage = res[0].campaign.user.customizations[0].image;
                this.customizationPixelMeta = res[0].campaign.user.customizations[0].pixel_meta;
                this.customizationTagGoogle = res[0].campaign.user.customizations[0].tag_gooogle;

                fbq('init', this.customizationPixelMeta);
                fbq('track', 'PageView');
              }
            }

            this.checkIfExpire()
            this.countTimeExpire()
          } else {
            toast.error(res.message, {
              timeout: 2000,
            });
            router.push('/')
          }
        })
    },
    getTicketsByCollaboratorId() {

      const toast = useToast();

      const url = `${process.env.VUE_APP_API_BASE_URL}/collaborator/paid/tickets/${this.collaboratorId}?limit=${this.perpage}&page=${this.current}`;

      fetch(url, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(res => {
          if (!res.message) {
            this.perpage = res.per_page;
            this.pageRange = res.last_page;
            this.totalData = res.total;
            this.previousPageUrl = this.getPreviousPageUrl(res.links);

            if (res.data.length === 0) {
              this.ticketsData = [];
              toast.info('Nenhum bilhete encontrado', {
                timeout: 2000,
              });
            } else {
              this.ticketsData = res.data;
            }
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
    toggleAccordion() {
      this.isAccordionOpen = !this.isAccordionOpen;
    },
    generatePaymentPix() {
      const toast = useToast();

      if (this.paymentMethods.length) {
        this.paymentMethods.forEach(payMethod => {

          if (payMethod.name_method === 'Mercado Pago' && payMethod.status) {

            const url_payment = `${process.env.VUE_APP_API_BASE_URL}/payment/pix`;
            //const url_callback = `${process.env.VUE_APP_API_BASE_URL}/payment/callback`;

            let form = {
              'collaborator_id': this.collaborator.id,
              'campaign_id': this.collaborator.campaign_id
            }
            const submitButton = document.getElementById("submitButton");

            // Desabilite o botão e mostre o spinner
            submitButton.disabled = true;

            // Fazer uma requisição POST para o endpoint do Laravel
            fetch(url_payment, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              verify: false,
              body: JSON.stringify(form)
            })
              .then(response => response.json())
              .then(response => {

                if (response.payment) {
                  this.payment = response.payment
                  this.createPayment()
                }
              })
              .finally(() => {
                // Reabilite o botão e esconda o spinner quando a requisição for concluída
                submitButton.disabled = false;
              })
              .catch(error => {
                console.error(error);
              });
          } else if (payMethod.name_method === 'Transferência PIX' && payMethod.status) {
            this.pixGenerated = true;
            this.payment.id = uuidv4();
            this.payment.currency_id = 'R$'
            this.payment.status = 'pending'
            this.createPayment()
            this.pixKey = payMethod.key
            this.pixTypeKey = payMethod.type_key
            this.pixName = payMethod.name_user
          }

        });
      } else {
        toast.error("Nenhum método de pagamento cadastrado ou ativo.", {
          timeout: 2000,
        });
      }
    },
    createPayment() {

      const url_payment = `${process.env.VUE_APP_API_BASE_URL}/create/payment`;
      let self = this;

      let form = {
        'transaction_id': String(this.payment.id),
        'amount': this.price * this.collaborator.amount_of_tickets,
        'currency': this.payment.currency_id,
        'status': this.payment.status,
        'collaborator_id': this.collaborator.id,
        'campaign_id': this.collaborator.campaign_id
      }

      fbq('track', 'Purchase', {
        content_type: 'product', value: form.amount, currency: "BRL", num_items: this.collaborator.amount_of_tickets
      });

      const submitButton = document.getElementById("submitButton");

      // Desabilite o botão e mostre o spinner
      submitButton.disabled = true;

      // Fazer uma requisição POST para o endpoint do Laravel
      fetch(url_payment, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        verify: false,
        body: JSON.stringify(form)
      })
        .then(response => response.json())
        .then(response => {
          self.$router.push('/payment/' + this.payment.id);
        })
        .finally(() => {
          // Reabilite o botão e esconda o spinner quando a requisição for concluída
          submitButton.disabled = false;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getPreviousPageUrl(links) {
      const previousLink = links.find(link => link.label === '&laquo; Previous');
      return previousLink ? previousLink.url : null;
    },
    goToPreviousPage() {
      this.current = Math.max(parseInt(this.current) - 1, 1);
      this.updateVisiblePages();
      this.getTicketsByCampaignId();
    },
    goToPage(page) {
      this.current = parseInt(page);
      this.getTicketsByCampaignId();
    },
    goToNextPage() {
      this.current = Math.min(parseInt(this.current) + 1, this.pageRange);
      this.getTicketsByCampaignId();
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
    },
    countTimeExpire() {
      this.countdown = setInterval(() => {
        this.checkIfExpire()
      }, 1000)
    },
    checkIfExpire() {
      const expireTime = new Date(this.collaborator.expire_date).getTime();
      const now = new Date().getTime();
      const timeDiff = expireTime - now;

      if (timeDiff <= 0) {
        this.expired = true
      } else {
        this.expired = false
      }
    }
  },
};
</script>

<style scoped>
button[aria-expanded="false"] .rotate-180 {
  transform: rotate(180deg);
}

.content-tickets {
  margin-bottom: 50px;
}

.content-pix-payment {
  max-width: 600px;
  margin: auto;
  margin-top: 15px;
}
</style>
