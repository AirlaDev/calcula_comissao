from fastapi import APIRouter
from models.venda_models import VendasRequest, ResultadoResponse
from controllers.comissao_controller import ComissaoController

router = APIRouter()
controller = ComissaoController()

@router.post('/calcular-comissao', response_model=ResultadoResponse, status_code=200)
async def calcular_comissao(request: VendasRequest):
    return controller.calcular_comissao(request)

