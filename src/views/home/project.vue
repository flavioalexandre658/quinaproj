<template>
  <div>
    <!--<Breadcrumb />-->

    <div>


      <!--<div class="rounded-md bg-danger-500 mb-2 p-4 max-w-[600px] notifications">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <circle style="fill:#D22215;" cx="256" cy="256" r="256"></circle>
                <path style="fill:#A81411;"
                  d="M384.857,170.339c-7.677,2.343-15.682,4.356-23.699,6.361 c-56.889,12.067-132.741-20.687-165.495,32.754c-27.317,42.494-35.942,95.668-67.017,133.663L294.629,509.1 c110.47-16.72,197.773-104.036,214.476-214.511L384.857,170.339z">
                </path>
                <path style="fill:#FFFFFF;"
                  d="M341.649,152.333H170.351c-33.608,0-60.852,27.245-60.852,60.852v85.632 c0,33.608,27.245,60.852,60.852,60.852h171.298c33.608,0,60.852-27.245,60.852-60.852v-85.632 C402.501,179.578,375.256,152.333,341.649,152.333L341.649,152.333z M300.494,260.167l-80.12,38.212 c-2.136,1.019-4.603-0.536-4.603-2.901v-78.814c0-2.4,2.532-3.955,4.67-2.87l80.12,40.601 C302.947,255.602,302.904,259.019,300.494,260.167L300.494,260.167z">
                </path>
                <path style="fill:#D1D1D1;"
                  d="M341.649,152.333h-87.373v78.605l46.287,23.455c2.384,1.208,2.341,4.624-0.069,5.773l-46.218,22.044 v77.459h87.373c33.608,0,60.852-27.245,60.852-60.852v-85.632C402.501,179.578,375.256,152.333,341.649,152.333z">
                </path>
              </g>
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="font-semibold text-sm text-danger-200">Esta com alguma dúvida ?</h3>
            <div class="mt-1 text-sm font-medium text-danger-200">
              <p>Assista nossos tutoriais no youtube! <a
                  href="https://www.youtube.com/playlist?list=PLVAzIU2-inJq7icoc7frFipd7EFTJIind"><b><u>Ver
                      tutoriais</u></b></a></p>
            </div>
          </div>
        </div>
      </div>-->

      <div class="rounded-md bg-primary-500 mb-2 p-4 max-w-[600px] notifications" v-if="campaignStatus || campaign['released_until_fee']" @click="openLinksNotifications('https://www.youtube.com/watch?v=4h4aBTs34IY')">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <circle style="fill:#D22215;" cx="256" cy="256" r="256"></circle>
                <path style="fill:#A81411;"
                  d="M384.857,170.339c-7.677,2.343-15.682,4.356-23.699,6.361 c-56.889,12.067-132.741-20.687-165.495,32.754c-27.317,42.494-35.942,95.668-67.017,133.663L294.629,509.1 c110.47-16.72,197.773-104.036,214.476-214.511L384.857,170.339z">
                </path>
                <path style="fill:#FFFFFF;"
                  d="M341.649,152.333H170.351c-33.608,0-60.852,27.245-60.852,60.852v85.632 c0,33.608,27.245,60.852,60.852,60.852h171.298c33.608,0,60.852-27.245,60.852-60.852v-85.632 C402.501,179.578,375.256,152.333,341.649,152.333L341.649,152.333z M300.494,260.167l-80.12,38.212 c-2.136,1.019-4.603-0.536-4.603-2.901v-78.814c0-2.4,2.532-3.955,4.67-2.87l80.12,40.601 C302.947,255.602,302.904,259.019,300.494,260.167L300.494,260.167z">
                </path>
                <path style="fill:#D1D1D1;"
                  d="M341.649,152.333h-87.373v78.605l46.287,23.455c2.384,1.208,2.341,4.624-0.069,5.773l-46.218,22.044 v77.459h87.373c33.608,0,60.852-27.245,60.852-60.852v-85.632C402.501,179.578,375.256,152.333,341.649,152.333z">
                </path>
              </g>
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="font-semibold text-sm text-white">Aprenda a fazer Baixa Manual!</h3>
            <div class="mt-1 text-sm font-medium text-white">
              <p>Assista nosso tutorial e aprenda a gerenciar pedidos. <b>clique nesta mensagem</b></p>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-md bg-yellow-50 mb-2 p-4 max-w-[600px] notifications" v-if="!userPaymentMethods.length" @click="openLinksNotifications('/app/settings/methods', false)">
        <div class="flex">
          <div class="flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
              aria-hidden="true" class="h-5 w-5 text-yellow-400">
              <path fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"></path>
            </svg></div>
          <div class="ml-3">
            <h3 class="font-semibold text-sm text-yellow-800">Atenção!</h3>
            <div class="mt-1 text-sm font-medium text-yellow-700">
              <p>Você ainda não cadastrou nenhum método de pagamento, <a href="/app/settings/methods"><b>clique
                    aqui</b></a> para cadastrar!</p>
            </div>
          </div>
        </div>
      </div>
      <div class="rounded-md bg-success-500 mb-2 p-4 max-w-[600px] notifications"
        v-if="userPaymentMethods.length && !campaignStatus && !campaign['released_until_fee']" @click="openModalPublicar">
        <div class="flex">
          <div class="flex-shrink-0"><svg fill="#ffffff" height="40px" width="40px" version="1.1" id="Layer_1"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"
              xml:space="preserve" stroke="#ffffff">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <g>
                    <path
                      d="M495.445,93.355c-5-5.001-13.099-5.001-18.099,0L256,314.701L137.045,195.755c-5.001-5.001-13.099-5.001-18.099,0 c-5,5.001-5,13.099,0,18.099l128,128c2.5,2.5,5.777,3.746,9.054,3.746s6.554-1.254,9.045-3.746l230.4-230.4 C500.446,106.453,500.446,98.355,495.445,93.355z">
                    </path>
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M490.214,152.892l-19.686,19.678C480.64,198.485,486.4,226.551,486.4,256c0,127.044-103.356,230.4-230.4,230.4 S25.6,383.044,25.6,256S128.956,25.6,256,25.6c69.239,0,131.285,30.839,173.56,79.343l18.176-18.176 C400.828,33.673,332.425,0,256,0C114.62,0,0,114.62,0,256s114.62,256,256,256s256-114.62,256-256 C512,219.29,504.132,184.457,490.214,152.892z">
                    </path>
                  </g>
                </g>
              </g>
            </svg></div>
          <div class="ml-3">
            <h3 class="font-semibold text-sm text-white">Tudo certo!</h3>
            <div class="mt-1 text-sm font-medium text-white">
              <p>Agora só falta você publicar sua campanha, clique no botão <b>Publicar</b>.</p>
            </div>
          </div>
        </div>
      </div>

      <Alert v-if="!userActive && userToken" class="notifications" type="warning-light" style="padding:9px 12px;margin-bottom:8px;max-width:600px" @click="sendMailActiveAccount"
        icon="akar-icons:block">
        <span class="font-semibold">Você precisa ativar sua conta, <a href="#"><b>clique
              aqui</b></a>.</span>
      </Alert>
      
      <div class="grid grid-cols-12">
        <div class="lg:col-span-12 col-span-12 xl:col-span-5 sm:col-span-12">
          <div class="grid grid-cols-2">
            <div class="lg:col-span-12 col-span-12">
              <h4 class="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
                Campanhas
              </h4>
            </div>
            <div class="lg:col-span-12 col-span-12 mb-2">
              <div class="grid grid-cols-12">
                <div class="lg:col-span-8 xl:col-span-8 sm:col-span-8 col-span-12">
                  <VueSelect>
                    <vSelect v-model="selected2" placeholder="Seleciona uma campanha" label="name"
                      class="bg-white dark:bg-slate-800 text-gray-500 mt-2" :options="selectCampaigns"
                      @update:modelValue="loadData" />
                  </VueSelect>
                </div>
                <div class="lg:col-span-4 xl:col-span-4 sm:col-span-8 col-span-12">
                  <div class="mt-4 lg:ml-2">
                    <Switch v-if="isMounted" :key="reRender" :activeClass="toggle_visible.value" :active="campaignVisible"
                      v-model="campaignVisible" badge icon :prevIcon="toggle_visible.prevIcon"
                      :nextIcon="toggle_visible.nextIcon" @click="toggleVisibleCampaign" />
                  </div>
                </div>
                <div class="lg:col-span-12 xl:col-span-12 sm:col-span-12 col-span-12 lg:ml-2">

                  <Alert v-if="campaignStatus && selectCampaigns.length && !campaign['released_until_fee']"
                    type="success-light" style="padding:9px 12px;margin-top:8px" icon="akar-icons:double-check">
                    <span class="font-semibold">Campanha publicada.</span>
                  </Alert>

                  <Alert v-if="!campaignStatus && selectCampaigns.length && !campaign['released_until_fee']"
                    type="warning-light" style="padding:9px 12px;margin-top:8px" icon="akar-icons:block">
                    <span class="font-semibold">Campanha não publicada.</span>
                  </Alert>

                  <Alert v-if="!campaignStatus && selectCampaigns.length && campaign['released_until_fee']"
                    type="primary-light" style="padding:9px 12px;margin-top:8px" icon="akar-icons:block">
                    <span class="font-semibold">Campanha publicada até atingir valor necessário.</span>
                  </Alert>

                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="lg:col-span-12 col-span-12 xl:col-span-7 sm:col-span-12 text-end p-3">
          <Button v-if="selectCampaigns.length" text="Gerar Link" icon="heroicons:link"
            btnClass="btn-outline-success mb-2 ml-2" @click="openModalLinkCampaign" />
          <Button v-if="campaignStatus && !campaignClosed" icon="heroicons:trophy" text="Definir Vencedor"
            btnClass="btn-primary mb-2 ml-2" @click="openModalWinner" />
          <Button v-if="campaignStatus && campaignClosed && selectCampaigns.length" icon="heroicons-outline:ban"
            text="Campanha Encerrada" btnClass="btn-danger mb-2 ml-2" @click="handleViewClosedCampaign" />
          <Button v-if="!campaignStatus && !campaignClosed" icon="heroicons-outline:banknotes" text="Publicar"
            id="publicar" btnClass="btn-warning mb-2 ml-2 pulsating-button" @click="openModalPublicar" />
          <Button v-if="!campaignClosed && selectCampaigns.length" icon="heroicons-outline:eye" text="Visualizar"
            btnClass="btn-info mb-2 ml-2" @click="handleViewCampaign" />
          <Button icon="heroicons-outline:plus" text="Nova campanha" link="/app/create/campaign/"
            btnClass="btn-dark mb-2 ml-2" />
          <Button icon="heroicons-outline:pencil" v-if="!campaignClosed && selectCampaigns.length" text="Editar"
            btnClass="btn-dark mb-2 ml-2" :link="'/app/update/campaign/' + campaignUuid" />
        </div>

        <Modal title="Ganhadores da Campanha" ref="modalDefineWinner" centered themeClass="bg-slate-900">
          <div v-if="awardsCampaign.length">
            <div v-for="(item, index) in awardsCampaign" :key="item.id">
              <SearchTerm :searchTerm="item.searchTerm" :campaignName="campaignName" :campaignId="campaignId"
                :position="item.position" @searchedCollaborator="searchedCollaborator" @removePosition="removePosition"
                class="mt-5" v-if="index == 0 || collaborators[index - 1]" />
            </div>
            <div class="lg:col-span-9 col-span-12 xl:col-span-9 sm:col-span-9 text-center p-3"
              v-if="collaborators.length === awardsCampaign.length">
              <Button icon="heroicons:rocket-launch" text="Encerrar Campanha" btnClass="btn-dark mt-2"
                @click="closeCampaign" />
            </div>
          </div>
          <div v-else>
            <SearchTerm :searchTerm="searchTerm" :campaignName="campaignName" :campaignId="campaignId" :position="1"
              @searchedCollaborator="searchedCollaborator" @removePosition="removePosition" class="mt-5" />
            <div class="lg:col-span-9 col-span-12 xl:col-span-9 sm:col-span-9 text-center p-3"
              v-if="collaborators.length === 1">
              <Button icon="heroicons:rocket-launch" text="Encerrar Campanha" btnClass="btn-dark mt-2"
                @click="closeCampaign" />
            </div>
          </div>
        </Modal>

        <Modal title="Gerar Link da Campanha" ref="modalLinkCampaign" centered themeClass="bg-slate-900">

          <span>Escolha o domínio</span>
          <div class="grid grid-cols-12">
            <div class="lg:col-span-8 col-span-8 xl:col-span-8 sm:col-span-8 text-center p-3">

              <VueSelect>
                <vSelect v-model="domainSelected" placeholder="Alterar domínio do link:" label="title"
                  class="bg-white dark:bg-slate-800 text-gray-500" :options="selectDomains" />
              </VueSelect>
            </div>
            <div class="lg:col-span-4 col-span-4 xl:col-span-4 sm:col-span-4 text-center p-3 m-auto">
              <button v-if="selectCampaigns.length" class="bg-success-500 rounded-full text-white py-1 px-4"
                @click="copyLink">Copiar</button>
            </div>
          </div>
        </Modal>


        <Modal title="Meios de pagamento" ref="modalPublicar" centered themeClass="bg-slate-900">

          <div class="mb-2">
            <Alert :type="this.$store.state.isDark ? 'info-light' : 'primary-light'"
              style="padding:9px 12px;margin-bottom:8px" icon="akar-icons:check">
              <span class="">Após o pagamento da taxa de publicação, <b>toda a arrecadação da ação será 100% sua</b>.
                <u>Não haverá cobranças adicionais!</u></span>
            </Alert>
          </div>
          <div class="p-5">
            <h2 class="text-[16px]">Escolha abaixo como deseja pagar</h2>
            <span class="text-[13px] mt-3">Sua ação será liberada <u>imediatamente</u></span>
            <p class="text-[13px] mt-3 mb-3">Taxa de publicação: {{ this.campaignFee }}</p>
            
            <div class="panel my-5 w-[100%] publicar-modal" v-for="item in payments" :key="item.id"
              @click="item.id == 1 ? generatePaymentPix() : generatePaymentCheckoutPro()">
              <div :class="[
                'price-table',
                'rounded-[6px]',
                'shadow-base',
                'p-2',
                'dark:text-white',
                'text-slate-900',
                'relative',
                'overflow-hidden',
                'z-[0]',
                hoverClass
              ]" @mouseover="setHover(item.id)" @mouseout="setHover(0)">
                <header class="py-3">
                  <div class="flex items-center">
                    <svg v-if="item.id == 1" style="width:25px;height:25px;display:inline" fill="#14b3a8"
                      viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M11.917 11.71a2.046 2.046 0 0 1-1.454-.602l-2.1-2.1a.4.4 0 0 0-.551 0l-2.108 2.108a2.044 2.044 0 0 1-1.454.602h-.414l2.66 2.66c.83.83 2.177.83 3.007 0l2.667-2.668h-.253zM4.25 4.282c.55 0 1.066.214 1.454.602l2.108 2.108a.39.39 0 0 0 .552 0l2.1-2.1a2.044 2.044 0 0 1 1.453-.602h.253L9.503 1.623a2.127 2.127 0 0 0-3.007 0l-2.66 2.66h.414z">
                        </path>
                        <path
                          d="m14.377 6.496-1.612-1.612a.307.307 0 0 1-.114.023h-.733c-.379 0-.75.154-1.017.422l-2.1 2.1a1.005 1.005 0 0 1-1.425 0L5.268 5.32a1.448 1.448 0 0 0-1.018-.422h-.9a.306.306 0 0 1-.109-.021L1.623 6.496c-.83.83-.83 2.177 0 3.008l1.618 1.618a.305.305 0 0 1 .108-.022h.901c.38 0 .75-.153 1.018-.421L7.375 8.57a1.034 1.034 0 0 1 1.426 0l2.1 2.1c.267.268.638.421 1.017.421h.733c.04 0 .079.01.114.024l1.612-1.612c.83-.83.83-2.178 0-3.008z">
                        </path>
                      </g>
                    </svg>
                    <svg v-if="item.id == 2" style="width:25px;height:25px;display:inline" viewBox="0 0 128 128"
                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                      role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet" fill="#000000">
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M116.34 101.95H11.67c-4.2 0-7.63-3.43-7.63-7.63V33.68c0-4.2 3.43-7.63 7.63-7.63h104.67c4.2 0 7.63 3.43 7.63 7.63v60.64c0 4.2-3.43 7.63-7.63 7.63z"
                          fill="#ff8a05"></path>
                        <path fill="#424242" d="M4.03 38.88h119.95v16.07H4.03z"></path>
                        <path
                          d="M114.2 74.14H13.87c-.98 0-1.79-.8-1.79-1.79v-8.41c0-.98.8-1.79 1.79-1.79H114.2c.98 0 1.79.8 1.79 1.79v8.41c-.01.98-.81 1.79-1.79 1.79z"
                          fill="#ffffff"></path>
                        <path
                          d="M23.98 70.49c.56-1.08.71-2.34 1.21-3.45c.5-1.11 1.59-2.14 2.79-1.95c1.11.18 1.8 1.29 2.21 2.33c.57 1.45.88 3 .92 4.56c.01.32-.01.67-.22.92c-.37.42-1.13.21-1.42-.27c-.29-.48-.22-1.09-.09-1.64c.62-2.55 2.62-4.72 5.11-5.54c.26-.09.53-.16.8-.11c.58.11.9.71 1.16 1.23c.61 1.19 1.35 2.32 2.2 3.35c.34.42.73.83 1.25.99c1.71.5 2.7-2.02 4.35-2.69c1.98-.8 3.91 1.29 6.01 1.68c3.07.57 4.7-1.82 7.39-2.43c.36-.08.75-.13 1.11-.03c.66.19 1.07.82 1.46 1.39c.91 1.34 2.21 2.66 3.83 2.67c1.03.01 1.98-.52 2.92-.97c3.33-1.59 7.26-2.25 10.74-1.03"
                          fill="none" stroke="#424242" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                          stroke-miterlimit="10"></path>
                      </g>
                    </svg>
                    <span class="ml-1 text-[16px] leading-10 font-medium">{{ item.name }}</span>
                    <!-- Botão totalmente à direita -->
                    <button class="px-5 py-1 rounded-md ml-auto"
                      :class="isHovered == item.id ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'">
                      publicar
                    </button>
                  </div>
                </header>
                <span v-if="item.id == 2" class="text-[12px]">parcele em até <span class="text-[14px]"><b>12x de {{ 'R$' + ((extractNumberFromString(campaignFee)/12) + (extractNumberFromString(campaignFee)/12)*0.1728).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</b></span> no cartão</span>
              </div>
            </div>


            <div class="text-center rounded-[6px] shadow-base"
              v-if="!campaign['released_until_fee'] && campaign['amount_tickets'] < 1000000 && campaign['unavailable_tickets'] == 0" >
              <Alert type='secondary-light' class="mt-5 mb-3 text-left">
                <h2 class="text-[16px]"><b>🥳Novidade!</b> Pague a taxa de publicação somente após atingir o valor
                  necessário.</h2>
              </Alert>
              <span class="text-[13px] p-4">Sua ação será publicada e você só pagará após arrecadar o total de <b>{{
                this.campaignFee }}</b></span>
                <br/>

              <button class="mt-5 mb-2 px-5 py-1 rounded-md bg-warning-500 text-white" @click="openModalTermsPublish">
                Publicar Grátis
              </button>
            </div>

          </div>

        </Modal>

        <Modal title="Termos para publicação sem pagamento" ref="modalTermsPublish" centered themeClass="bg-slate-900">


          <div class="grid grid-cols-12 text-left">
            <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 p-3">
              <h2 class="text-[16px]">Leia o termo abaixo e marque se você concorda:</h2>
            </div>
            <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 p-3">
              <small>Ao publicar esta campanha, você concorda e esta ciente que assim que o valor igual ou superior a taxa
                de publicação for atingido, a campanha será pausada até que o pagamento da taxa de publicação seja
                efetuado.
                Você também concorda com todos os <a target="_blank" href="https://123rifas.com/termos-de-uso/"><b>Termos
                    de Uso</b></a> e a nossa <a target="_blank"
                  href="https://123rifas.com/politica-de-privacidade/"><b>Política de
                    Privacidade</b></a>.</small>
            </div>
            <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 p-3">
              <Switch :label="toggle_terms.label" :activeClass="toggle_terms.value" v-model="allow_terms_publish" badge
                icon :prevIcon="toggle_terms.prevIcon" :nextIcon="toggle_terms.nextIcon" />
            </div>
            <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 text-right p-3 m-auto">
              <button class="px-5 py-1 rounded-md bg-slate-900 text-white" v-if="allow_terms_publish"
                @click="releasedUntilFeeChange">
                publicar
              </button>
            </div>
          </div>
        </Modal>
      </div>


    </div>
    <div class="card-auto space-y-5">
      <div class="grid grid-cols-12 gap-5">
        <div class="lg:col-span-12 col-span-12 space-y-5">
          <Card>
            <div class="grid grid-cols-12 gap-5">
              <div class="xl:col-span-12 col-span-12">
                <!-- statitces start -->
                <div
                  class="grid md:grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 grid-cols-1 gap-2">
                  <div class="flex space-x-6 h-full items-center">
                    <div class="flex-none">
                      <div class="h-20 w-[120px] rounded-full">
                        <img src="@/assets/images/money-pig.png" alt="" style="width: 100%;"
                          class="mx-auto relative -mt-[30px]" />
                      </div>
                    </div>
                    <div class="flex-1">
                      <h4 class="text-xl font-medium mb-2">
                        <span class="block font-light">Olá,</span>
                        <span class="block">{{ userName }}</span>
                      </h4>
                      <p class="text-sm dark:text-slate-300">Confira o andamento da sua campanha!</p>
                    </div>
                  </div>
                  <div v-for="(item, i) in statistics" :key="i" :class="item.bg"
                    class="rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-50 text-center">
                    <div
                      class="mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-2xl mb-4"
                      :class="item.text">
                      <Icon :icon="item.icon" />
                    </div>
                    <span class="block text-sm text-slate-600 font-medium dark:text-white mb-1">{{ item.title }}</span>
                    <span class="block mb- text-2xl text-slate-900 dark:text-white font-medium">{{ item.count }}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card v-if="statistics[2].count">
            <div class="grid grid-cols-12 gap-5">
              <div class="xl:col-span-12 col-span-12">
                <!-- statitces start -->
                <div
                  class="grid md:grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 grid-cols-1 gap-2">
                  <!-- pie chart start -->
                  <div class="bg-white-500 rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-50 text-center">
                    <div class="mx-auto flex flex-col items-center justify-center rounded-full text-2xl">
                      <span
                        class="flex flex-col items-start justify-left dark:text-slate-400 text-sm text-slate-600">Progresso</span>
                      <apexchart :key="reRender" type="donut" height="220" :options="donutTwo.chartOptions"
                        :series="donutTwo.series" />
                    </div>
                  </div>
                  <div v-for="(item, i) in statistics2" :key="i" :class="item.bg"
                    class="rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-50 text-center" style="margin: auto 0px;">
                    <div
                      class="mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-2xl"
                      :class="item.text">
                      <Icon :icon="item.icon" />
                    </div>
                    <span class="block text-sm text-slate-600 font-medium dark:text-white mb-1">{{ item.title }}</span>
                    <span class="block mb- text-2xl text-slate-900 dark:text-white font-medium">{{ item.count }}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card title="Colaboradores por dia" v-if="basicArea.series[0].data && basicArea.series[0].data.length > 0">
            <template #header>
              <DropEvent @filterEventDate="filterPreviuosDate" />
            </template>
            <apexchart type="area" height="310" :key="reRender" :options="this.$store.state.isDark
              ? basicAreaDark.chartOptions
              : basicArea.chartOptions
              " :series="basicArea.series" />
          </Card>
        </div>

      </div>
    </div>


  </div>
</template>
<script>
import SearchTerm from "@/components/SearchTerm";
import VueSelect from "@/components/Select/VueSelect";
import Alert from "@/components/Alert";
import vSelect from "vue-select";
import Card from '@/components/Card';
import Checkbox from '@/components/Checkbox';
import Icon from '@/components/Icon';
import Button from '@/components/Button';
import Modal from "@/components/Modal/ModalCustom";
import { useToast } from "vue-toastification";
import {
  basicArea,
  basicAreaDark,
  donutTwo,
  donutTwoDark
} from './Analytics-Component/data';
import DropEvent from './Analytics-Component/DropEvent';
import SelectMonth from './Analytics-Component/SelectMonth';
import Teamtable from './Analytics-Component/Teamtable';
import Switch from '@/components/Switch';
// Importe o componente apexchart
import VueApexCharts from "vue3-apexcharts";
export default {
  components: {
    apexchart: VueApexCharts,
    Switch,
    SearchTerm,
    Modal,
    Alert,
    Card,
    Icon,
    Checkbox,
    Teamtable,
    DropEvent,
    SelectMonth,
    VueSelect,
    vSelect,
    Button,
  },
  data() {
    return {
      payments: [
        {
          id: 1,
          name: 'PIX'
        },
        {
          id: 2,
          name: 'Cartão de Crédito'
        },
      ],
      allow_terms_publish: false,
      toggle_terms: {
        label: 'Aceito todos os termos',
        value: 'bg-success-500',
        prevIcon: 'heroicons-outline:check',
        nextIcon: 'heroicons-outline:ban',
      },
      isHovered: 0,
      hoverClass: '',
      isMounted: false,
      user: {},
      campaignUuid: '',
      campaignId: '',
      campaignName: '',
      campaignFee: '',
      userId: '',
      userName: '',
      userActive: true,
      userPaymentMethods: [0],
      userToken: '',
      userEmail: '',
      payment: [],
      campaignStatus: true,
      campaignClosed: true,
      basicArea,
      basicAreaDark,
      donutTwo,
      donutTwoDark,
      toggle_visible: {
        label: 'Visível',
        value: 'bg-success-500',
        prevIcon: 'akar-icons:eye-open',
        nextIcon: 'akar-icons:eye-closed',
      },
      selected2: [],
      statistics: [
        {
          title: 'Bilhetes disponíveis',
          count: '--',
          bg: 'bg-success-400',
          text: 'text-success-400',
          percent: '--',
          icon: 'heroicons-outline:check-badge',
        },
        {
          title: 'Bilhetes pendentes ',
          count: '--',
          bg: 'bg-warning-500',
          text: 'text-warning-500',
          percent: '--',
          icon: 'heroicons-outline:clock',
        },
        {
          title: 'Bilhetes pagos',
          count: '--',
          bg: 'bg-primary-500',
          text: 'text-primary-500',
          percent: '--',
          icon: 'heroicons-outline:banknotes',
        }
      ],
      statistics2: [
        {
          title: 'Pedidos Pagos ',
          count: '--',
          bg: 'bg-warning-500',
          text: 'text-warning-500',
          percent: '--',
          icon: 'heroicons-outline:credit-card',
        },
        {
          title: 'Faturamento',
          count: '--',
          bg: 'bg-primary-500',
          text: 'text-primary-500',
          percent: '--',
          icon: 'heroicons-outline:chart-bar',
        },
        {
          title: 'Ticket Médio',
          count: '--',
          bg: 'bg-success-400',
          text: 'text-success-400',
          percent: '--',
          icon: 'heroicons-outline:currency-dollar',
        },
      ],
      selectCampaigns: [],
      domainSelected: {
        title: 'app.123rifas.com',
        id: 0,
        value: 'app.123rifas.com',
      },
      selectDomains: [],
      collaborators: [],
      collaboratorsCampaign: [],
      awardsCampaign: [],
      campaignsUser: [],
      customizations: {},
      updateKey: 0,
      reRender: 0,
      linkCampaign: '',
      campaignSlug: '',
      campaignVisible: true,
      campaign: []
    };
  },
  watch: {
    updateKey: function () {
      // Atualize a chave para forçar o componente a re-renderizar
      this.reRender++;
    },
    '$store.state.user'(newValue, oldValue) {
      // Este trecho será executado sempre que o estado 'user' for atualizado
      this.user = newValue;
      this.token = this.$store.state.token;
      this.getUserById()
    }
  },
  mounted() {
    if (this.$store.state.user.id) {
      this.user = this.$store.state.user;
      this.token = this.$store.state.token;
      this.getUserById()
    }
  },
  methods: {
    setHover(value) {
      this.isHovered = value;
      this.hoverClass = value == 1 ? 'hover:bg-info-500 hover:text-white' : 'hover:bg-success-500 hover:text-white';
    },
    releasedUntilFeeChange() {

      let form = {
        id: this.campaignId,
        released_until_fee: true
      }

      const toast = useToast();

      if (this.allow_terms_publish) {

        const url = `${process.env.VUE_APP_API_BASE_URL}/update/campaign/${form.id}`;

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
            if (res.campaign) {
              this.closeModalTermsPublish()
              this.closeModalPublicar()
              toast.success("Sua campanha foi publicada.", {
                timeout: 2000,
              });
              setTimeout(() => {
                window.location.href = window.location.origin + '/app/home'
              }, 1500);
            }
          })
      } else {
        this.closeModalTermsPublish()
        toast.error("Aceite os termos para continuar.", {
          timeout: 2000,
        });
      }
    },
    toggleVisibleCampaign() {
      let form = {
        id: this.campaignId,
        visible: !this.campaignVisible
      }
      const toast = useToast();

      const url = `${process.env.VUE_APP_API_BASE_URL}/update/campaign/${form.id}`;

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
          if (res.campaign) {
            if (this.campaignVisible) {
              toast.success("Sua campanha esta visível.", {
                timeout: 2000,
              });
            } else {
              toast.warning("Sua campanha esta oculta.", {
                timeout: 2000,
              });
            }

          }
        })
    },


    copyLink() {
      const link = `${'https://' + this.domainSelected.value}/acao/${this.campaignSlug}`;

      // Crie um elemento de entrada temporário em Vue
      const tempInput = document.createElement('input');
      tempInput.style.opacity = '0';
      tempInput.style.position = 'absolute';
      document.body.appendChild(tempInput);

      // Defina o valor do elemento de entrada e selecione o texto
      tempInput.value = link;
      tempInput.select();
      tempInput.setSelectionRange(0, tempInput.value.length);

      // Copie o texto para a área de transferência
      document.execCommand('copy');

      // Remova o elemento temporário da árvore DOM
      document.body.removeChild(tempInput);
      const toast = useToast();
      this.closeModalLinkCampaign()
      toast.success("Link da campanha copiado", {
        timeout: 2000,
      });
    },
    extractNumberFromString(str) {
      // Remover os caracteres não numéricos da string
      var numberStr = str.replace(/[^\d.,]/g, '');

      // Substituir a vírgula por ponto decimal
      numberStr = numberStr.replace(',', '.');

      // Converter a string para float
      var number = parseFloat(numberStr);

      return number;
    },
    handleViewClosedCampaign() {
      window.open(`${'https://' + this.domainSelected.value}/acao/encerrada/${this.campaignSlug}`, '_blank')
    },
    openLinksNotifications(link, blank = true) {
      if(blank){
        window.open(`${link}`, '_blank')
      }else{
        window.open(`${link}`)
      }
    },
    handleViewCampaign() {
      window.open(`${'https://' + this.domainSelected.value}/acao/${this.campaignSlug}`, '_blank')
    },
    handleNewCampaign() {
      /*if (!this.user.active && this.user.activation_token) {
        alert('Sua conta não está ativa. Ative sua conta primeiro.');
      } else {*/
      // Redirecione para o link
      window.location.href = window.location.origin + "/app/create/campaign";
      //}
    },
    closeCampaign() {
      this.updateCampaign()
    },
    updateCampaign() {
      let self = this;
      const url = `${process.env.VUE_APP_API_BASE_URL}/update/campaign/${this.campaignId}`;

      let form = {
        closed: true,
        winner_collaborator_id: this.collaborators.find(collaborator => collaborator.position === 1).id,
        sorted_number: this.collaborators.find(collaborator => collaborator.position === 1).sorted_number
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
          if (res.campaign) {
            this.collaborators.forEach((collaborator) => {
              let form = {
                collaborator_id: collaborator.id,
                sorted_number: collaborator.sorted_number,
                position: collaborator.position
              }
              this.updateCampaignAward(form)
            })

            self.$router.push("/acao/encerrada/" + this.campaignSlug);
          } else {
            console.log(res.message)
          }
        })
        .catch(error => {
          // Trate o erro aqui, exiba uma mensagem de erro ou faça outra ação necessária
          console.error(error);
        });
    },
    updateCampaignAward(form) {

      if (this.awardsCampaign.length) {
        let award_campaign_id = this.awardsCampaign.find(awardCampaign => awardCampaign.position === form.position).id
        const url = `${process.env.VUE_APP_API_BASE_URL}/update/award/campaign/${award_campaign_id}`;

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
            if (!res.awardCampaign) {
              console.log(res.message)
            }
          })
          .catch(error => {
            // Trate o erro aqui, exiba uma mensagem de erro ou faça outra ação necessária
            console.error(error);
          });
      }
    },
    searchedCollaborator(value, index) {
      this.collaborators[index] = value
    },
    removePosition(value) {
      this.collaborators = this.collaborators.filter(collaborator => collaborator.position !== value);
    },
    sendMailActiveAccount() {

      const url = `${process.env.VUE_APP_API_BASE_URL}/email/${this.user.email}/activation/${this.user.activation_token}`;

      fetch(url,{
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.token, // Substitua 'seu-token-jwt' pelo seu token real
          'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
          // outros cabeçalhos, se necessário
        },
      })
        .then(response => response.json())
        .then(res => {
          if (res.status) {
            alert('Email de ativação enviado!')
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    getUserById() {

      this.userId = this.user.id
      this.userName = this.user.name
      this.userActive = this.user.active
      this.userPaymentMethods = this.user.payment_methods
      this.userToken = this.user.activation_token
      this.userEmail = this.user.email

      this.customizations = this.user.customizations[0]

      this.domainSelected = {
        title: window.location.origin.replace(/^(https?|http):\/\//, ''),
        id: 0,
        value: window.location.origin.replace(/^(https?|http):\/\//, ''),
      }
      if (this.customizations) {
        this.linkCampaign = this.customizations.custom_domain ? 'https://' + this.customizations.custom_domain : window.location.origin;
        this.domainSelected = {
          title: this.customizations.custom_domain ? this.customizations.custom_domain : window.location.origin.replace(/^(https?|http):\/\//, ''),
          id: 0,
          value: this.customizations.custom_domain ? this.customizations.custom_domain : window.location.origin.replace(/^(https?|http):\/\//, ''),
        }
      }
      this.selectDomains = [
        this.domainSelected,
        {
          title: 'suafezinha.com',
          id: 1,
          value: 'suafezinha.com',
        },
        {
          title: 'suafezinha.online',
          id: 2,
          value: 'suafezinha.online',
        },
        {
          title: 'suafezinha.digital',
          id: 3,
          value: 'suafezinha.digital',
        },
        {
          title: 'fezinha.co',
          id: 4,
          value: 'fezinha.co',
        },
        {
          title: 'fezinha.vip',
          id: 5,
          value: 'fezinha.vip',
        },
        {
          title: 'entreamigos.site',
          id: 6,
          value: 'entreamigos.site',
        },
        {
          title: 'suarifa.vip',
          id: 7,
          value: 'suarifa.vip',
        },
      ],
        this.userPaymentMethods = this.user.payment_methods;

      this.selectCampaigns = this.user.campaigns;

      if (this.selectCampaigns.length == 0) {
        window.location.href = window.location.origin + "/app/create/campaign";
      }

      // Verifica se existem campanhas disponíveis
      if (this.selectCampaigns.length > 0) {
        // Define a primeira opção como pré-selecionada
        this.selected2 = [this.selectCampaigns[this.selectCampaigns.length - 1]];
        this.loadData(this.selected2)
      } else {
        this.selected2 = ''
      }
    },
    getAwardsCampaignByCampaignId() {

      const url = `${process.env.VUE_APP_API_BASE_URL}/award/campaign/${this.campaignId}`;

      fetch(url,{
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.token, // Substitua 'seu-token-jwt' pelo seu token real
          'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
          // outros cabeçalhos, se necessário
        },
      })
        .then(response => response.json())
        .then(res => {
          if (res[0].original.length) {
            // Atualize os dados da tabela com os dados recebidos da API
            this.awardsCampaign = res[0].original
            this.awardsCampaign.sort((a, b) => a.position - b.position);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    openModalTermsPublish() {
      this.allow_terms_publish = false;
      this.$refs.modalTermsPublish.openModal()
    },
    closeModalTermsPublish() {
      this.$refs.modalTermsPublish.closeModal()

    },
    openModalPublicar() {
      this.$refs.modalPublicar.openModal()
    },
    closeModalPublicar() {
      this.$refs.modalPublicar.closeModal()
    },
    openModalWinner() {
      this.getAwardsCampaignByCampaignId()
      this.$refs.modalDefineWinner.openModal()
    },
    closeModalWinner() {
      this.$refs.modalDefineWinner.closeModal()
    },
    openModalLinkCampaign() {
      this.$refs.modalLinkCampaign.openModal()
    },
    closeModalLinkCampaign() {
      this.$refs.modalLinkCampaign.closeModal()
    },
    removeSpecialCharactersAndLimitLength(value, maxLength) {
      // Remove caracteres especiais usando expressão regular
      const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, '');

      // Limita o comprimento do valor
      const limitedValue = sanitizedValue.slice(0, maxLength);

      return limitedValue;
    },
    loadData(value) {

      this.getCampaignById(value);
    },
    getPreviousDates(days) {
      const endDate = new Date(); // Data final é a data atual
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days); // Data inicial é a data atual menos a quantidade de dias

      const endDateFormatted = endDate.toISOString().split('T')[0];
      const startDateFormatted = startDate.toISOString().split('T')[0];

      return {
        start_date: startDateFormatted,
        end_date: endDateFormatted
      };
    },
    filterPreviuosDate(value) {

      if (value) {
        let { start_date, end_date } = this.getPreviousDates(value);
        let created_at;
        let campaign_id;
        if (this.selected2.length) {
          created_at = new Date(this.selected2[this.selected2.length - 1].created_at);
          campaign_id = this.selected2[this.selected2.length - 1].id;
        } else {
          created_at = new Date(this.selected2.created_at);
          campaign_id = this.selected2.id;
        }
        created_at.setDate(created_at.getDate() - 1);
        created_at = created_at.toISOString().split('T')[0];

        if (start_date < created_at) {
          start_date = created_at
        }

        const url = `${process.env.VUE_APP_API_BASE_URL}/collaborators/campaign/${campaign_id}?${'start_date=' + start_date + '&end_date=' + end_date}`;

        fetch(url, {
          method: 'GET',
          headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.token, // Substitua 'seu-token-jwt' pelo seu token real
          'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
          // outros cabeçalhos, se necessário
        },
        })
          .then(response => response.json())
          .then(res => {
            if (!res.message) {
              if (res[0].original) {

                let dates = this.getDatesInRange(start_date, end_date)

                let collaborators = res[0].original;

                let collaboratorsByDate = {};

                dates.forEach((date) => {
                  collaboratorsByDate[date] = 0;
                });

                if (collaborators.length) {

                  collaborators.forEach((item) => {
                    let createdAt = new Date(item.created_at).toISOString().split('T')[0];
                    createdAt = this.formatDate(createdAt)
                    collaboratorsByDate[createdAt] += 1;
                  });
                }

                // Converter o objeto em um array com o formato desejado
                let result = Object.values(collaboratorsByDate);

                let formattedDates = [];

                dates.forEach((date) => {
                  const [day, month] = date.split('/').slice(0, 2); // Extrai o dia e o mês da data
                  const formattedDate = `${day}/${month}`; // Formata a data no formato "DD/MM"
                  formattedDates.push(formattedDate); // Adiciona a data formatada ao array de datas formatadas
                });

                this.basicArea.series[0].data = result;
                this.basicArea.chartOptions.xaxis.categories = formattedDates;

                this.basicAreaDark.series[0].data = result;
                this.basicAreaDark.chartOptions.xaxis.categories = formattedDates;
                this.updateKey += 1;
              }
            }
          })
          .catch(error => {
            console.error(error);
          });

      } else {
        this.getInfosForChart(this.selected2)
      }

    },
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
    generatePaymentCheckoutPro() {

      const submitButton = document.getElementById("publicar");
      submitButton.disabled = true;

      /* const publicButton = document.getElementById('publicar-modal');
       publicButton.disabled = true;*/

      let backdrop = this.showBackDrop('Carregando Mercado Pago ...');


      const url_payment = `${process.env.VUE_APP_API_BASE_URL}/payment/checkout/pro`;

      let form = {
        'user_id': this.user.id,
        'campaign_id': this.campaignId
      }

      // Fazer uma requisição POST para o endpoint do Laravel
      fetch(url_payment, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.token, // Substitua 'seu-token-jwt' pelo seu token real
          'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
          // outros cabeçalhos, se necessário
        },
        verify: false,
        body: JSON.stringify(form)
      })
        .then(response => response.json())
        .then(response => {
          window.location.href = response.payment.init_point
        })
        .finally(() => {
          backdrop.remove()
          // Reabilite o botão e esconda o spinner quando a requisição for concluída
          submitButton.disabled = false;
          // publicButton.disabled = false;
        })
        .catch(error => {
          console.error(error);
        });

    },
    generatePaymentPix() {

      const url_payemnt_check = `${process.env.VUE_APP_API_BASE_URL}/payment/campaign/${this.campaignId}/user/${this.user.id}`;
      let self = this;

      const submitButton = document.getElementById("publicar");
      submitButton.disabled = true;

      /*  const publicButton = document.getElementById('publicar-modal');
        publicButton.disabled = true;
  */
      let backdrop = this.showBackDrop('Preparando tudo para publicação ...');

      fetch(url_payemnt_check, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.token, // Substitua 'seu-token-jwt' pelo seu token real
          'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
          // outros cabeçalhos, se necessário
        },
      }).then(response => response.json())
        .then(res => {

          const validStatus = ["rejected", "cancelled", "refunded", "chargeback"];

          const url_payment = `${process.env.VUE_APP_API_BASE_URL}/payment/pix`;

          let form = {
            'user_id': this.user.id,
            'campaign_id': this.campaignId
          }

          let payment_bd = res.data[0];

          if (!payment_bd) {

            // Fazer uma requisição POST para o endpoint do Laravel
            fetch(url_payment, {
              method: 'POST',
              headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.token, // Substitua 'seu-token-jwt' pelo seu token real
          'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
          // outros cabeçalhos, se necessário
        },
              verify: false,
              body: JSON.stringify(form)
            })
              .then(response => response.json())
              .then(response => {
                this.payment = response.payment
                this.createPayment()
              })
              .finally(() => {
                backdrop.remove()
                // Reabilite o botão e esconda o spinner quando a requisição for concluída
                submitButton.disabled = false;
                // publicButton.disabled = false;
              })
              .catch(error => {
                console.error(error);
              });
          } else {

            if (validStatus.includes(payment_bd.status.toLowerCase())) {

              // Fazer uma requisição POST para o endpoint do Laravel
              fetch(url_payment, {
                method: 'POST',
                headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.token, // Substitua 'seu-token-jwt' pelo seu token real
          'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
          // outros cabeçalhos, se necessário
        },
                verify: false,
                body: JSON.stringify(form)
              })
                .then(response => response.json())
                .then(response => {
                  this.payment = response.payment
                  this.updatePayment(payment_bd.id)
                })
                .finally(() => {
                  backdrop.remove()
                  // Reabilite o botão e esconda o spinner quando a requisição for concluída
                  submitButton.disabled = false;
                })
                .catch(error => {
                  console.error(error);
                });

            } else if (this.campaign.created_at != this.campaign.updated_at) {
              // Fazer uma requisição POST para o endpoint do Laravel
              fetch(url_payment, {
                method: 'POST',
                headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.token, // Substitua 'seu-token-jwt' pelo seu token real
          'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
          // outros cabeçalhos, se necessário
        },
                verify: false,
                body: JSON.stringify(form)
              })
                .then(response => response.json())
                .then(response => {
                  this.payment = response.payment
                  this.updatePayment(payment_bd.id)
                })
                .finally(() => {
                  backdrop.remove()
                  // Reabilite o botão e esconda o spinner quando a requisição for concluída
                  submitButton.disabled = false;
                })
                .catch(error => {
                  console.error(error);
                });
            } else {
              // Obtém a URL com o valor do "gclid" adicionado
              const newUrl = this.addGclidToUrl(`/payment/${payment_bd.transaction_id}`);

              // Navega para a nova URL
              self.$router.push(newUrl);
            }
          }
        })
        .catch(error => {
          // Trate o erro aqui, exiba uma mensagem de erro ou faça outra ação necessária
          console.error(error);
        });

    },
    // Função para obter o valor do "gclid" do localStorage
    getGclidFromLocalStorage() {
      return localStorage.getItem('gclid');
    },

    // Função para adicionar o valor do "gclid" à URL
    addGclidToUrl(path) {
      const gclidValue = this.getGclidFromLocalStorage();

      if (gclidValue) {
        return `${path}?gclid=${encodeURIComponent(gclidValue)}`;
      }

      return path;
    },
    createPayment() {

      const url_payment = `${process.env.VUE_APP_API_BASE_URL}/create/payment`;
      let self = this;

      let form = {
        'transaction_id': String(this.payment.id),
        'amount': this.payment.transaction_amount,
        'currency': this.payment.currency_id,
        'status': this.payment.status,
        'user_id': this.user.id,
        'campaign_id': this.campaignId
      }

      const submitButton = document.getElementById("publicar");
      submitButton.disabled = true;

      let backdrop = this.showBackDrop('Gerando PIX de pagamento ...');

      // Fazer uma requisição POST para o endpoint do Laravel
      fetch(url_payment, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.token, // Substitua 'seu-token-jwt' pelo seu token real
          'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
          // outros cabeçalhos, se necessário
        },
        verify: false,
        body: JSON.stringify(form)
      })
        .then(response => response.json())
        .then(response => {
          if (response) {
            // Obtém a URL com o valor do "gclid" adicionado
            const newUrl = this.addGclidToUrl(`/payment/${this.payment.id}`);

            // Navega para a nova URL
            self.$router.push(newUrl);
          }
        })
        .finally(() => {
          backdrop.remove()
          // Reabilite o botão e esconda o spinner quando a requisição for concluída
          submitButton.disabled = false;
        })
        .catch(error => {
          console.error(error);
        });
    },
    updatePayment(id) {

      const url_payment = `${process.env.VUE_APP_API_BASE_URL}/update/payment/${id}`;
      let self = this;

      let form = {
        'transaction_id': String(this.payment.id),
        'amount': this.payment.transaction_amount,
        'currency': this.payment.currency_id,
        'status': this.payment.status,
        'user_id': this.user.id,
        'campaign_id': this.campaignId
      }
      const submitButton = document.getElementById("publicar");
      submitButton.disabled = true;

      let backdrop = this.showBackDrop('Atualizando PIX de pagamento ...');

      // Fazer uma requisição POST para o endpoint do Laravel
      fetch(url_payment, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.token, // Substitua 'seu-token-jwt' pelo seu token real
          'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
          // outros cabeçalhos, se necessário
        },
        verify: false,
        body: JSON.stringify(form)
      })
        .then(response => response.json())
        .then(response => {
          if (response) {

            // Obtém a URL com o valor do "gclid" adicionado
            const newUrl = this.addGclidToUrl(`/payment/${this.payment.id}`);

            // Navega para a nova URL
            self.$router.push(newUrl);
          }
        })
        .finally(() => {
          backdrop.remove()
          // Reabilite o botão e esconda o spinner quando a requisição for concluída
          submitButton.disabled = false;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getCampaignById(value) {
      if (value) {
        this.campaignId = value[0] ? value[0].id : value.id;
        this.campaignUuid = value[0] ? value[0].uuid : value.uuid;
        this.campaignSlug = value[0] ? value[0].slug : value.slug;

        let campaign = this.user.campaigns.find(campaign => campaign.id === this.campaignId);

        if (campaign) {

          this.campaign = campaign;
          // this.collaboratorsCampaign = campaign.collaborators;
          this.campaignName = campaign.name;
          this.campaignStatus = campaign.status;
          this.campaignClosed = campaign.closed;
          this.campaignFee = campaign.fee.fee;
          this.campaignVisible = campaign.visible ? this.campaignVisible = true : this.campaignVisible = false;
          this.isMounted = true;
          let available_tickets = campaign.amount_tickets - (campaign.unavailable_tickets + campaign.pending_tickets);
          this.statistics[0].count = available_tickets;
          this.statistics[0].percent = Math.round((available_tickets / campaign.amount_tickets) * 100);

          this.statistics[1].count = campaign.pending_tickets;
          this.statistics[1].percent = Math.round((campaign.pending_tickets / campaign.amount_tickets) * 100);

          this.statistics[2].count = campaign.unavailable_tickets;
          this.statistics[2].percent = Math.round((campaign.unavailable_tickets / campaign.amount_tickets) * 100);



          this.statistics2[0].count = campaign.collaborators_paid;
          this.statistics2[1].count = campaign.revenue;
          this.statistics2[2].count = campaign.average_ticket;

          this.donutTwo.series = [this.statistics[0].percent, this.statistics[1].percent, this.statistics[2].percent]
          this.donutTwo.chartOptions.labels = ["Disponíveis", "Pendentes", "Pagos"]


          this.getInfosForChart(value);

        }
      }
    },
    filteredCollaborators(startDate, endDate, collaboratorsCampaign = this.collaboratorsCampaign) {
      if (!startDate || !endDate) {
        return collaboratorsCampaign;
      }

      const startDateTime = new Date(startDate).getTime();
      const endDateTime = new Date(endDate).getTime();

      return collaboratorsCampaign.filter((collaborator) => {
        const collaboratorDateTime = new Date(collaborator.created_at).getTime();
        return collaboratorDateTime >= startDateTime && collaboratorDateTime <= endDateTime;
      });
    },
    getInfosForChart(value) {

      let campaign = value[0] ? value[0] : value;

      let date_of_raffle = campaign.date_of_raffle ? new Date(campaign.date_of_raffle).toISOString().split('T')[0] : campaign.date_of_raffle;
      let start_date = new Date(campaign.created_at).toISOString().split('T')[0]

      if (!date_of_raffle) {
        // Obter a data atual
        let currentDate = new Date();

        // Adicionar 5 dias à data atual
        currentDate.setDate(currentDate.getDate() + 4);

        // Obter a data do quinto dia como string no formato 'yyyy-mm-dd'
        date_of_raffle = currentDate.toISOString().slice(0, 10);
      }

      let dates = this.getDatesInRange(start_date, date_of_raffle)


      let collaboratorsByDateCounted = campaign.amount_collaborators_by_date;
      let reformattedCollaboratorsByDate = {};

      // Reformatar as chaves de data
      for (let dateKey in collaboratorsByDateCounted) {
        if (collaboratorsByDateCounted.hasOwnProperty(dateKey)) {
          let reformattedDate = this.formatDate(dateKey);
          reformattedCollaboratorsByDate[reformattedDate] = collaboratorsByDateCounted[dateKey];
        }
      }

      let collaboratorsByDate = {};

      dates.forEach((date) => {
        // Agora usando as datas reformatadas
        collaboratorsByDate[date] = reformattedCollaboratorsByDate[date] || 0;
      });
      // Converter o objeto em um array com o formato desejado
      let result = Object.values(collaboratorsByDate);

      let formattedDates = [];

      dates.forEach((date) => {
        const [day, month] = date.split('/').slice(0, 2); // Extrai o dia e o mês da data
        const formattedDate = `${day}/${month}`; // Formata a data no formato "DD/MM"
        formattedDates.push(formattedDate); // Adiciona a data formatada ao array de datas formatadas
      });

      this.basicArea.series[0].data = result;
      this.basicArea.chartOptions.xaxis.categories = formattedDates;

      this.basicAreaDark.series[0].data = result;
      this.basicAreaDark.chartOptions.xaxis.categories = formattedDates;
      this.updateKey += 1;


    },
    getDatesInRange(start, end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const dates = [];

      // Adiciona um dia à data de início até alcançar a data final
      for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const formattedDate = date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        dates.push(formattedDate);
      }

      return dates;
    },
    formatDate(dateString) {
      const dateParts = dateString.split('-');
      const day = dateParts[2];
      const month = dateParts[1];
      const year = dateParts[0];
      return `${day}/${month}/${year}`;
    }
  },
};
</script>

