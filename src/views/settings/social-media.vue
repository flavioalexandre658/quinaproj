<template>
    <div class="p-5">
        <h2 class="font-semibold text-xl mb-5">Redes Sociais</h2>

        <Card noborder>
            <form @submit.prevent="submitForm">
                <div class="grid grid-cols-12" v-for="item in social_medias" :key="item.name">

                    <div class="lg:col-span-12 col-span-12 xl:col-span-6 sm:col-span-6  py-3 px-2">
                        <InputGroup type="text" :id="'url_' + item.name" v-model="item.url" :label="item.name"
                            :placeholder="'Link ' + item.name" />
                    </div>
                </div>

                <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 p-3">
                    <Button id="submitButton" text="Salvar" btnClass="btn-dark " />
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
import Cookie from 'js-cookie';
import { useToast } from "vue-toastification";

export default {
    components: {
        Icon,
        Card,
        Button,
        DropZoneVue,
        InputGroup
    },
    data() {
        return {
            social_medias: [
                {
                    id: '',
                    name: 'Grupo Whatsapp',
                    url: ''
                },
                {
                    id: '',
                    name: 'Grupo Telegram',
                    url: ''
                },
                {
                    id: '',
                    name: 'Perfil Instagram',
                    url: ''
                },
                {
                    id: '',
                    name: 'Perfil Tiktok',
                    url: ''
                },
                {
                    id: '',
                    name: 'Perfil Facebook',
                    url: ''
                },
                {
                    id: '',
                    name: 'Canal Youtube',
                    url: ''
                },
            ],
            userId: '',
            user: {},
            token: ''

        }
    },
    mounted() {
        if (this.$store.state.user.id) {
            this.user = this.$store.state.user;
            this.token = this.$store.state.token;
            this.getSocialMediaInformations()
        }

    },
    watch: {
        '$store.state.user'(newValue, oldValue) {
            // Este trecho será executado sempre que o estado 'user' for atualizado
            this.user = newValue;
            this.token = this.$store.state.token;
            this.getSocialMediaInformations()
        }
    },
    methods: {
        createSocialMedias(social_media) {
            const url = `${process.env.VUE_APP_API_BASE_URL}/create/social/media`;

            social_media.user_id = this.user.id;

            return fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.token, // Substitua 'seu-token-jwt' pelo seu token real
                    'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
                    // outros cabeçalhos, se necessário
                },
                body: JSON.stringify(social_media)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na requisição');
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error(error);
                    // Lança um erro para que ele seja capturado na chamada da função
                    throw error;
                });
        },

        updateSocialMedia(social_media) {
            const url = `${process.env.VUE_APP_API_BASE_URL}/update/social/media/${social_media.id}`;

            social_media.user_id = this.user.id;

            return fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.token, // Substitua 'seu-token-jwt' pelo seu token real
                    'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
                    // outros cabeçalhos, se necessário
                },
                body: JSON.stringify(social_media)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na requisição');
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error(error);
                    // Lança um erro para que ele seja capturado na chamada da função
                    throw error;
                });
        },

        async submitForm() {
            const toast = useToast();
            const submitButton = document.getElementById("submitButton");

            // Desabilite o botão e mostre o spinner
            submitButton.disabled = true;

            // Declare uma variável para rastrear o número de requisições bem-sucedidas
            let successfulRequests = 0;

            // Declare uma variável para rastrear o número total de requisições
            const totalRequests = this.social_medias.length;

            // Declare uma variável para rastrear erros
            let hasError = false;

            // Desabilite o botão antes de fazer as requisições
            submitButton.disabled = true;

            // Crie um array para armazenar todas as promessas de requisição
            const requestPromises = this.social_medias.map(async (social_media) => {
                try {
                    let res = {};
                    if (social_media.id) {
                        res = await this.updateSocialMedia(social_media);
                    } else {
                        res = await this.createSocialMedias(social_media);
                    }

                    if (res.socialMedia) {
                        // Incrementa o contador de requisições bem-sucedidas
                        successfulRequests++;
                    } else {
                        // Define a flag de erro para verdadeira se houver algum erro
                        hasError = true;
                    }
                } catch (error) {
                    // Aqui você pode tratar erros específicos se necessário
                    // Por exemplo, mostrar mensagens de erro específicas para cada requisição
                    console.error(error);
                }
            });

            try {
                // Use Promise.all para aguardar todas as promessas serem resolvidas
                await Promise.all(requestPromises);

                // Reabilite o botão quando todas as requisições forem concluídas
                submitButton.disabled = false;

                // Exiba uma única mensagem com base no resultado das requisições
                if (successfulRequests === totalRequests && !hasError) {
                    toast.success("Dados atualizados com sucesso!", {
                        timeout: 2000,
                    });
                } else {
                    toast.error("Houve um erro ao atualizar, revise os campos!", {
                        timeout: 2000,
                    });
                }
            } catch (error) {
                // Trate erros globais aqui, se necessário
                console.error(error);
            }
        },

        getSocialMediaInformations() {
            if (this.user.social_medias.length) {
                this.user = this.user
                this.social_medias = this.user.social_medias
            }
        }
    }
}
</script>