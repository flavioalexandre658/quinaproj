<template>
  <div class="p-5">
    <h2 class="font-semibold text-xl mb-5">Personalização</h2>

    <Card noborder>
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-12">
          <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 dropz">
            <Card title="Sua logo (300x100 px / PNG)">
              <DropZoneVue @files="getFileDropped" :predefinedUrl="form.image" @replaced="imageReplaced" :width="150"
                :height="300" v-if="form.image" />
            </Card>
          </div>

          <div class="lg:col-span-12 col-span-12 xl:col-span-6 sm:col-span-6  py-3 px-2">
            <InputGroup type="text" id="pixel_meta" v-model="form.pixel_meta" label="Pixel Meta ADS:"
              placeholder="903981263333335" />
          </div>
          <div class="lg:col-span-12 col-span-12 xl:col-span-6 sm:col-span-6  py-3 px-2">
            <InputGroup type="text" id="tag_google" v-model="form.tag_google" label="Tag Google Analytics:"
              placeholder="GT-XXJ7XKD" />
          </div>

          <div class="lg:col-span-12 col-span-12 xl:col-span-6 sm:col-span-6  py-3 px-2">
            <Alert type="danger-light" style="padding:9px 12px;margin-bottom:8px"
              icon="akar-icons:info">
              <span class="font-semibold">Saiba como configurar seu domínio, <a href="https://youtu.be/AaUuVuJukwU" target="_blank"><b>clique
                    aqui</b></a>.</span>
            </Alert>
            <InputGroup type="text" id="custom_domain" v-model="form.custom_domain" label="Domínio Personalizado:"
              placeholder="seudominio.com" />
          </div>

          <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 p-3">
            <Button id="submitButton" text="Salvar" btnClass="btn-dark " />
          </div>
        </div>
      </form>
    </Card>
  </div>
</template>
  
<script>
import Button from '@/components/Button';
import Card from '@/components/Card';
import Icon from '@/components/Icon';
import InputGroup from '@/components/InputGroup';
import DropZoneVue from '@/views/forms/file-input/DropZone.vue';
import { useToast } from "vue-toastification";
import Alert from "@/components/Alert";
export default {
  components: {
    Alert,
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
        pixel_meta: '',
        tag_google: '',
        originalFile: '',
        custom_domain: ''
      },
      imageReplace: false,
      userId: '',
      user: {},
      token: ''
    }
  },
  mounted() {
    if (this.$store.state.user.id) {
      this.user = this.$store.state.user;
      this.token = this.$store.state.token;
      this.getCustomizationInformations()
    }

  },
  watch: {
    '$store.state.user'(newValue, oldValue) {
      // Este trecho será executado sempre que o estado 'user' for atualizado
      this.user = newValue;
      this.token = this.$store.state.token;
      this.getCustomizationInformations()
    }
  },
  methods: {
    imageReplaced(index) {
      this.imageReplace = true;
    },
    createCustomization(form) {
      const toast = useToast();

      const url = `${process.env.VUE_APP_API_BASE_URL}/create/customization`;
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
          if (res.customization) {
            toast.success("Dados Atualizado com sucesso!", {
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
    updateCustomization(form) {
      const toast = useToast();

      const url = `${process.env.VUE_APP_API_BASE_URL}/update/customization/${form.id}`;

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
          if (res.customization) {
            toast.success("Dados atualizado com sucesso!", {
              timeout: 2000,
            });
            this.form.image = window.location.origin + '/img/logo-c.adc7f19e.svg';
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

            if (form.id) {
              this.updateCustomization(form);
            } else {
              this.createCustomization(form)
            }
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
              if (form.id) {
                this.updateCustomization(form);
              } else {
                this.createCustomization(form)
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          if (form.id) {

            if (!form.image.includes('storage')) {
              form.image = ''
            }
            this.updateCustomization(form);
          } else {
            if (!form.image.includes('storage')) {
              form.image = ''
            }
            this.createCustomization(form)
          }
        }
      }
    },
    getFileDropped(file) {
      if (!file.length)
        return;
      this.form.originalFile = file[0];
    },
    getCustomizationInformations() {

      if (this.user.customizations.length) {
        this.form.id = this.user.customizations[0].id
        this.form.pixel_meta = this.user.customizations[0].pixel_meta
        this.form.tag_google = this.user.customizations[0].tag_google
        this.form.custom_domain = this.user.customizations[0].custom_domain
        this.form.user_id = this.user.id

        if (this.user.customizations[0].image) {
          this.form.image = this.user.customizations[0].image
        } else {
          this.form.image = window.location.origin + '/img/logo-c.adc7f19e.svg';

        }
      } else {
        this.form.image = window.location.origin + '/img/logo-c.adc7f19e.svg';
        this.form.user_id = this.user.id
      }
    }
  }
}
</script>