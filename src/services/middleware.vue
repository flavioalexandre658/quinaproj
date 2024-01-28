<script>
import Cookie from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { useToast } from "vue-toastification";

export default {

    async auth(to, from, next) {
        const toast = useToast();
        const token = Cookie.get('_access_token');
        const role = Cookie.get('_role');

        if (!token) {
            toast.error('Não autenticado, faça login.', {
                timeout: 2000,
            });
            return next('/');
        } else {
            const payload = jwt_decode(token);

            if (to.path.includes('/admin') && role !== 'admin') {
                // Rota é /admin e o usuário não é admin
                toast.error('Acesso restrito. Você não tem permissão para acessar esta página.', {
                    timeout: 2000,
                });
                return next('/');
            }

            if (role == 'admin') {
                const user_id = Cookie.get('_user_id');
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

                if (response.status == 401) {
                    if (Cookie.get('_keep_logged') === 'true') {
                        try {
                            const data = new FormData();
                            data.append('user_id', Cookie.get('_user_id'));

                            const response = await fetch(process.env.VUE_APP_API_BASE_URL + '/renew/token', {
                                method: 'POST',
                                body: data
                            });

                            const res = await response.json();

                            if (res.status) {
                                Cookie.set('_access_token', res.access_token);
                                Cookie.set('_user_id', res.user_id);
                                Cookie.set('_role', res.role);
                                Cookie.set('_keep_logged', this.checkbox);
                            }

                            return next();
                        } catch (error) {
                            console.error('Error while renewing token:', error);
                        }
                    } else {
                        toast.error('Seu token não é válido, faça login novamente.', {
                            timeout: 2000,
                        });
                        return next('/');
                    }
                }
                const data = await response.json();

                if (!data.message) {
                    if (data[0].role_id != 1) {
                        toast.error('Acesso restrito. Você não é administrador.', {
                            timeout: 2000,
                        });
                        return next('/');
                    }
                }
            }

            if (Date.now() >= payload.exp * 1000) {

                if (Cookie.get('_keep_logged') === 'true') {
                    try {
                        const data = new FormData();
                        data.append('user_id', Cookie.get('_user_id'));

                        const response = await fetch(process.env.VUE_APP_API_BASE_URL + '/renew/token', {
                            method: 'POST',
                            body: data
                        });

                        const res = await response.json();

                        if (res.status) {
                            Cookie.set('_access_token', res.access_token);
                            Cookie.set('_user_id', res.user_id);
                            Cookie.set('_role', res.role);
                            Cookie.set('_keep_logged', this.checkbox);
                        }
                        return next();
                    } catch (error) {
                        console.error('Error while renewing token:', error);
                    }
                } else {
                    toast.error('Seu token expirou, faça login.', {
                        timeout: 2000,
                    });
                    return next('/');
                }

            }
        }

        return next();
    }
}
</script>
