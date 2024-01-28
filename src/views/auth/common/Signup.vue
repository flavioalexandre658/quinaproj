<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput label="Nome completo" type="text" placeholder="Nome completo" name="name" v-model="name" :error="nameError"
      classInput="h-[48px]" />
    <Textinput label="Email" type="email" placeholder="Escreva seu email" name="email" v-model="email" :error="emailError"
      classInput="h-[48px]" />
    <Textinput label="Telefone" type="text" name="telefone" v-model="phone" :error="phoneError"
      v-mask="['(##) ####-####', '(##) #####-####']" placeholder="00 90000 0000" classInput="h-[48px]" />
    <Textinput label="Senha" type="password" placeholder="8+ caracteres, 1 letra maiuscula " name="senha"
      v-model="password" :error="passwordError" hasicon classInput="h-[48px]" />

    <label class="cursor-pointer flex items-start">
      <input type="checkbox" name="checkbox" class="hidden" @change="() => (checkbox = !checkbox)"
        :error="checkboxError" />
      <span class="h-4 w-4 border rounded inline-flex mr-3 relative flex-none top-1 transition-all duration-150" :class="checkbox
        ? 'ring-2 ring-black-500 dark:ring-offset-slate-600 dark:ring-slate-900  dark:bg-slate-900 ring-offset-2 bg-slate-900'
        : 'bg-slate-100 dark:bg-slate-600 border-slate-100 dark:border-slate-600 '
        ">
        <img src="@/assets/images/icon/ck-white.svg" alt="" class="h-[10px] w-[10px] block m-auto" v-if="checkbox" />
      </span>
      <span class="text-slate-500 dark:text-slate-400 text-sm leading-6">Você aceita nossos Termos e Condições e Política
        de Privacidade</span>
    </label>

    <button id="submitButton" type="submit" class="btn btn-dark block w-full text-center">
      Criar conta
    </button>
  </form>
</template>
<script>
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Cookie from 'js-cookie';
import { inject } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useStore } from 'vuex';
import { mask } from 'vue-the-mask';
export default {
  directives: { mask },
  components: {
    Textinput,
  },
  data() {
    return {
      checkbox: false,
      options: {
        prefix: {
          numericOnly: true,
          prefix: "+55",
          blocks: [3, 2, 5, 4],
          uppercase: true,
          noImmediatePrefix: true,
        },
      },
    };
  },
  setup() {
    // Define a validation schema
    const schema = yup.object({
      email: yup.string().required(" Email é obrigatório").email(),
      password: yup.string().required("Senha é obrigatório").min(8),
      name: yup.string().required("Nome completo é obrigatório"),
      phone: yup.string().required("Telefone é obrigatório"),
      checkbox: yup.bool(),
    });
    const swal = inject("$swal");
    const toast = useToast();
    const router = useRouter();
    const store = useStore();

    // Create a form context with the validation schema
    const users = [];
    const { handleSubmit } = useForm({
      validationSchema: schema,
    });
    // No need to define rules for fields

    const { value: email, errorMessage: emailError } = useField("email");
    const { value: name, errorMessage: nameError } = useField("name");
    const { value: phone, errorMessage: phoneError } = useField("phone");
    const { value: checkbox, errorMessage: checkboxError } = useField("checkbox");
    const { value: password, errorMessage: passwordError } =
      useField("password");



    const onSubmit = handleSubmit((values) => {
      const url = `${process.env.VUE_APP_API_BASE_URL}/create/user`;
      values.phone = values.phone.replace(/\s/g, '');
      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        delete_account: false
      };

      if (!values.checkbox) {
        swal.fire({
          title: "Aceite os termos",
          text: "Marque a caixinha indicando que você concorda com nossas políticas.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {

        // Referencie o botão e o spinner no seu código
        const submitButton = document.getElementById("submitButton");

        // Desabilite o botão e mostre o spinner
        submitButton.disabled = true;
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            // Verifique se os dados retornados estão no formato esperado
            if (data.user) {
              fbq('track', 'LeadRegistered');
              dataLayer.push({ 'event': 'register-123rifas' });
              toast.success("Conta criada com sucesso!", {
                timeout: 2000,
              });

              Cookie.set('_access_token', data.access_token);
              Cookie.set('_user_id', data.user.uuid);
              Cookie.set('_keep_logged', true);

              //store.dispatch("getUserByUuid")


              window.location.href = window.location.origin + "/app/home";

              //router.push("/");
            } else {
              if (data.message.includes('password')) {
                swal.fire({
                  title: "Senha muito fraca",
                  text: "A senha deve conter 8 caracteres, com letras maiusculas e caracteres especiais.",
                  icon: "error",
                  confirmButtonText: "Ok",
                });
              } else if (data.message.includes('email')) {
                swal.fire({
                  title: "Email já existe",
                  text: "Por favor, insira outro email",
                  icon: "error",
                  confirmButtonText: "Ok",
                });
              }
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
      }
    });

    return {
      email,
      phone,
      name,
      nameError,
      emailError,
      phoneError,
      checkbox,
      checkboxError,
      password,
      passwordError,
      onSubmit,
    };
  },
};
</script>
<style lang="scss"></style>
