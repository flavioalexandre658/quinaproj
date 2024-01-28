<template>
    <div class="p-5">
  
      <div class="mt-4 lg:mt-0 space-y-6 lg:col-span-9">
        <a v-if="!auth" href="/app/settings/methods" style="color:blue;text-decoration: underline;">Voltar para 123Rifas</a>
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
        code: '',
        state:'',
        auth: true
      };
    },
    mounted() {
        this.code = this.$route.query.code;
        this.state = this.$route.query.state;
        this.oAuthToken();
  
    },
    methods: {
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
        oAuthToken() {
        const toast = useToast();
  
        const url = `${process.env.VUE_APP_API_BASE_URL}/mercadopago/auth/token`;
  
        let form = {
            'code': this.code,
            'state': this.state
        }
        let backdrop = this.showBackDrop('Carregando informações do Mercado Pago ...')

        fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
            // outros cabeçalhos, se necessário
          },
          body: JSON.stringify(form)
        })
          .then(response => response.json())
          .then(res => {
            // Verifique se os dados retornados estão no formato esperado
                if(res.payment_method){
                    window.open(window.location.origin + '/app/settings/methods', '_self');
                }else{
                    this.auth = false;
                    backdrop.remove();
                }
          })
          .finally(() => {
          })
          .catch(error => {
            // Trate o erro aqui, exiba uma mensagem de erro ou faça outra ação necessária
            console.error(error);
          });
      },
    }
  };
  </script>
  <style scoped>

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
}</style>