Sistema para cálculo de comissões de vendedores, desenvolvido com backend em Python (FastAPI) e frontend em Next.js/React/TypeScript.

Arquitetura

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

**Documentação da API:**
- Swagger UI: `http://localhost:5000/docs`

## Regras de Comissão

- **Vendas abaixo de R$100,00**: 0% de comissão
- **Vendas abaixo de R$500,00**: 1% de comissão
- **Vendas a partir de R$500,00**: 5% de comissão

## Exemplo de Uso

1. Acesse `http://localhost:3000` no navegador
2. Clique em "Carregar Exemplo" ou preencha manualmente com json
3. Clique em "Calcular Comissão"
4. Visualize os resultados com detalhes de cada vendedor

## Tecnologias

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

