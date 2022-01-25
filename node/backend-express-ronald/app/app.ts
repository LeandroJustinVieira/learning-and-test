import express from 'express';
import bodyParser from 'body-parser';
import swaggerUiExpress from 'swagger-ui-express';
import _ from 'underscore';

const PORT = 8086;

const swaggerOptions = {
    swaggerOptions: {
        url: 'http://petstore.swagger.io/v2/swagger.json'
    }
};

const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(null, swaggerOptions));


const operadoras = [
    {id: 1, nome: "TIM"},
    {id: 2, nome: "VIVO"},
    {id: 3, nome: "CLARO"},
    {id: 4, nome: "OI"}
];

let contatos = [];

let interadorIdContatos = 0;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

app.get('/api/v1/operadoras', (req, res) => {
    res.send({message: "A lista de operadoras foi obtida com sucesso!", data: operadoras});
});

app.get('/api/v1/contatos', (req, res) => {
    res.send({message: "A lista de contato foi obtida com sucesso!", data: contatos});
});

app.post('/api/v1/contatos', (req, res) => {
    let bean = req.body;
    if (bean.nome == null) {
        res.status(500).send({message: "O nome do contato é obrigatório!"});
        return;
    }
    if (bean.telefone == null) {
        res.status(500).send({message: "O telefone é obrigatório!"});
        return;
    }
    if (bean.operadora == null) {
        res.status(500).send({message: "A operadora é obrigatório!"});
        return;
    }
    let isNewBean = (bean.id == null);

    if (!isNewBean) {
        let index = _.findIndex(contatos, {id: bean.id});
        if (index < 0) {
            res.status(500).send({message: "Não foi possível encontar o contato solicitado!"});
            return;
        }
        bean = {
            id: bean.id,
            nome: bean.nome,
            telefone: bean.telefone,
            operadora: bean.operadora
        };
        contatos.splice(index, 1, bean);
    } else {
        interadorIdContatos++;
        bean = {
            id: interadorIdContatos,
            nome: bean.nome,
            telefone: bean.telefone,
            operadora: bean.operadora
        };
        contatos.push(bean);
    }
    res.send({message: "Contato Salvo com sucesso!", data: bean});
});

app.get('/api/v1/contatos/:id', (req, res) => {
    let contato = contatos.filter(c => c.id == req.params.id);
    if (contato == null) {
        res.status(500).send({message: "Não foi possível encontar o contato solicitado!"});
        return;
    }
    res.send({message: "Contato retornado com sucesso!", data: contato });
});

app.delete('/api/v1/contatos/:id', (req, res) => {
    console.log('id', req.params.id );
    let index = contatos.findIndex(c => c.id == req.params.id);
    if (index < 0) {
        res.status(500).send({message: "Não foi possível encontar o contato solicitado!"});
        return;
    }
    contatos.splice(index, 1);
    res.send({message: "Contato removido com sucesso!"});
});
