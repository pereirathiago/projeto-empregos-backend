SISTEMA DE BUSCA E OFERTA DE EMPREGOS

Projeto desenvolvido para a disciplina Tecnologias Cliente Servidor - UTFPR
Curso: Analise e Desenvolvimento de Sistemas

TECNOLOGIAS UTILIZADAS:
- Node.js
- TypeScript
- Express
- PostgreSQL
- Docker

COMO EXECUTAR O PROJETO:

1) Clonar o repositório
   git clone https://github.com/pereirathiago/projeto-empregos.git
   cd projeto-empregos

2) Instalar dependências
   npm install
   (ou: yarn install / pnpm install)


3) Subir o banco de dados

   a) Usando Docker (recomendado)
      docker-compose up -d

   b) Sem Docker (manual)
      - Instale o PostgreSQL na sua máquina
      - Crie o banco e usuário manualmente:
        psql -U postgres
        CREATE DATABASE empregos_db;
        CREATE USER postgres WITH PASSWORD 'postgres';
        GRANT ALL PRIVILEGES ON DATABASE empregos_db TO postgres;

4) Configurar variáveis de ambiente
   Copie o conteudo do .env.example para um arquivo .env
    cp .env.example .env

5) Rodar migrations
   npm run migrate:latest

6) Iniciar o servidor em modo desenvolvimento
   npm run dev

7) Acessar a aplicação
   Ao iniciar, será perguntada a porta. Pressione Enter para usar a padrão (3333)
   ou digite uma porta customizada.
   
   Acesse: http://localhost:3333 (ou a porta escolhida)

POSTMAN COLLECTION:

Arquivo: "Projeto Empregos - UTFPR.postman_collection.json"
Importe no Postman para testar todos os endpoints.
