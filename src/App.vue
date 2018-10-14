<template>
	<v-app>
	
		<meta v-if="userID === null" name="theme-color" content="#ffffff">
		<meta v-else name="theme-color" content="#0288D1">
	
	
		<v-content v-if="userID === null" id="login">
			<login></login>
		</v-content>
	
		<feed v-else></feed>
	
	</v-app>
</template>

<script>
	import login from "./components/login.vue"
	import feed from "./components/feed.vue"
	export default {
	
	
		components: {
			login,
			feed
		},
	
		data() {
			return {
				userID: null
			}
		},
	
		methods: {
			logout() {
				this.userID = null;
			}
		},
	
		created() {
			this.userID = JSON.parse(localStorage.getItem("userID"));
		},
	
		watch: {
			userID(val) {
				localStorage.setItem("userID", JSON.stringify(val));
			}
		}
	}
</script>
