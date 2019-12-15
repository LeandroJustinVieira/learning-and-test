# Database

##### Responsável por armazenar as alterações e o schema do database;

#####Criado uma base de dados no postgres chamada de namegator;

* docker exec -it postgres-10.3 /bin/bash  (acessar o docker do postgres)
* psql -Upostgres (logar no client do postgres apartir do usuário 'postgres')
* create database namegator; (criado database namegator)