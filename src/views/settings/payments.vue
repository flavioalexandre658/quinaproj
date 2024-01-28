<template>
  <div class="lg:col-span-12 col-span-12 xl:col-span-6 sm:col-span-6  py-3 px-2">
    <h5 class="text-center mb-3">Segundo Passo</h5>
    <Alert type="danger-light" style="padding:9px 12px;margin-bottom:8px" icon="akar-icons:info">
      <span class="font-semibold">Aprenda a <u>configurar os pagamentos</u> no video abaixo</span>
    </Alert>
    <iframe style="width: 100%;height:360px" src="https://www.youtube.com/embed/w0B5iV-TVH0?si=ovrz85iNL2hFjg92"
      title="YouTube video player" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>
  </div>
  <div class="p-5">

    <h2 class="font-semibold text-xl mb-5">Meios de Pagamentos</h2>
    <!--
    <div class="lg:col-span-12 col-span-12 xl:col-span-6 sm:col-span-6  py-3 px-2">
      <Alert type="danger-light" style="padding:9px 12px;margin-bottom:8px" icon="akar-icons:info">
        <span class="font-semibold">Saiba como configurar meios de pagamento, <a
            href="https://youtu.be/w0B5iV-TVH0?si=qqZyUfX-hX6V2D87" target="_blank"><b>clique
              aqui</b></a>.</span>
      </Alert>
    </div>-->

    <div class="mt-4 lg:mt-0 space-y-6 lg:col-span-9">
      <div>
        <button @click="togglePix" class="w-full bg-slate-100 dark:bg-slate-900 rounded-md p-4">

          <div class="text-left">
            <h4 class="text-xl font-medium text-black flex items-center">
              <!--<span class="block font-normal">Mercado Pago</span>-->
              <img src="@/assets/images/icon/pixicon.png" width="40px" />
              <span class="block ml-2">PIX</span>
            </h4>
            <p class="helper text-black mt-2"> Pedidos com este meio de pagamento <span class="font-bold text-red-600">NÃO
                liberam automaticamente</span>, você terá que liberar manualmente. </p>
          </div>
        </button>
        <div v-if="showPix">
          <form @submit.prevent="submitFormPIX">
            <!-- Pix Content -->
            <div class="form-span-full">

              <div class="grid grid-cols-12">
                <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12">
                  <InputGroup type="text" id="name_user" v-model="form_pix.name_user" label="Seu nome"
                    placeholder="Informe seu nome" />
                </div>
                <div class="lg:col-span-4 col-span-12 xl:col-span-4 sm:col-span-12">
                  <Select label="Tipo de Chave:" id="type_key" class="bg-white dark:bg-slate-500 text-gray-500"
                    v-model="form_pix.type_key" :options="typeKeyOptions" />
                  <small class="text-danger-500">Recomendados utilização de chave aleatória para previnir exibição de
                    dados pessoais.</small>
                </div>
                <div class="lg:col-span-6 col-span-12 xl:col-span-6 sm:col-span-12 ml-3">
                  <InputGroup type="text" id="key" v-model="form_pix.key" label="Chave pix"
                    placeholder="Informe a chave pix" />
                </div>
              </div>
            </div>
            <!-- End of Pix Content -->
            <div class="card-footer mt-5">
              <div class="grid grid-cols-12">
                <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2 dark:text-white">
                  <Switch :label="toggle_pix.label" :activeClass="toggle_pix.value" class="mb-5" badge icon
                    :prevIcon="toggle_pix.prevIcon" :nextIcon="toggle_pix.nextIcon" :active="form_pix.status"
                    v-model="form_pix.status" v-if="isMounted" />
                  <small>Essa função quando habilitada, torna necessário que você faça a <b>baixa manualmente</b> das
                    reservas feitas.</small>
                </div>
                <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 text-right pt-5">
                  <Button id="submitButton" text="Salvar" btnClass="btn-dark " />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div>
        <button @click="toggleMercadoPago" class="w-full bg-slate-100 dark:bg-slate-900 rounded-md p-4">

          <!--<img class="w-10" src="/images/mp.ico" alt="">-->

          <div class="text-left">
            <img src="@/assets/images/icon/mp.png" width="150px" />
            <p class="text-sm text-black font-normal mt-2">Este meio de pagamento libera automaticamente os pedidos e
              cobra uma
            </p>
            <h4 class="text-[0.95rem] font-medium text-black">
              <!--<span class="block font-normal">Mercado Pago</span>-->
              <span class="block">Taxa de 0,99% por transação</span>
            </h4>
          </div>
        </button>
        <div v-if="showMercadoPago" class="card-smooth  lg:px-[15px] xl:px-[15px]">

          <div class="banner-oauth-instructions grid grid-cols-12" v-if="!form_mp.user_connected">
            <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12">
              <h5><span class="medium">Nova forma</span> de integrar com o Mercado
                Pago. <span class="medium">Mais simples, mais rápido!</span></h5>
            </div>
            <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12">
              <h6>Não precisa informar as credenciais. Basta seguir o passo a passo listado abaixo:</h6>
            </div>
            <div class="banner-oauth-instructions__steps">

              <div class="banner-oauth-instructions__step step-1">
                <div class="banner-oauth-instructions__step__box"><span>
                    Vincular
                  </span> <!---->
                  <div class="banner-oauth-instructions__step__number">
                    1
                  </div> <img src="@/assets/images/svg/arrow.svg" class="icon-yampi-arrow"> <!---->
                </div>
                <p class="banner-oauth-instructions__step__text"><span><span class="medium">Clique</span> no botão
                    vincular no final da página.</span></p>
              </div>
              <div class="banner-oauth-instructions__step step-2">
                <div class="banner-oauth-instructions__step__box"><i class="icon icon-yampi-ellipsis"></i>
                  <div class="uk-inline-block box-mercadopago"><i class="icon icon-mercadopago"></i></div>
                  <div class="banner-oauth-instructions__step__number">
                    2
                  </div> <!----> <!---->
                </div>
                <p class="banner-oauth-instructions__step__text"><span><span class="medium">Faça</span>
                    login em sua conta do Mercado Pago.</span></p>
              </div>
              <div class="banner-oauth-instructions__step step-3">
                <div class="banner-oauth-instructions__step__box"><span>
                    Configurado
                  </span> <!---->
                  <div class="banner-oauth-instructions__step__number">
                    3
                  </div> <!----> <svg data-v-886b8a76="" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                    fill="#24A028" viewBox="0 0 32 32" aria-labelledby="icon-success" role="presentation"
                    class="icon-success">
                    <title data-v-886b8a76="" id="icon-success" lang="en">icon-success icon</title>
                    <g data-v-886b8a76="">
                      <circle cx="16" cy="16" r="11" fill="transparent"></circle>
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M16 5C22.0751 5 27 9.92487 27 16C27 22.0751 22.0751 27 16 27C9.92487 27 5 22.0751 5 16C5 9.92487 9.92487 5 16 5ZM25 16C25 11.0294 20.9706 7 16 7C11.0294 7 7 11.0294 7 16C7 20.9706 11.0294 25 16 25C20.9706 25 25 20.9706 25 16Z">
                      </path>
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M22.4084 14.128L15.6402 19.7682C15.2429 20.0993 14.6586 20.0728 14.2929 19.7071L10.5858 16L12 14.5858L15.0614 17.6472L21.128 12.5916L22.4084 14.128Z">
                      </path>
                    </g>
                  </svg>
                </div>
                <p class="banner-oauth-instructions__step__text"><span><span class="medium">Confirme!</span> A afiliação
                    estará configurada.</span></p>
              </div>

            </div>
          </div>

          <Alert v-if="form_mp.api_token" type="success-light" style="padding:9px 12px;margin-top:8px"
            icon="akar-icons:double-check">
            <span class="font-semibold">Vinculado com sucesso!</span>
          </Alert>

          <div class="box-oauth-user-info" v-if="form_mp.user_connected">
            <p class="mb16 f15">
              Esta afiliação está associada a seguinte conta do Mercado Pago:
            </p>
            <p class="box-oauth-user-info-user"><b>USUÁRIO:</b>
              {{ form_mp.user_connected }}
            </p>
            <p class="box-oauth-user-info-email"><b>E-MAIL:</b>
              {{ form_mp.email_connected }}
            </p>
          </div>
          <!-- Mercado Pago Content -->
          <!-- End of Mercado Pago Content -->
          <div class="card-footer mt-5">
            <div class="grid grid-cols-12">

              <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2 dark:text-white">

                <Switch :label="toggle_mp.label" :activeClass="toggle_mp.value" class="mb-5" badge icon
                  :prevIcon="toggle_mp.prevIcon" :nextIcon="toggle_mp.nextIcon" :active="form_mp.status"
                  v-model="form_mp.status" v-if="isMounted && form_mp.api_token" @click="updateStatusPaymentMethod" />
                <small v-if="isMounted && form_mp.api_token">Essa função permite que seus clientes efetuem pagamentos através do Pix Copia e Cola ou QRCode,
                  com <b>baixa automática</b>.</small>
              </div>
              <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 text-right pt-5">
                <Button id="integrateMp" @click="openAuthRedirect"
                  :text="form_mp.api_token ? 'Alterar conta' : 'Vincular'" btnClass="btn-dark " />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal/ModalCustom";
