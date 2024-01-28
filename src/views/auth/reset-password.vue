<template>
    <div class="loginwrapper bg-slate-100 flex items-center justify-center">
        <div class="lg-inner-column">
            <div class="w-full h-full flex flex-col items-center justify-center">
                <div class="bg-white dark:bg-slate-800 relative my-[64px] mx-auto p-10 rounded-md max-w-[520px]">
                    <img src="@/assets/images/icon/success.svg" alt="" class="block mx-auto w-[80px]" />
                    <div class="text-center text-slate-800 dark:text-white font-medium text-base mt-4 mb-8">
                        <span class="text-success-500 bg-success-200 p-2 rounded">Insira uma nova senha</span>
                    </div>
                    <form @submit.prevent="onSubmit" class="space-y-4">
                        <Textinput label="Nova senha" type="password" :error="newPasswordError" placeholder="8+ caracteres, 1 letra maiuscula "
                            name="newPassword" v-model="newPassword" hasicon classInput="h-[48px]" />
                        <Textinput label="Repetir senha" type="password" :error="checkPasswordError" placeholder="8+ caracteres, 1 letra maiuscula "
                            name="checkPassword" v-model="checkPassword" hasicon classInput="h-[48px]" />
                        <button id="submitButton" type="submit" class="btn btn-dark block w-full text-center">
                            Salvar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { onBeforeMount } from 'vue';
export default {
    components: {
        Textinput,
    },
    data() {
        return {
            newPassword: '',
            checkPassword: '',
            uuid: ''
        }
    },
    setup() {
        // Define a validation schema
        const schema = yup.object({
            newPassword: yup.string().required("Nova Senha é obrigatório").min(8),
            checkPassword: yup.string().required("Repetir a Senha é obrigatório").min(8),
        });
        const toast = useToast();
        const { handleSubmit } = useForm({
            validationSchema: schema,
        });
        // No need to define rules for fields

        // Recupere os parâmetros da rota para obter o nome e o ID da campanha
        const uuid = ref(null); // Defina uma referência para o uuid
        const route = useRoute(); // Importe o hook useRoute do Vue Router
        onBeforeMount(() => {
            uuid.value = route.params.id; // Atribua o valor do parâmetro id da rota a uuid
        });

        const { value: newPassword, errorMessage: newPasswordError } = useField("newPassword");
        const { value: checkPassword, errorMessage: checkPasswordError } = useField("checkPassword");
        const onSubmit = handleSubmit((values) => {

            if (values.newPassword != values.checkPassword) {
                toast.warning("As senhas devem ser identicas!", {
                    timeout: 2000,
                });
                return false;
            }
            // console.warn(values);
            const url = `${process.env.VUE_APP_API_BASE_URL}/reset/password/${uuid.value}`;

            // Referencie o botão e o spinner no seu código
            const submitButton = document.getElementById("submitButton");
            const data = {
                password: values.newPassword,
            };
            // Desabilite o botão e mostre o spinner
            submitButton.disabled = true;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    //'Authorization': 'Bearer ' + token, // Substitua 'seu-token-jwt' pelo seu token real
                    'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
                    // outros cabeçalhos, se necessário
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    // Verifique se os dados retornados estão no formato esperado
                    if (data.user) {
                        toast.success("Senha alterada com sucesso!", {
                            timeout: 2000,
                        });
                        window.location.href = window.location.origin + "/";
                    }else{
                        toast.error("Senha muito fraca, use letras Maisuculas e Caracteres Especiais.", {
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
            uuid,
            newPassword,
            newPasswordError,
            checkPassword,
            checkPasswordError,
            onSubmit,
        };
    }
};
</script>
<style lang=""></style>
  