<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      label="Email"
      type="email"
      placeholder="Escreva seu email"
      name="emil"
      v-model="email"
      :error="emailError"
      classInput="h-[48px]"
    />

    <button id="submitButton" type="submit" class="btn btn-dark block w-full text-center">
      Enviar recuperação
    </button>
  </form>
</template>
<script>
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toastification";
export default {
  components: {
    Textinput,
  },
  data() {
    return {
      checkbox: false,
    };
  },
  setup() {
    // Define a validation schema
    const schema = yup.object({
      email: yup.string().required().email(),
    });
    const toast = useToast();
    const { handleSubmit } = useForm({
      validationSchema: schema,
    });
    // No need to define rules for fields

    const { value: email, errorMessage: emailError } = useField("email");

    const onSubmit = handleSubmit((values) => {
      // console.warn(values);
      const url = `${process.env.VUE_APP_API_BASE_URL}/email/${values.email}/reset/password`;

      // Referencie o botão e o spinner no seu código
      const submitButton = document.getElementById("submitButton");

      // Desabilite o botão e mostre o spinner
      submitButton.disabled = true;
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          // Verifique se os dados retornados estão no formato esperado
          if (data) {
            toast.success("Email de recuperação enviado com sucesso!", {
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
    });

    return {
      email,
      emailError,
      onSubmit,
    };
  },
};
</script>
<style lang="scss"></style>