import Button from '@/components/Button';
import Card from '@/components/Card';
import Icon from '@/components/Icon';
import InputGroup from '@/components/InputGroup';
import DropZoneVue from '@/views/forms/file-input/DropZone.vue';
import Textinput from "@/components/Textinput";
import Select from '@/components/Select';
import Switch from '@/components/Switch';
import { useToast } from "vue-toastification";
import Alert from "@/components/Alert";
export default {
  components: {
    Alert,
    Modal,
    Icon,
    Card,
    Button,
    DropZoneVue,
    InputGroup,
    Textinput,
    Select,
    Switch
  },
  data() {
    return {
      userId: '',
      showMercadoPago: false,
      showPix: false,
      pix_method: '',
      mp_method: '',
      form_pix: {
        name_method: 'Transferência PIX',
        api_token: '',
        name_user: '',
        type_key: '',
        key: '',
        status: false
      },
      form_mp: {
        name_method: "Mercado Pago",
        api_token: '',
        user_connected: '',
        email_connected: '',
        name_user: '',
        type_key: '',
        key: '',
        status: false
      },
      typeKeyOptions: [
        { value: "Telefone", label: "Telefone" },
        { value: "Email", label: "Email" },
        { value: "Chave aleatória", label: "Chave aleatória" },
        { value: "CPF/CNPJ", label: "CPF/CNPJ" }
      ],
      toggle_pix: {
        label: 'Clique para Habilitar/Desabilitar',
        value: 'bg-success-500',
        prevIcon: 'heroicons-outline:check',
        nextIcon: 'heroicons-outline:ban',
      },
      toggle_mp: {
        label: 'Clique para Habilitar/Desabilitar',
        value: 'bg-success-500',
        prevIcon: 'heroicons-outline:check',
        nextIcon: 'heroicons-outline:ban',
      },
      filledMercadoPago: false,
      filledPix: false,
      user: {},
      isMounted: false,
      token: ''
    };
  },
  mounted() {
    if (this.$store.state.user.id) {
      this.user = this.$store.state.user;
      this.token = this.$store.state.token;
      this.getPaymentMethodByUserId()
    }

  },
  watch: {
    '$store.state.user'(newValue, oldValue) {
      // Este trecho será executado sempre que o estado 'user' for atualizado
      this.user = newValue;
      this.token = this.$store.state.token
      this.getPaymentMethodByUserId()
    }
  },
  methods: {
    toggleMercadoPago() {
      this.showMercadoPago = !this.showMercadoPago;
    },
    togglePix() {
      this.showPix = !this.showPix;
    },
    updateStatusPaymentMethod() {
      const toast = useToast();

      const url = `${process.env.VUE_APP_API_BASE_URL}/update/payment/method/${this.form_mp.id}`;

      let form = {
        'status': this.form_mp.status ? false : true
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
          if (res.payment_method) {
            toast.success("Atualizado com sucesso!", {
              timeout: 2000,
            });

            //this.$router.push("/app/home");
            if (this.user.campaigns.length == 1) {
              window.location.href = window.location.origin + "/app/home";
            }
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
    openAuthRedirect() {
      window.open('https://auth.mercadopago.com/authorization?client_id=3759480538384100&response_type=code&platform_id=mp&state=' + this.user.uuid + '&redirect_uri=https://app.123rifas.com/load', '_self');
    },
    submitFormPIX() {
      this.form_pix.user_id = this.userId
      this.form_pix.status = true;
      if (!this.filledPix) {
        this.createPaymentMethod(this.form_pix);
      } else {
        this.updatePaymentMethod(this.form_pix);
      }
    },
    createPaymentMethod(form) {
      const toast = useToast();

      const url = `${process.env.VUE_APP_API_BASE_URL}/create/payment/method`;


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
          if (res.payment_method) {
            toast.success("Dados atualizado com sucesso!", {
              timeout: 2000,
            });

            if (this.user.campaigns.length == 1) {
              window.location.href = window.location.origin + "/app/home";
            } else {
              window.location.href = window.location.origin + "/app/settings/methods";
            }
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
    updatePaymentMethod(form) {
      const toast = useToast();

      const url = `${process.env.VUE_APP_API_BASE_URL}/update/payment/method/${form.id}`;

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
          if (res.payment_method) {
            toast.success("Dados atualizado com sucesso!", {
              timeout: 2000,
            });

            //this.$router.push("/app/home");
            if (this.user.campaigns.length == 1) {
              window.location.href = window.location.origin + "/app/home";
            }
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
    getPaymentMethodByUserId() {
      this.userId = this.user.id;

      if (this.user.payment_methods.length) {

        this.user.payment_methods.forEach(payment_method => {

          if (payment_method.name_method == "Mercado Pago") {

            this.form_mp.id = payment_method.id
            this.form_mp.api_token = payment_method.api_token
            this.form_mp.user_connected = payment_method.user_connected
            this.form_mp.email_connected = payment_method.email_connected
            this.form_mp.status = payment_method.status ? true : false;

          } else if (payment_method.name_method == "Transferência PIX") {
            this.filledPix = true;
            this.form_pix.id = payment_method.id
            this.form_pix.name_method = payment_method.name_method
            this.form_pix.api_token = payment_method.api_token
            this.form_pix.name_user = payment_method.name_user
            this.form_pix.type_key = payment_method.type_key
            this.form_pix.key = payment_method.key
            this.form_pix.status = payment_method.status ? true : false;
          }
        });

        this.isMounted = true
      } else {
        this.filledPix = false;
      }
    },
  }
};
</script>

<style scoped>
.banner-oauth-instructions {
  background-color: #f1f5f9;
  border: 1px solid #0f172a;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 24px 40px;
  text-align: center;
}

.banner-oauth-instructions__steps {
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media screen and (max-width: 768px) {
  .banner-oauth-instructions__steps {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    /* Altera para uma coluna quando a largura da tela for menor que 768px */
  }
}

.banner-oauth-instructions__step {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.banner-oauth-instructions__step__text {
  color: #333;
  font-size: 13px;
  margin-top: 12px;
}

.icon-yampi-ellipsis {
  background: url(@/assets/images/svg/ellipsis.svg) no-repeat;
  height: 6px;
  width: 44px;
}

.banner-oauth-instructions__step.step-2 .box-mercadopago {
  background-color: #1be19a;
  line-height: 9px;
  margin-left: 10px;
  padding: 4px 10px;
}

.banner-oauth-instructions__step__number {
  background-color: #0f172a;
  border-radius: 50%;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  height: 24px;
  left: -12px;
  line-height: 24px;
  position: absolute;
  top: -12px;
  width: 24px;
}

.icon-mercadopago {
  background: url(@/assets/images/svg/mercadopago.svg) no-repeat;
  height: 28px;
  width: 40px;
}

.banner-oauth-instructions__step.step-2 .box-mercadopago i {
  background-size: contain;
  height: 19px;
  width: 28px;
}

.banner-oauth-instructions__step__box {
  border: 2px solid #1be19a;
  border-radius: 4px;
  color: #1be19a;
  font-size: 11px;
  font-weight: 500;
  line-height: 12px;
  padding: 8px 16px;
  position: relative;
}

.banner-oauth-instructions__step__box .icon-success circle {
  fill: #f1f5f9;
}

svg {
  display: inline-block;
  vertical-align: baseline;
}

svg:not(:root) {
  overflow: hidden;
}

.banner-oauth-instructions__step__box .icon-success {
  position: absolute;
  right: -20px;
  top: -2px;
}

.medium {
  font-weight: 600;
}

.banner-oauth-instructions h5 {
  font-size: 15px;
  color: #0f172a;
  line-height: 24px;
  margin-bottom: 4px;
}

.banner-oauth-instructions__step__box .icon-yampi-arrow {
  bottom: -6px;
  position: absolute;
  right: -12px;
}

.banner-oauth-instructions h6 {
  color: #666;
  font-size: 13px;
  margin-bottom: 28px;
}

.banner-oauth-instructions__step.step-2 .banner-oauth-instructions__step__box {
  padding: 0 0 0 16px;
}

[class*=uk-inline] {
  display: inline-block;
  position: relative;
  max-width: 100%;
  vertical-align: middle;
  -webkit-backface-visibility: hidden;
}

.icon {
  display: inline-block;
}

.box-oauth-user-info {
  margin-top: 8px;
  background-color: #f4f6f8;
  border-left: 3px solid #d4d4df;
  color: #141316;
  margin-bottom: 15px;
  padding: 24px 27px;
}

.box-oauth-user-info-email,
.box-oauth-user-info-user {
  font-size: 13px;
}

.box-oauth-user-info-user {
  margin-top: 8px;
}

.box-oauth-user-info-email,
.box-oauth-user-info-user {
  font-size: 13px;
}

.box-oauth-user-info-email {
  margin-bottom: 0;
}</style>
