# 🏠 R.M Imobiliária - Simulador de Orçamento de Aluguel

> Um simulador inteligente e interativo para calcular orçamentos de aluguel residencial com precisão. Configure seu imóvel, visualize o orçamento em tempo real e gere relatórios em CSV.

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-ativo-brightgreen.svg)]()

## 📋 Visão Geral

O **Simulador de Orçamento de Locação da R.M Imobiliária** é uma aplicação web moderna e responsiva que permite:

- ✨ **Simular orçamentos** para diferentes tipos de imóveis
- 🎯 **Personalizar características** (quartos, garagem, estacionamento)
- 💰 **Visualizar cálculos em tempo real** com detalhamento completo
- 📊 **Gerar cronogramas de pagamento** em CSV
- 🖨️ **Imprimir orçamentos** formatados profissionalmente
- 📱 **Totalmente responsivo** para desktop, tablet e mobile

## 🎨 Características Principais

### 1. **Seleção de Tipo de Imóvel**
Escolha entre três tipos de propriedade:
- **Apartamento**: R$ 700,00/mês (base)
- **Casa**: R$ 900,00/mês (base)
- **Estúdio**: R$ 1.200,00/mês (conceito aberto)

### 2. **Personalização Dinâmica**
Customize seu imóvel com opções relevantes:
- Adicionar quarto extra (R$ 200-250/mês)
- Garagem (R$ 300/mês)
- Estacionamento para estúdio (valor configurável)
- Desconto para quem tem filhos

### 3. **Simulação Flexível de Contrato**
- Parcelas de 1 a 5 meses
- Cálculo automático do valor mensal
- Visualização do total do contrato

### 4. **Relatórios e Exportação**
- 📋 Tabela detalhada de cronograma de parcelas
- 📥 Download em formato CSV
- 🖨️ Impressão em layout otimizado

## 🚀 Início Rápido

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexão com internet (para fontes e ícones)

### Instalação

1. Clone o repositório ou baixe os arquivos:
```bash
git clone https://github.com/seu-usuario/RM-Imobiliaria-Simulador.git
cd RM-Imobiliaria-Simulador
```

2. Abra o arquivo `index.html` no navegador:
   - **Opção 1**: Clique duplo em `index.html`
   - **Opção 2**: Clique com botão direito → "Abrir com" → Navegador
   - **Opção 3**: Use um servidor local (recomendado):
     ```bash
     # Com Python 3
     python -m http.server 8000
     
     # Com Node.js (http-server)
     npx http-server
     ```

3. Acesse no navegador:
```
http://localhost:8000
```

## 💡 Como Usar

### Passo 1: Selecione o Tipo de Imóvel
Clique em um dos três cards para escolher entre Apartamento, Casa ou Estúdio.

### Passo 2: Personalize as Características
Defina as opções disponíveis para seu imóvel:
- Número de quartos
- Presença de garagem
- Número de vagas de estacionamento
- Se há desconto por filhos

### Passo 3: Configure o Contrato
Ajuste o slider para selecionar o número de parcelas (1 a 5).

### Passo 4: Visualize o Orçamento
O painel direito mostra em tempo real:
- Preço base do imóvel
- Adicionais (quartos, garagem, etc.)
- Desconto aplicado
- Valor mensal e total do contrato

### Passo 5: Gere Relatórios
- Clique em **"Baixar CSV"** para exportar o cronograma
- Clique em **"Imprimir Orçamento"** para visualizar em modo impressão

## 🏗️ Estrutura do Projeto

```
trabalho-algoritm-thinking/
├── index.html          # Estrutura HTML da aplicação
├── style.css           # Estilos e design system
├── app.js              # Lógica JavaScript (simulação, cálculos)
└── README.md           # Este arquivo
```

### Descrição dos Arquivos

| Arquivo | Descrição |
|---------|-----------|
| **index.html** | Estrutura da página com componentes UI (cards, painéis, tabelas) |
| **style.css** | Design system completo com variáveis CSS, responsividade e animações |
| **app.js** | Lógica de simulação, cálculos de preços e gerenciamento de estado |

