import { createRouter, createWebHistory } from "vue-router";

import Guard from '../services/middleware.vue'
import Cookie from 'js-cookie'
import jwt_decode from 'jwt-decode'

const routes = [
  /*{
    path: '/maintenance', // Pode ser qualquer caminho que desejar
    name: 'Maintenance',
    component: () => import("@/views/error.vue"),
  },*/
  {
    path: '/rifei', // Pode ser qualquer caminho que desejar
    name: 'RIFEI',
    component: () => import("@/views/home/rifei.vue"),
  },
  {
    path: '/load', // Pode ser qualquer caminho que desejar
    name: 'Carregando Informações',
    component: () => import("@/views/load.vue"),
  },
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/auth/login/index.vue"),
  },
  {
    path: "/register",
    name: "Cadastro",
    component: () => import("@/views/auth/register/index.vue"),
  },
  {
    path: "/forgot",
    name: "Esqueceu senha",
    component: () => import("@/views/auth/forgot-password.vue"),
  },
  {
    path: "/reset-password/:id",
    name: "Recuperar senha",
    component: () => import("@/views/auth/reset-password.vue"),
  },
  {
    path: "/campaign/:id",
    name: "Campaign",
    component: () => import("@/views/campaigns/campaign.vue"),
  },
  {
    path: "/acao/:slug",
    name: "Acao",
    component: () => import("@/views/campaigns/campaign.vue"),
  },
 /* {
    path: "/checkout/:id",
    name: "Checkout",
    component: () => import("@/views/checkout/checkout.vue"),
  },*/
  {
    path: "/payment/:id",
    name: "payment",
    component: () => import("@/views/checkout/payment.vue"),
  },
  {
    path: "/voucher/:id",
    name: "voucher",
    component: () => import("@/views/checkout/voucher.vue"),
  },
  {
    path: "/closed/:id",
    name: "Campaign Closed",
    component: () => import("@/views/campaigns/closed.vue"),
  },
  {
    path: "/acao/encerrada/:slug",
    name: "Acao Encerrada",
    component: () => import("@/views/campaigns/closed.vue"),
  },
  {
    path: "/active/account/:token",
    name: "Ativar Conta",
    component: () => import("@/views/auth/active-account.vue"),
  },
  {
    path: "/app",
    name: "Dashboard",
    redirect: "/app/home",
    component: () => import("@/Layout/index.vue"),
    beforeEnter: Guard.auth,
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home/project.vue"),
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("@/views/settings/settings.vue"),
        children:[
          {
            path: "", // Rota vazia que vai redirecionar para "account"
            redirect: { name: "account" }
          },
          {
            path: "account",
            name: "account",
            component: () => import("@/views/settings/account.vue"),
          },
          {
            path: "methods",
            name: "methods",
            component: () => import("@/views/settings/payments.vue"),
          },
          {
            path: "customizations",
            name: "customizations",
            component: () => import("@/views/settings/customization.vue"),
          },
          {
            path: "social-medias",
            name: "social-medias",
            component: () => import("@/views/settings/social-media.vue"),
          }
        ]
      },
      {
        path: "collaborators",
        name: "collaborators",
        component: () => import("@/views/collaborators/collaborators.vue"),
      },
      {
        path: "awards",
        name: "awards",
        component: () => import("@/views/awards/awards.vue"),
      },
      {
        path: "sales",
        name: "sales",
        component: () => import("@/views/sales/sales.vue"),
      },
      {
        path: "create/campaign",
        name: "create-campaign",
        component: () => import("@/views/campaigns/create.vue")
      },
      {
        path: "update/campaign/:id",
        name: "update-campaign",
        component: () => import("@/views/campaigns/update.vue")
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
router.beforeEach((to, from, next) => {
    // Verifica se o site está em manutenção
    /*const isMaintenanceMode = true; // Defina isso com base na lógica real

    if (isMaintenanceMode && to.name !== 'Maintenance') {
      next({ name: 'Maintenance' });
    } else {
      next();
    }*/
    /*const token = Cookie.get('_access_token');
    const payload = jwt_decode(token);
    if (Date.now() >= payload.exp * 1000) {
      if (Cookie.get('_keep_logged') === 'true') {
        try {
            const data = new FormData();
            data.append('user_id', Cookie.get('_user_id'));

            const response = fetch(process.env.VUE_APP_API_BASE_URL + '/renew/token', {
                method: 'POST',
                body: data
            });

            const res = response.json();

            if (res.status) {
                Cookie.set('_access_token', res.access_token);
                Cookie.set('_user_id', res.user_id);
                Cookie.set('_role', res.role);
                Cookie.set('_keep_logged', true);
            }
            next();
        } catch (error) {
            console.error('Erro ao renovar o token:', error);
        }
    }
  }*/

  const routePath = to.path;
  let pageTitle = "123RIFAS";

  if (routePath.startsWith("/acao/")) {
    // Extrair o slug da rota
    const slug = routePath.split("/acao/")[1];
    
    // Remover caracteres especiais e formatar o slug
    const formattedSlug = slug
      .replace(/[^a-zA-Z0-9-]/g, " ") // Remover caracteres especiais
      .split("-") // Dividir em palavras separadas por '-'
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalizar a primeira letra de cada palavra
      .join(" "); // Juntar as palavras com espaço
    
    // Encontrar o último '-'
    const lastHyphenIndex = formattedSlug.lastIndexOf("-");
    
    // Se houver um último '-', manter apenas o texto antes dele
    if (lastHyphenIndex !== -1) {
      pageTitle = formattedSlug.substring(0, lastHyphenIndex);
    } else {
      pageTitle = formattedSlug;
    }
    
    // Adicionar o título personalizado à página
    pageTitle += " | 123Rifas";
  }else {
    // Caso a rota não seja '/acao/:slug', use o título anterior
    const titleText = to.name;
    const words = titleText.split(" ");
    const wordslength = words.length;
    for (let i = 0; i < wordslength; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    pageTitle = words.join(" ") + " | 123Rifas";
  }

  document.title = pageTitle;
  next();
});


router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
