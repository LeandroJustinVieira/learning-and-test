const axios = require("axios");
const TotalVoice = require("totalvoice-node");
require('dotenv').config();

const client = new TotalVoice(process.env.TOTAL_VOICE_API_KEY);

const servers = [
    {
        name: "Servidor Teste",
        url: "http://localhost:4002",
        developer: {
            name: process.env.DEVELOPER,
            telephone: process.env.TELEPHONE
        }
    }
];

const notifications = [];

console.log("Start monitor server ...");
for (const server of servers) {
    axios({
        url: server.url,
        method: "get"
    }).then(response => {
        console.log(`${server.name} up!`);
    }).catch(() => {
        console.log(`${server.name} down!`);
        const message = `${server.developer.name} o ${server.name} está fora do ar, por favor faça alguma coisa mais rápido possível. Digite um se você vai fazer alguma coisa, ou dois se você não pode fazer nada!`;
        const options = {
            velocidade: 4,
            tipo_voz: "br-Vitoria",
            resposta_usuario: true,
        };
        client.tts.enviar(server.developer.telephone, message, options).then(response => {
            notifications.push({
                id: response.dados.id,
                server,
                status: "pending"
            });
            console.log(`O desenvolver ${server.developer.name} foi avisado!`);
        }).catch(response => {
            console.log(response);
        });
    });
}
console.log("Finish monitor server ...");

setInterval(async () => {
    for (const notification of notifications) {
        if (notification.status === "pending") {
            await client.tts.buscar(notification.id).then((response) => {
                if (response.dados.resposta === "1") {
                    notification.status = "success";
                    console.log(`O desenvolver ${notification.server.developer.name} já foi avisado e irá fazer alguma coisa!`);
                }
                if (response.dados.resposta === "2") {
                    console.log(`O desenvolver ${notification.server.developer.name} já foi avisado e irá não pode fazer nada!`);
                }
            })
        }
    }
}, 5000);
