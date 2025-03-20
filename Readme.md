# API de tarefas

## Passos para iniciar o projeto
1- Instalar as dependências executando: ```npm install```
2- Configurar as variáveis de ambiente criando o arquivo .env
3- Iniciar o projeto executando: ```npm run dev```
4- Configurar as variáveis de ambiente para testes criando o arquivo .env.test

### Obs:
- Para comezar a usar a api é necessário criar um usuário e depois fazer login

### Rotas de usuários:
* registrar um usuário --> localhost:3000/api/v1/auth/register
* logar um usuário --> localhost:3000/api/v1/auth/login

### Rotas de tarefas:
* criar tarefa (POST) --> localhost:3000/api/v1/todo
* listar tarefas (GET) --> localhost:3000/api/v1/todo
* listar uma tarefa (GET) --> localhost:3000/api/v1/todo/:id
* atualizar tarefa (PUT) --> localhost:3000/api/v1/todo/:id
* deletar tarefa (DELETE) --> localhost:3000/api/v1/todo/:id