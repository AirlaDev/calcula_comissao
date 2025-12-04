'use client'

import { useState } from 'react'
import styles from './page.module.css'

interface DetalheVenda {
  valor: number
  comissao: number
  percentual: number
}

interface ResumoVendedor {
  vendedor: string
  total_vendas: number
  total_comissao: number
  quantidade_vendas: number
  detalhes: DetalheVenda[]
}

interface Resultado {
  resumo: ResumoVendedor[]
  total_geral_vendas: number
  total_geral_comissao: number
}

export default function Home() {
  const [vendasJson, setVendasJson] = useState('')
  const [resultado, setResultado] = useState<Resultado | null>(null)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  const dadosExemplo = {
    "vendas": [
      { "vendedor": "João Silva", "valor": 1200.50 },
      { "vendedor": "João Silva", "valor": 950.75 },
      { "vendedor": "João Silva", "valor": 1800.00 },
      { "vendedor": "João Silva", "valor": 1400.30 },
      { "vendedor": "João Silva", "valor": 1100.90 },
      { "vendedor": "João Silva", "valor": 1550.00 },
      { "vendedor": "João Silva", "valor": 1700.80 },
      { "vendedor": "João Silva", "valor": 250.30 },
      { "vendedor": "João Silva", "valor": 480.75 },
      { "vendedor": "João Silva", "valor": 320.40 },
      { "vendedor": "Maria Souza", "valor": 2100.40 },
      { "vendedor": "Maria Souza", "valor": 1350.60 },
      { "vendedor": "Maria Souza", "valor": 950.20 },
      { "vendedor": "Maria Souza", "valor": 1600.75 },
      { "vendedor": "Maria Souza", "valor": 1750.00 },
      { "vendedor": "Maria Souza", "valor": 1450.90 },
      { "vendedor": "Maria Souza", "valor": 400.50 },
      { "vendedor": "Maria Souza", "valor": 180.20 },
      { "vendedor": "Maria Souza", "valor": 90.75 },
      { "vendedor": "Carlos Oliveira", "valor": 800.50 },
      { "vendedor": "Carlos Oliveira", "valor": 1200.00 },
      { "vendedor": "Carlos Oliveira", "valor": 1950.30 },
      { "vendedor": "Carlos Oliveira", "valor": 1750.80 },
      { "vendedor": "Carlos Oliveira", "valor": 1300.60 },
      { "vendedor": "Carlos Oliveira", "valor": 300.40 },
      { "vendedor": "Carlos Oliveira", "valor": 500.00 },
      { "vendedor": "Carlos Oliveira", "valor": 125.75 },
      { "vendedor": "Ana Lima", "valor": 1000.00 },
      { "vendedor": "Ana Lima", "valor": 1100.50 },
      { "vendedor": "Ana Lima", "valor": 1250.75 },
      { "vendedor": "Ana Lima", "valor": 1400.20 },
      { "vendedor": "Ana Lima", "valor": 1550.90 },
      { "vendedor": "Ana Lima", "valor": 1650.00 },
      { "vendedor": "Ana Lima", "valor": 75.30 },
      { "vendedor": "Ana Lima", "valor": 420.90 },
      { "vendedor": "Ana Lima", "valor": 315.40 }
    ]
  }

  const carregarExemplo = () => {
    setVendasJson(JSON.stringify(dadosExemplo, null, 2))
  }

  const calcularComissao = async () => {
    setLoading(true)
    setErro('')
    setResultado(null)

    try {
      const dados = JSON.parse(vendasJson)
      
      const response = await fetch('http://localhost:5000/api/calcular-comissao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.erro || 'Erro ao calcular comissão')
      }

      const data = await response.json()
      setResultado(data)
    } catch (error: any) {
      setErro(error.message || 'Erro ao processar dados')
    } finally {
      setLoading(false)
    }
  }

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor)
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Sistema de Cálculo de Comissão</h1>
        
        <div className={styles.section}>
          <div className={styles.headerSection}>
            <h2>Dados de Vendas</h2>
            <button onClick={carregarExemplo} className={styles.btnExemplo}>
              Carregar Exemplo
            </button>
          </div>
          
          <textarea
            className={styles.textarea}
            value={vendasJson}
            onChange={(e) => setVendasJson(e.target.value)}
            placeholder="Cole aqui o JSON com as vendas..."
            rows={15}
          />
          
          <button
            onClick={calcularComissao}
            disabled={loading || !vendasJson.trim()}
            className={styles.btnCalcular}
          >
            {loading ? 'Calculando...' : 'Calcular Comissão'}
          </button>
        </div>

        {erro && (
          <div className={styles.erro}>
            <strong>Erro:</strong> {erro}
          </div>
        )}

        {resultado && (
          <div className={styles.resultado}>
            <h2>Resultado do Cálculo</h2>
            
            <div className={styles.resumoGeral}>
              <div className={styles.cardResumo}>
                <h3>Total Geral de Vendas</h3>
                <p className={styles.valor}>{formatarMoeda(resultado.total_geral_vendas)}</p>
              </div>
              <div className={styles.cardResumo}>
                <h3>Total Geral de Comissão</h3>
                <p className={styles.valor}>{formatarMoeda(resultado.total_geral_comissao)}</p>
              </div>
            </div>

            <div className={styles.vendedores}>
              {resultado.resumo.map((vendedor, index) => (
                <div key={index} className={styles.cardVendedor}>
                  <div className={styles.headerVendedor}>
                    <h3>{vendedor.vendedor}</h3>
                    <div className={styles.stats}>
                      <span>Vendas: {vendedor.quantidade_vendas}</span>
                      <span>Total: {formatarMoeda(vendedor.total_vendas)}</span>
                      <span className={styles.comissao}>
                        Comissão: {formatarMoeda(vendedor.total_comissao)}
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.detalhes}>
                    <h4>Detalhes das Vendas</h4>
                    <table className={styles.tabela}>
                      <thead>
                        <tr>
                          <th>Valor da Venda</th>
                          <th>% Comissão</th>
                          <th>Valor da Comissão</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendedor.detalhes.map((detalhe, idx) => (
                          <tr key={idx}>
                            <td>{formatarMoeda(detalhe.valor)}</td>
                            <td>{detalhe.percentual}%</td>
                            <td>{formatarMoeda(detalhe.comissao)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

