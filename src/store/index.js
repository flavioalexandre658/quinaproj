import { createStore } from "vuex";
import chat from "./app/chat";
import email from "./app/email";
import kanban from "./app/kanban";
import project from "./app/project";
import apptodo from "./app/todo";
import Cookie from 'js-cookie';
export default createStore({
  state: {
    sidebarCollasp: false,
    sidebarHidden: false,
    mobielSidebar: false,
    semidark: false,
    semiDarkTheme: "semi-light",
    isDark: false,
    user: {
      id: 0,
      uuid: null,
      name: null,
      email: null,
      email_verified_at: null,
      created_at: null,
      updated_at: null,
      nickname: null,
      image: null,
      delete_account: 0,
      text_delete_account: null,
      payment_id: null,
      phone: null,
      activation_token: null,
      active: 0,
      awards: [],
      sales: [],
      payment_methods: [
        {
          id: 0,
          name_method: null,
          name_user: null,
          type_key: null,
          key: null,
          api_token: null,
          status: 0,
          created_at: null,
          updated_at: null,
          user_id: 0
        }
      ],
      customizations: [
        {
          id: 0,
          image: null,
          pixel_meta: null,
          tag_google: null,
          user_id: 0,
          created_at: null,
          updated_at: null
        }
      ],
      social_medias: [],
      campaigns: [
        {
          id: 0,
          uuid: null,
          name: null,
          description: null,
          image: null,
          support_number: null,
          status: 0,
          price_each_ticket: null,
          min_ticket: 0,
          max_ticket: 0,
          show_date_of_raffle: 0,
          date_of_raffle: null,
          time_wait_payment: null,
          allow_terms: 0,
          category_id: 0,
          ticket_filter_id: 0,
          raffle_id: 0,
          fee_id: 0,
          user_id: 0,
          created_at: null,
          updated_at: null,
          amount_tickets: 0,
          available_tickets: 0,
          pending_tickets: 0,
          unavailable_tickets: 0,
          url: null,
          show_email_input: 0,
          show_top_ranking: 0,
          closed: 0,
          sorted_number: null,
          winner_collaborator_id: 0,
          fee: {
            id: 0,
            revenue: null,
            fee: null,
            created_at: null,
            updated_at: null,
            min_revenue: 0,
            max_revenue: 0
          },
          collaborators: [
            {
              id: 0,
              uuid: null,
              name: null,
              phone: null,
              amount_of_tickets: 0,
              price_each_ticket: null,
              status_payment: 0,
              expire_date: null,
              created_at: null,
              updated_at: null,
              campaign_id: 0,
              email: null,
              allow_terms: 0,
              url_checkout: null
            },
            {
              id: 0,
              uuid: null,
              name: null,
              phone: null,
              amount_of_tickets: 0,
              price_each_ticket: null,
              status_payment: 0,
              expire_date: null,
              created_at: null,
              updated_at: null,
              campaign_id: 0,
              email: null,
              allow_terms: 0,
              url_checkout: null
            }
          ]
        }
      ]
    },
    token: '',
    skin: "default",
    theme: "light",
    isOpenSettings: false,
    cWidth: "full",
    menuLayout: "vertical",
    navbarType: "sticky",
    footerType: "static",
    chartColors: {
      title: "red",
    },
  },
  getters: {
    theme: (state) => state.theme,
    skin: (state) => state.skin
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setSidebarCollasp(state) {
      state.sidebarCollasp = !state.sidebarCollasp;
    },

    toogleDark(state) {
      state.isDark = !state.isDark;


      if (!state.isDark) {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        localStorage.setItem("theme", "light");
      } else {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }

    },

    toggleSettings(state) {
      state.isOpenSettings = !state.isOpenSettings;
    },
    toggleMsidebar(state) {
      state.mobielSidebar = !state.mobielSidebar;
    },
    toggleSemiDark(state) {
      state.semidark = !state.semidark;
      state.semiDarkTheme = state.semidark ? "semi-dark" : "semi-light";
      document.body.classList.toggle(state.semiDarkTheme);
      localStorage.setItem("semiDark", state.semidark);
    },
  },
  actions: {
    async getUserByUuid({ commit }) {
      try {
        const user_id = Cookie.get('_user_id');
        const token = Cookie.get('_access_token');
        const response = await fetch(
          process.env.VUE_APP_API_BASE_URL + '/user/uuid/' + user_id, 
          {
            method: 'GET', // ou 'POST', 'PUT', etc., dependendo do tipo de solicitação que você está fazendo
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json', // ajuste o tipo de conteúdo conforme necessário
              // outros cabeçalhos, se necessário
            },
          }
        );
        
        if(response.status == 401){
          toast.error('Seu token não é válido, faça login novamente.', {
                  timeout: 2000,
              });
              return next('/'); 
      }

        const data = await response.json();

        if (!data.message) {
          commit('setUser', data[0]);
          commit('setToken', token);
        }
      } catch (error) {
        console.error('Error fetching user by UUID:', error);
      }
    },
    // toogleDark
    toogleDark({ commit }) {
      commit("toogleDark");
    },
    // toggleSettings
    toggleSettings({ commit }) {
      commit("toggleSettings");
    },
    // setSidebarCollasp
    setSidebarCollasp({ commit }) {
      commit("setSidebarCollasp");
    },
    // toggleMsidebar
    toggleMsidebar({ commit }) {
      commit("toggleMsidebar");
    },
    toggleSemiDark({ commit }) {
      commit("toggleSemiDark");
    },

    // setTheme
  },
  modules: {
    apptodo,
    project,
    kanban,
    email,
    chat,
  },
});
