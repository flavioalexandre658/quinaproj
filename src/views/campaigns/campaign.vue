<template>
    <!-- NOME/ALERTS -->
    <div class="bg-yellow-50 border-l-4 border-yellow-400 w-screen py-4 shadow-sm mb-50 z-[1000] p-1 fixed"
        v-if="!campaignStatus && !campaignReleasedUntilFee">
        <div class="flex items-center justify-center text-center">
            <div class="ml-5 mr-5 text-4xl">⚠️</div>
            <div class="text-sm">
                <p class="text-yellow-700 font-bold">Modo demonstração.</p><a href="/app/home"
                    class="text-sm text-yellow-700 hover:text-yellow-600"> Faça o pagamento para publicar esta campanha
                    e começar a sua ação </a>
            </div>
        </div>
    </div>

    <div class="mx-2">

        <!-- HEADER -->
        <div class="form-div">
            <HeaderCampaign v-if="customizationImage" :campaignId="campaignId" :customizationImage="customizationImage"
                style="margin-bottom: 0px!important;" />
        </div>

        <!-- IMAGEM -->
        <div class="form-div form-div-bg" :style="backgroundStyle">
        </div>

        <!-- DESCRIÇÃO -->
        <div class="form-div text-end m-auto" style="margin-top:0px!important">
            <h1
                class="dark:bg-gradient-to-r dark:from-warning-600 dark:to-danger-500 dark:text-white text-sm box-decoration-clone bg-gradient-to-r from-info-600 to-success-500 px-2 py-1 text-white text-left font-bold absolute title-rifa">
                {{ campaignName }}
            </h1>
            <Card imaClass="rounded-md max-w-xs m-auto" noborder>

                <p class="text-xs box-decoration-clone text-slate-500 text-left py-6 bolder dark:text-white">
                    <b>Descrição/Regulamento:</b>
                </p>
                <span v-html="description" class="text-left  dark:text-white"></span>

                <div class="flex mt-10  dark:text-white">

                    <div class="mx-1 p-2 text-left raffle">
                        <p><span class="h-6 text-base text-left"></span>Sorteio:</p>
                        <p><span class="h-6 text-base text-left">🍀</span> {{ raffle }}
                            <Badge v-if="campaignShowDateRaffle" :label="campaignExpireDate"
                                badgeClass="bg-success-500 text-white" />
                        </p>
                    </div>

                    <div class="mx-1 p-2 text-left raffle">
                        <p><span class="h-6 text-base text-left"></span>Meio de Pagamento:</p>
                        <div style="display:flex;align-items: center;" v-for="(payMethod, i) in paymentMethods" :key="i">
                            <span class="h-6 text-base text-left"
                                v-if="payMethod.name_method === 'Mercado Pago' && payMethod.status">
                                <img src="@/assets/images/icon/mp.png" width="75" height="20" alt="Mercado Pago" />
                            </span>
                            <span class="h-6 text-base text-left"
                                v-if="payMethod.name_method === 'Transferência PIX' && payMethod.status">
                                <img src="@/assets/images/icon/pixicon.png" width="20" height="20" alt="PIX" />
                            </span>
                            <span style="padding-left: 5px;"
                                v-if="payMethod.name_method === 'Transferência PIX' && payMethod.status">PIX</span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>

        <!-- PRÊMIOS -->
        <div class="form-div text-white py-6 m-auto bg-gradient-to-r from-warning-600 to-danger-500"
            v-if="awardsCampaign.length">
            <h2 class="text-lg text-white dark:text-white text-left font-bold px-2">
                <svg style="display:inline" width="40px" height="40px" viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg" fill="#000000">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <g id="Flat">
                            <g id="Color">
                                <polygon fill="#a60416" points="45 28 27 28 27 56 36 50 45 56 45 28"></polygon>
                                <polygon fill="#a60416" points="19 28 37 28 37 56 28 50 19 56 19 28"></polygon>
                                <polygon fill="#212529" points="41 33 23 33 23 61 32 55 41 61 41 33"></polygon>
                                <path
                                    d="M23,42.82a11.22,11.22,0,0,1,2.65.23c2,.87,3.68,3,6.35,3s4.35-2.08,6.35-3A11.22,11.22,0,0,1,41,42.82V33H23Z"
                                    fill="#111315"></path>
                                <polygon fill="#dd051d" points="37 33 37 58.33 32 55 27 58.33 27 33 37 33"></polygon>
                                <path d="M27,43.81c3.65,2.88,6.36,2.88,10,0V33H27Z" fill="#a60416"></path>
                                <path
                                    d="M50.55,23.5c0-2.11,1.57-4.44,1-6.34S48.2,14.24,47,12.6s-1.3-4.48-3-5.69-4.35-.42-6.32-1S34.11,3,32,3s-3.83,2.24-5.73,2.86-4.68-.14-6.32,1-1.75,4-3,5.69-3.85,2.59-4.49,4.56.95,4.23.95,6.34-1.57,4.44-.95,6.34S15.8,32.76,17,34.4s1.3,4.48,3,5.69,4.35.42,6.32,1S29.89,44,32,44s3.83-2.24,5.73-2.86,4.68.14,6.32-1,1.75-4,3-5.69,3.85-2.59,4.49-4.56S50.55,25.61,50.55,23.5Z"
                                    fill="#fccd1d"></path>
                                <circle cx="32" cy="23.5" fill="#f9a215" r="14.5"></circle>
                                <path
                                    d="M33.37,16l1.52,2.63a1.54,1.54,0,0,0,1.06.76L39,20a1.53,1.53,0,0,1,.85,2.56l-2.1,2.22a1.5,1.5,0,0,0-.4,1.22l.36,3a1.57,1.57,0,0,1-2.22,1.58l-2.81-1.27a1.6,1.6,0,0,0-1.32,0l-2.81,1.27A1.57,1.57,0,0,1,26.31,29l.36-3a1.5,1.5,0,0,0-.4-1.22l-2.1-2.22A1.53,1.53,0,0,1,25,20l3-.59a1.54,1.54,0,0,0,1.06-.76L30.63,16A1.59,1.59,0,0,1,33.37,16Z"
                                    fill="#fccd1d"></path>
                            </g>
                        </g>
                    </g>
                </svg>
                Prêmios
            </h2>
            <div class="px-4" noborder>

                <div v-for="(item) in awardsCampaign" :key="item.id" class="grid">
                    <div class="col-span-12 mt-2">
                        <span class="font-semibold" style="text-decoration: underline;">
                            {{ item.position }}º lugar</span>
                        <span class="text-sm"> - {{ item.award.name }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- PREÇO DO BILHETE -->
        <div class="form-div" v-if="!allSelled">
            <div class="dark:text-white price-table rounded-[6px] shadow-base  p-3 text-slate-900 relative overflow-hidden z-[0]"
                :class="this.$store.state.isDark ? item.bgDark : item.bg">
                <div class="overlay absolute right-0 top-0 w-full h-full z-[-1]" v-if="item.img">
                    <img :src="item.img" class="ml-auto block" alt="123Rifas" width="256" height="340" />
                </div>
                <div v-if="item.ribon"
                    class="text-sm font-bold dark:bg-slate-900 bg-danger-500  text-white  py-2 text-center absolute -right-[43px] top-6 px-10 transform rotate-[45deg]">
                    {{ item.ribon }}
                </div>
                <header class="mb-6">
                    <h2 class="text-sm mb-5" :class="item.bg === 'bg-slate-900'
                        ? 'text-slate-100 dark:text-white'
                        : 'text-slate-900 dark:text-white'
                        ">
                        {{ item.title }}
                    </h2>
                    <div class="space-x-4 relative flex items-center mb-5" :class="item.bg === 'bg-slate-900'
                        ? 'text-slate-100'
                        : 'text-slate-900 '
                        ">
                        <span class="text-[16px] leading-10 font-medium line-through text-danger-500 dark:text-slate-900"
                            v-if="price_compare > price">
                            {{ "R$" + price_compare }} </span>
                        <span class="text-[32px] leading-10 font-medium">
                            {{ "R$" + price }} </span>
                        <span v-if="price_compare > price"
                            class="text-xs text-white font-medium px-3 py-1 rounded-full inline-block bg-success-500 dark:bg-slate-900 uppercase h-auto">{{
                                getPercentPromotion(price_compare) }}%
                            OFF</span>
                    </div>
                </header>
            </div>
        </div>

        <!-- RANKING TOP 3 -->
        <div class="form-div text-end m-auto" v-if="campaignShowRanking && top3ranking.length">
            <h2
                class="dark:text-white dark:bg-gradient-to-r dark:from-warning-600 dark:to-danger-500 text-xs box-decoration-clone bg-gradient-to-r from-info-600 to-success-500 px-2 py-1 text-white text-left font-bold">
                Ranking Maiores Colaboradores
            </h2>
            <Card imaClass="rounded-md max-w-xs m-auto" noborder>
                <div v-if="top3ranking.length" class="grid grid-cols-3 mt-4 text-center">
                    <div v-for="(item, index) in top3ranking" :key="item.id">
                        <div
                            :class="'col-span-4 w-full flex justify-center items-center rounded-md focus:outline-none mb-2'">
                            <div class="grid grid-cols-12 text-center">
                                <div class="col-span-12">
                                    <span class="text-1xl font-semibold">
                                        <span v-if="index == 0"><svg style="margin-bottom:2px;margin-left:8px;margin:auto"
                                                height="80px" width="80px" version="1.1" id="Layer_1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 502.613 502.613"
                                                xml:space="preserve" fill="#000000">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                    stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <g transform="translate(19 1)">
                                                        <path style="fill:#FFE079;"
                                                            d="M266.44,292.547c0,51.2,8.533,102.4,8.533,102.4s3.413,16.213,12.8,34.133H176.84 c11.947-19.627,12.8-34.133,12.8-34.133s8.533-51.2,8.533-102.4c-17.067,0-25.6-17.067-25.6-17.067s-17.067-59.733-17.067-85.333 V121.88c0-12.8,13.653-30.72,59.733-34.133c-10.24-10.24-17.067-34.987-17.067-51.2c0-23.893,15.36-34.133,34.133-34.133 s34.133,10.24,34.133,34.133c0,16.213-6.827,40.96-17.067,51.2c46.08,3.413,59.733,21.333,59.733,34.133v68.267 c0,25.6-17.067,85.333-17.067,85.333S283.507,292.547,266.44,292.547">
                                                        </path>
                                                        <polygon :style="this.$store.state.isDark
                                                            ? 'fill:#fff;' : 'fill:#AAB1BA;'"
                                                            points="309.107,429.08 326.173,497.347 138.44,497.347 155.507,429.08 176.84,429.08 287.773,429.08 ">
                                                        </polygon>
                                                    </g>
                                                    <path :style="this.$store.state.isDark
                                                        ? 'fill:#ccc;' : 'fill:#51565F;'"
                                                        d="M345.173,502.613H157.44c-1.707,0-2.56-0.853-3.413-1.707c-0.853-0.853-0.853-2.56-0.853-3.413 l17.067-68.267c0.853-1.707,2.56-3.413,4.267-3.413h153.6c1.707,0,3.413,1.707,4.267,3.413l17.067,68.267 c0,0.853,0,2.56-0.853,3.413C347.733,501.76,346.88,502.613,345.173,502.613z M162.56,494.08H339.2l-15.36-59.733H177.067 L162.56,494.08z M276.053,468.48H226.56c-2.56,0-4.267-1.707-4.267-4.267c0-2.56,1.707-4.267,4.267-4.267h49.493 c2.56,0,4.267,1.707,4.267,4.267C280.32,466.773,278.613,468.48,276.053,468.48z M293.973,400.213c-1.707,0-4.267-1.707-4.267-3.413 c0-0.853-8.533-52.053-8.533-103.253s8.533-135.68,8.533-136.533c0-2.56,2.56-4.267,4.267-3.413c2.56,0,4.267,2.56,3.413,4.267 c0,0.853-8.533,85.333-8.533,136.533c0,50.347,8.533,101.547,8.533,101.547C298.24,397.653,297.387,399.36,293.973,400.213 C294.827,400.213,293.973,400.213,293.973,400.213z M208.64,400.213C208.64,400.213,207.787,400.213,208.64,400.213 c-3.413-0.853-4.267-2.56-4.267-5.12c0-0.853,8.533-51.2,8.533-101.547s-8.533-135.68-8.533-136.533c0-2.56,1.707-4.267,3.413-4.267 c2.56,0,4.267,1.707,4.267,3.413c0,0.853,8.533,86.187,8.533,136.533c0,51.2-8.533,102.4-8.533,103.253 C212.907,398.507,210.347,400.213,208.64,400.213z M106.24,340.48c-2.56,0-4.267-1.707-4.267-4.267v-4.267h-4.267 c-2.56,0-4.267-1.707-4.267-4.267s1.707-4.267,4.267-4.267h4.267v-4.267c0-2.56,1.707-4.267,4.267-4.267 c2.56,0,4.267,1.707,4.267,4.267v4.267h4.267c2.56,0,4.267,1.707,4.267,4.267s-1.707,4.267-4.267,4.267h-4.267v4.267 C110.507,338.773,108.8,340.48,106.24,340.48z M311.04,280.747h-0.853c-2.56-0.853-3.413-3.413-2.56-5.12 c0-0.853,17.067-59.733,17.067-84.48V122.88c0-11.947-14.507-26.453-55.467-29.867c-1.707,0-3.413-0.853-3.413-2.56 c-0.853-1.707,0-3.413,0.853-4.267c9.387-8.533,15.36-32.427,15.36-47.787c0-27.307-20.48-29.867-29.867-29.867 s-29.867,2.56-29.867,29.867c0,15.36,6.827,39.253,15.36,47.787c0.853,0.853,1.707,2.56,0.853,4.267 c-0.853,1.707-1.707,2.56-3.413,2.56c-40.96,3.413-55.467,17.92-55.467,29.867v68.267c0,24.747,17.067,83.627,17.067,84.48 c0.853,2.56-0.853,4.267-2.56,5.12c-2.56,0.853-4.267-0.853-5.12-2.56c-0.853-2.56-17.067-60.587-17.067-86.187v-68.267 c0-15.36,14.507-32.427,55.467-37.547c-8.533-13.653-12.8-34.987-12.8-47.787c0-23.893,14.507-38.4,38.4-38.4s38.4,14.507,38.4,38.4 c0,12.8-4.267,34.133-12.8,47.787c40.96,5.12,55.467,22.187,55.467,37.547V192c0,25.6-16.213,83.627-17.067,86.187 C314.453,279.893,312.747,280.747,311.04,280.747z M55.04,144.213c-2.56,0-4.267-1.707-4.267-4.267v-12.8h-12.8 c-2.56,0-4.267-1.707-4.267-4.267c0-2.56,1.707-4.267,4.267-4.267h12.8v-12.8c0-2.56,1.707-4.267,4.267-4.267 c2.56,0,4.267,1.707,4.267,4.267v12.8h12.8c2.56,0,4.267,1.707,4.267,4.267c0,2.56-1.707,4.267-4.267,4.267h-12.8v12.8 C59.307,142.507,57.6,144.213,55.04,144.213z M430.507,110.08c-2.56,0-4.267-1.707-4.267-4.267V75.947h-29.867 c-2.56,0-4.267-1.707-4.267-4.267c0-2.56,1.707-4.267,4.267-4.267h29.867V37.547c0-2.56,1.707-4.267,4.267-4.267 s4.267,1.707,4.267,4.267v29.867h29.867c2.56,0,4.267,1.707,4.267,4.267c0,2.56-1.707,4.267-4.267,4.267h-29.867v29.867 C434.773,108.373,433.067,110.08,430.507,110.08z">
                                                    </path>
                                                </g>
                                            </svg></span>
                                        <span v-if="index == 1"><svg style="margin-bottom:2px;margin-left:8px;margin:auto"
                                                height="80px" width="80px" version="1.1" id="Layer_1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 502.613 502.613"
                                                xml:space="preserve" fill="#000000">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                    stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <g transform="translate(19 1)">
                                                        <path style="fill:#e0e0e0;"
                                                            d="M266.44,292.547c0,51.2,8.533,102.4,8.533,102.4s3.413,16.213,12.8,34.133H176.84 c11.947-19.627,12.8-34.133,12.8-34.133s8.533-51.2,8.533-102.4c-17.067,0-25.6-17.067-25.6-17.067s-17.067-59.733-17.067-85.333 V121.88c0-12.8,13.653-30.72,59.733-34.133c-10.24-10.24-17.067-34.987-17.067-51.2c0-23.893,15.36-34.133,34.133-34.133 s34.133,10.24,34.133,34.133c0,16.213-6.827,40.96-17.067,51.2c46.08,3.413,59.733,21.333,59.733,34.133v68.267 c0,25.6-17.067,85.333-17.067,85.333S283.507,292.547,266.44,292.547">
                                                        </path>
                                                        <polygon :style="this.$store.state.isDark
                                                            ? 'fill:#fff;' : 'fill:#AAB1BA;'"
                                                            points="309.107,429.08 326.173,497.347 138.44,497.347 155.507,429.08 176.84,429.08 287.773,429.08 ">
                                                        </polygon>
                                                    </g>
                                                    <path :style="this.$store.state.isDark
                                                        ? 'fill:#ccc;' : 'fill:#51565F;'"
                                                        d="M345.173,502.613H157.44c-1.707,0-2.56-0.853-3.413-1.707c-0.853-0.853-0.853-2.56-0.853-3.413 l17.067-68.267c0.853-1.707,2.56-3.413,4.267-3.413h153.6c1.707,0,3.413,1.707,4.267,3.413l17.067,68.267 c0,0.853,0,2.56-0.853,3.413C347.733,501.76,346.88,502.613,345.173,502.613z M162.56,494.08H339.2l-15.36-59.733H177.067 L162.56,494.08z M276.053,468.48H226.56c-2.56,0-4.267-1.707-4.267-4.267c0-2.56,1.707-4.267,4.267-4.267h49.493 c2.56,0,4.267,1.707,4.267,4.267C280.32,466.773,278.613,468.48,276.053,468.48z M293.973,400.213c-1.707,0-4.267-1.707-4.267-3.413 c0-0.853-8.533-52.053-8.533-103.253s8.533-135.68,8.533-136.533c0-2.56,2.56-4.267,4.267-3.413c2.56,0,4.267,2.56,3.413,4.267 c0,0.853-8.533,85.333-8.533,136.533c0,50.347,8.533,101.547,8.533,101.547C298.24,397.653,297.387,399.36,293.973,400.213 C294.827,400.213,293.973,400.213,293.973,400.213z M208.64,400.213C208.64,400.213,207.787,400.213,208.64,400.213 c-3.413-0.853-4.267-2.56-4.267-5.12c0-0.853,8.533-51.2,8.533-101.547s-8.533-135.68-8.533-136.533c0-2.56,1.707-4.267,3.413-4.267 c2.56,0,4.267,1.707,4.267,3.413c0,0.853,8.533,86.187,8.533,136.533c0,51.2-8.533,102.4-8.533,103.253 C212.907,398.507,210.347,400.213,208.64,400.213z M106.24,340.48c-2.56,0-4.267-1.707-4.267-4.267v-4.267h-4.267 c-2.56,0-4.267-1.707-4.267-4.267s1.707-4.267,4.267-4.267h4.267v-4.267c0-2.56,1.707-4.267,4.267-4.267 c2.56,0,4.267,1.707,4.267,4.267v4.267h4.267c2.56,0,4.267,1.707,4.267,4.267s-1.707,4.267-4.267,4.267h-4.267v4.267 C110.507,338.773,108.8,340.48,106.24,340.48z M311.04,280.747h-0.853c-2.56-0.853-3.413-3.413-2.56-5.12 c0-0.853,17.067-59.733,17.067-84.48V122.88c0-11.947-14.507-26.453-55.467-29.867c-1.707,0-3.413-0.853-3.413-2.56 c-0.853-1.707,0-3.413,0.853-4.267c9.387-8.533,15.36-32.427,15.36-47.787c0-27.307-20.48-29.867-29.867-29.867 s-29.867,2.56-29.867,29.867c0,15.36,6.827,39.253,15.36,47.787c0.853,0.853,1.707,2.56,0.853,4.267 c-0.853,1.707-1.707,2.56-3.413,2.56c-40.96,3.413-55.467,17.92-55.467,29.867v68.267c0,24.747,17.067,83.627,17.067,84.48 c0.853,2.56-0.853,4.267-2.56,5.12c-2.56,0.853-4.267-0.853-5.12-2.56c-0.853-2.56-17.067-60.587-17.067-86.187v-68.267 c0-15.36,14.507-32.427,55.467-37.547c-8.533-13.653-12.8-34.987-12.8-47.787c0-23.893,14.507-38.4,38.4-38.4s38.4,14.507,38.4,38.4 c0,12.8-4.267,34.133-12.8,47.787c40.96,5.12,55.467,22.187,55.467,37.547V192c0,25.6-16.213,83.627-17.067,86.187 C314.453,279.893,312.747,280.747,311.04,280.747z M55.04,144.213c-2.56,0-4.267-1.707-4.267-4.267v-12.8h-12.8 c-2.56,0-4.267-1.707-4.267-4.267c0-2.56,1.707-4.267,4.267-4.267h12.8v-12.8c0-2.56,1.707-4.267,4.267-4.267 c2.56,0,4.267,1.707,4.267,4.267v12.8h12.8c2.56,0,4.267,1.707,4.267,4.267c0,2.56-1.707,4.267-4.267,4.267h-12.8v12.8 C59.307,142.507,57.6,144.213,55.04,144.213z M430.507,110.08c-2.56,0-4.267-1.707-4.267-4.267V75.947h-29.867 c-2.56,0-4.267-1.707-4.267-4.267c0-2.56,1.707-4.267,4.267-4.267h29.867V37.547c0-2.56,1.707-4.267,4.267-4.267 s4.267,1.707,4.267,4.267v29.867h29.867c2.56,0,4.267,1.707,4.267,4.267c0,2.56-1.707,4.267-4.267,4.267h-29.867v29.867 C434.773,108.373,433.067,110.08,430.507,110.08z">
                                                    </path>
                                                </g>
                                            </svg></span>
                                        <span v-if="index == 2"><svg style="margin-bottom:2px;margin-left:8px;margin:auto"
                                                height="80px" width="80px" version="1.1" id="Layer_1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 502.613 502.613"
                                                xml:space="preserve" fill="#000000">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                    stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <g transform="translate(19 1)">
                                                        <path style="fill:#ce8d1c;"
                                                            d="M266.44,292.547c0,51.2,8.533,102.4,8.533,102.4s3.413,16.213,12.8,34.133H176.84 c11.947-19.627,12.8-34.133,12.8-34.133s8.533-51.2,8.533-102.4c-17.067,0-25.6-17.067-25.6-17.067s-17.067-59.733-17.067-85.333 V121.88c0-12.8,13.653-30.72,59.733-34.133c-10.24-10.24-17.067-34.987-17.067-51.2c0-23.893,15.36-34.133,34.133-34.133 s34.133,10.24,34.133,34.133c0,16.213-6.827,40.96-17.067,51.2c46.08,3.413,59.733,21.333,59.733,34.133v68.267 c0,25.6-17.067,85.333-17.067,85.333S283.507,292.547,266.44,292.547">
                                                        </path>
                                                        <polygon :style="this.$store.state.isDark
                                                            ? 'fill:#fff;' : 'fill:#AAB1BA;'"
                                                            points="309.107,429.08 326.173,497.347 138.44,497.347 155.507,429.08 176.84,429.08 287.773,429.08 ">
                                                        </polygon>
                                                    </g>
                                                    <path :style="this.$store.state.isDark
                                                        ? 'fill:#ccc;' : 'fill:#51565F;'"
                                                        d="M345.173,502.613H157.44c-1.707,0-2.56-0.853-3.413-1.707c-0.853-0.853-0.853-2.56-0.853-3.413 l17.067-68.267c0.853-1.707,2.56-3.413,4.267-3.413h153.6c1.707,0,3.413,1.707,4.267,3.413l17.067,68.267 c0,0.853,0,2.56-0.853,3.413C347.733,501.76,346.88,502.613,345.173,502.613z M162.56,494.08H339.2l-15.36-59.733H177.067 L162.56,494.08z M276.053,468.48H226.56c-2.56,0-4.267-1.707-4.267-4.267c0-2.56,1.707-4.267,4.267-4.267h49.493 c2.56,0,4.267,1.707,4.267,4.267C280.32,466.773,278.613,468.48,276.053,468.48z M293.973,400.213c-1.707,0-4.267-1.707-4.267-3.413 c0-0.853-8.533-52.053-8.533-103.253s8.533-135.68,8.533-136.533c0-2.56,2.56-4.267,4.267-3.413c2.56,0,4.267,2.56,3.413,4.267 c0,0.853-8.533,85.333-8.533,136.533c0,50.347,8.533,101.547,8.533,101.547C298.24,397.653,297.387,399.36,293.973,400.213 C294.827,400.213,293.973,400.213,293.973,400.213z M208.64,400.213C208.64,400.213,207.787,400.213,208.64,400.213 c-3.413-0.853-4.267-2.56-4.267-5.12c0-0.853,8.533-51.2,8.533-101.547s-8.533-135.68-8.533-136.533c0-2.56,1.707-4.267,3.413-4.267 c2.56,0,4.267,1.707,4.267,3.413c0,0.853,8.533,86.187,8.533,136.533c0,51.2-8.533,102.4-8.533,103.253 C212.907,398.507,210.347,400.213,208.64,400.213z M106.24,340.48c-2.56,0-4.267-1.707-4.267-4.267v-4.267h-4.267 c-2.56,0-4.267-1.707-4.267-4.267s1.707-4.267,4.267-4.267h4.267v-4.267c0-2.56,1.707-4.267,4.267-4.267 c2.56,0,4.267,1.707,4.267,4.267v4.267h4.267c2.56,0,4.267,1.707,4.267,4.267s-1.707,4.267-4.267,4.267h-4.267v4.267 C110.507,338.773,108.8,340.48,106.24,340.48z M311.04,280.747h-0.853c-2.56-0.853-3.413-3.413-2.56-5.12 c0-0.853,17.067-59.733,17.067-84.48V122.88c0-11.947-14.507-26.453-55.467-29.867c-1.707,0-3.413-0.853-3.413-2.56 c-0.853-1.707,0-3.413,0.853-4.267c9.387-8.533,15.36-32.427,15.36-47.787c0-27.307-20.48-29.867-29.867-29.867 s-29.867,2.56-29.867,29.867c0,15.36,6.827,39.253,15.36,47.787c0.853,0.853,1.707,2.56,0.853,4.267 c-0.853,1.707-1.707,2.56-3.413,2.56c-40.96,3.413-55.467,17.92-55.467,29.867v68.267c0,24.747,17.067,83.627,17.067,84.48 c0.853,2.56-0.853,4.267-2.56,5.12c-2.56,0.853-4.267-0.853-5.12-2.56c-0.853-2.56-17.067-60.587-17.067-86.187v-68.267 c0-15.36,14.507-32.427,55.467-37.547c-8.533-13.653-12.8-34.987-12.8-47.787c0-23.893,14.507-38.4,38.4-38.4s38.4,14.507,38.4,38.4 c0,12.8-4.267,34.133-12.8,47.787c40.96,5.12,55.467,22.187,55.467,37.547V192c0,25.6-16.213,83.627-17.067,86.187 C314.453,279.893,312.747,280.747,311.04,280.747z M55.04,144.213c-2.56,0-4.267-1.707-4.267-4.267v-12.8h-12.8 c-2.56,0-4.267-1.707-4.267-4.267c0-2.56,1.707-4.267,4.267-4.267h12.8v-12.8c0-2.56,1.707-4.267,4.267-4.267 c2.56,0,4.267,1.707,4.267,4.267v12.8h12.8c2.56,0,4.267,1.707,4.267,4.267c0,2.56-1.707,4.267-4.267,4.267h-12.8v12.8 C59.307,142.507,57.6,144.213,55.04,144.213z M430.507,110.08c-2.56,0-4.267-1.707-4.267-4.267V75.947h-29.867 c-2.56,0-4.267-1.707-4.267-4.267c0-2.56,1.707-4.267,4.267-4.267h29.867V37.547c0-2.56,1.707-4.267,4.267-4.267 s4.267,1.707,4.267,4.267v29.867h29.867c2.56,0,4.267,1.707,4.267,4.267c0,2.56-1.707,4.267-4.267,4.267h-29.867v29.867 C434.773,108.373,433.067,110.08,430.507,110.08z">
                                                    </path>
                                                </g>
                                            </svg></span>
                                    </span>
                                </div>
                                <div class="col-span-12">
                                    <span class="text-slate-500 dark:text-white">{{ ranking_acumulative ?
                                        item.collaborator.name : item.name }}</span>
                                </div>
                                <div class="col-span-12">
                                    <span class="text-slate-500 dark:text-white"><b>{{ ranking_acumulative ?
                                        item.total_tickets : item.amount_of_tickets }}</b> bilhetes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-12 pt-5" v-if="!ranking_acumulative">
                        <small class="text-sm dark:text-white">👉Os bilhetes não são acumulativos</small>
                    </div>

                </div>

            </Card>
        </div>

        <!-- PROMOÇÕES -->
        <div class="form-div" v-for="item in salesCampaign" :key="item.id">
            <div v-if="!allSelled"
                class="price-table rounded-[6px] shadow-base  p-3 text-slate-900 relative overflow-hidden z-[0] bg-gradient-to-r from-info-600 to-success-500 dark:text-white dark:bg-gradient-to-r dark:from-warning-600 dark:to-danger-500">
                <div v-if="extractNumberFromString(item.sale.price_amount) < price"
                    class="text-sm font-medium bg-yellow-500  text-white  py-2 text-center absolute -right-[43px] top-8 px-10 transform rotate-[45deg]">
                    ECONOMIZE {{ getPercentPromotion(item.sale.price_amount) }}%
                </div>
                <header class="mb-6">
                    <h3 class="text-sm mb-5 text-success-100 dark:text-white">
                        Compre <b style="text-decoration: underline;">{{ item.sale.amount_tickets }}{{
                            item.sale.amount_tickets_end && item.sale.amount_tickets_end != item.sale.amount_tickets ? ' á '
                        + item.sale.amount_tickets_end : '' }} bilhetes</b> {{
                            item.sale.amount_tickets_end && item.sale.amount_tickets_end != item.sale.amount_tickets ? ' a partir de:' : ' por apenas:' }}
                    </h3>
                    <div class="space-x-4 relative flex items-center mb-5 text-success-100">
                        <span class="text-[32px] leading-10 font-medium">
                            R${{ extractNumberFromString(item.sale.price_amount) * item.sale.amount_tickets }}
                        </span>
                        <span class="text-xs text-white font-medium mt-3 py-1">sai por <b
                                style="text-decoration: underline;">{{ item.sale.price_amount }}</b> cada bilhete</span>
                    </div>

                </header>
            </div>
        </div>

        <!-- COMPRAR TICKETS AUTOMATICO -->
        <form v-if="visibleTickets == 0 && !allSelled"
            class="dark:text-white dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-700 form-div border bg-slate-900 text-white px-4 sm:px-6 py-6 rounded-2xl">
            <h2
                class="dark:text-white text-xs sm:text-sm text-slate-100  uppercase tracking-wider font-semibold text-center">
                Selecione a quantidade de bilhetes
            </h2>
            <div class="grid grid-cols-4 gap-2 mt-4 max-w-xl mx-auto">
                <Button aria-label="Incrementar +10" text="+10"
                    btnClass="border button  text-sm py-2 text-center rounded-lg  font-semibold" type="button"
                    @click="increment(10)" />
                <Button aria-label="Incrementar +20" text="+20"
                    btnClass="border button  text-sm py-2 text-center rounded-lg  font-semibold" type="button"
                    @click="increment(20)" />
                <Button aria-label="Incrementar +50" text="+50"
                    btnClass="border button  text-sm py-2 text-center rounded-lg  font-semibold" type="button"
                    @click="increment(50)" />
                <Button aria-label="Incrementar +100" text="+100"
                    btnClass="border button  text-sm py-2 text-center rounded-lg  font-semibold" type="button"
                    @click="increment(100)" />
            </div>
            <div class="flex items-center justify-center gap-4 mt-4 max-w-xl mx-auto">
                <Button aria-label="Botão de menos" text="-" btnClass="border p-1 rounded-full w-10 h-10" type="button"
                    @click="decrement" />
                <InputGroup type="number" v-model="quantity" class="text-center flex-1" id="input-quantity"
                    placeholder="Quantidade de bilhetes" />
                <Button aria-label="Botão de mais" text="+" btnClass="border p-1 rounded-full w-10 h-10" type="button"
                    @click="increment(1)" />
            </div>
            <div class="max-w-xl mx-auto mt-6 text-sm">
                <div class="flex items-center justify-between">
                    <h2
                        class="dark:text-white text-xs sm:text-sm text-slate-100  uppercase tracking-wider font-semibold text-center">
                        Valor final
                    </h2>

                    <h2
                        class="dark:text-white text-xs sm:text-sm text-slate-100  uppercase tracking-wider font-semibold text-center">
                        <span v-if="promotionActive"
                            class="bg-gradient-to-r from-info-600 to-success-500 dark:text-white dark:bg-gradient-to-r dark:from-warning-600 dark:to-danger-500 text-white rounded p-1">PROMOÇÃO</span>
                        R$&nbsp;{{ getTotalPrice }}
                    </h2>
                </div>
            </div>
            <div class="text-center">
                <Button aria-label="Reservar Agora" text="RESERVAR AGORA" type="button"
                    :btnClass="promotionActive ? 'btn bg-gradient-to-r from-info-600 to-success-500 w-9/12 mt-5 dark:text-white dark:bg-gradient-to-r dark:from-warning-600 dark:to-danger-500' : 'btn dark:bg-gradient-to-r dark:from-info-600 dark:to-success-500 bg-warning-500 w-9/12 mt-5'"
                    @click="handleTicketsAutomatic" />

            </div>
        </form>

        <!-- COMPRAR TICKETS MANUAL -->
        <div v-if="visibleTickets == 1 && !allSelled"
            class="dark:text-white dark:bg-gradient-to-r dark:from-slate-600 dark:to-slate-500 bg-slate-200 py-2 px-2 mt-2 rounded-md content-tickets form-div">
            <h2 class="text-sm dark:text-white text-slate-900 text-center mt-4" v-if="campaignShowFilters">Toque nos botões para filtrar números 👇</h2>
            <div class="grid grid-cols-3 gap-2 mt-4 max-w-xl mx-auto" v-if="campaignShowFilters">
                <Button aria-label="Filtrar números disponíveis" :text="'Disponíveis('+available_tickets+')'" type="button"
                    :btnClass="'btn bg-slate-900 text-white py-1 px-5 text-[0.65rem]'"
                    @click="getCampaignCollaboratorsTickets(-1)" />
                
                <Button aria-label="Filtrar números reservados" :text="'Reservados('+pending_tickets+')'" type="button"
                    :btnClass="'btn bg-white text-slate-900 py-1 px-5 text-[0.65rem]'"
                    @click="getCampaignCollaboratorsTickets(0)" />

                <Button aria-label="Filtrar números comprados" :text="'Comprados('+unavailable_tickets+')'" type="button"
                    :btnClass="'btn bg-success-500 text-white py-1 px-5 text-[0.65rem]'"
                    @click="getCampaignCollaboratorsTickets(1)" />
            </div>

            <h2 class="text-sm dark:text-white text-slate-900 text-center mb-[-15px] mt-4">Toque no número que deseja
                comprar 👇</h2>
            <Tickets :tickets="ticketsData" :key="ticketsData" :price_ticket="price" :compare_price_ticket="parseFloat(price_compare)"
                :sales_campaign="salesCampaign" @selectedTickets="handleTickets"/>

            <!--<Alert className="bg-danger-500 bg-opacity-[14%] text-danger-500 dark:bg-danger-500 dark:bg-opacity-[14%] mb-5"
                v-if="campaignStatus == false" type="danger-light">
                Para gerar os bilhetes você precisa publicar a campanha.
            </Alert>-->
            <!-- Paginação -->
            <!-- <div class="flex items-center justify-center">
                <Button aria-label="Anterior" @click="goToPreviousPage" :disabled="current === 1"
                    btnClass="btn bg-slate-900 text-white mr-2" text="Página Anterior" type="button" />
                 <div v-for="page in visiblePages" :key="page">
                <template v-if="page !== '...'">
                    <button @click="goToPage(page)" :class="{
                        'px-2 py-1 rounded-md bg-blue-500 text-white mr-2': current !== page,
                        'px-2 py-1 rounded-md bg-blue-700 text-white mr-2': current === page
                    }">
                        {{ page }}
                    </button>
                </template>
                <template v-else>
                    <span>...</span>
                </template>
            </div>

                <Button aria-label="Próxima página" @click="goToNextPage" :disabled="current === pageRange"
                    btnClass="btn bg-slate-900 text-white ml-2" text="Próxima" type="button" />
            </div>-->
        </div>

        <!-- TODOS VENDIDO -->
        <div class="form-div" v-if="allSelled">
            <div class="dark:text-white price-table rounded-[6px] shadow-base  p-3 text-slate-900 relative overflow-hidden z-[0]"
                :class="this.$store.state.isDark ? item_selled.bgDark : item_selled.bg">
                <div class="overlay absolute right-0 top-0 w-full h-full z-[-1]" v-if="item_selled.img">
                    <img :src="item_selled.img" class="ml-auto block" alt="123Rifas" width="256" height="340" />
                </div>
                <header class="mb-6">
                    <h2 class="text-sm mb-5" :class="item_selled.bg === 'bg-slate-900'
                        ? 'text-slate-100 dark:text-white'
                        : 'text-slate-900 dark:text-white'
                        ">
                        {{ item_selled.title }}
                    </h2>
                    <div class="space-x-4 relative flex items-center mb-5" :class="item_selled.bg === 'bg-slate-900'
                        ? 'text-slate-100'
                        : 'text-slate-900 '
                        ">
                        <span class="text-[16px] font-medium">
                            Todos os bilhetes foram vendidos, aguarde a divulgação do vencedor!
                        </span>
                    </div>
                </header>
            </div>
        </div>



        <br />

        <!-- INFOS USER -->
        <div class="form-div">
            <div class="flex space-x-4">
                <div class="flex-none">
                    <div class="h-20 w-20 rounded-full">
                        <img :src="urlImage ? urlImage : 'https://api.123rifas.com/storage/user-files/profile-user-4.svg'"
                            class="w-full h-full rounded-full" alt="123Rifas" width="250" height="130px" />
                    </div>
                </div>
                <div class="flex-1">
                    <h2 class="font-medium mb-1">
                        <span class="block font-light text-sm">Organizado por,</span>
                        <span class="block text-xl">{{ ownerName }}</span>
                    </h2>
                    <div class="text-sm font-light">
                        <Button aria-label="Botão de Suporte" text="Suporte"
                            btnClass="btn-success rounded-full text-sm px-2 py-1"
                            iconSVG='<svg viewBox="0 0 24 24" width="20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9001 16.124 19.0668 17.6222 17.5816C19.1205 16.0965 19.9715 14.0796 19.99 11.97C19.983 10.9173 19.7682 9.87634 19.3581 8.9068C18.948 7.93725 18.3505 7.05819 17.6 6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.511 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.66 11.93C18.6442 13.6859 17.9355 15.3645 16.6882 16.6006C15.441 17.8366 13.756 18.5301 12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6622 13.4958 10.8301 14.5293 12.2 15.22C12.9185 15.6394 13.7535 15.8148 14.58 15.72C14.8552 15.6654 15.1159 15.5535 15.345 15.3915C15.5742 15.2296 15.7667 15.0212 15.91 14.78C16.0428 14.4856 16.0846 14.1583 16.03 13.84C15.94 13.74 15.81 13.69 15.61 13.59Z" fill="#ffffff"></path> </g></svg>'
                            @click="openWhatsApp" />
                        <div v-if="socialMedias.length" class="mt-1">
                            <span class="text-sm font-light" v-for="item in socialMedias" :key="item.id">
                                <Button aria-label="Botão de Rede Social"
                                    :btnClass="'btn rounded-full text-sm px-1 py-1 mr-1 ' + item.bgColor"
                                    :iconSVG="item.svgIcon" @click="openSocialMedia(item.url)" v-if="item.url" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- MODAL RESERVAR BILHETES -->
        <Modal title="Reservar bilhetes" ref="modalReserve" centered themeClass="bg-slate-900">
            <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2">
                <Alert :type="this.$store.state.isDark ? 'info-light' : 'primary-light'"
                    style="padding:9px 12px;margin-bottom:8px" icon="akar-icons:check">
                    <span class="">Você esta adquirindo <b>{{ tickets_id.length ? tickets_id.length : quantity }}
                            títulos</b> da ação entre amigos <b>{{ campaignName }}</b>, suas cotas serão geradas assim
                        que
                        concluir a compra.</span>
                </Alert>
            </div>
            <!--FORM COLLABORATOR-->
            <div class="grid grid-cols-8" v-if="!collaboratorLoaded">
                <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3">
                    <InputGroup label="Nome:" v-model="form.name" placeholder="Escreva seu nome" :error="nameError"
                        prependIcon="heroicons-outline:identification" merged />
                </div>

                <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3"
                    v-if="campaignShowEmail || payMPStatus">
                    <InputGroup label="Email:" v-model="form.email" type="email" placeholder="seu@email.com"
                        :error="emailError" prependIcon="heroicons-outline:mail" merged />
                </div>

                <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3">
                    <InputGroup label="Telefone/Whatsapp:" v-model="form.phone" placeholder="00 90000 0000"
                        v-mask="['(##) ####-####', '(##) #####-####']" :error="phoneError"
                        prependIcon="heroicons-outline:phone" merged />
                    <Alert type="warning-light" style="padding:9px 12px;margin-bottom:8px" icon="akar-icons:triangle-alert">
                        <span class="">Digite seu número corretamente, revise antes de concluir!</span>
                    </Alert>
                </div>
                <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 py-3" v-if="!collaboratorLoaded">
                    <Checkbox :label="toggle_terms.label" activeClass="ring-success-500 bg-success-500"
                        v-model="form.allow_terms" :active="form.allow_terms" :error="allowTermsError" />
                </div>
            </div>

            <!-- CARD COLLABORATOR-->
            <div class="grid grid-cols-8" v-else>
                <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12  py-3 px-2">
                    <div class="rounded-md bg-slate-100 mb-2 p-4">
                        <span class="text-[13px]">Detalhes da sua reserva</span>
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <svg height="80px" width="50px" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <circle cx="12" cy="9" r="3" :stroke="this.$store.state.isDark
                                            ? '#1C274C' : '#1C274C'" stroke-width="1.5"></circle>
                                        <circle cx="12" cy="12" r="10" :stroke="this.$store.state.isDark
                                            ? '#1C274C' : '#1C274C'" stroke-width="1.5"></circle>
                                        <path
                                            d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                                            :stroke="this.$store.state.isDark
                                                ? '#1C274C' : '#1C274C'" stroke-width="1.5" stroke-linecap="round">
                                        </path>
                                    </g>
                                </svg>
                            </div>
                            <div class="ml-3">
                                <h3 class="font-semibold text-2xl text-slate-900 dark:text-slate-900">{{
                                    collaborator.name
                                }}</h3>
                                <div class="mt-1 text-sm font-medium text-slate-900 dark:text-slate-900">
                                    <p>{{ collaborator.phone }}</p>
                                    <p v-if="collaborator.email">{{ collaborator.email }}</p>
                                </div>
                            </div>
                            <div class="flex-shrink-0 m-auto">
                                <svg height="30px" width="30px" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"></path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="lg:col-span-12 col-span-12 xl:col-span-12 sm:col-span-12 px-2">
                    <p class="text-[12px] dark:text-white text-slate-900 px-3">Li e concordo com os <a
                            aria-label="Termos de uso" class="font-weight-500" target="_blank"
                            href="https://123rifas.com/termos-de-uso"><b>Termos e
                                Condições</b></a>, e estou ciente de que essa reserva me vincula apenas à esta campanha
                        criada pelo(a) organizador(a) e <b>NÃO a plataforma.</b></p>
                </div>
            </div>

            <template v-slot:footer>
                <Button v-if="collaboratorLoaded" id="changeCollaborator" text="Usar outra conta"
                    btnClass="btn bg-light-100 text-slate-900 dark:text-white" @click="changeCollaborator" />
                <Button v-if="canBackCollaborator" id="backCollaborator" text="Voltar"
                    btnClass="btn bg-light-100 text-slate-900 dark:text-white" @click="backCollaborator" />
                <Button id="submitButton" text="Finalizar Reserva" btnClass="btn bg-warning-500 text-white "
                    @click="reserveTickets" />
            </template>
        </Modal>
    </div>
    <footer class="bg-slate-800 py-1.5 px-1 text-center static bottom-0 mt-2">
        <div class="mt-2 flex justify-center items-center">
            <p class="text-white text-xs">criado com</p>
            <a href="/" aria-label="Ir para inicio do site 123Rifas"
                class="text-xl text-center flex justify-center font-bold tracking-wide">
                <img class="h-5 ml-1.5" src="@/assets/images/logo/logo.svg" width="50" height="20" alt="123Rifas">
            </a>
        </div>
        <div class="p-1 flex text-xs items-center justify-center gap-2 text-white">
            <a target="_blank" href="https://123rifas.com/termos-de-uso/">Termos de Uso</a>
            <span class="text-white">|</span>
            <a target="_blank" href="https://123rifas.com/politica-de-privacidade/">Políticas de Privacidade</a>
        </div>
    </footer>
    <noscript><img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id={{customizationPixelMeta}}&ev=PageView&noscript=1" /></noscript>
