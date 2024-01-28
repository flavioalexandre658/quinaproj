<template>
    <div class="container mx-auto p-5 bg-slate-200">
        <div class="col-span text-center">
            <h1 class="text-3xl mb-4">Campanha Encerrada!</h1>
            <span>Encerrou a campanha de forma errada ? <a class="text-slate-900 font-semibold" href="#"
                    @click="openWhatsApp()">clique aqui</a> para falar com suporte.</span>
        </div>

        <ReserveInformation :collaborator="collaborator" :campaignName="campaignName"
            v-for="(collaborator) in collaborators" :key="collaborator.id" />

    </div>
</template>
  
<script>
import Button from '@/components/Button';
import ReserveInformation from '@/components/ReserveInformation';
import InputGroup from '@/components/InputGroup';
import Cookie from 'js-cookie'
export default {
    components: {
        Button,
        InputGroup,
        ReserveInformation
    },
    data() {
        return {
            isAccordionOpen: false,
            ticketsData: [],
            current: 1,
            perpage: 200,
            pageRange: 2,
            totalData: 0,
            currentPage: 1,
            campaignId: '',
            campaignName: '',
            awardsCampaign: [],
            collaborators: [],
            campaignSlug: ''
        }
    },
    created() {
        // Recupere os parâmetros da rota para obter o nome e o ID da campanha
        this.campaignId = this.$route.params.id ? this.$route.params.id : '';
        this.campaignSlug = this.$route.params.slug ? this.$route.params.slug : '';
        this.getCampaignByUuid()
    },
    methods: {
        clearPhone(telefone) {
        // Use uma expressão regular para remover todos os caracteres não numéricos, exceto o '+'
        return telefone.replace(/[^\d+]/g, '');
        },
        openWhatsApp() {
            let phoneNumber = process.env.VUE_APP_SUPPORT_NUMBER
            const url = `https://wa.me/${this.clearPhone(phoneNumber)}?text=Olá, encerrei a campanha [${this.campaignSlug}] incorretamente no 123Rifas, preciso de ajuda!`; // URL do WhatsApp com o número de telefone
            window.open(url, '_blank'); // Abrir em uma nova aba
        },
        getCampaignByUuid() {

            let url = '';
            if(this.campaignId){
                url = process.env.VUE_APP_API_BASE_URL + '/campaign/uuid/' + this.campaignId;
            }else if(this.campaignSlug){
                url = process.env.VUE_APP_API_BASE_URL + '/campaign/slug/' + this.campaignSlug;
            }


            fetch(url, {
                method: 'GET'
            }).then(response => response.json())
                .then(res => {

                    if (res[0]) {

                        if (res[0].award_campaigns.length) {
                            // Atualize os dados da tabela com os dados recebidos da API
                            this.awardsCampaign = res[0].award_campaigns
                            this.awardsCampaign.sort((a, b) => a.position - b.position);
                            res[0].award_campaigns.forEach(element => {
                                element.collaborator.position = element.position
                                element.collaborator.sorted_number = element.sorted_number
                                element.collaborator.show_infos = (parseInt(res[0].user.uuid) === parseInt(Cookie.get('_user_id')))
                                element.collaborator.award = element.award.name;
                                this.collaborators.push(element.collaborator)
                                this.campaignName = res[0].name
                            });

                        } else {
                            if (res[0].winner_collaborator) {
                                res[0].winner_collaborator.position = 1
                                res[0].winner_collaborator.sorted_number = res[0].sorted_number
                                res[0].winner_collaborator.show_infos = (parseInt(res[0].user.uuid) === parseInt(Cookie.get('_user_id')))
                                this.collaborators.push(res[0].winner_collaborator)
                                this.campaignName = res[0].name
                            }
                        }
                    }
                })
        },
        toggleAccordion() {
            this.isAccordionOpen = !this.isAccordionOpen;
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
  