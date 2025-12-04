from fastapi import HTTPException
from models.venda_models import VendasRequest, ResultadoResponse
from services.comissao_service import ComissaoService

class ComissaoController:
    def __init__(self):
        self.service = ComissaoService()
    
    def calcular_comissao(self, request: VendasRequest) -> ResultadoResponse:
        try:
            vendas_dict = [venda.model_dump() for venda in request.vendas]
            resultado = self.service.calcular_comissao_vendedores(vendas_dict)
            return ResultadoResponse(**resultado)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

