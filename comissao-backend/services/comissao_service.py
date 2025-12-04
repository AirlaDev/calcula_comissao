from repositories.venda_repository import VendaRepository

class ComissaoService:
    def __init__(self):
        self.repository = VendaRepository()
    
    def calcular_comissao_vendedores(self, vendas):
        self.repository.salvar_vendas(vendas)
        
        vendas_por_vendedor = {}
        for venda in vendas:
            vendedor = venda['vendedor']
            if vendedor not in vendas_por_vendedor:
                vendas_por_vendedor[vendedor] = []
            vendas_por_vendedor[vendedor].append(venda)
        
        resultado = []
        for vendedor, vendas_vendedor in vendas_por_vendedor.items():
            total_vendas = sum(v['valor'] for v in vendas_vendedor)
            total_comissao = sum(self._calcular_comissao_venda(v['valor']) for v in vendas_vendedor)
            
            resultado.append({
                'vendedor': vendedor,
                'total_vendas': round(total_vendas, 2),
                'total_comissao': round(total_comissao, 2),
                'quantidade_vendas': len(vendas_vendedor),
                'detalhes': [
                    {
                        'valor': v['valor'],
                        'comissao': round(self._calcular_comissao_venda(v['valor']), 2),
                        'percentual': self._obter_percentual_comissao(v['valor'])
                    }
                    for v in vendas_vendedor
                ]
            })
        
        return {
            'resumo': resultado,
            'total_geral_vendas': round(sum(r['total_vendas'] for r in resultado), 2),
            'total_geral_comissao': round(sum(r['total_comissao'] for r in resultado), 2)
        }
    
    def _calcular_comissao_venda(self, valor):
        if valor < 100:
            return 0
        elif valor < 500:
            return valor * 0.01
        else:
            return valor * 0.05
    
    def _obter_percentual_comissao(self, valor):
        if valor < 100:
            return 0
        elif valor < 500:
            return 1
        else:
            return 5

