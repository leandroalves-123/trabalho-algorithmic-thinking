# -*- coding: utf-8 -*-
"""
R.M Imobiliária - Simulador de Orçamento de Locação
Disciplina: Pensamento Algorítmico
Autores: Samir & Leandro Alves
Descrição: Script interativo em Python para simulação de aluguel e exportação de CSV com 12 parcelas.
"""

import csv
import sys
import os
from datetime import datetime

# Cores ANSI para o Terminal (deixa a CLI com aspecto moderno e premium)
class Cores:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

# Limpar o terminal de forma multiplataforma
def limpar_tela():
    os.system('cls' if os.name == 'nt' else 'clear')

# Função para formatação de moeda em Real (R$)
def formatar_real(valor):
    return f"R$ {valor:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")

def obter_opcao_menu(mensagem, opcoes_validas):
    while True:
        entrada = input(f"{Cores.BOLD}{mensagem}{Cores.ENDC}").strip().lower()
        if entrada in opcoes_validas:
            return entrada
        print(f"{Cores.FAIL}Opção inválida! Escolha entre: {', '.join(opcoes_validas).upper()}{Cores.ENDC}")

def obter_inteiro(mensagem, min_val, max_val):
    while True:
        try:
            val = int(input(f"{Cores.BOLD}{mensagem}{Cores.ENDC}"))
            if min_val <= val <= max_val:
                return val
            print(f"{Cores.FAIL}Por favor, digite um número entre {min_val} e {max_val}.{Cores.ENDC}")
        except ValueError:
            print(f"{Cores.FAIL}Entrada inválida! Digite um número inteiro.{Cores.ENDC}")

