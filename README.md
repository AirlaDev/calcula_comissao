# Sistema de Cálculo de Comissão

Sistema completo para cálculo de comissões de vendedores, desenvolvido com backend em Python (FastAPI) e frontend em Next.js/React/TypeScript.

## 📁 Estrutura do Projeto

```
calcula_comissao/
├── comissao-backend/      # Backend Python com FastAPI
└── comissao-frontend/     # Frontend Next.js com TypeScript
```

## 🏗️ Arquitetura

### Backend (MVC)
- **Models** → Modelos Pydantic (validação de dados)
- **Routes** → Endpoints HTTP
- **Controllers** → Validação e processamento de requisições
- **Services** → Regras de negócio
- **Repositories** → Operações CRUD

### Frontend
- **Next.js 14** com App Router
- **React 18** com TypeScript
- Interface moderna e responsiva

## 🚀 Como Executar

### Backend (Python com venv)

1. Entre na pasta do backend:
```bash
cd comissao-backend
```

2. Crie o ambiente virtual:
```bash
# Windows
python -m venv venv

# Linux/Mac
python3 -m venv venv
```

3. Ative o ambiente virtual:
```bash
# Windows (PowerShell)
venv\Scripts\Activate.ps1

# Windows (CMD)
venv\Scripts\activate.bat

# Linux/Mac
source venv/bin/activate
```

4. Instale as dependências (com o venv ativado):
```bash
pip install -r requirements.txt
```

5. Execute o servidor:
```bash
python main.py
```

O backend estará rodando em `http://localhost:5000`

**Documentação da API:**
- Swagger UI: `http://localhost:5000/docs`
- ReDoc: `http://localhost:5000/redoc`

**Nota:** O ambiente virtual deve estar ativado (você verá `(venv)` no início do prompt) antes de executar o servidor.

### Frontend (Next.js)

1. Entre na pasta do frontend:
```bash
cd comissao-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

## 📋 Passo a Passo Completo

### Terminal 1 - Backend:
```bash
cd comissao-backend
python -m venv venv
venv\Scripts\activate          # Windows
# ou: source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python main.py
```

### Terminal 2 - Frontend:
```bash
cd comissao-frontend
npm install
npm run dev
```

Depois acesse `http://localhost:3000` no navegador.


## 📊 Regras de Comissão

- **Vendas abaixo de R$100,00**: 0% de comissão
- **Vendas abaixo de R$500,00**: 1% de comissão
- **Vendas a partir de R$500,00**: 5% de comissão

## 📝 Exemplo de Uso

1. Acesse `http://localhost:3000` no navegador
2. Clique em "Carregar Exemplo" para preencher os dados de exemplo
3. Clique em "Calcular Comissão"
4. Visualize os resultados com detalhes de cada vendedor

## 🔌 API Endpoint

### POST /api/calcular-comissao

**Request:**
```json
{
  "vendas": [
    { "vendedor": "João Silva", "valor": 1200.50 },
    { "vendedor": "Maria Souza", "valor": 950.75 }
  ]
}
```

**Response:**
```json
{
  "resumo": [
    {
      "vendedor": "João Silva",
      "total_vendas": 1200.50,
      "total_comissao": 60.03,
      "quantidade_vendas": 1,
      "detalhes": [...]
    }
  ],
  "total_geral_vendas": 2151.25,
  "total_geral_comissao": 107.56
}
```

## 🛠️ Tecnologias

### Backend
- Python 3.x
- FastAPI
- Uvicorn
- Pydantic

### Frontend
- Next.js 14
- React 18
- TypeScript
- CSS Modules

## 📄 Licença

Este projeto é de uso livre para fins educacionais.

