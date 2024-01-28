<template>
    <div class="cursor-pointer text-slate-900 dark:text-white text-2xl">
        <!--<Icon icon="heroicons-outline:search" />-->
        <Button icon="akar-icons:search" text="Ver meus números"
            btnClass="btn bg-warning-500 text-white dark:text-white py-1 " @click="toggleModalSearchTicket" />
    </div>

    <Modal title="Pesquisar Reserva" ref="modalSearchTicket" centered themeClass="bg-slate-900">

        <div class="grid grid-cols-8">
            <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3">
                <InputGroup label="Telefone:" v-model="form.phone" v-mask="['(##) ####-####', '(##) #####-####']"
                    placeholder="00 90000 0000" />
            </div>
            <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3" v-if="searched">
                <CollaboratorInformation :collaborator="collaborator" v-for="(collaborator) in collaborators"
                    :key="collaborator.id" />
            </div>
            <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3" v-else>
                <span>Nenhum dado encontrado</span>
            </div>
        </div>
        <template v-slot:footer>
            <Button text="Pesquisar" btnClass="btn bg-warning-500 text-white " @click="getTicketByPhone" />
        </template>
    </Modal>
</template>
<script>
import Icon from "@/components/Icon";
import Modal from "@/components/Modal/ModalCustom";
import InputGroup from "@/components/InputGroup";
import Button from "@/components/Button";
import CollaboratorInformation from "@/components/CollaboratorInformation";
import { mask } from 'vue-the-mask';
export default {
    directives: { mask },
    props: {
        campaignId: {
            type: Number,
            default: "",
        },
    },
    components: {
        Icon,
        Modal,
        InputGroup,
        Button,
        CollaboratorInformation
    },
    data() {
        return {
            options: {
                prefix: {
                    numericOnly: true,
                    prefix: "+55",
                    blocks: [3, 2, 5, 4],
                    uppercase: true,
                    noImmediatePrefix: true,
                },
            },
            form: {
                phone: null,
            },
            collaborators: [],
            searched: false,
        }
    },
    methods: {
        toggleModalSearchTicket() {
            this.$refs.modalSearchTicket.openModal()
        },
        getTicketByPhone() {

            const url = `${process.env.VUE_APP_API_BASE_URL}/collaborators/campaigns/${this.campaignId}/${this.form.phone.replace(/[\s()-]/g, '')}`;

            fetch(url)
                .then(response => response.json())
                .then(res => {

                    if (res.data.length) {
                        this.collaborators = res.data
                        this.searched = !this.searched
                    } else {
                        const url = `${process.env.VUE_APP_API_BASE_URL}/collaborators/campaigns/${this.campaignId}/${this.form.phone.replace(/[\s]/g, '')}`;

                        fetch(url)
                            .then(response => response.json())
                            .then(res => {

                                if (res.data.length) {
                                    this.collaborators = res.data
                                    this.searched = !this.searched
                                } else {
                                    this.searched = !this.searched
                                }
                            })
                            .catch(error => {
                                console.error(error);
                            });
                        
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        },
    },
};
</script>
<style scoped></style>
  