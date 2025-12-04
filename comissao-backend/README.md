# Sistema de Cálculo de Comissão - Backend

Backend desenvolvido em Python com FastAPI seguindo arquitetura MVC.

## Estrutura

```
comissao-backend/
├── main.py                    # Ponto de entrada da aplicação
├── models/                     # Modelos Pydantic (validação)
│   └── venda_models.py
├── routes/                     # Endpoints (rotas)
│   └── comissao_routes.py
├── controllers/               # Controllers (lógica de requisições)
│   └── comissao_controller.py
├── services/                  # Services (regras de negócio)
│   └── comissao_service.py
└── repositories/              # Repositories (CRUD)
    └── venda_repository.py
```

## Fluxo da Arquitetura

1. **Endpoint** (`routes/comissao_routes.py`) - Recebe requisições HTTP
2. **Controller** (`controllers/comissao_controller.py`) - Valida e processa requisições
3. **Service** (`services/comissao_service.py`) - Implementa regras de negócio
4. **Repository** (`repositories/venda_repository.py`) - Gerencia dados (CRUD)

## Instalação com Ambiente Virtual (venv)

### 1. Criar o ambiente virtual:

**Windows:**
```bash
python -m venv venv
```

**Linux/Mac:**
```bash
python3 -m venv venv
```

### 2. Ativar o ambiente virtual:

**Windows (PowerShell):**
```bash
venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```bash
venv\Scripts\activate.bat
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

Após ativar, você verá `(venv)` no início do prompt do terminal.

### 3. Instalar dependências:

```bash
pip install -r requirements.txt
```

## Execução

**Importante:** Certifique-se de que o ambiente virtual está ativado antes de executar!

```bash
python main.py
```

O servidor estará disponível em `http://localhost:5000`

A documentação interativa da API estará disponível em:
- Swagger UI: `http://localhost:5000/docs`
- ReDoc: `http://localhost:5000/redoc`

## Desativar o ambiente virtual

Quando terminar de usar, você pode desativar o ambiente virtual:

```bash
deactivate
```

## Endpoints

### POST /api/calcular-comissao

Calcula a comissão de vendedores baseado nas vendas enviadas.

**Request Body:**
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

## Regras de Comissão

- Vendas abaixo de R$100,00: **0%** de comissão
- Vendas abaixo de R$500,00: **1%** de comissão
- Vendas a partir de R$500,00: **5%** de comissão

