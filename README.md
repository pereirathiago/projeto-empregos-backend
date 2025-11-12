# Sistema de Buscemojiccferta de Empregos

Projeto desenvolvido para a disciplina **Tecnologias Cliente Servidor** do curso **Análise e Desenvolvimento de Sistemas - UTFPR**

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 📋 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Executando o Projeto](#-executando-o-projeto)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

Sistema backend para gerenciamento de vagas de emprego e candidatos, desenvolvido com foco em **Clean Architecture**, **SOLID** e boas práticas de desenvolvimento. O sistema permite cadastro de candidatos (usuário comum), autenticação JWT, e gerenciamento completo de perfis de usuários.

---

## 🚀 Tecnologias Utilizadas

- NodeJs
- Typescript
- ExpressJs
- PostgreSQL
- KnexJs
- Docker
- Yup

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 22 ou superior)
- **npm**, **yarn** ou **pnpm**
- **Docker** e **Docker Compose**
- **Git**

---

## 🚀 Executando o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/pereirathiago/projeto-empregos.git

cd projeto-empregos
```

### 2. Instale as dependências

Escolha seu gerenciador de pacotes:

```bash
# Usando yarn
yarn install

# Usando npm
npm install

# Usando pnpm
pnpm install
```


### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:


### 4. Inicie o banco de dados PostgreSQL

#### Usando Docker (recomendado)

```bash
docker-compose up -d
```

#### Sem Docker (manual)

1. Instale o PostgreSQL na sua máquina
2. Crie um banco de dados e usuário manualmente:

```bash
# Acesse o terminal do postgres (pode ser psql ou PgAdmin)
psql -U postgres

# No prompt do psql, execute:
CREATE DATABASE empregos_db;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE empregos_db TO postgres;
```

3. Certifique-se de que as variáveis do seu .env estão corretas para o acesso local.

### 5. Execute as migrations

```bash
# Usando yarn
yarn migrate:latest

# Usando npm
npm run migrate:latest

# Usando pnpm
pnpm migrate:latest
```

### 6. Execute o projeto

```bash
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

O servidor irá perguntar em qual porta rodar:

```
Digite a porta para o servidor (padrão: 3333): 
```

- Pressione **Enter** para usar a porta padrão (do `.env`)

### Servidor em execução

```
✅ Server is running on port 3333
🚀 Access: http://localhost:3333
```

---

### 📮 Postman Collection

Uma coleção completa do Postman está disponível em:
```
Projeto Empregos - UTFPR.postman_collection.json
```

Importe no Postman para testar todos os endpoints facilmente!

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

Desenvolvido com 💙 por Thiago Pereira

</div>
