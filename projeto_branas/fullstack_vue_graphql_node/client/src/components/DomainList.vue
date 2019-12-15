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
                                    &nbsp;
                                    <a class="btn btn-info" @click="openDomain(domain)">
                                        <span class="fa fa-search"></span>
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
	import {mapState, mapActions} from "vuex";
	import AppItemList from "./AppItemList";

	export default {
		name: "app",
		components: {
			AppItemList
		},
		data: () => {
			return {};
		},
		methods: {
			...mapActions(["addItem", "deleteItem", "getItems", "generateDomains"]),
			openDomain(domain) {
				this.$router.push({
					path: `/domains/${domain.name}`
				});
			}
		}, computed: {
			...mapState(["items", "domains"])
		}
	};
</script>
