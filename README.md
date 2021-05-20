# Desafio CreativeCode

Api em nodejs com typescript

### 🎲 Rodando o Back End

```bash
# Clone este repositório
$ git clone <https://github.com/afpb04/creativecode.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd creativecode

# Execute os seguintes comandos

$ docker-compose up -d

# O servidor iniciará na porta:3333

# Espere a build do projeto terminar, depois que o estiver finalizado

$ yarn typeorm migration:run

$ yarn seed:admin

#Dados de acesso do admin

#E-mail: admin@creative.com.br
#Senha: admin

```
## Rotas
### Users

#### ROTAS PUBLICAS
* Para criar um usuario acesse a rota, metodo **POST** ```/users``` enviando no corpo da requisição:
```json
{
  "name": "Jon Doe",
  "phone": "00000000000",
  "email": "test@test.com",
  "age": 25,
  "weight": 71.2,
  "gender": "pardo",
  "password": "123456"
}
```

* Para se autenticar na aplicação acesse a rota ```/sessions``` metodo **POST** enviando no corpo da requisição

```json
{
	"email":"admin@creative.com.br",
	"password": "admin"
}
```

#### ROTAS PRIVADAS
* Para ver os detalhes do usuario logado acesse a rota, metodo **GET** ```/users/profile```

* Para listar todos os usuarios cadastrado e seus endereços acesse a rota ```/users``` metodo **GET**

#### ROTAS ADMIN

* Para atualizar um usuario acesse a rota ```/users/update/:user_id``` metodo **PUT** e enviar no corpo da requisição:

```json
{
  "name": "Jon Doe",
  "phone": "00000000000",
  "email": "test@test.com",
  "age": 25,
  "weight": 71.2,
  "gender": "pardo",
  "password": "123456"
}
```
* Para deletar um usuario aceese a rota ```/users/delete/:user_id``` metodo **DELETE**

* Para ver os detalhes de um usuario acesse a rota ```/users/detail/:user_id``` metodo **GET**

### Endereços
#### Rotas privadas

* Para criar um endereço acesse a rota ```/address``` metodo **POST** e enviando no corpo da requisição

```json
{
  "address": "string",
  "number": 1,
  "complement": "string",
  "zipCode": "string",
  "city": "string",
  "state": "string"
}
```
* Para visualizar um endereço específico acesse a rota ```address/:address_id ``` metodo **GET**

* Para deletar um endereço ```/address/delete/:address_id``` metodo **DELETE**

* Para atualizar um endereço acesse a rota ```/address/update/:address_id``` metodo **PUT** e enviando no corpo da requisição

```json
{
  "address": "string",
  "number": 1,
  "complement": "string",
  "zipCode": "string",
  "city": "string",
  "state": "string"
}
```
