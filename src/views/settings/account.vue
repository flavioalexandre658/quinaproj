<template>
  <div class="p-5">
    <h2 class="font-semibold text-xl mb-5">Minha Conta</h2>

    <Card noborder>
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-12">
          <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 dropz">
            <Card title="Imagem (80x80 px/PNG)">
              <DropZoneVue @files="getFileDropped" :predefinedUrl="form.image" @replaced="imageReplaced"
                v-if="form.image" />
            </Card>
          </div>
          <div class="lg:col-span-12 col-span-12 xl:col-span-6 sm:col-span-6  py-3 px-2">
            <InputGroup type="text" id="first_name" v-model="form.name" label="Nome:" placeholder="Insira seu nome" />
          </div>
          <div class="lg:col-span-12 col-span-12 xl:col-span-6 sm:col-span-6  py-3 px-2">
            <InputGroup type="text" id="display_name" v-model="form.nickname" label="Nome de Exibição:"
              placeholder="Insira seu nome de exibição" />
          </div>
          <div class="lg:col-span-12 col-span-12 xl:col-span-6 sm:col-span-6  py-3 px-2">
            <InputGroup type="email" id="email" v-model="form.email" label="Email:" placeholder="Insira seu email" />
          </div>
          <div class="lg:col-span-12 col-span-12 xl:col-span-6 sm:col-span-6  py-3 px-2">
            <InputGroup label="Celular:" v-model="form.phone" :options="options.prefix" placeholder="00 90000 0000"
              isMask />
          </div>

          <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 p-3">
            <Button id="submitButton" text="Salvar" btnClass="btn-dark " />
          </div>
        </div>
      </form>
    </Card>
  </div>
  <div class="p-5">
    <h2 class="font-semibold text-xl mb-5">Excluir Conta</h2>

    <Card noborder>
      <form @submit.prevent="deleteAccount">
        <div class="grid grid-cols-12">
          <div class="lg:col-span-12 col-span-12 xl:col-span-6 sm:col-span-6  py-3 px-2">
            <InputGroup type="text" id="delete_account" v-model="form.text_delete_account" label="Confirmar exclusão:"
              placeholder="Autorizo excluir minha conta" />
          </div>

          <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 p-3">
            <Button text="Excluir" btnClass="btn-danger " />
          </div>
        </div>
      </form>
    </Card>
  </div>
</template>
  
<script>
import Modal from "@/components/Modal/ModalCustom";
import Button from '@/components/Button';
import Card from '@/components/Card';
import Icon from '@/components/Icon';
import InputGroup from '@/components/InputGroup';
import DropZoneVue from '@/views/forms/file-input/DropZone.vue';
import Cookie from 'js-cookie';
import { useToast } from "vue-toastification";

export default {
  components: {
    Modal,
    Icon,
    Card,
    Button,
    DropZoneVue,
    InputGroup,
  },
  data() {
    return {
      form: {
        id: '',
        image: '',
        name: '',
        email: '',
        phone: '',
        nickname: '',
        originalFile: '',
        text_delete_account: ''
      },
      imageReplace: false,
      deleteConfirm: '',
      options: {
        prefix: {
          numericOnly: true,
          prefix: "+55",
          blocks: [3, 2, 5, 4],
          uppercase: true,
          noImmediatePrefix: true,
        },
      },
      user: {},
      token: ''
    }
  },
  mounted() {
    if (this.$store.state.user.id) {
      this.user = this.$store.state.user;
      this.token = this.$store.state.token;
      this.getUserInformations()
    }

  },
  watch: {
    '$store.state.user'(newValue, oldValue) {
      // Este trecho será executado sempre que o estado 'user' for atualizado
      this.user = newValue;
      this.token = this.$store.state.token
      this.getUserInformations()
    }
  },
  methods: {
    imageReplaced(index) {
      this.imageReplace = true;
    },
    updateUser(form) {
      const toast = useToast();

      const url = `${process.env.VUE_APP_API_BASE_URL}/update/user/${form.id}`;

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
          if (res.user) {
            toast.success("Dados atualizado com sucesso!", {
              timeout: 2000,
            });

            //this.$router.push("/app/home");
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
    deleteAccount() {
      const toast = useToast();
      let self = this;
      if (this.form.text_delete_account == 'Autorizo excluir minha conta') {

        const url = `${process.env.VUE_APP_API_BASE_URL}/update/user/${this.form.id}`;

        this.form.delete_account = 1

        fetch(url, {
          method: 'PUT',
          headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.token, // Substitua 'seu-token-jwt' pelo seu token real
          'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
          // outros cabeçalhos, se necessário
        },
          body: JSON.stringify(this.form)
        })
          .then(response => response.json())
          .then(res => {
            // Verifique se os dados retornados estão no formato esperado
            if (res.user) {
              window.location.href = window.location.origin + "/";
              Cookie.remove('_access_token');
              Cookie.remove('_user_id')
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
      } else {
        toast.warning("Escreva a confirmação corretamente.", {
          timeout: 2000,
        });
      }
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
      if (!form.image) {

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
            form.phone = form.phone.replace(/\s/g, '');
            this.updateUser(form);
          })
          .catch((error) => {
            console.error(error);
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
              form.phone = form.phone.replace(/\s/g, '');
              this.updateUser(form);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          // Remover todos os espaços em branco
          form.phone = form.phone.replace(/\s/g, '');
          this.updateUser(form);
        }
      }
    },
    getFileDropped(file) {
      if (!file.length)
        return;
      this.form.originalFile = file[0];
    },
    getUserInformations() {


      this.userId = this.user.id;
      this.form.id = this.user.id
      this.form.name = this.user.name
      this.form.email = this.user.email
      this.form.phone = this.user.phone
      this.form.nickname = this.user.nickname

      if (this.user.image) {
        this.form.image = this.user.image
      } else {
        this.form.image = 'https://api.123rifas.com/storage/user-files/profile-user-4.svg'
      }

    }
  }
}
</script>