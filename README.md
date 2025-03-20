# 🏗️ Barber Shop API

### Este é o back-end da aplicação **Barber Shop**, responsável pelo gerenciamento dos agendamentos, pagamentos via Pix e comunicação com o banco de dados.

## 🚀 Funcionalidades
- Gerenciamento de **agendamentos** de clientes.
- **Geração de QR Code Pix** para pagamentos.
- Listagem de **horários disponíveis** por barbeiro.
- API RESTful para comunicação com o front-end.
- **Autenticação via JWT** (futuro).

## 🛠️ Tecnologias Utilizadas
- **Node.js** + Express.js 🚀
- **MongoDB** (Banco de Dados)
- **Mongoose** (ORM para MongoDB)
- **Faz-um-Pix** (Geração de Pix)
- **Cors** e **Dotenv** para segurança e configuração.

## 📋 Requisitos
- Node.js instalado (versão recomendada: 18+)
- MongoDB configurado (local ou Atlas)
- Gerenciador de pacotes `npm` ou `yarn`

## 🔧 Instalação e Configuração
1. Clone este repositório:
   ```bash
   git clone https://github.com/seuusuario/barber-shop-api.git
   cd barber-shop-api
   
2. Instale as dependências:
   ```bash
    npm install

3. Configure o arquivo `.env`:
   ```bash
   PORT =8080
   MONGO+URI=sua_string_de_conexao
   JWT_SECRET=sua_chave_secreta
   
4. Inicie o servidor:
      ```bash
   npm run dev ou npm start

## ▶️ Como Usar
A API pode ser acessada na porta 8080:

- Listar agendamentos: ``GET`` /agendamentos
- Criar agendamento: ``POST`` /agendamentos
- Verificar horários disponíveis: ``GET`` /agendamentos/disponiveis
- Gerar código Pix: ``POST`` /api/gerar-pix

## 📞 Contato
✉️ Email: gabrielhenrique.hsn@gmail.com
📌 Linkedin: [Gabriel Henrique](https://www.linkedin.com/in/gabriel-henrique-2631931b2/)