## 🎯 Especificações Técnicas

### Tecnologias Utilizadas
- **HTML5**: Estrutura semântica e validação
- **CSS3**: Design moderno com Flexbox, Grid e variáveis CSS
- **JavaScript Vanilla**: Lógica sem dependências externas
- **FontAwesome**: Ícones profissionais
- **Plus Jakarta Sans**: Tipografia moderna

### Compatibilidade
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Performance
- Sem dependências externas (apenas CDNs de fontes e ícones)
- Carregamento rápido (~2-3 segundos)
- Responsivo e otimizado para mobile

## 💰 Tabela de Preços Base

| Tipo de Imóvel | Preço Base | Quarto Extra | Garagem |
|---|---|---|---|
| Apartamento | R$ 700,00 | R$ 200,00 | R$ 300,00 |
| Casa | R$ 900,00 | R$ 250,00 | R$ 300,00 |
| Estúdio | R$ 1.200,00 | N/A | N/A* |

*Para estúdio: custo de estacionamento é configurável

## 📱 Responsividade

A aplicação é totalmente responsiva e se adapta a:
- 📱 **Mobile** (320px+): Layout em coluna única
- 📱 **Tablet** (768px+): Layout em 2 colunas
- 🖥️ **Desktop** (1024px+): Layout otimizado com espaçamento amplo

## 🔧 Desenvolvimento

### Arquitetura do JavaScript

O `app.js` utiliza um padrão de estado centralizado:

```javascript
const state = {
    propertyType: 'apartment',    // Tipo do imóvel
    bedrooms: 1,                  // Número de quartos
    garage: false,                // Possui garagem?
    hasChildren: 'yes',           // Desconto por filhos?
    studioParking: 0,             // Vagas de estacionamento (estúdio)
    contractInstallments: 5       // Número de parcelas
};
```

**Funções principais:**
- `calculateAndUpdate()`: Recalcula os valores e atualiza a UI
- `downloadCsv()`: Gera e baixa arquivo CSV
- `printQuote()`: Abre diálogo de impressão

## 🎓 Exemplo de Cálculo

**Cenário:** Apartamento com 2 quartos, garagem, com desconto por filhos

```
Preço Base (Apartamento)    = R$ 700,00
+ Quarto Extra              = R$ 200,00
+ Garagem                   = R$ 300,00
Subtotal                    = R$ 1.200,00

Desconto (10% filhos)       = -R$ 120,00
─────────────────────────────────────
Aluguel Mensal              = R$ 1.080,00
```

Para um contrato de 5 parcelas:
- **Total do Contrato**: R$ 5.400,00
- **Valor por Parcela**: R$ 1.080,00

## 🐛 Relatório de Bugs e Sugestões

Encontrou um problema ou tem uma sugestão? 

1. Verifique se o problema já foi reportado
2. Abra uma **Issue** descrevendo:
   - Navegador e versão
   - Passos para reproduzir
   - Comportamento esperado vs. observado
   - Screenshots (se aplicável)

## 🤝 Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Faça um **Fork** do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### Guia de Estilo
- Mantenha o código limpo e comentado
- Use camelCase para variáveis JavaScript
- Respeite as variáveis CSS existentes
- Teste em múltiplos navegadores

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💼 Autor

**R.M Imobiliária**  
Desenvolvido por: Antigravity Code Assistant  
Data: 2026-08-15

## 📞 Suporte

Para dúvidas ou suporte:
- 📧 E-mail: contato@rmimobiliaria.com
- 🌐 Website: www.rmimobiliaria.com
- 💬 Issues: [Abra uma Issue no GitHub](#)

## 🙌 Agradecimentos

- FontAwesome por ícones profissionais
- Google Fonts por tipografia elegante
- Comunidade JavaScript open-source

---

<div align="center">

**[⬆ Voltar ao topo](#-rm-imobiliária---simulador-de-orçamento-de-aluguel)**

Desenvolvido com ❤️ para a R.M Imobiliária

</div>
