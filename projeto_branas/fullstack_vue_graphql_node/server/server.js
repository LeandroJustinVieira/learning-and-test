const {ApolloServer} = require("apollo-server");
const dns = require("dns");
const service = require("./service");

const typeDefs = `
	type Item {
		id: Int
		type: String
		description: String
	}
	
	type Domain {
		name: String
		checkout: String
		extension: String
		available: Boolean
	}
	
	type Query {
		items (type: String): [Item]
	}
	
	input ItemInput {
		type: String
		description: String
	}
	
	type Mutation {
		saveItem(item: ItemInput) : Item
		deleteItem(id: Int) : Boolean
		generateDomains : [Domain]
		generateDomain(name: String) : [Domain]
	}
`;

const isDomainAvailable = function (url) {
	return new Promise(function (resolve, reject) {
		dns.resolve(url, function (error) {
			if (error) {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	});
};

const resolvers = {
	Query: {
		async items(_, args) {
			return service.getItemsByType(args.type);
		}
	},
	Mutation: {
		async saveItem(_, args) {
			//fazendo destructuring js, para pegar o primeiro elemento do array
			const [newItem] = await service.saveItem(args.item);
			return newItem;
		},
		async deleteItem(_, args) {
			await service.deleteItem(args.id);
			return true;
		},
		async generateDomains() {
			const domains = [];
			const items =  await service.getItems();
			for (const prefix of items.filter(item => item.type === "prefix")) {
				for (const suffix of items.filter(item => item.type === "suffix")) {
					const name = prefix.description + suffix.description;
					const url = name.toLowerCase();
					const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=.com.br`;
					const available = await isDomainAvailable(`${url}.com.br`);
					domains.push({name, checkout, available});
				}
			}
			return domains;
		},
		async generateDomain(_, args) {
			const domains = [];
			const name = args.name;
			console.log(name);
			const extensions = [".com.br", ".com", ".net", ".org"];
			for (const extension of extensions) {
				const url = name.toLowerCase();
				const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=${extension}`;
				const available = await isDomainAvailable(`${name}${extension}`);
				domains.push({name, extension, checkout, available});
			}
			return domains;
		}
	}
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(response => {
	console.log("server start", response);
});