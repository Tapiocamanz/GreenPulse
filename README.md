# 🌱 GreenPulse							
								
![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python)		
![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-green?logo=fastapi)		
![Ethereum](https://img.shields.io/badge/Ethereum-Web3.py-purple?logo=ethereum)	
![License](https://img.shields.io/badge/License-MIT-yellow)			
								
**GreenPulse** é uma aplicação backend construída com **FastAPI** e **SQLite**, projetada para gerenciar usuários e posts, agora integrada ao **Ethereum** para fornecer rastreabilidade imutável de dados e integração com carteiras digitais.
								
A API expõe endpoints REST para criação e consulta de **usuários**, **posts** e suas respectivas interações com a blockchain.
								
								
								
# 📂 Estrutura do Projeto						
								
GreenPulse/							
│								
├─ app/								
│ ├─ main.py # Inicializa a aplicação FastAPI				
│ ├─ models.py # Modelos ORM (Users, Posts com wallet/tx)			
│ ├─ schemas.py # Schemas Pydantic para validação				
│ ├─ crud.py # Operações CRUD do banco					
│ ├─ database.py # Conexão com banco SQLite				
│ ├─ blockchain.py # Conexão e funções com Ethereum				
│ └─ init_db.py # Script para criar as tabelas					
│								
├─ greenpulse.db # Banco SQLite (desenvolvimento)				
├─ requirements.txt # Dependências do projeto				
└─ .env # Variáveis de ambiente						
								
								
---								
								
# ⚙️ Configuração do Ambiente						
								
Clone o repositório:							
								
```bash								
git clone https://github.com/Tapiocamanz/GreenPulse.git				
cd GreenPulse							
								
Crie e ative um ambiente virtual:						
								
python -m venv venv							
# Windows								
venv\Scripts\activate							
# Linux/Mac							
source venv/bin/activate						
Instale as dependências:						
								
pip install -r requirements.txt						
🗄 Configuração do Banco de Dados					
 
O banco padrão é SQLite (greenpulse.db).					
								
python -m app.init_db							
Esse comando cria as tabelas users e posts.					
								
🔗 Integração com Ethereum						
O projeto utiliza web3.py para comunicação com a rede Ethereum.			
								
No arquivo .env configure:						
								
ETH_NODE_URL=https://mainnet.infura.io/v3/SUA_API_KEY			
Verificação de conexão:						
								
from app.blockchain import web3						
								
print(web3.is_connected())  # True se conectado				
🧩 Modelos (ORM)							
User								
id: inteiro (PK)							
								
name: string							
								
wallet_address: endereço Ethereum vinculado				
								
Post								
id: inteiro (PK)							
								
title: string								
								
user_id: FK → User.id							
								
tx_hash: hash da transação Ethereum					
								
📦 Schemas (Pydantic)						
UserCreate → name, wallet_address					
								
PostCreate → title, user_id						
								
User / Post → retornam dados incluindo id e tx_hash				
								
🔧 CRUD com Blockchain						
Ao criar um Post, é gerado e armazenado um hash de transação Ethereum (tx_hash).	
								
Usuários possuem um endereço Ethereum (wallet_address).			
								
🚀 Rodando a Aplicação						
Inicie o servidor com:							
								
uvicorn app.main:app --reload						
API → http://127.0.0.1:8000						
								
Swagger UI → http://127.0.0.1:8000/docs					
 
								
ReDoc → http://127.0.0.1:8000/redoc					
								
📌 Endpoints da API							
Usuários (/users)							
GET /users → Lista usuários						
								
POST /users → Cria usuário						
								
Exemplo:								
								
{								
"name": "Aldebaran",							
"wallet_address": "0x1234abcd5678ef..."					
}								
Posts (/posts)							
GET /posts → Lista posts						
								
POST /posts → Cria post e registra hash no Ethereum				
								
Exemplo:								
								
{								
"title": "Meu primeiro post blockchain",					
"user_id": 1							
}								
Resposta:								
								
{								
"id": 1,								
"title": "Meu primeiro post blockchain",					
"user_id": 1,							
"tx_hash": "0xabc123..."						
}								
Blockchain Extra							
GET /users/{id}/balance → Consulta saldo da carteira do usuário			
								
GET /posts/{id}/verify → Verifica existência do tx_hash na rede Ethereum		
								
✅ Testando a API							
Abra o Swagger UI em:						
👉 http://127.0.0.1:8000/docs						
								
Teste criação de usuários/posts e valide a integração blockchain.			
								
💡 Observações							
SQLite recomendado apenas para desenvolvimento.				
								
Produção → usar PostgreSQL ou MySQL.					
								
Pode-se estender para autenticação via assinatura Ethereum (login com carteira).	
								
 
Futuramente, o sistema pode migrar para Smart Contracts completos.		
								
📜 Licença								
Este projeto está sob a licença MIT – veja o arquivo LICENSE para mais detalhes.	
