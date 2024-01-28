<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput label="Email" type="email" placeholder="Escreva seu email" name="email" v-model="email" :error="emailError"
      classInput="h-[48px]" />
    <Textinput label="Senha" type="password" placeholder="8+ characters, 1 letra maiúscula " name="password"
      v-model="password" :error="passwordError" hasicon classInput="h-[48px]" />

    <div class="flex justify-between">
      <label class="cursor-pointer flex items-start">
        <input type="checkbox" class="hidden" @change="toggleCheckbox" />
        <span class="h-4 w-4 border rounded flex-none inline-flex mr-3 relative top-1 transition-all duration-150" :class="checkbox
          ? 'ring-2 ring-black-500 dark:ring-offset-slate-600 dark:ring-slate-900  dark:bg-slate-900 ring-offset-2 bg-slate-900'
          : 'bg-slate-100 dark:bg-slate-600 border-slate-100 dark:border-slate-600 '
          ">
          <img src="@/assets/images/icon/ck-white.svg" alt="" class="h-[10px] w-[10px] block m-auto" v-if="checkbox" />
        </span>
        <span class="text-slate-500 dark:text-slate-400 text-sm leading-6">Mantenha-me logado</span>
      </label>
      <router-link to="/forgot" class="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium">Esqueceu
        sua senha?</router-link>
    </div>

    <button type="submit" id="submitButton" class="btn btn-dark block w-full text-center">
      Entrar
    </button>
  </form>
</template>

<script>
import Cookie from 'js-cookie';
import Textinput from "@/components/Textinput";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import jwt_decode from 'jwt-decode'
export default {
  components: {
    Textinput,
  },
  data() {
    return {
      checkbox: true,
      email: "",
      emailError: "",
      password: "",
      passwordError: ""
    };
  },
  mounted() {
    const token = Cookie.get('_access_token')
    const role = Cookie.get('_role')
    if (token) {
      const payload = jwt_decode(token)
      //console.log(payload)
      if (Date.now() <= payload.exp * 1000) {
        if (role == 'admin') {
          this.$emit('hasPermissions', true)
        } else {
          window.location.href = window.location.origin + "/app/home";
        }
      }
    }
  },
  methods: {
    toggleCheckbox() {
      this.checkbox = !this.checkbox;
    },

    onSubmit() {
      const toast = useToast()
      const schema = yup.object({
        email: yup.string().required("Email é obrigatório").email(),
        password: yup.string().required("Senha é obrigatória").min(8),
      });

      schema.validate({ email: this.email, password: this.password })
        .then(() => {
          const data = new FormData();
          data.append('email', this.email);
          data.append('password', this.password);

          const submitButton = document.getElementById("submitButton");

          // Desabilite o botão e mostre o spinner
          submitButton.disabled = true;

          fetch(process.env.VUE_APP_API_BASE_URL + '/login', {
            method: 'POST',
            body: data
          })
            .then(response => response.json())
            .then(res => {
              if (res.status) {
                Cookie.set('_access_token', res.access_token);
                Cookie.set('_user_id', res.user_id);
                Cookie.set('_keep_logged', this.checkbox);
                Cookie.set('_role', res.role);
                toast.success("Bem-vindo(a)!", {
                  timeout: 2000,
                });

                this.$store.dispatch("getUserByUuid")

                if (res.role == 'admin') {
                  this.$emit('hasPermissions', true)
                } else {
                  window.location.href = window.location.origin + "/app/home";
                }

              } else {
                toast.error(res.message, {
                  timeout: 2000,
                });
              }
            });
        })
        .finally(() => {
          // Reabilite o botão e esconda o spinner quando a requisição for concluída
          submitButton.disabled = false;
        })
        .catch((error) => {
          if (error.path === 'email') {
            this.emailError = error.errors[0];
          }
          if (error.path === 'password') {
            this.passwordError = error.errors[0];
          }
        });
    }
  }
};
</script>

<style lang="scss"></style>
