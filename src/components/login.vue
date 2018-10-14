<template>
    <v-container fill-height>
        <v-layout align-center justify-center row>
            <v-flex xs12 sm10 md8>
    
                <v-card>
                    <v-toolbar flat color="primary">
                        <v-toolbar-title>
                            <v-icon class="white--text">mdi-login</v-icon>
                            <span class="white--text">Entrar</span>
                        </v-toolbar-title>
                    </v-toolbar>
    
                    <v-img src="public/img/backimg.jpg">
                        <v-layout align-end justify-center row fill-height>
                            <v-flex>
    
                                <v-form v-model="formValid" class="pa-3">
                                    <v-input background-color="rgba(255,255,255,.5)">
                                        <v-text-field @keyup.enter="login()" :rules="usernameRules" v-model="usernameInput" prepend-icon="mdi-account-circle" color="white" label="Nome de usuario"></v-text-field>
                                    </v-input>
                                    <v-input background-color="rgba(255,255,255,.5)">
                                        <v-text-field @keyup.enter="login()" :rules="passwordRules" v-model="passwordInput" type="password" prepend-icon="mdi-lock" color="white" label="Senha"></v-text-field>
                                    </v-input>
    
                                    <v-layout align-center justify-end column fill-height>
                                        <v-flex class="text-xs-center">
                                            <v-btn light large @click="login()">
                                                <v-icon>mdi-login</v-icon>
                                                Logar
                                            </v-btn>
    
                                            <v-btn light large @click="cadatrar()">
                                                Cadastrar
                                                <v-icon>mdi-account-plus</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-form>
    
                            </v-flex>
                        </v-layout>
                    </v-img>
    
    
                </v-card>
    
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                formValid: "",
    
                usernameInput: "",
                passwordInput: "",
    
                usernameRules: [
                    v => !!v || "Digite seu username"
                ],
                passwordRules: [
                    v => !!v || "Digite a senha"
                ]
            }
        },
    
        methods: {
            cadatrar() {
    
                if (!this.formValid) {
                    iziToast.error({
                        title: "Preencha todos os campos",
                        closeOnClick: true
                    })
                    return;
                }
    
    
                let users = JSON.parse(localStorage.getItem("users")) || [];
    
                for (let i in users) {
                    if (this.usernameInput === users[i].username) {
                        iziToast.error({
                            title: "Username já existente",
                            closeOnClick: true
                        })
                        return;
                    }
                }
    
                users.push({
                    username: this.usernameInput,
                    password: this.passwordInput
                })
    
                localStorage.setItem("users", JSON.stringify(users));
    
                iziToast.success({
                    title: "Cadastro realizado com sucesso",
                    closeOnClick: true
                });

                this.login();
    
            },
    
            login() {
    
                if (!this.formValid) {
                    iziToast.error({
                        title: "Preencha todos os campos",
                        closeOnClick: true
                    })
                    return;
                }
    
                let users = JSON.parse(localStorage.getItem("users")) || [];
    
                for (let i in users) {
                    if (this.usernameInput === users[i].username && this.passwordInput == users[i].password) {

                        this.$root.$children[0].userID = i;
                        
                        iziToast.success({
                            title: "Login efetuado com sucesso",
                            message: `Bem vindo ${users[i].username}`,
                            closeOnClick: true
                        });

                        this.$destroy();
    
                        return;
                    }
                }
    
                iziToast.error({
                    title: "Conta não encontrada",
                    closeOnClick: true
                })
            },
        }
    }
</script>
