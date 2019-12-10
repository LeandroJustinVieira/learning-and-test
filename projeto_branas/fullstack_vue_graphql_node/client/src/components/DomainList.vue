<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md">
                    <AppItemList title="Prefix" v-bind:items="prefixes" v-on:addItem="addPrefix"
                                 v-on:deleteItem="deletePrefix"></AppItemList>
                </div>
                <div class="col-md">
                    <AppItemList title="Suffix" v-bind:items="suffixes" v-on:addItem="addSuffix"
                                 v-on:deleteItem="deleteSuffix"></AppItemList>
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
</template>

<script>
	import "bootstrap/dist/css/bootstrap.css";
	import "font-awesome/css/font-awesome.css";
	import axios from "axios/dist/axios";
	import AppItemList from "./AppItemList";

	export default {
		name: "app",
		components: {
			AppItemList
		},
		data: () => {
			return {
				prefixes: [],
				suffixes: []
			};
		},
		methods: {
			addSuffix(suffix) {
				this.suffixes.push(suffix);
			},
			deleteSuffix(suffix) {
				let index = this.suffixes.indexOf(suffix);
				if (index !== -1) this.suffixes.splice(index, 1);
			},
			addPrefix(prefix) {
				this.prefixes.push(prefix);
			},
			deletePrefix(prefix) {
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
		}, created() {
			console.log("createad");
			axios({
				url: "http://localhost:4000",
				method: "post",
				data: {
					query: `
                        {
                            prefixes: items (type: "prefix") {
                                id
                                type
                                description
                            },
                            suffixes: items (type: "suffix") {
                                id
                                type
                                description
                            },
                        }
                	`
				}
			}).then(response => {
				console.log("response", response);
				const query = response.data;
				console.log("query", query);
				this.prefixes = query.data.prefixes.map(prefix => prefix.description);
				this.suffixes = query.data.suffixes.map(suffix => suffix.description);
			});
		}
	};
</script>

<style>
</style>
