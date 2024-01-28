<template>
    <div class="form-div" v-if="collaborator.id || campaign.id" style="margin-top: 0px!important;">
        <div class="text-left pl-3 pt-5 pb-5 bg-success-500 text-white"
            v-if="collaborator.status_payment == 1 || campaign.status == 1">
            <svg style="display: inline-block;margin-top:-5px;" viewBox="0 0 24 24" width="35px" fill="none"
                xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path opacity="0.1"
                        d="M13.8179 4.54512L13.6275 4.27845C12.8298 3.16176 11.1702 3.16176 10.3725 4.27845L10.1821 4.54512C9.76092 5.13471 9.05384 5.45043 8.33373 5.37041L7.48471 5.27608C6.21088 5.13454 5.13454 6.21088 5.27608 7.48471L5.37041 8.33373C5.45043 9.05384 5.13471 9.76092 4.54512 10.1821L4.27845 10.3725C3.16176 11.1702 3.16176 12.8298 4.27845 13.6275L4.54512 13.8179C5.13471 14.2391 5.45043 14.9462 5.37041 15.6663L5.27608 16.5153C5.13454 17.7891 6.21088 18.8655 7.48471 18.7239L8.33373 18.6296C9.05384 18.5496 9.76092 18.8653 10.1821 19.4549L10.3725 19.7215C11.1702 20.8382 12.8298 20.8382 13.6275 19.7215L13.8179 19.4549C14.2391 18.8653 14.9462 18.5496 15.6663 18.6296L16.5153 18.7239C17.7891 18.8655 18.8655 17.7891 18.7239 16.5153L18.6296 15.6663C18.5496 14.9462 18.8653 14.2391 19.4549 13.8179L19.7215 13.6275C20.8382 12.8298 20.8382 11.1702 19.7215 10.3725L19.4549 10.1821C18.8653 9.76092 18.5496 9.05384 18.6296 8.33373L18.7239 7.48471C18.8655 6.21088 17.7891 5.13454 16.5153 5.27608L15.6663 5.37041C14.9462 5.45043 14.2391 5.13471 13.8179 4.54512Z"
                        fill="#ffffff"></path>
                    <path
                        d="M13.8179 4.54512L13.6275 4.27845C12.8298 3.16176 11.1702 3.16176 10.3725 4.27845L10.1821 4.54512C9.76092 5.13471 9.05384 5.45043 8.33373 5.37041L7.48471 5.27608C6.21088 5.13454 5.13454 6.21088 5.27608 7.48471L5.37041 8.33373C5.45043 9.05384 5.13471 9.76092 4.54512 10.1821L4.27845 10.3725C3.16176 11.1702 3.16176 12.8298 4.27845 13.6275L4.54512 13.8179C5.13471 14.2391 5.45043 14.9462 5.37041 15.6663L5.27608 16.5153C5.13454 17.7891 6.21088 18.8655 7.48471 18.7239L8.33373 18.6296C9.05384 18.5496 9.76092 18.8653 10.1821 19.4549L10.3725 19.7215C11.1702 20.8382 12.8298 20.8382 13.6275 19.7215L13.8179 19.4549C14.2391 18.8653 14.9462 18.5496 15.6663 18.6296L16.5153 18.7239C17.7891 18.8655 18.8655 17.7891 18.7239 16.5153L18.6296 15.6663C18.5496 14.9462 18.8653 14.2391 19.4549 13.8179L19.7215 13.6275C20.8382 12.8298 20.8382 11.1702 19.7215 10.3725L19.4549 10.1821C18.8653 9.76092 18.5496 9.05384 18.6296 8.33373L18.7239 7.48471C18.8655 6.21088 17.7891 5.13454 16.5153 5.27608L15.6663 5.37041C14.9462 5.45043 14.2391 5.13471 13.8179 4.54512Z"
                        stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M9 12L10.8189 13.8189V13.8189C10.9189 13.9189 11.0811 13.9189 11.1811 13.8189V13.8189L15 10"
                        stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </g>
            </svg><span class="text-lg pl-2" style="display: inline-block;font-weight: bolder;"> Pagamento efetuado com
                sucesso!</span>

        </div>

        <div class="text-left pl-3 pt-5 pb-5 bg-warning-500 text-white"
            v-if="collaborator.status_payment == 0 || campaign.status == 0">
            <svg style="display: inline-block;margin-top:-5px;" viewBox="0 0 24 24" width="35px" fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.011,9.011,0,0,1,12,21Zm1-3H11V16h2Zm0-4H11V6h2Z">
                    </path>
                </g>
            </svg><span class="text-lg pl-2" style="display: inline-block;font-weight: bolder;"> Pagamento esta
                pendente!</span>

        </div>

        <div class="text-left pl-3 pt-5 pb-5 bg-danger-500 text-white" v-if="collaborator.status_payment == -1">
            <svg style="display: inline-block;margin-top:-5px;" viewBox="0 0 24 24" width="35px" fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.011,9.011,0,0,1,12,21Zm1-3H11V16h2Zm0-4H11V6h2Z">
                    </path>
                </g>
            </svg><span class="text-lg pl-2" style="display: inline-block;font-weight: bolder;"> Sua reserva já
                expirou!</span>

        </div>
    </div>


    <!-- COLAB-->
    <div class="mx-2" v-if="collaborator.id">
        <div class="form-div py-2">
            <div class="flex space-x-4">
                <div class="flex-none">
                    <div class="h-20 w-20 rounded-full">
                        <img :src="collaborator.campaign.image" alt="" class="w-full h-full" />
                    </div>
                </div>
                <div class="flex-1">
                    <h4 class="font-medium mb-1">
                        <span class="block font-light text-sm" v-if="collaborator.status_payment == 1">Você esta
                            participando da campanha</span>
                        <span class="block font-light text-sm" v-else>Campanha</span>
                        <span class="block text-xl">{{ collaborator.campaign.name }}</span>
                    </h4>
                </div>
            </div>
            <hr />
        </div>

        <div class="form-div pb-2">
            <div class="flex space-x-4">
                <div class="flex-none">
                    <h4 class="font-medium mb-1">
                        <span class="block font-light text-sm">Nome</span>
                        <span class="block text-xl limit-char">{{ collaborator.name }}</span>
                    </h4>
                </div>
                <div class="flex-1">
                    <h4 class="font-medium mb-1">
                        <span class="block font-light text-sm">Telefone</span>
                        <span class="block text-xl">{{ collaborator.phone }}</span>
                    </h4>
                </div>
            </div>
            <div class="flex space-x-4">
                <div class="flex-none">
                    <h4 class="font-medium mb-1">
                        <span class="block font-light text-sm">Qtd. Bilhetes</span>
                        <span class="block text-xl limit-char">{{ collaborator.amount_of_tickets }}</span>
                    </h4>
                </div>
                <div class="flex-1">
                    <h4 class="font-medium mb-1">
                        <span class="block font-light text-sm">Valor</span>
                        <span class="block text-xl">{{ collaborator.price_each_ticket }}</span>
                    </h4>
                </div>
            </div>
            <hr />
        </div>
        <div class="form-div" v-if="collaborator.id && collaborator.status_payment == 1" style="margin-top: 0px!important;">
            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" class="w-56 h-56 mt-3 m-auto"
                viewBox="0 0 505.46625 596.94537" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path
                    d="M706.73312,652.47268l5,96S500.239,547.178,473.89063,488.28153,497.13921,283.694,497.13921,283.694l110.04332,60.44633Z"
                    transform="translate(-347.26688 -151.52732)" fill="#9f616a"></path>
                <path d="M382.44618,243.39641l-32.548,3.09981s-17.049,37.19774,35.64783,40.29756Z"
                    transform="translate(-347.26688 -151.52732)" fill="#9f616a"></path>
                <path d="M382.44618,300.74293l-32.548,3.09981s-17.049,37.19774,35.64783,40.29755Z"
                    transform="translate(-347.26688 -151.52732)" fill="#9f616a"></path>
                <path d="M382.44618,362.73916l-32.548,3.09981s-17.049,37.19774,35.64783,40.29756Z"
                    transform="translate(-347.26688 -151.52732)" fill="#9f616a"></path>
                <path d="M391.74562,424.7354l-32.548,3.09981s-17.049,37.19774,35.64784,40.29755Z"
                    transform="translate(-347.26688 -151.52732)" fill="#9f616a"></path>
                <path
                    d="M366.60044,258.3401h2.46966V190.68455a39.15718,39.15718,0,0,1,39.15715-39.15723H551.56477a39.15718,39.15718,0,0,1,39.15726,39.1571V561.84816a39.15719,39.15719,0,0,1-39.15715,39.15723H408.22744a39.1572,39.1572,0,0,1-39.15731-39.15708V306.49848h-2.46969Z"
                    transform="translate(-347.26688 -151.52732)" fill="#3f3d56"></path>
                <path
                    d="M406.64739,161.71467h18.71028a13.8929,13.8929,0,0,0,12.86292,19.13985h82.1162a13.89286,13.89286,0,0,0,12.86291-19.13987h17.47545a29.24215,29.24215,0,0,1,29.24218,29.24211V561.57589a29.24216,29.24216,0,0,1-29.24214,29.24218H406.64739a29.24216,29.24216,0,0,1-29.24218-29.24214h0V190.95679A29.24214,29.24214,0,0,1,406.64739,161.71467Z"
                    transform="translate(-347.26688 -151.52732)" fill="#fff"></path>
                <rect x="100.53673" y="114.01642" width="61.71533" height="14.89247" fill="#1cd488"
                    style="isolation: isolate;">
                </rect>
                <rect x="97.59857" y="178.00873" width="67.59164" height="14.89247" fill="#e5e5e5"></rect>
                <rect x="55.96534" y="209.9996" width="150.85812" height="14.89247" fill="#e5e5e5"></rect>
                <rect x="55.96534" y="241.99047" width="150.85812" height="14.89247" fill="#e5e5e5"></rect>
                <path
                    d="M852.73312,702.47268l-173.48-197.91713-6.19962-127.09228-65.096-108.49341-18.59887-46.49718s-43.39736,4.64972-7.74953,92.99435l14.72411,47.27213,0,0a216.67408,216.67408,0,0,0-20.14876,91.24394v108.3237c0,25.50678,121.55,164.44287,135.69866,185.6658l0,0Z"
                    transform="translate(-347.26688 -151.52732)" fill="#9f616a"></path>
                <polygon
                    points="247.195 126.636 260.136 120.276 259.695 119.378 247.738 125.255 229.688 77.932 228.754 78.289 247.195 126.636"
                    opacity="0.2"></polygon>
                <rect x="358.98404" y="239.81058" width="1.00012" height="20.43016"
                    transform="translate(-346.65612 349.39987) rotate(-69.7779)" opacity="0.2"></rect>
                <rect x="358.98404" y="297.81058" width="1.00012" height="20.43016"
                    transform="translate(-401.08099 387.35158) rotate(-69.7779)" opacity="0.2"></rect>
                <rect x="358.98404" y="359.81058" width="1.00012" height="20.43016"
                    transform="translate(-459.25929 427.92066) rotate(-69.7779)" opacity="0.2"></rect>
                <rect x="364.06574" y="425.55799" width="0.99981" height="10.35283"
                    transform="translate(-528.7721 421.49849) rotate(-64.36101)" opacity="0.2"></rect>
                <circle cx="131.47081" cy="342.17535" r="43.22999" fill="#1cd488"></circle>
                <polygon
                    points="127.351 360.424 114.413 343.787 121.937 337.935 128.063 345.812 148.76 323.964 155.681 330.521 127.351 360.424"
                    fill="#fff"></polygon>
            </svg>
            <div class="flex space-x-4">
                <div class="flex-none">
                    <h4 class="font-medium mb-1">
                        <span class="inline-block font-light text-xs">ID: </span>
                        <span class="inline-block text-xs pl-2">{{ collaborator.uuid }}</span>
                    </h4>
                </div>
            </div>
        </div>
        <div class="form-div" v-if="collaborator.status_payment == 1">
            <Tickets :collaborator="collaborator" :key="collaborator.id" />
        </div>
        <div class="form-div text-center py-3">
            <Button text="Colaborar mais" btnClass="btn-warning rounded-[4px] text-lg" style="width: 100%;"
                :icon="'heroicons-outline:ticket'" @click="redirectCampaign" v-if="collaborator.status_payment == 1" />

            <Button text="Efetuar pagamento" btnClass="btn-success rounded-[4px] text-lg" style="width: 100%;"
                :icon="'heroicons-outline:ticket'" @click="redirectPayment"
                v-if="collaborator.status_payment == 0 && collaborator.payments.length" />

            <Button text="Tentar mais uma vez" btnClass="btn-success rounded-[4px] text-lg" style="width: 100%;"
                :icon="'heroicons-outline:ticket'" @click="redirectCampaign" v-if="collaborator.status_payment == -1" />
        </div>
        <div class="form-div py-2">
            <div class="flex space-x-4">
                <div class="flex-none">
                    <div class="h-20 w-20 rounded-full">
                        <img :src="collaborator.campaign.user.image" alt="" class="w-full h-full" />
                    </div>
                </div>
                <div class="flex-none">
                    <h4 class="font-medium mb-1">
                        <span class="block font-light text-sm">Autor da Campanha</span>
                        <span class="block text-xl">{{ collaborator.campaign.user.name }}</span>
                    </h4>
                    <p class="text-sm font-light">
                        <Button text="Whatsapp" btnClass="btn-success rounded-full text-sm px-2 py-1"
                            @click="openWhatsApp" />
                    </p>
                </div>
            </div>
        </div>
    </div>

