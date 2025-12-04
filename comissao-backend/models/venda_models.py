from pydantic import BaseModel, Field
from typing import List

class Venda(BaseModel):
    vendedor: str
    valor: float = Field(gt=0, description="Valor da venda deve ser maior que zero")

class VendasRequest(BaseModel):
    vendas: List[Venda] = Field(min_length=1, description="Lista de vendas")

class DetalheVenda(BaseModel):
    valor: float
    comissao: float
    percentual: int

class ResumoVendedor(BaseModel):
    vendedor: str
    total_vendas: float
    total_comissao: float
    quantidade_vendas: int
    detalhes: List[DetalheVenda]

class ResultadoResponse(BaseModel):
    resumo: List[ResumoVendedor]
    total_geral_vendas: float
    total_geral_comissao: float

