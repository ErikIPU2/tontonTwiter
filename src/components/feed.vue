<template>
    <v-app dark v-touch="{right: () => navActive = true, left: () => navActive = false}">
        

        <v-toolbar color="secondary" app>
            <v-btn flat icon @click="navActive = !navActive">
                <v-icon class="black--text">mdi-menu</v-icon>
            </v-btn>
            <v-toolbar-title class="black--text"> TontonTwiter: @{{user.username}}</v-toolbar-title>
    
        </v-toolbar>
    
        <v-navigation-drawer light v-model="navActive" mini-variant app>
            <v-list>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-btn icon @click="$root.$children[0].logout()">
                            <v-icon>mdi-logout</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
    
                <v-divider></v-divider>
    
            </v-list>
        </v-navigation-drawer>
    
        <v-btn bottom right fixed fab color="primary" @click="newTDialog = true">
            <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-dialog max-width="500" v-model="newTDialog">
            <v-card light>
                <v-card-title class="headline">Nova Mensagem</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="grey lighten-2">
                    <v-form class="text-xs-center">
                        <v-textarea v-model="message" maxlength="500" counter="500" auto-grow label="O que vem a sua cabeça?"></v-textarea>
                        <v-btn @click="newMessage()" large color="primary">Twittar</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-content>
            <v-layout align-center justify-center pb-5>    
                <v-flex xs12 sm10 md9 lg8 pb-5>
                    <feedTwit v-for="(tw, index) in twits" :key="index" :user="user" :twit="tw" :uId="$root.$children[0].userID"></feedTwit>
                </v-flex>
            </v-layout>
        </v-content>
    
    
    
    </v-app>
</template>

<script>
    import feedTwit from "./feedTwit.vue"
    export default {
        name: "feed",

        components:{
            feedTwit
        },
    
        data() {
            return {
                user: "",
                message: "",
    
                twits: [],
    
                navActive: false,
                newTDialog: false,
            }
        },

        methods: {

            newMessage() {
                let date = new Date();
                this.twits.push({
                    text: this.message,
                    user: this.user.username,
                    createID: this.$root.$children[0].userID,
                    date: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
                    time: `${date.getHours()}:${date.getMinutes()}`,
                    likesID: [],
                    dislikeID: []
                })

                this.message = "";
                this.newTDialog = false;
            }
        },
    
        watch: {
            twits(val) {
                localStorage.setItem("twits", JSON.stringify(val));
            },
        },
    
        created() {
            this.user = JSON.parse(localStorage.getItem("users"))[this.$root.$children[0].userID];
            this.twits = JSON.parse(localStorage.getItem("twits")) || [];
        }
    }
</script>