# ALGORITMO PRINCIPAL DE CÁLCULO
def calcular_orcamento():
    limpar_tela()
    print(f"{Cores.HEADER}{Cores.BOLD}==================================================")
    print("      R.M IMOBILIÁRIA - SIMULADOR DE ALUGUEL      ")
    print(f"=================================================={Cores.ENDC}\n")

    # 1. SELEÇÃO DO TIPO DE IMÓVEL
    print(f"{Cores.BLUE}Selecione o tipo de locação:{Cores.ENDC}")
    print("1 - Apartamento (Base: R$ 700,00)")
    print("2 - Casa (Base: R$ 900,00)")
    print("3 - Estúdio (Base: R$ 1.200,00)")
    opcao_tipo = obter_opcao_menu("Escolha uma opção (1, 2 ou 3): ", ['1', '2', '3'])
    
    tipo_imovel = ""
    aluguel_base = 0.0
    adicional_quartos = 0.0
    adicional_garagem = 0.0
    desconto = 0.0
    has_children = "s"
    vagas_estudio = 0
    quartos = 1

    if opcao_tipo == '1':
        tipo_imovel = "Apartamento"
        aluguel_base = 700.00
        
        # Opcional de quartos
        print(f"\n{Cores.CYAN}--- Configuração do Apartamento ---{Cores.ENDC}")
        opcao_quartos = obter_opcao_menu("Quantidade de quartos (1 ou 2): ", ['1', '2'])
        if opcao_quartos == '2':
            quartos = 2
            adicional_quartos = 200.00
            
        # Opcional de garagem
        opcao_garagem = obter_opcao_menu("Incluir vaga de garagem? (+R$ 300,00) (S/N): ", ['s', 'n'])
        if opcao_garagem == 's':
            adicional_garagem = 300.00
            
        # Regra de desconto sem crianças
        has_children = obter_opcao_menu("O locatário possui crianças? (S/N): ", ['s', 'n'])
        
        # Cálculo do aluguel do Apartamento
        subtotal = aluguel_base + adicional_quartos + adicional_garagem
        if has_children == 'n':
            desconto = subtotal * 0.05
        aluguel_mensal = subtotal - desconto

    elif opcao_tipo == '2':
        tipo_imovel = "Casa"
        aluguel_base = 900.00
        
        # Opcional de quartos
        print(f"\n{Cores.CYAN}--- Configuração da Casa ---{Cores.ENDC}")
        opcao_quartos = obter_opcao_menu("Quantidade de quartos (1 ou 2): ", ['1', '2'])
        if opcao_quartos == '2':
            quartos = 2
            adicional_quartos = 250.00
            
        # Opcional de garagem
        opcao_garagem = obter_opcao_menu("Incluir vaga de garagem? (+R$ 300,00) (S/N): ", ['s', 'n'])
        if opcao_garagem == 's':
            adicional_garagem = 300.00
            
        aluguel_mensal = aluguel_base + adicional_quartos + adicional_garagem

    elif opcao_tipo == '3':
        tipo_imovel = "Estúdio"
        aluguel_base = 1200.00
        
        # Opcional de estacionamento para Estúdio
        print(f"\n{Cores.CYAN}--- Configuração do Estúdio ---{Cores.ENDC}")
        vagas_estudio = obter_inteiro("Deseja quantas vagas de estacionamento? (0 a 10): ", 0, 10)
        
        if vagas_estudio > 0:
            if vagas_estudio <= 2:
                adicional_garagem = 250.00
            else:
                adicional_garagem = 250.00 + (vagas_estudio - 2) * 60.00
                
        aluguel_mensal = aluguel_base + adicional_garagem

    # 2. SELEÇÃO DE PARCELAMENTO DO CONTRATO
    print(f"\n{Cores.BLUE}--- Parcelamento da Taxa de Contrato (R$ 2.000,00) ---{Cores.ENDC}")
    print("O contrato pode ser dividido em até 5 vezes e pago nos primeiros meses.")
    parcelas_contrato = obter_inteiro("Selecione o número de parcelas (1 a 5): ", 1, 5)
    valor_parcela_contrato = 2000.00 / parcelas_contrato

    # 3. EXIBIÇÃO DO RESUMO DO ORÇAMENTO
    limpar_tela()
    print(f"{Cores.GREEN}{Cores.BOLD}==================================================")
    print("          RESUMO DO ORÇAMENTO DE ALUGUEL          ")
    print(f"=================================================={Cores.ENDC}")
    print(f"Tipo de Imóvel:      {Cores.BOLD}{tipo_imovel}{Cores.ENDC}")
    print(f"Aluguel Base:        {formatar_real(aluguel_base)}")
    
    if tipo_imovel != "Estúdio":
        print(f"Número de Quartos:   {quartos} quarto(s) (Adicional: {formatar_real(adicional_quartos)})")
        print(f"Vaga de Garagem:     {'Sim' if adicional_garagem > 0 else 'Não'} (Adicional: {formatar_real(adicional_garagem)})")
        if tipo_imovel == "Apartamento":
            print(f"Possui Crianças:     {'Sim' if has_children == 's' else 'Não (5% de Desconto aplicado!)'}")
            if desconto > 0:
                print(f"Desconto Aplicado:   -{formatar_real(desconto)}")
    else:
        print(f"Vagas Estacionamento:{vagas_estudio} vaga(s) (Adicional: {formatar_real(adicional_garagem)})")
        
    print("-" * 50)
    print(f"{Cores.BOLD}Valor Mensal do Aluguel:       {Cores.GREEN}{formatar_real(aluguel_mensal)}{Cores.ENDC}")
    print(f"Valor do Contrato (Total):      {formatar_real(2000.00)}")
    print(f"Parcelamento do Contrato:       {parcelas_contrato}x de {formatar_real(valor_parcela_contrato)}")
    print(f"Total nos Primeiros {parcelas_contrato} meses:   {Cores.BOLD}{Cores.CYAN}{formatar_real(aluguel_mensal + valor_parcela_contrato)}/mês{Cores.ENDC}")
    print(f"Total a partir do Mês {parcelas_contrato + 1}:       {formatar_real(aluguel_mensal)}/mês")
    print("-" * 50)

    # 4. EXIBIÇÃO DA TABELA DOS 12 MESES
    print(f"\n{Cores.BOLD}CRONOGRAMA DE PAGAMENTO - FLUXO DE 12 MESES:{Cores.ENDC}")
    print(f"{'Mês':<8} | {'Aluguel (R$)':<15} | {'Contrato (R$)':<15} | {'Total Mensal (R$)':<15}")
    print("-" * 60)
    
    cronograma_meses = []
    for mes in range(1, 13):
        custo_contrato = valor_parcela_contrato if mes <= parcelas_contrato else 0.0
        total_do_mes = aluguel_mensal + custo_contrato
        cronograma_meses.append((mes, aluguel_mensal, custo_contrato, total_do_mes))
        
        contrato_str = formatar_real(custo_contrato) if custo_contrato > 0 else "—"
        print(f"Mês {mes:<4} | {formatar_real(aluguel_mensal):<15} | {contrato_str:<15} | {Cores.BOLD}{formatar_real(total_do_mes):<15}{Cores.ENDC}")
    
    print("-" * 60)

    # 5. GERAÇÃO DO ARQUIVO CSV
    gerar_csv = obter_opcao_menu("\nDeseja exportar este orçamento em formato '.csv'? (S/N): ", ['s', 'n'])
    if gerar_csv == 's':
        nome_arquivo = "orcamento_RM.csv"
        try:
            # Escreve o CSV usando ponto e vírgula e encode UTF-8 com BOM para Excel em português
            with open(nome_arquivo, mode='w', newline='', encoding='utf-8-sig') as file:
                writer = csv.writer(file, delimiter=';')
                
                # Cabeçalho informativo
                writer.writerow(["R.M IMOBILIÁRIA - ORÇAMENTO DE LOCAÇÃO"])
                writer.writerow(["Data de Geração", datetime.now().strftime("%d/%m/%Y %H:%M:%S")])
                writer.writerow(["Tipo de Imóvel", tipo_imovel])
                if tipo_imovel != "Estúdio":
                    writer.writerow(["Quantidade de Quartos", f"{quartos} quarto(s)"])
                    writer.writerow(["Vaga de Garagem", "Sim" if adicional_garagem > 0 else "Não"])
                    if tipo_imovel == "Apartamento":
                        writer.writerow(["Possui Crianças", "Sim" if has_children == 's' else "Não (Elegível a desconto)"])
                else:
                    writer.writerow(["Vagas de Estacionamento", f"{vagas_estudio} vaga(s)"])
                writer.writerow(["Taxa de Contrato", f"R$ 2.000,00 parcelado em {parcelas_contrato}x"])
                writer.writerow([])
                
                # Cabeçalho da Tabela
                writer.writerow(["Mês", "Valor do Aluguel (R$)", "Parcela do Contrato (R$)", "Total Mensal (R$)"])
                
                # Dados dos meses
                total_anual = 0.0
                for mes, aluguel, contrato, total in cronograma_meses:
                    total_anual += total
                    writer.writerow([
                        f"Mês {mes}", 
                        f"{aluguel:.2f}".replace('.', ','), 
                        f"{contrato:.2f}".replace('.', ','), 
                        f"{total:.2f}".replace('.', ',')
                    ])
                
                writer.writerow([])
                writer.writerow(["VALOR TOTAL ANUAL ESTIMADO", "", "", f"{total_anual:.2f}".replace('.', ',')])
                
            print(f"\n{Cores.GREEN}✔ Arquivo '{nome_arquivo}' exportado com sucesso no diretório do projeto!{Cores.ENDC}")
        except Exception as e:
            print(f"\n{Cores.FAIL}❌ Erro ao salvar arquivo CSV: {e}{Cores.ENDC}")
            
    print(f"\n{Cores.BLUE}Obrigado por utilizar o simulador da R.M Imobiliária!{Cores.ENDC}")

if __name__ == "__main__":
    try:
        calcular_orcamento()
    except KeyboardInterrupt:
        print("\n\nSimulação cancelada pelo usuário. Até logo!")
        sys.exit(0)
