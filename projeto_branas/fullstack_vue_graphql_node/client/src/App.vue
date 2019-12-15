<template>
    <div>
        <div id="slogan" class="text-center">
            <h1>NameGator</h1>
            <br>
            <h6 class="text-secondary"> Gerador de nomes utilizando Vue.js, GraphGL e Node </h6>
        </div>
        <div id="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
	import "bootstrap/dist/css/bootstrap.css";
	import "font-awesome/css/font-awesome.css";

	export default {
		name: "app",
		components: {}
	};
</script>

<style>
    #slogan {
        margin: 30px 0;
    }

    #main {
        background-color: #f1f1f1;
        padding: 30px 0;
    }
</style>