<!-- CAMPA-->
    <div class="mx-2" v-if="campaign.id">
        <div class="form-div py-2">
            <div class="flex space-x-4">
                <div class="flex-none">
                    <div class="h-20 w-20 rounded-full">
                        <img :src="campaign.image" alt="" class="w-full h-full" />
                    </div>
                </div>
                <div class="flex-1">
                    <h4 class="font-medium mb-1">
                        <h2 class="text-[18px] mb-2" v-if="campaign.status == 1">Parabéns!!🎉</h2>
                        <h2 class="text-[18px] mb-2" v-else>Falta pouco para começar a vender!! 🙏</h2>
                        <span class="block font-light text-sm" v-if="campaign.status == 1">Sua campanha foi publicada com
                            sucesso!</span>
                        <span class="block font-light text-sm" v-else>Sua campanha ainda não foi publicada, faça o pagamento
                            e comece a receber na sua conta hoje mesmo.</span>
                    </h4>
                </div>
            </div>
            <hr />
        </div>

        <div class="form-div pb-2">
            <div class="flex space-x-4">
                <div class="flex-none">
                    <h4 class="font-medium mb-1">
                        <span class="block font-light text-sm">Nome</span>
                        <span class="block text-xl limit-char">{{ campaign.name }}</span>
                    </h4>
                </div>
                <div class="flex-1">
                    <h4 class="font-medium mb-1">
                        <span class="block font-light text-sm">Telefone</span>
                        <span class="block text-xl">{{ campaign.support_number }}</span>
                    </h4>
                </div>
            </div>
            <div class="flex space-x-4">
                <div class="flex-none">
                    <h4 class="font-medium mb-1">
                        <span class="block font-light text-sm">Qtd. Bilhetes</span>
                        <span class="block text-xl limit-char">{{ campaign.amount_tickets }}</span>
                    </h4>
                </div>
                <div class="flex-1">
                    <h4 class="font-medium mb-1">
                        <span class="block font-light text-sm">Valor</span>
                        <span class="block text-xl">{{ campaign.price_each_ticket }}</span>
                    </h4>
                </div>
            </div>
            <hr />
        </div>
        <div class="form-div"
            v-if="(collaborator.id && collaborator.status_payment == 1) || (campaign.id && campaign.status == 1)"
            style="margin-top: 0px!important;">
            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" class="w-56 h-56 mt-3 m-auto"
                viewBox="0 0 505.46625 596.94537" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path
                    d="M706.73312,652.47268l5,96S500.239,547.178,473.89063,488.28153,497.13921,283.694,497.13921,283.694l110.04332,60.44633Z"
                    transform="translate(-347.26688 -151.52732)" fill="#9f616a"></path>
                <path d="M382.44618,243.39641l-32.548,3.09981s-17.049,37.19774,35.64783,40.29756Z"
                    transform="translate(-347.26688 -151.52732)" fill="#9f616a"></path>
                <path d="M382.44618,300.74293l-32.548,3.09981s-17.049,37.19774,35.64783,40.29755Z"
                    transform="translate(-347.26688 -151.52732)" fill="#9f616a"></path>
                <path d="M382.44618,362.73916l-32.548,3.09981s-17.049,37.19774,35.64783,40.29756Z"
                    transform="translate(-347.26688 -151.52732)" fill="#9f616a"></path>
                <path d="M391.74562,424.7354l-32.548,3.09981s-17.049,37.19774,35.64784,40.29755Z"
                    transform="translate(-347.26688 -151.52732)" fill="#9f616a"></path>
                <path
                    d="M366.60044,258.3401h2.46966V190.68455a39.15718,39.15718,0,0,1,39.15715-39.15723H551.56477a39.15718,39.15718,0,0,1,39.15726,39.1571V561.84816a39.15719,39.15719,0,0,1-39.15715,39.15723H408.22744a39.1572,39.1572,0,0,1-39.15731-39.15708V306.49848h-2.46969Z"
                    transform="translate(-347.26688 -151.52732)" fill="#3f3d56"></path>
                <path
                    d="M406.64739,161.71467h18.71028a13.8929,13.8929,0,0,0,12.86292,19.13985h82.1162a13.89286,13.89286,0,0,0,12.86291-19.13987h17.47545a29.24215,29.24215,0,0,1,29.24218,29.24211V561.57589a29.24216,29.24216,0,0,1-29.24214,29.24218H406.64739a29.24216,29.24216,0,0,1-29.24218-29.24214h0V190.95679A29.24214,29.24214,0,0,1,406.64739,161.71467Z"
                    transform="translate(-347.26688 -151.52732)" fill="#fff"></path>
                <rect x="100.53673" y="114.01642" width="61.71533" height="14.89247" fill="#1cd488"
                    style="isolation: isolate;">
                </rect>
                <rect x="97.59857" y="178.00873" width="67.59164" height="14.89247" fill="#e5e5e5"></rect>
                <rect x="55.96534" y="209.9996" width="150.85812" height="14.89247" fill="#e5e5e5"></rect>
                <rect x="55.96534" y="241.99047" width="150.85812" height="14.89247" fill="#e5e5e5"></rect>
                <path
                    d="M852.73312,702.47268l-173.48-197.91713-6.19962-127.09228-65.096-108.49341-18.59887-46.49718s-43.39736,4.64972-7.74953,92.99435l14.72411,47.27213,0,0a216.67408,216.67408,0,0,0-20.14876,91.24394v108.3237c0,25.50678,121.55,164.44287,135.69866,185.6658l0,0Z"
                    transform="translate(-347.26688 -151.52732)" fill="#9f616a"></path>
                <polygon
                    points="247.195 126.636 260.136 120.276 259.695 119.378 247.738 125.255 229.688 77.932 228.754 78.289 247.195 126.636"
                    opacity="0.2"></polygon>
                <rect x="358.98404" y="239.81058" width="1.00012" height="20.43016"
                    transform="translate(-346.65612 349.39987) rotate(-69.7779)" opacity="0.2"></rect>
                <rect x="358.98404" y="297.81058" width="1.00012" height="20.43016"
                    transform="translate(-401.08099 387.35158) rotate(-69.7779)" opacity="0.2"></rect>
                <rect x="358.98404" y="359.81058" width="1.00012" height="20.43016"
                    transform="translate(-459.25929 427.92066) rotate(-69.7779)" opacity="0.2"></rect>
                <rect x="364.06574" y="425.55799" width="0.99981" height="10.35283"
                    transform="translate(-528.7721 421.49849) rotate(-64.36101)" opacity="0.2"></rect>
                <circle cx="131.47081" cy="342.17535" r="43.22999" fill="#1cd488"></circle>
                <polygon
                    points="127.351 360.424 114.413 343.787 121.937 337.935 128.063 345.812 148.76 323.964 155.681 330.521 127.351 360.424"
                    fill="#fff"></polygon>
            </svg>
            <div class="flex space-x-4">
                <div class="flex-none">
                    <h4 class="font-medium mb-1">
                        <span class="inline-block font-light text-xs">ID: </span>
                        <span class="inline-block text-xs pl-2">{{ campaign.uuid }}</span>
                    </h4>
                </div>
            </div>
        </div>
        <div class="form-div" v-if="collaborator.status_payment == 1">
            <Tickets :collaborator="collaborator" :key="collaborator.id" />
        </div>

        <div class="form-div text-center py-3">
            <Button text="Colaborar mais" btnClass="btn-warning rounded-[4px] text-lg" style="width: 100%;"
                :icon="'heroicons-outline:ticket'" @click="redirectCampaign" v-if="collaborator.status_payment == 1" />

            <Button text="Efetuar pagamento" btnClass="btn-success rounded-[4px] text-lg" style="width: 100%;"
                :icon="'heroicons-outline:ticket'" @click="redirectPayment"
                v-if="collaborator.status_payment == 0 && collaborator.payments.length" />

            <Button text="Tentar mais uma vez" btnClass="btn-success rounded-[4px] text-lg" style="width: 100%;"
                :icon="'heroicons-outline:ticket'" @click="redirectCampaign" v-if="collaborator.status_payment == -1" />

            <Button text="Finalizar" btnClass="btn-success rounded-[4px] text-lg mb-2" style="width: 100%;"
                :icon="'heroicons-outline:ticket'" @click="redirectDashboard" v-if="campaign.id && campaign.status != 1" />

            <Button text="Visualizar" btnClass="btn-info rounded-[4px] text-lg mb-2" style="width: 100%;"
                :icon="'heroicons-outline:eye'" @click="redirectViewCampaign" v-if="campaign.id && campaign.status == 1" />

            <Button text="Retornar" btnClass="btn-transparent rounded-[4px] text-lg mb-2" style="width: 100%;"
                :icon="'heroicons-outline:arrow-long-left'" @click="goDashboard" v-if="$route.query.preference_id" />
        </div>

        <div class="form-div py-2">
            <div class="flex space-x-4">
                <div class="flex-none">
                    <div class="h-20 w-20 rounded-full">
                        <img :src="campaign.user.image" alt="" class="w-full h-full" />
                    </div>
                </div>
                <div class="flex-none">
                    <h4 class="font-medium mb-1">
                        <span class="block font-light text-sm">Autor da Campanha</span>
                        <span class="block text-xl">{{ campaign.user.name }}</span>
                    </h4>
                    <p class="text-sm font-light">
                        <Button text="Whatsapp" btnClass="btn-success rounded-full text-sm px-2 py-1"
                            @click="openWhatsApp" />
                    </p>
                </div>
            </div>
        </div>
    </div>

    <footer v-if="collaborator.id" class="bg-slate-800 py-1.5 px-1 text-center static bottom-0 mt-2">
        <div class="mt-2 flex justify-center items-center">
            <p class="text-white text-xs">criado com</p>
            <a href="/" class="text-xl text-center flex justify-center font-bold tracking-wide">
                <img class="h-5 ml-1.5" src="@/assets/images/logo/logo.svg" alt="">
            </a>
        </div>
        <div class="p-1 flex text-xs items-center justify-center gap-2 text-white">
            <a target="_blank" href="https://123rifas.com/termos-de-uso/">Termos de Uso</a>
            <span class="text-white">|</span>
            <a target="_blank" href="https://123rifas.com/politica-de-privacidade/">Políticas de Privacidade</a>
        </div>
    </footer>
