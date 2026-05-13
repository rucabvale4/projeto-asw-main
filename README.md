# WeDo - API

## Requisitos
Para a execução deste projeto, é necessário instalar as seguintes ferramentas:
* **Node.js** (versão 18 ou superior)
* **PostgreSQL** (instância local ou na cloud)

Após a instalação das ferramentas base, devem ser seguidos os seguintes passos de configuração:
1. Instalar as dependências do projeto executando o comando `npm install` no diretório raiz.
2. Criar um ficheiro designado `.env` na raiz do projeto, contendo a string de ligação à base de dados de acordo com o seguinte formato:
   `DATABASE_URL="postgresql://utilizador:password@localhost:5432/nome_da_base_de_dados?schema=public"`

---

## Execução do Servidor

Após a configuração dos requisitos iniciais, devem ser executados os seguintes comandos no terminal, dentro do diretório do projeto, para iniciar a aplicação:

1. **Criar as tabelas na base de dados:**
   npx prisma migrate dev --name init_wedo

2. **Atualizar o cliente Prisma:**
   npx prisma generate

3. **Iniciar a API:**
   npx tsx watch src/server.ts

O servidor ficará disponível e a escutar pedidos na porta 3000 (http://localhost:3000).

## Autenticação e Segurança
A API utiliza JWT (JSON Web Tokens) para proteger as rotas de escrita e modificação.
As palavras-passe são armazenadas de forma segura utilizando o algoritmo de hashing Bcrypt.


### Como autenticar:
1. **Registo:** Cria uma conta no endpoint POST /api/users.
2. **Login:** Envia as tuas credenciais para POST /api/auth/login.
3. **Token:** A API devolverá um token. Copia esse código.
4. **Uso:** Em todos os pedidos para rotas protegidas, deves incluir o cabeçalho: `Authorization: Bearer <teu_token_aqui>`

### Moc Accounts

* `{ "email: admin1@wedo.pt || password: admin123" }`
* `{ "email: user1@wedo.pt || password: user123" }`

---

## Endpoints Disponíveis
as
A API possui documentação interativa gerada através do Swagger. Para testar rotas protegidas no Swagger, clica no botão com o cadeado "Authorize" no topo da página e cola o teu token.

* **Documentação Swagger:** http://localhost:3000/api-docs

### 1. Autenticação (Auth)
* **POST** `http://localhost:3000/api/auth/login` - Autentica o utilizador e devolve o Token de acesso.

### 2. Utilizadores (Users)
* **GET** `/api/users` - Lista todos os utilizadores (Protegido - Requer Login).
* **POST** `/api/users` - Regista um novo utilizador (Público).
* **PUT** `/api/users/:id` - Substituição total de um utilizador (Protegido).
* **PATCH** `/api/users/:id` - Atualização parcial (ex: apenas email) (Protegido).
* **DELETE** `/api/users/:id` - Elimina um utilizador (Protegido).

### 3. Grupos (Squads)
* **GET** `/api/squads` - Lista todos os Squads e as respetivas Actions (Público).
* **POST** `/api/squads` - Cria um novo Squad (Protegido).
* **PUT** `/api/squads/:id` - Altera o nome do Squad (Protegido).
* **DELETE** `/api/squads/:id` - Remove um Squad (Protegido).

### 4. Ações (Actions)
* **GET** `/api/actions` - Lista todas as Actions registadas (Público).
* **POST** `/api/actions` - Cria uma nova Action associada a um Squad (Protegido).
* **PATCH** `/api/actions/:id` - Atualiza detalhes específicos de uma Action (Protegido).
* **DELETE** `/api/actions/:id` - Apaga uma Action (Protegido).
* **GET** `/api/actions/:id` - Informação meteorológica e conselho de IA para a ação (Protegido).
