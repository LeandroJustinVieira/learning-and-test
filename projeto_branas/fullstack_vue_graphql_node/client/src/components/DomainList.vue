<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md">
                    <AppItemList title="Prefix" type="prefix" v-bind:items="items.prefix" v-on:addItem="addItem"
                                 v-on:deleteItem="deleteItem"></AppItemList>
                </div>
                <div class="col-md">
                    <AppItemList title="Suffix" type="suffix" v-bind:items="items.suffix" v-on:addItem="addItem"
                                 v-on:deleteItem="deleteItem"></AppItemList>
                </div>
            </div>
            <br>
            <h5>Dominios <span class="badge badge-info">{{domains.length}}</span></h5>
            <div class="card">
                <div class="card-body">
                    <ul>
                        <li class="list-group-item" v-for="domain in domains" v-bind:key="domain.name">
                            <div class="row">
                                <div class="col-md-6">
                                    {{domain.name}}
                                </div>
                                <div class="col-md-3">
                                    <span class="badge badge-info">{{(domain.available) ? "Disponível" : "Indisponível"}}</span>
                                </div>
                                <div class="col-md-3 text-right">
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
				items: {
					prefix: [],
					suffix: []
				},
				domains: []
			};
		},
		methods: {
			getItems(type) {
				return axios({
					url: "http://localhost:4000",
					method: "post",
					data: {
						query: `
                            query ($type: String) {
                                items: items (type: $type) {
                                    id
                                    type
                                    description
                                }
                            }
                        `,
						variables: {
							type: type
						}
					}
				}).then(response => {
					const query = response.data;
					this.items[type] = query.data.items;
				});
			},
			addItem(item) {
				axios({
					url: "http://localhost:4000",
					method: "post",
					data: {
						query: `
                            mutation ($item: ItemInput) {
                                newItem: saveItem(item: $item) {
                                    id
                                    type
                                    description
                                }
                            }
                	    `, variables: {
							item: item
						}
					}
				}).then(response => {
					const query = response.data;
					const newItem = query.data.newItem;
					this.items[item.type].push(newItem);
					this.generateDomains();
				});
			},
			deleteItem(item) {
				axios({
					url: "http://localhost:4000",
					method: "post",
					data: {
						query: `
                            mutation ($id: Int) {
                                deleted: deleteItem(id: $id)
                            }
                	    `, variables: {
							id: item.id
						}
					}
				}).then(() => {
					this.items[item.type].splice(this.items[item.type].indexOf(item), 1);
					this.generateDomains();
				});
			},
			generateDomains() {
				console.log("generate domains ...");
				axios({
					url: "http://localhost:4000",
					method: "post",
					data: {
						query: `
                            mutation {
                                domains : generateDomains {
                                    name
                                    checkout
                                    available
                                }
                            }
                	    `
					}
				}).then((response) => {
                    const query = response.data;
                    this.domains = query.data.domains;
                    console.log("domains", this.domains);
				});
			}
		}, created() {
			Promise.all([
				this.getItems("prefix"),
				this.getItems("suffix")
			]).then(() => {
				this.generateDomains();
			});
		}
	};
</script>

<style>
</style>
