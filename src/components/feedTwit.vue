<style>
    .twitSpace {
        white-space: pre-line;
    }
</style>

<template>
    <v-layout>
        <v-flex>
            <v-card hover light class="my-2">
                <v-card-title class="headline grey lighten-2">
                    <span>@{{ twit.user }}:</span>
                    <v-spacer></v-spacer>
                    <span class="subheading">{{ twit.date }} - {{ twit.time }}</span>
    
                    <v-menu offset-y>
                        <v-btn icon flat slot="activator">
                            <v-icon>mdi-menu</v-icon>
                        </v-btn>
    
                        <v-list light>
                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-tooltip bottom :disabled="$root.$children[0].userID === twit.createID">
                                        <v-btn slot="activator" :disabled="$root.$children[0].userID !== twit.createID" flat @click="delT()">
                                            Deletar
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>

                                        <span>Apenas o autor pode Deletar</span>
                                    </v-tooltip>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
    
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="twitSpace px-5">
                    <div class="body-1">{{ twit.text }}</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-tooltip bottom>
                        <v-btn icon flat @click="like()" slot="activator">
                            <span class="caption">{{ contLike }}</span>
                            <v-icon :class="{'green--text' : isLike}">mdi-thumb-up</v-icon>
                        </v-btn>
                        <span>Like</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <v-btn icon flat @click="dislike()" slot="activator">
                            <v-icon :class="{'red--text': isDislike}">mdi-thumb-down</v-icon>
                            <span class="caption">{{ contDislike }}</span>
                        </v-btn>
                        <span>Dislike</span>
                    </v-tooltip>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "feedTwit",
        props: ["user", "twit", "uId"],
    
        created() {
            this.isLike = (this.twit.likesID.indexOf(this.uId) !== -1) ? true : false;
            this.isDislike = (this.twit.dislikeID.indexOf(this.uId) !== -1) ? true : false;
        },
    
        data() {
            return {
                isLike: false,
                isDislike: false,
            }
        },
    
        methods: {
            delT() {
                let twR = this.$root.$children[0].$children[0].$children[0].twits;
                let index = twR.indexOf(this.twit);
                twR.splice(index, 1);
            },
    
            like() {
    
                if (this.isDislike) {
                    this.dislike();
                }
    
                let index = this.twit.likesID.indexOf(this.uId);
    
                if (index === -1) {
                    this.twit.likesID.push(this.uId);
                    this.isLike = true;
                } else {
                    this.twit.likesID.splice(index, 1);
                    this.isLike = false;
                }
    
                this.updateLocalStoraga;
    
            },
    
            dislike() {
    
                if (this.isLike) {
                    this.like();
                }
    
                let index = this.twit.dislikeID.indexOf(this.uId);
                if (index === -1) {
                    this.twit.dislikeID.push(this.uId);
                    this.isDislike = true;
                } else {
                    this.twit.dislikeID.splice(index, 1);
                    this.isDislike = false;
                }
    
                this.updateLocalStoraga;
    
            }
        },
    
        computed: {
            contLike() {
                return this.twit.likesID.length;
            },
    
            contDislike() {
                return this.twit.dislikeID.length;
            },
    
            updateLocalStoraga() {
                let twR = this.$root.$children[0].$children[0].$children[0].twits;
                let index = twR.indexOf(this.twit);
                if (index !== -1) {
                    twR[index] = this.twit;
                    localStorage.setItem("twits", JSON.stringify(twR));
                }
            }
        }
    }
</script>
