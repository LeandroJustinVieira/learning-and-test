<template>
    <div>
        <div id="slogan" class="text-center">
            <h1>NameGator</h1>
            <br>
            <h6 class="text-secondary"> Gerador de nomes utilizando Vue.js, GraphGL e Node </h6>
        </div>
        <div id="main">
            <div class="container">
                <div class="row">
                    <div class="col-md">
                        <h5>Prefixos <span class="badge badge-info">{{prefixes.length}}</span></h5>
                        <div class="card">
                            <div class="card-body">
                                <ul class="list-group">
                                    <li class="list-group-item" v-for="prefix in prefixes" v-bind:key="prefix">
                                        <div class="row">
                                            <div class="col-md">
                                                {{prefix}}
                                            </div>
                                            <div class="col-md text-right">
                                                <button class="btn btn-info" v-on:click="removePrefix(prefix)">
                                                    <span class="fa fa-trash"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <br/>
                                <div class="input-group">
                                    <input class="form-control" v-model="prefix" type="text"
                                           v-on:keyup.enter="addPrefix(prefix)"
                                           placeholder="Digite o prefixo"/>
                                    <div class="input-group-append">
                                        <button class="btn btn-info" v-on:click="addPrefix(prefix)">
                                            <span class="fa fa-plus"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md">
                        <h5>Sufixos <span class="badge badge-info">{{suffixes.length}}</span></h5>
                        <div class="card">
                            <div class="card-body">
                                <ul class="list-group">
                                    <li class="list-group-item" v-for="suffix in suffixes" v-bind:key="suffix">
                                        <div class="row">
                                            <div class="col-md">
                                                {{suffix}}
                                            </div>
                                            <div class="col-md text-right">
                                                <button class="btn btn-info" v-on:click="removeSuffix(suffix)">
                                                    <span class="fa fa-trash"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <br/>
                                <div class="input-group">
                                    <input class="form-control" v-model="suffix" type="text"
                                           v-on:keyup.enter="addSuffix(suffix)"
                                           placeholder="Digite o sufixo"/>
                                    <div class="input-group-append">
                                        <button class="btn btn-info" v-on:click="addSuffix(suffix)">
                                            <span class="fa fa-plus"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <h5>Dominios <span class="badge badge-info">{{domains.length}}</span></h5>
                <div class="card">
                    <div class="card-body">
                        <ul>
                            <li class="list-group-item" v-for="domain in domains" v-bind:key="domain.name">
                                <div class="row">
                                    <div class="col-md">
                                        {{domain.name}}
                                    </div>
                                    <div class="col-md text-right">
                                        <a class="btn btn-info" v-bind:href="domain.checkout" target="_blank">
                                            <span class="fa fa-shopping-cart"></span>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import "bootstrap/dist/css/bootstrap.css";
	import "font-awesome/css/font-awesome.css";

	export default {
		name: "app",
		data: () => {
			return {
				prefix: "",
				suffix: "",
				prefixes: ["Air", "Jet", "Flight"],
				suffixes: ["Hub", "Station", "Match"]
			};
		},
		methods: {
			addSuffix(suffix) {
				this.suffixes.push(suffix);
				this.suffix = "";
			},
			removeSuffix(suffix) {
				let index = this.suffixes.indexOf(suffix);
				if (index !== -1) this.suffixes.splice(index, 1);
			},
			addPrefix(prefix) {
				this.prefixes.push(prefix);
				this.prefix = "";
			},
			removePrefix(prefix) {
				let index = this.prefixes.indexOf(prefix);
				if (index !== -1) this.prefixes.splice(index, 1);
			},
		},
		computed: {
			domains() {
				console.log("generate domains ...");
				const domains = [];
				for (const prefix of this.prefixes) {
					for (const suffix of this.suffixes) {
						const name = prefix + suffix;
						const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${name.toLowerCase()}&tld=.com.br`;
						domains.push({name, checkout});
					}
				}
				return domains;
			}
		}, beforeCreate() {
			console.log("Method beforeCreate -> lifecycle vue");
		}, created() {
			console.log("Method created -> lifecycle vue");
		}, beforeMount() {
			console.log("Method beforeMount -> lifecycle vue");
		}, mounted() {
			console.log("Method mounted -> lifecycle vue");
		}, beforeDestroy() {
			console.log("Method beforeDestroy -> lifecycle vue");
		}, destroyed() {
			console.log("Method destroyed -> lifecycle vue");
		}
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