</template>
  
<script>
import Alert from "@/components/Alert";
import { v4 as uuidv4 } from "uuid";
import Tickets from "./tickets.vue";
import Modal from "@/components/Modal/ModalCustom";
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import Card from '@/components/Card';
import InputGroup from '@/components/InputGroup';
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import Select from '@/components/Select';
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import Checkbox from '@/components/Checkbox';
import HeaderCampaign from "@/components/Header/header-campaign.vue";
import { mask } from 'vue-the-mask';
export default {
    directives: { mask },
    components: {
        HeaderCampaign,
        Button,
        InputGroup,
        Card,
        Tickets,
        Select,
        Modal,
        Checkbox,
        Alert,
        Badge
    },
    setup() {
        // Define a validation schema
        const schema = yup.object({
            name: yup.string().required("Nome é obrigatório"),
            phone: yup.string().required("Telefone é obrigatório"),
            email: yup.string().required("Email é obrigatório").email()
        });

        const { handleSubmit } = useForm({
            validationSchema: schema,
        });
        // No need to define rules for fields

        const { value: name, errorMessage: nameError } = useField("name");
        const { value: phone, errorMessage: phoneError } = useField("phone");
        const { value: email, errorMessage: emailError } = useField("email");
        const { value: allow_terms, errorMessage: allowTermsError } = useField("allow_terms");
        const onSubmit = handleSubmit(() => {
            // console.warn(values.email);

        });

        return {
            name,
            nameError,
            phone,
            phoneError,
            email,
            emailError,
            allow_terms,
            allowTermsError,
            onSubmit,
        };
    },
    data() {
        return {
            available_tickets: null,
            unavailable_tickets: null,
            pending_tickets: null,
            collaboratorLoaded: false,
            payment: [],
            socialMedias: [],
            campaignShowRanking: false,
            options: {
                prefix: {
                    numericOnly: true,
                    prefix: "+55",
                    blocks: [3, 2, 5, 4],
                    uppercase: true,
                },
            },
            form: {
                name: null,
                phone: null,
                email: null,
                allow_terms: false
            },
            allSelled: false,
            isMounted: false,
            collaborator: {},
            salesCampaign: [],
            awardsCampaign: [],
            paymentMethods: [],
            customizationImage: '',
            customizationPixelMeta: '',
            customizationTagGoogle: '',
            payMPStatus: false,
            toggle_terms: {
                label: 'Li e concordo com os Termos e Condições, e estou ciente de que essa reserva me vincula apenas à esta campanha criada pelo(a) organizador(a) e NÃO a plataforma.',
                value: 'bg-success-500',
                prevIcon: 'heroicons-outline:check',
                nextIcon: 'heroicons-outline:ban',
            },
            current: 1,
            perpage: 200,
            pageRange: 2,
            totalData: 0,
            currentPage: 1,
            searchTerm: '',
            check: true,
            campaignStatus: true,
            campaignReleasedUntilFee: false,
            campaignName: '',
            campaignId: '',
            campaignExpireDate: '',
            campaignShowDateRaffle: false,
            campaignShowFilters: true,
            userId: '',
            campaignImage: '',
            description: '',
            ownerName: '',
            urlImage: '',
            phoneNumber: '',
            raffle: '',
            quantity: 1,
            price: '',
            price_compare: '',
            item: {
                title: "Bilhetes por apenas",
                button: "Reservar Agora",
                bg: "bg-slate-900",
                bgDark: "dark:bg-gradient-to-r dark:from-info-600 dark:to-success-500",
                ribon: "Desconto hoje!",
                img: require("@/assets/images/all-img/big-shap2.png"),
            },
            item_selled: {
                title: "🎉Os bilhetes se encerraram",
                button: "Reservar Agora",
                bg: "bg-slate-900",
                bgDark: "dark:bg-gradient-to-r dark:from-info-600 dark:to-success-500",
                ribon: "Desconto hoje!",
                img: require("@/assets/images/all-img/big-shap2.png"),
            },
            ticketsData: [],
            visiblePages: [],
            ticketFilterOptions: [
                { value: "-1", label: "Disponíveis" },
                { value: "0", label: "Reservado" },
                { value: "1", label: "Comprados" },
            ],
            filterStatus: -1,
            visibleTickets: -1,
            tickets_id: [],
            promotionActive: false,
            totalPrice: '',
            top3ranking: [],
            payment: [],
            campaignSlug: '',
            ranking_acumulative: false,
            canBackCollaborator: false,
            amount_of_tickets: 100,
        }
    },
    created() {
        // Recupere os parâmetros da rota para obter o nome e o ID da campanha
        this.campaignId = this.$route.params.id ? this.$route.params.id : '';
        this.campaignSlug = this.$route.params.slug ? this.$route.params.slug : '';
        this.getCampaignById()
    },
    mounted() {
        this.updateVisiblePages();
    },
    computed: {
        getTotalPrice() {
            let price = this.price;
            this.promotionActive = false;
            if (this.salesCampaign.length) {
                this.salesCampaign.forEach((item) => {

                    if ((!item.sale.amount_tickets_end && item.sale.amount_tickets == this.quantity) ||
                        (item.sale.amount_tickets <= this.quantity && this.quantity <= item.sale.amount_tickets_end)) {
                        price = this.extractNumberFromString(item.sale.price_amount);
                        this.promotionActive = true;
                    }


                })
            }
            this.totalPrice = (this.quantity * price).toFixed(2);
            return this.totalPrice;
        },
        pageRanged() {
            if (this.pageRange <= 10) {
                return Array.from({ length: this.pageRange }, (_, i) => i + 1);
            } else {
                const currentPage = parseInt(this.current);
                let startPage = currentPage - 4;
                let endPage = currentPage + 5;

                if (startPage < 1) {
                    startPage = 1;
                    endPage = 10;
                } else if (endPage > this.pageRange) {
                    startPage = this.pageRange - 9;
                    endPage = this.pageRange;
                }

                return [...Array(endPage - startPage + 1)].map((_, i) => startPage + i);
            }
        },
        backgroundStyle() {
            return {
                backgroundImage: `url(${this.campaignImage})`,
            }
        },
    },
    methods: {
        backCollaborator() {
            this.collaborator = JSON.parse(localStorage.getItem('collaborator'));
            if (this.collaborator) {
                this.collaboratorLoaded = true;
                this.form.name = this.collaborator.name;
                this.form.email = this.collaborator.email;
                this.form.phone = this.collaborator.phone;
                this.form.allow_terms = true;
            }
            this.canBackCollaborator = false;
        },
        changeCollaborator() {
            this.collaboratorLoaded = false;
            this.collaborator = {}
            this.form = {
                name: null,
                phone: null,
                email: null,
                allow_terms: false
            }
            this.canBackCollaborator = true;
        },
        /*generatePaymentCampaignPix() {
            const toast = useToast();
            const url_payemnt_check = `${process.env.VUE_APP_API_BASE_URL}/payment/campaign/${this.campaignId}/user/${this.userId}`;
            let self = this;

            fetch(url_payemnt_check, {
                method: 'GET'
            }).then(response => response.json())
                .then(res => {

                    const validStatus = ["rejected", "cancelled", "refunded", "chargeback"];

                    const url_payment = `${process.env.VUE_APP_API_BASE_URL}/payment/pix`;

                    let form = {
                        'user_id': this.userId,
                        'campaign_id': this.campaignId
                    }

                    let payment_bd = res.data[0];

                    if (!payment_bd) {

                        // Fazer uma requisição POST para o endpoint do Laravel
                        fetch(url_payment, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            verify: false,
                            body: JSON.stringify(form)
                        })
                            .then(response => response.json())
                            .then(response => {
                                if (!response.payment.error) {
                                    this.payment = response.payment
                                    this.createPayment()
                                } else {
                                    toast.error("Cadastre uma chave pix no Mercado Pago!", {
                                        timeout: 5000,
                                    });
                                }
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
                                    'Content-Type': 'application/json'
                                },
                                verify: false,
                                body: JSON.stringify(form)
                            })
                                .then(response => response.json())
                                .then(response => {
                                    this.payment = response.payment
                                    this.updatePayment(payment_bd.id)
                                })
                                .catch(error => {
                                    console.error(error);
                                });

                        } else {
                            self.$router.push('/payment/' + payment_bd.transaction_id);
                        }
                    }
                })

        },*/
        createPayment() {

            const url_payment = `${process.env.VUE_APP_API_BASE_URL}/create/payment`;
            let self = this;

            let form = {
                'transaction_id': String(this.payment.id),
                'amount': this.payment.transaction_amount,
                'currency': this.payment.currency_id,
                'status': this.payment.status,
                'user_id': this.userId,
                'campaign_id': this.campaignId
            }

            // Fazer uma requisição POST para o endpoint do Laravel
            fetch(url_payment, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                verify: false,
                body: JSON.stringify(form)
            })
                .then(response => response.json())
                .then(response => {
                    if (response) {
                        self.$router.push('/payment/' + this.payment.id);
                    }
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
                'user_id': this.userId,
                'campaign_id': this.campaignId
            }

            // Fazer uma requisição POST para o endpoint do Laravel
            fetch(url_payment, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                verify: false,
                body: JSON.stringify(form)
            })
                .then(response => response.json())
                .then(response => {
                    if (response) {
                        self.$router.push('/payment/' + this.payment.id);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        },
        getPercentPromotion(price_sale) {
            price_sale = this.extractNumberFromString(price_sale)
            let price = this.price;
            if (price_sale < price) {
                return ((1 - (price_sale / price)) * 100).toFixed(0);
            } else {
                return ((1 - (price / price_sale)) * 100).toFixed(0);
            }
        },
        increment(value) {
            this.quantity = parseInt(this.quantity) + value;
        },
        decrement() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        reservar() {
            // Lógica para reservar os bilhetes
            let ticket_ids = []

            this.selectedTickets.forEach(ticket => {
                ticket_ids.push(ticket.id)
            });

        },
        formattedDate(originalDate) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
            const date = new Date(originalDate);
            return date.toLocaleDateString('pt-BR', options);
        },
        getCampaignById() {

            const toast = useToast();
            let self = this;
            let url = '';
            if (this.campaignId && !this.campaignSlug) {
                url = process.env.VUE_APP_API_BASE_URL + '/campaign/uuid/' + this.campaignId;
            } else if (this.campaignSlug) {
                url = process.env.VUE_APP_API_BASE_URL + '/campaign/slug/' + this.campaignSlug;
            }

            fetch(url, {
                method: 'GET'
            }).then(response => response.json())
                .then(res => {

                    if (res[0]) {
                        if (!res[0].visible) {
                            self.$router.push('/');
                        }

                        if (res[0].closed) {
                            self.$router.push('/acao/encerrada/' + this.campaignSlug);
                        }

                        if(res[0].user.delete_account){
                            self.$router.push('/');
                        }

                        
                        this.isMounted = true;

                        
                        if (res[0].dark_mode == true) {
                            document.body.classList.remove("light");
                            document.body.classList.add("dark");
                            this.$store.state.theme = "dark";
                            this.$store.state.isDark = true;
                        } else {
                            document.body.classList.remove("dark");
                            document.body.classList.add("light");
                            this.$store.state.theme = "light";
                            this.$store.state.isDark = false;
                        }
                        this.collaborator = JSON.parse(localStorage.getItem('collaborator'));
                        if (this.collaborator) {
                            this.collaboratorLoaded = true;
                            this.form.name = this.collaborator.name;
                            this.form.email = this.collaborator.email;
                            this.form.phone = this.collaborator.phone;
                            this.form.allow_terms = true;
                        }

                        this.quantity = res[0].min_ticket;
                        this.campaignId = res[0].id;
                        this.price = this.extractNumberFromString(res[0].price_each_ticket)
                        this.price_compare = (this.price * 0.5 + this.price).toFixed(2)
                        this.description = res[0].description
                        this.ownerName = res[0].user.name
                        if (res[0].user.nickname) {
                            this.ownerName = res[0].user.nickname
                        }
                        this.phoneNumber = res[0].support_number
                        this.urlImage = res[0].user.image
                        this.campaignName = res[0].name;
                        this.campaignImage = res[0].image
                        this.campaignStatus = res[0].status
                        this.campaignReleasedUntilFee = res[0].released_until_fee
                        this.campaignShowEmail = res[0].show_email_input
                        this.campaignShowRanking = res[0].show_top_ranking
                        this.campaignShowDateRaffle = res[0].show_date_of_raffle
                        this.campaignShowFilters = res[0].show_filters
                        this.amount_of_tickets = res[0].amount_tickets
                        this.available_tickets = res[0].amount_tickets - (res[0].unavailable_tickets + res[0].pending_tickets)
                        this.pending_tickets = res[0].pending_tickets
                        this.unavailable_tickets = res[0].unavailable_tickets
                        this.allSelled = res[0].amount_tickets == res[0].unavailable_tickets ? true : false;
                        const date = this.formattedDate(res[0].date_of_raffle);


                        res[0].user.social_medias.forEach((social_media) => {
                            if (social_media.name.toLowerCase().includes('whatsapp')) {
                                social_media.bgColor = 'bg-success-500'
                                social_media.svgIcon = '<svg viewBox="0 0 24 24" width="20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9001 16.124 19.0668 17.6222 17.5816C19.1205 16.0965 19.9715 14.0796 19.99 11.97C19.983 10.9173 19.7682 9.87634 19.3581 8.9068C18.948 7.93725 18.3505 7.05819 17.6 6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.511 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.66 11.93C18.6442 13.6859 17.9355 15.3645 16.6882 16.6006C15.441 17.8366 13.756 18.5301 12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6622 13.4958 10.8301 14.5293 12.2 15.22C12.9185 15.6394 13.7535 15.8148 14.58 15.72C14.8552 15.6654 15.1159 15.5535 15.345 15.3915C15.5742 15.2296 15.7667 15.0212 15.91 14.78C16.0428 14.4856 16.0846 14.1583 16.03 13.84C15.94 13.74 15.81 13.69 15.61 13.59Z" fill="#ffffff"></path> </g></svg>'
                            } else if (social_media.name.toLowerCase().includes('instagram')) {
                                social_media.bgColor = 'bg-pink-500'
                                social_media.svgIcon = '<svg viewBox="0 0 24 24" width="20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#ffffff"></path> <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="#ffffff"></path> </g></svg>'
                            } else if (social_media.name.toLowerCase().includes('tiktok')) {
                                social_media.bgColor = 'bg-black-500'
                                social_media.svgIcon = '<svg fill="#ffffff" width="20" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>tiktok</title> <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path> </g></svg>'
                            } else if (social_media.name.toLowerCase().includes('youtube')) {
                                social_media.bgColor = 'bg-red-500'
                                social_media.svgIcon = '<svg viewBox="0 0 24 24" width="20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.49614 7.13176C9.18664 6.9549 8.80639 6.95617 8.49807 7.13509C8.18976 7.31401 8 7.64353 8 8V16C8 16.3565 8.18976 16.686 8.49807 16.8649C8.80639 17.0438 9.18664 17.0451 9.49614 16.8682L16.4961 12.8682C16.8077 12.6902 17 12.3589 17 12C17 11.6411 16.8077 11.3098 16.4961 11.1318L9.49614 7.13176ZM13.9844 12L10 14.2768V9.72318L13.9844 12Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 12C0 8.25027 0 6.3754 0.954915 5.06107C1.26331 4.6366 1.6366 4.26331 2.06107 3.95491C3.3754 3 5.25027 3 9 3H15C18.7497 3 20.6246 3 21.9389 3.95491C22.3634 4.26331 22.7367 4.6366 23.0451 5.06107C24 6.3754 24 8.25027 24 12C24 15.7497 24 17.6246 23.0451 18.9389C22.7367 19.3634 22.3634 19.7367 21.9389 20.0451C20.6246 21 18.7497 21 15 21H9C5.25027 21 3.3754 21 2.06107 20.0451C1.6366 19.7367 1.26331 19.3634 0.954915 18.9389C0 17.6246 0 15.7497 0 12ZM9 5H15C16.9194 5 18.1983 5.00275 19.1673 5.10773C20.0989 5.20866 20.504 5.38448 20.7634 5.57295C21.018 5.75799 21.242 5.98196 21.4271 6.23664C21.6155 6.49605 21.7913 6.90113 21.8923 7.83269C21.9973 8.80167 22 10.0806 22 12C22 13.9194 21.9973 15.1983 21.8923 16.1673C21.7913 17.0989 21.6155 17.504 21.4271 17.7634C21.242 18.018 21.018 18.242 20.7634 18.4271C20.504 18.6155 20.0989 18.7913 19.1673 18.8923C18.1983 18.9973 16.9194 19 15 19H9C7.08058 19 5.80167 18.9973 4.83269 18.8923C3.90113 18.7913 3.49605 18.6155 3.23664 18.4271C2.98196 18.242 2.75799 18.018 2.57295 17.7634C2.38448 17.504 2.20866 17.0989 2.10773 16.1673C2.00275 15.1983 2 13.9194 2 12C2 10.0806 2.00275 8.80167 2.10773 7.83269C2.20866 6.90113 2.38448 6.49605 2.57295 6.23664C2.75799 5.98196 2.98196 5.75799 3.23664 5.57295C3.49605 5.38448 3.90113 5.20866 4.83269 5.10773C5.80167 5.00275 7.08058 5 9 5Z" fill="#ffffff"></path> </g></svg>'
                            } else if (social_media.name.toLowerCase().includes('facebook')) {
                                social_media.bgColor = 'bg-blue-500'
                                social_media.svgIcon = '<svg viewBox="0 0 24 24" width="20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 12.05C19.9813 10.5255 19.5273 9.03809 18.6915 7.76295C17.8557 6.48781 16.673 5.47804 15.2826 4.85257C13.8921 4.2271 12.3519 4.01198 10.8433 4.23253C9.33473 4.45309 7.92057 5.10013 6.7674 6.09748C5.61422 7.09482 4.77005 8.40092 4.3343 9.86195C3.89856 11.323 3.88938 12.8781 4.30786 14.3442C4.72634 15.8103 5.55504 17.1262 6.69637 18.1371C7.83769 19.148 9.24412 19.8117 10.75 20.05V14.38H8.75001V12.05H10.75V10.28C10.7037 9.86846 10.7483 9.45175 10.8807 9.05931C11.0131 8.66687 11.23 8.30827 11.5161 8.00882C11.8022 7.70936 12.1505 7.47635 12.5365 7.32624C12.9225 7.17612 13.3368 7.11255 13.75 7.14003C14.3498 7.14824 14.9482 7.20173 15.54 7.30003V9.30003H14.54C14.3676 9.27828 14.1924 9.29556 14.0276 9.35059C13.8627 9.40562 13.7123 9.49699 13.5875 9.61795C13.4627 9.73891 13.3667 9.88637 13.3066 10.0494C13.2464 10.2125 13.2237 10.387 13.24 10.56V12.07H15.46L15.1 14.4H13.25V20C15.1399 19.7011 16.8601 18.7347 18.0985 17.2761C19.3369 15.8175 20.0115 13.9634 20 12.05Z" fill="#ffffff"></path> </g></svg>'
                            } else if (social_media.name.toLowerCase().includes('telegram')) {
                                social_media.bgColor = 'bg-blue-300'
                                social_media.svgIcon = '<svg viewBox="0 0 24 24" width="20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" fill="#ffffff"></path> </g></svg>'
                            }
                        })

                        this.socialMedias = res[0].user.social_medias;
                        this.campaignExpireDate = date;
                        this.userId = res[0].user_id

                        if (!res[0].image) {
                            this.campaignImage = require('@/assets/images/all-img/card-1.png')
                        }


                        this.raffle = res[0].raffle.name

                        if (res[0].ticket_filter.name.includes("manualmente")) {
                            this.visibleTickets = 1;
                            if (res[0].numbers) {
                                this.ticketsData = res[0].numbers;
                            } else {
                                const maxNumber = this.amount_of_tickets;
                                const allNumbers = this.generateNumbersArray(maxNumber);

                                const numbersWithStatus = allNumbers.map((number, index) => ({
                                    id: index + 1,
                                    number,
                                    status: '1'
                                }));

                                this.ticketsData = numbersWithStatus;
                            }
                            //this.getCampaignCollaboratorsTickets()
                        } else {
                            this.visibleTickets = 0;
                        }

                        this.awardsCampaign = res[0].award_campaigns;
                        this.awardsCampaign.sort((a, b) => a.position - b.position);
                        res[0].sale_campaigns.sort((a, b) => a.position - b.position);
                        this.salesCampaign = res[0].sale_campaigns;

                        if (res[0].user.payment_methods) {
                            this.paymentMethods = res[0].user.payment_methods

                            let payMP = res[0].user.payment_methods.find(method => method.name_method === 'Mercado Pago');
                            if (payMP) {
                                this.payMPStatus = payMP.status;
                            }
                            //console.log(res[0].user.payment_methods)
                        }

                        if (res[0].user.customizations.length) {
                            if (res[0].user.customizations[0].image) {
                                this.customizationImage = res[0].user.customizations[0].image;
                            } else {
                                this.customizationImage = 'https://app.123rifas.com/img/logo.adc7f19e.svg';
                            }
                            this.customizationPixelMeta = res[0].user.customizations[0].pixel_meta;
                            this.customizationTagGoogle = res[0].user.customizations[0].tag_gooogle;

                            fbq('init', this.customizationPixelMeta);
                            fbq('track', 'PageView');
                        } else {
                            this.customizationImage = 'https://app.123rifas.com/img/logo.adc7f19e.svg';
                        }

                        if (res[0].show_top_ranking) {
                            if (res[0].ranking_acumulative) {
                                this.ranking_acumulative = res[0].ranking_acumulative;
                                this.top3ranking = res[0].top3_collaborators_acumulative;
                            } else {
                                this.top3ranking = res[0].top3_collaborators;
                            }
                        }
                    } else {
                        toast.error(res.message, {
                            timeout: 2000,
                        });
                        self.$router.push('/');
                    }
                })
        },
        generateNumbersArray(maxNumber) {
            const allNumbers = [];
            for (let i = 0; i < maxNumber; i++) {
                const formattedNumber = String(i).padStart(String(maxNumber - 1).length, '0');
                allNumbers.push(formattedNumber);
            }
            return allNumbers;
        },
        countDigits(numero) {
            // Converte o número para uma string
            var numeroString = numero.toString();

            // Retorna o comprimento da string (quantidade de dígitos)
            return numeroString.length;
        },
        getCampaignCollaboratorsTickets(status) {

            const toast = useToast();

            const url = `${process.env.VUE_APP_API_BASE_URL}/campaign/${this.campaignId}/collaborators/tickets/${status}`;

            fetch(url, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(res => {
                    if (!res.message) {

                        if(res[0].original.length){
                            this.ticketsData = res[0].original;
                        }else{
                            toast.info(`Nenhum bilhete ${status == 1 ? 'Comprado' : 'Reservado'}`, {
                                timeout: 2000,
                            });
                        }
                        
                    } else {
                        toast.error(res.message, {
                            timeout: 2000,
                        });
                    }
                })
                .catch(error => {
                    console.error(error);
                });
            
        },
        extractNumberFromString(str) {
            // Remover os caracteres não numéricos da string
            var numberStr = str.replace(/[^\d.,]/g, '');

            // Substituir a vírgula por ponto decimal
            numberStr = numberStr.replace(',', '.');
            numberStr = numberStr.replace('R$', '');

            // Converter a string para float
            var number = parseFloat(numberStr);

            return number;
        },
        clearPhone(telefone) {
            // Use uma expressão regular para remover todos os caracteres não numéricos, exceto o '+'
            return telefone.replace(/[^\d+]/g, '');
        },
        openWhatsApp() {
            let phoneclear = this.clearPhone(this.phoneNumber);

            if (!phoneclear.includes('+55') && !phoneclear.includes('+')) {
                phoneclear = '+55' + phoneclear.replace(/^55/, "XX")
            }
            
            const url = `https://wa.me/${phoneclear}?text=Olá, gostaria de saber mais sobre sua campanha [${this.campaignName}].`; // URL do WhatsApp com o número de telefone
            window.open(url, '_blank'); // Abrir em uma nova aba
        },
        openSocialMedia(url) {
            window.open(url, '_blank'); // Abrir em uma nova aba
        },
        toggle() {
            this.check = !this.check;
        },
        getPreviousPageUrl(links) {
            const previousLink = links.find(link => link.label === '&laquo; Previous');
            return previousLink ? previousLink.url : null;
        },
        updateVisiblePages() {
            this.visiblePages = this.pageRanged.slice(
                Math.max(this.pageRanged.indexOf(this.current) - 4, 0),
                Math.min(this.pageRanged.indexOf(this.current) + 5, this.pageRanged.length)
            );
        },
        handleTickets(tickets_id) {
            this.tickets_id = tickets_id;
            fbq('track', 'AddToCart', { value: this.totalPrice, currency: "BRL" });
            this.$refs.modalReserve.openModal()

        },
        handleTicketsAutomatic() {
            if (this.campaignStatus || this.campaignReleasedUntilFee) {
                fbq('track', 'AddToCart', { value: this.totalPrice, currency: "BRL" });

            }
            this.$refs.modalReserve.openModal()
        },
        reserveTickets() {

            const toast = useToast();
            let self = this;
            if (this.paymentMethods.length) {
                let payMethodActive = false;

                let methodPayment = {};

                this.paymentMethods.forEach(payMethod => {
                    if (payMethod.status) {
                        payMethodActive = true;
                        methodPayment = payMethod;
                    }
                });

                if (payMethodActive) {
                    if (this.campaignStatus || this.campaignReleasedUntilFee) {
                        let form = this.form;

                        const url = `${process.env.VUE_APP_API_BASE_URL}/create/collaborator`;

                        if (form.phone) {
                            form.phone = form.phone.replace(/\s/g, '');
                        }

                        if (this.tickets_id.length) {
                            form.amount_of_tickets = this.tickets_id.length
                        } else {
                            form.amount_of_tickets = this.quantity
                        }

                       // form.ticket_ids = JSON.stringify(this.tickets_id)

                        form.numbers = this.tickets_id.map(function (ticketId) {
                            var ticket = self.ticketsData.find(function (ticketData) {
                                return ticketData.id === ticketId;
                            });
                            return ticket ? ticket.number : '';
                        }).join(',');

                        
                        form.campaign_id = this.campaignId
                        const submitButton = document.getElementById("submitButton");

                        // Desabilite o botão e mostre o spinner
                        submitButton.disabled = true;

                        let backdrop = this.showBackDrop('Preparando tudo para sua aquisição ...');

                        this.$refs.modalReserve.closeModal()

                        fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(form),
                        })
                            .then(response => response.json())
                            .then(res => {
                                const router = useRouter();
                                // Verifique se os dados retornados estão no formato esperado
                                if (res.collaborator) {
                                    this.collaborator = res.collaborator;
                                    localStorage.setItem("collaborator", JSON.stringify(this.collaborator));
                                    this.$refs.modalReserve.closeModal()
                                    toast.info("Reserva efetuada!", {
                                        timeout: 2000,
                                    });
                                    //this.generatePaymentPix()
                                    //fbq('track', 'InitiateCheckout', { value: this.totalPrice, currency: "BRL" });
                                    // self.$router.push("/checkout/" + res.collaborator.uuid);

                                    fbq('track', 'InitiateCheckout');

                                    this.payment = res.collaborator.payment;

                                   self.$router.push('/payment/' + res.collaborator.payment.transaction_id);
                                } else {
                                    this.$refs.modalReserve.closeModal()
                                    toast.error(res.message, {
                                        timeout: 2000,
                                    });
                                }
                            })
                            .finally(() => {
                                // Após a conclusão da requisição, remova o spinner e reabilite o botão
                                backdrop.remove();
                                // Reabilite o botão e esconda o spinner quando a requisição for concluída
                                submitButton.disabled = false;
                            })
                            .catch(error => {
                                // Trate o erro aqui, exiba uma mensagem de erro ou faça outra ação necessária
                                console.error(error);
                            });

                    } else {
                        this.$refs.modalReserve.closeModal()
                        toast.error("Campanha ainda não foi publicada.", {
                            timeout: 2000,
                        });
                    }
                } else {
                    this.$refs.modalReserve.closeModal()
                    toast.error("Nenhum método de pagamento ativo.", {
                        timeout: 2000,
                    });
                }
            } else {
                this.$refs.modalReserve.closeModal()
                toast.error("Nenhum método de pagamento cadastrado.", {
                    timeout: 2000,
                });
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
       /* generatePaymentPix() {
            const toast = useToast();
            this.paymentMethods.forEach(payMethod => {

                if (payMethod.name_method === 'Mercado Pago' && payMethod.status) {

                    const url_payment = `${process.env.VUE_APP_API_BASE_URL}/payment/pix`;
                    //const url_callback = `${process.env.VUE_APP_API_BASE_URL}/payment/callback`;

                    let form = {
                        'collaborator_id': this.collaborator.id,
                        'campaign_id': this.collaborator.campaign_id
                    }

                    // Fazer uma requisição POST para o endpoint do Laravel
                    fetch(url_payment, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        verify: false,
                        body: JSON.stringify(form)
                    })
                        .then(response => response.json())
                        .then(response => {

                            if (!response.payment.error) {
                                this.payment = response.payment
                                this.createPayment()
                            } else {
                                toast.error("Cadastre uma chave pix no Mercado Pago!", {
                                    timeout: 5000,
                                });
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                } else if (payMethod.name_method === 'Transferência PIX' && payMethod.status) {
                    this.pixGenerated = true;
                    this.payment.id = uuidv4();
                    this.payment.currency_id = 'R$'
                    this.payment.status = 'pending'
                    this.createPayment()
                }

            });
        },
        createPayment() {

            const url_payment = `${process.env.VUE_APP_API_BASE_URL}/create/payment`;
            let self = this;

            let form = {
                'transaction_id': String(this.payment.id),
                'amount': this.extractNumberFromString(this.collaborator.price_each_ticket) * this.collaborator.amount_of_tickets,
                'currency': this.payment.currency_id,
                'status': this.payment.status,
                'collaborator_id': this.collaborator.id,
                'campaign_id': this.collaborator.campaign_id
            }

            fbq('track', 'Purchase', {
                content_type: 'product', value: form.amount, currency: "BRL", num_items: this.collaborator.amount_of_tickets
            });

            // Fazer uma requisição POST para o endpoint do Laravel
            fetch(url_payment, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                verify: false,
                body: JSON.stringify(form)
            })
                .then(response => response.json())
                .then(response => {
                    self.$router.push('/payment/' + this.payment.id);
                })
                .catch(error => {
                    console.error(error);
                });
        }*/
    }
}
</script>
<style>
.form-div>.input-group-control {
    text-align: center;
}

.form-div {
    max-width: 800px;
    margin: auto;
    margin-top: 4px;
}

.form-div-bg {
    width: 100%;
    height: 480px;
    /* Defina a altura desejada */
    background-size: cover;
    /* Ajuste o tamanho da imagem */
    background-position: center;
    /* Posição da imagem */
}

@media (min-width: 750px) {
    .form-div-bg {
        height: 800px;
    }
}

.form-div-2 {
    max-width: 400px;
    margin: auto;
    margin-top: 20px;
}

.raffle {
    border: 1px solid #ccc;
    font-size: 12px;
    width: 160px;
    border-radius: 8px;
}

.content-tickets {
    margin-bottom: 15px;
}

.title-rifa {
    left: 50%;
    width: 85%;
    max-width: 450px;
    text-align: center;
    transform: translate(-50%, -50%);
    padding: 8px;
    border-radius: 20px;
}

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
}
</style>