<style lang="scss">
.custom-calender {

  .vc-pane-container,
  .vc-pane-layout,
  .vc-container,
  .vc-container * {
    border: none !important;
    font-family: 'Inter', sans-serif !important;
    //background: #fafbff !important;
    font-weight: 400;
  }

  .vc-title {
    color: #0f172a !important;
    font-size: 24px !important;
    font-weight: 500 !important;
    margin-bottom: 15px !important;
  }

  .vc-arrow {
    margin-left: 10px !important;
    margin-right: 10px !important;
    color: #0f172a !important;
  }

  .vc-weekday {
    @apply font-normal dark:text-slate-400 text-sm text-slate-600;
  }

  .vc-day {
    @apply text-slate-900 dark:text-white;
  }

  .vc-highlight {
    background-color: #0f172a !important;
  }
}

.dark {
  .custom-calender {
    .vc-title {
      color: #fff !important;
    }

    .vc-arrow {
      color: #fff !important;
    }
  }

  .vc-container,
  .vc-container {
    @apply bg-slate-800;
  }
}

.backdrop {
z-index: 99999;
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
    z-index: 1000000;
}



//Botão Pulsante
@keyframes pulse {
      0% {

        box-shadow: 0 0 0 0 rgb(248, 164, 133);
      }
      25% {
        box-shadow: 0 0 2.5px 2.5px rgb(248, 192, 172);
      }
      50% {
        box-shadow: 0 0 5px 5px rgb(248, 215, 203);
      }
      75% {
        box-shadow: 0 0 5.5px 5.5px rgb(255, 237, 231);
      }
    }

    .pulsating-button {
      display: inline-block;
      padding: 15px 30px;
      font-size: 16px;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      color: #fff;
      background-color: rgb(250, 145, 107);
      position: relative;
      overflow: hidden;
      animation: pulse 1.5s infinite;
    }

    .pulsating-button::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    .panel {
    cursor: pointer;
}
.notifications {
  cursor: pointer;
}
</style>