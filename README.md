# Simulador de Orçamento de Aluguel - Imobiliária R.M

Trabalho prático desenvolvido para a disciplina de **Pensamento Algorítmico**, simulando as operações comerciais e financeiras de locação de imóveis da imobiliária **R.M**.

---

## 🛠️ Decisão de Arquitetura e Tecnologias

Para atender tanto aos critérios acadêmicos de lógica e estruturação de algoritmos quanto às necessidades comerciais e visuais do mercado imobiliário moderno, o projeto foi desenvolvido em duas frentes tecnológicas complementares:

### 1. Versão Terminal (Python — `main.py`)
* **Propósito**: Utilizado estritamente para a execução lógica em terminal de linha de comando (CLI) e processamento automatizado da exportação.
* **Por que Python?**: É a linguagem padrão recomendada para a demonstração e avaliação acadêmica da lógica do algoritmo. Ela executa de forma limpa no console, lida com a entrada de dados interativos de forma procedural, valida os tipos de dados inseridos e grava o arquivo bruto de fluxo de caixa anual no formato de planilha `.csv`.

### 2. Versão Interativa Web (JavaScript, HTML5 e CSS3 — `index.html`, `style.css`, `app.js`)
* **Propósito**: Utilizado para criar um simulador comercial visual de alta fidelidade e excelente experiência do usuário (UX).
* **Por que JavaScript/HTML/CSS?**: Enquanto o Python resolve a lógica e a gravação de dados, o JavaScript permite que um corretor ou cliente final interaja de forma visual e intuitiva com o sistema de orçamento através de um navegador web. A interface web oferece:
  * Atualização instantânea dos cálculos na tela conforme o usuário clica nos opcionais (sem precisar digitar textos).
  * Design moderno com tema escuro (Dark Mode) e efeito fosco (Glassmorphism).
  * Funcionalidade de impressão diagramada, que formata a proposta automaticamente como um recibo/fatura profissional pronto para ser impresso ou salvo em PDF.

---

## 📂 Estrutura do Projeto

* `main.py`: Código-fonte em Python (CLI) para execução interativa em terminal e exportação de planilha.
* `index.html`: Estrutura da página web do simulador.
* `style.css`: Estilização visual premium (responsiva e adaptada para impressão).
* `app.js`: Script em JavaScript para cálculos em tempo real e exportação de CSV no navegador.
* `Parte_Teorica_RM_Imobiliaria.pdf`: Relatório teórico formal em PDF contendo introdução aos pilares do pensamento algorítmico, o pseudocódigo acadêmico e o fluxograma.
* `fluxograma_rm.png`: Imagem do diagrama de blocos do sistema.
* `.gitignore`: Configuração para ignorar arquivos desnecessários no Git.

---

## 🚀 Como Executar

### Executando a Versão em Python (Terminal)
1. Certifique-se de ter o Python 3 instalado.
2. Abra o seu terminal na pasta do projeto e digite:
   ```bash
   python main.py
   ```
3. Responda às perguntas interativas sobre o imóvel, opcionais e parcelas para gerar o orçamento e exportar o arquivo `.csv`.

### Executando a Versão Web (Navegador)
1. Dê um duplo clique no arquivo `index.html` ou abra-o em qualquer navegador moderno.
2. Ajuste os botões e seletores à esquerda para ver a simulação mudar em tempo real.
3. Use o botão **Exportar Orçamento (CSV)** para gerar a planilha, ou **Imprimir Orçamento** para salvar um PDF diagramado.
