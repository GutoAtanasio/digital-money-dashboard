# Digital Money Dashboard

## Descrição
O **Digital Money Dashboard** é uma aplicação web para gerenciar finanças pessoais de forma prática e visual.  
Permite cadastrar **entradas e saídas**, visualizar o **saldo total** e acompanhar todas as movimentações financeiras em tempo real.

---

## Funcionalidades
- Adicionar novas transações (título, valor, tipo e categoria).  
- Listar todas as transações registradas.  
- Excluir transações diretamente do dashboard.  
- Cálculo automático de saldo total, entradas e saídas.  

---

## Tecnologias
- **Frontend:** React, Vite, TailwindCSS, @phosphor-icons/react  
- **Backend:** Node.js, Express, JSON local (simulando banco de dados)  
- **Comunicação:** APIs REST entre frontend e backend  

---

## Estrutura do Projeto
digital-money-dashboard/
├── frontend/
│ ├── src/
│ ├── package.json
│ └── vite.config.js
├── backend/
│ ├── server.js
│ ├── db.json
│ └── package.json
└── .gitignore

yaml
Copiar código

---

## Como Rodar o Projeto Localmente

### 1️⃣ Backend
1. Navegue até a pasta do backend:
```bash
cd backend
Instale as dependências:

bash
Copiar código
npm install
Inicie o servidor:

bash
Copiar código
npm run dev
O backend irá rodar em: http://localhost:5000

### 2️⃣ Frontend
Navegue até a pasta do frontend:

bash
Copiar código
cd frontend
Instale as dependências:

bash
Copiar código
npm install
Inicie o servidor de desenvolvimento:

bash
Copiar código
npm run dev
O frontend estará disponível em: http://localhost:5173

Fluxo de Uso
Acesse o dashboard pelo navegador.

Adicione uma nova transação (entrada ou saída) usando o formulário.

Visualize a transação na lista e no saldo atualizado.

Para excluir uma transação, clique no botão X ao lado dela.

Observações
Todas as transações são armazenadas localmente no arquivo db.json do backend.

O projeto é escalável e pode ser conectado futuramente a um banco de dados real, como MySQL ou MongoDB.

Autor
Guto Almeida Atanasio

yaml
Copiar código