</template>
  
<script>
import Button from '@/components/Button';
import Tickets from '@/components/Tickets';
export default {
    components: {
        Tickets,
        Button
    },
    data() {
        return {
            collaborator: {},
            campaign: {},
            collaboratorId: '',
        }
    },
    created() {
        // Recupere os parâmetros da rota para obter o nome e o ID da campanha
        this.collaboratorId = this.$route.params.id;

        this.getCollaboratorByUuid()
    },
    methods: {
        clearPhone(telefone) {
            // Use uma expressão regular para remover todos os caracteres não numéricos, exceto o '+'
            return telefone.replace(/[^\d+]/g, '');
        },
        openWhatsApp() {
            let phoneclear = this.clearPhone(this.collaborator.campaign.support_number);

            if (!phoneclear.includes('+55') && !phoneclear.includes('+')) {
                phoneclear = '+55' + phoneclear
            }
            const url = `https://wa.me/${phoneclear}?text=Olá, estou com um problema no meu comprovante [${collaborator.uuid}].`; // URL do WhatsApp com o número de telefone
            window.open(url, '_blank'); // Abrir em uma nova aba
        },
        redirectCampaign() {
            window.open(window.location.origin + '/acao/' + this.collaborator.campaign.slug)
        },
        goDashboard() {
            window.location.href = window.location.origin + '/app/home';
        },
        redirectDashboard() {
            if (!this.$route.query.preference_id) {
                window.location.href = window.location.origin + '/app/home';
            } else {
                this.getPreferenceMercadoPagoById(this.$route.query.preference_id)
            }
        },
        getPreferenceMercadoPagoById(paymentId) {

            const url_payment = `${process.env.VUE_APP_API_BASE_URL}/mercadopago/preference/${paymentId}`;

            // Fazer uma requisição POST para o endpoint do Laravel
            fetch(url_payment, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                verify: false
            })
                .then(response => response.json())
                .then(response => {
                    window.location.href = response.preference.init_point
                })
                .catch(error => {
                    console.error(error);
                });
        },
        redirectViewCampaign() {
            window.open(window.location.origin + '/acao/' + this.campaign.slug)
        },
        redirectPayment() {
            window.open(window.location.origin + '/payment/' + this.collaborator.payments[this.collaborator.payments.length - 1].transaction_id)
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
        getCollaboratorByUuid() {

            const url_payment = `${process.env.VUE_APP_API_BASE_URL}/collaborator/uuid/${this.collaboratorId}`;

            // Fazer uma requisição POST para o endpoint do Laravel
            fetch(url_payment, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                verify: false
            })
                .then(response => response.json())
                .then(res => {
                    if (res[0]) {
                        this.collaborator = res[0]
                    } else {
                        const url_payment = `${process.env.VUE_APP_API_BASE_URL}/campaign/uuid/${this.collaboratorId}`;

                        // Fazer uma requisição POST para o endpoint do Laravel
                        fetch(url_payment, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            verify: false
                        })
                            .then(response => response.json())
                            .then(res => {
                                if (res[0]) {
                                    dataLayer.push({
                                        'event': 'purchase-123rifas',
                                        'conversionValue': this.extractNumberFromString(res[0].fee.fee),
                                        'ecommerce': {
                                            'purchase': {
                                                'actionField': {
                                                    'id': res[0].id,
                                                    'affiliation': '123RIFAS',
                                                    'revenue': this.extractNumberFromString(res[0].fee.fee),
                                                    'email': res[0].user.email, // Inclua o e-mail do comprador
                                                    'phone': res[0].user.phone // Inclua o telefone do comprador
                                                },
                                                'products': [
                                                    {
                                                        'id': res[0].uuid,
                                                        'name': res[0].name,
                                                        'price': this.extractNumberFromString(res[0].fee.fee),
                                                        'category': 'Serviço',
                                                    }
                                                    // Adicione mais produtos, se houver
                                                ]
                                            }
                                        }
                                    });

                                    this.campaign = res[0]
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
        }
    }
};
</script>
<style scoped>
.form-div {
    max-width: 800px;
    margin: auto;
    margin-top: 4px;
}

.limit-char {
    width: 150px;
    /* Largura da div */
    white-space: nowrap;
    /* Impede que o texto seja quebrado em várias linhas */
    overflow: hidden;
    /* Oculta o texto que não cabe na div */
    text-overflow: ellipsis;
    /* Exibe reticências (...) quando o texto é cortado */
}
</style>
